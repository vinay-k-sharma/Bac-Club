'use client'
import { useToast } from "@/components/ui/use-toast"

import { joinClub } from "@/lib/actions/club.action"
import { Button } from "../ui/button"
import { toast } from "sonner"



type HandleJoinParams = {
  club_id: string,
  user_id:string  
}


const JoinClubButton = ({club_id,user_id} : HandleJoinParams) => {
  
  const { toast } = useToast()
  
    const handleJoin = async() => {
        const joinedData = await joinClub(club_id,user_id)
        if(joinedData){
        toast({
          description: "Successfully joined club",
        })
      }
      else{
        toast({
          description:"Already in the club !"
        })
      }
    }
  return (
    
        <Button  onClick={handleJoin}>Join Club</Button>
  )
}

export default JoinClubButton
