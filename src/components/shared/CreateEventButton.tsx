'use client'
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

type ClubIdProps = {
    club_id: string
}

const CreateEventButton = ({club_id}:ClubIdProps ) => {
    const router = useRouter()
  return (
    <>
    <Button onClick={() => {
        router.push(`/create-event?club_id=${club_id}`)
      }} >Create Event</Button>
    </>
  )
}
export default CreateEventButton
