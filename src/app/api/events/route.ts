import { connectToDatabase } from "@/lib/database";
import Club from "@/lib/database/models/club.model";
import Event from "@/lib/database/models/event.model";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req : NextRequest, res : NextResponse) => {
  try {
    await connectToDatabase();
    const reqBody = await req.json();
    const { title, description, thumbnail } = reqBody;

    if (!title || !description || !thumbnail) {
      return NextResponse.json({ error: "Title, description, and thumbnail are required." }, { status: 400 });
    }

    const newEvent = await Event.create({ ...reqBody});

    const club = await Club.findById(reqBody.club_id)
    if(!club){
      throw new Error("Club doesnot exist")
    }

    club.events.push(newEvent._id.toString())
    await club.save()
    console.log("Event Created")
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error : any) {
    console.error("Error in creating event:", error);
    return NextResponse.json({ error: "Error in creating event: " + error.message }, { status: 500 });
  }
};


export const GET = async() => {
    try{
        await connectToDatabase()
        const events = await Event.find()
        return NextResponse.json(events,{status:200})
    }
    catch(error:any){
        return NextResponse.json({error : "Error in getting event : " + error.message},{status:500})
    }
}