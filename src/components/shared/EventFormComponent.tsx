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
import DatePicker from "react-datepicker";
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
      thumbnail : "",
      startDateTime: new Date(),
      endDateTime: new Date(),
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
         <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      
                      <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date: Date) => field.onChange(date)} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
      
                </FormItem>
              )}
            />
        
          <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      
                      <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date: Date) => field.onChange(date)} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
              
                </FormItem>
              )}
            />
        </div>


        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </>
  )
}

export default EventFormComponent
