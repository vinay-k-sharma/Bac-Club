import { connectToDatabase } from "@/lib/database";
import Event from "@/lib/database/models/event.model";
import { NextResponse } from "next/server"

export const GET = async(req, {params}) => {
    const {id} = params;
    await connectToDatabase()

    const event = await Event.findById(id)

    return NextResponse.json(event,{status:200})
}