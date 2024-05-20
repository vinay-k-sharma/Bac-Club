'use client'
import { useState } from "react"
import { clubSchema } from "@/lib/zod-schema/schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { connectToDatabase } from "@/lib/database"
import { FileUploader } from "./FileUploader"
import { useUploadThing } from '@/lib/uploadthing'
import { createClub } from "@/lib/actions/club.action"
import { CreateClubParams } from "../../../types"
type ClubFormProps = {
userId : string,
type: "Create" | "Update"
}
const FormComponent = ({userId,type} : ClubFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter()
  const { startUpload } = useUploadThing('imageUploader')
    const form = useForm<z.infer<typeof clubSchema>>({
        resolver: zodResolver(clubSchema),
        defaultValues: {
          title: "",
          description:"",
          thumbnail:"",
          category:"",
        },
      })
       async function onSubmit(values: z.infer<typeof clubSchema>) {
            // await connectToDatabase()
            let uploadedImageUrl = values.thumbnail;

            if(files.length>0){
              const uploadedImages = await startUpload(files)

              if(!uploadedImages){
                return 
              }

              uploadedImageUrl = uploadedImages[0].url
            }
            
          
            if(type==='Create'){
              try {
                  const newClub : CreateClubParams = await createClub({
                    clubData: {...values,thumbnail : uploadedImageUrl}, userId, path: '/clubs'
                  })
                  if(newClub){
                    form.reset()
                    router.push('/clubs')
                  }
              }
              catch(error){
                console.log(error)
              }
            }
    
            
        console.log(values)
      }
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 items-center" >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Club's Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Club's Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <FileUploader onFieldChange={field.onChange}
                    thumbnail={field.value}
                    setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
}

export default FormComponent
