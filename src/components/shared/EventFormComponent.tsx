"use client"
import axios from 'axios'
import { z } from "zod"
import {useState} from 'react'
import { eventSchema } from "@/lib/zod-schema/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProps, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FileUploader } from "./FileUploader"
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter,useSearchParams } from 'next/navigation'
import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
type EventFromProps = {
  userId : string
}
const EventFormComponent = ({userId} : EventFromProps) => {
  const params = useSearchParams()
  const [startDate, setStartDate] = useState(new Date());
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter()
  const { startUpload } = useUploadThing('imageUploader')
  const club_id = params.get('club_id') || " "
  console.log(club_id)
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description : "",
      thumbnail : ""
    },
  })
   async function onSubmit(values: z.infer<typeof eventSchema>) {
    let uploadedImageUrl = values.thumbnail;

            if(files.length>0){
              const uploadedImages = await startUpload(files)

              if(!uploadedImages){
                return 
              }

              uploadedImageUrl = uploadedImages[0].url
            }
            
            try {
              console.log("Submitting values:", { ...values, thumbnail: uploadedImageUrl, });
              const newEvent = await axios.post("http://localhost:3000/api/events", { ...values, thumbnail: uploadedImageUrl, club_id });
              console.log("New event response:", newEvent.data);
        
              if (newEvent.status === 201) {
                form.reset();
                router.push('/');
              } else {
                console.error("Error creating event:", newEvent.data);
              }
            } catch (error) {
              console.error("API call error:", error);
            }
  }
  return (
    <>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="Event Title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Event Description" {...field} />
              </FormControl>  
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
                </FormItem>
              )}
            />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </>
  )
}

export default EventFormComponent
