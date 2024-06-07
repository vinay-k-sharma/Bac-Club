'use server'

import { CreateClubParams,JoinClubParams,UpdateClubParams } from "../../../types"
import { connectToDatabase } from "../database"
import Club from "../database/models/club.model"
import User from "../database/models/user.model"
import { revalidatePath } from "next/cache"



export const createClub = async({clubData,userId,path}:CreateClubParams) => {
   try{
        await connectToDatabase()
        const organizer = await User.findById(userId)
        if(!organizer){
            throw new Error('Organizer Not Found')
        }

        const newClub = await Club.create({...clubData, organizer : userId})
        revalidatePath(path)
        
        return JSON.parse(JSON.stringify(newClub))
        
      }
   catch(error){
    console.log(error)
   }
}
export const updateClub = async ({userId,club,path} : UpdateClubParams) => {
try {
await connectToDatabase()
const clubToUpdate = await Club.findById(club._id)
console.log(clubToUpdate)
console.log(clubToUpdate.organizer)
console.log(userId)
if(!clubToUpdate || clubToUpdate.organizer.toHexString() !== userId){
    throw new Error('Unauthorized or club not found')
}

const updatedClub = await Club.findByIdAndUpdate(
    club._id,
    { ...club },
    { new: true }
  )
  revalidatePath(path)

  return JSON.parse(JSON.stringify(updatedClub))
}
catch(error) {
    console.log(error)
}
}

export const getClubs= async() => {
    try{
        await connectToDatabase()
        const clubs = await Club.find()
        console.log('Getting club server action rendered')
        return JSON.parse(JSON.stringify(clubs))
       
    }   
    catch(error)
    {
        throw new Error('Clubs not found')
       
    }
}
export const getClub = async(club_id:string) => {
    try{
       await connectToDatabase()
       const club = await Club.findById(club_id)
       
       return JSON.parse(JSON.stringify(club))
    }
    catch(error){
        throw new Error('Club not found')

    }
}

export const getPopulateClub = async(club_id :string) => {
    try{
        await connectToDatabase()
        const club = await Club.findById(club_id).populate("users")
        return JSON.parse(JSON.stringify(club))
    }
    catch(error){
        console.log(error)
    }
}
export const joinClub = async (club_id : string,user_id : string) => {
    try{
        await connectToDatabase()
        const club = await Club.findById(club_id)
        console.log(club)
        if(!club) {
            throw new Error('Club not found')
        }
           
        if(club.users.includes(user_id))
           {
            throw new Error('User already exists')
           }

        club.users.push(user_id)
        console.log(club.users)
        await club.save()
        
        console.log('Club Joined')
        return JSON.parse(JSON.stringify(club))
    }
    catch(error){
        console.log(error)
        
    }
}

