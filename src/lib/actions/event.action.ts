'use server'

import { connectToDatabase } from "../database"
import Event from "../database/models/event.model"

export const getEventById = async(event_id:string) => {
    try{
        
        await connectToDatabase()
        const event = Event.findById(event_id).lean()
        if(!event) throw new Error('Event not found')
        return event
    }
    catch(error:any){
        console.log(error)
    }
}