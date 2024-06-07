'use client'
import Image from 'next/image'
import { GetEventsParams } from '../../../types'
import { Button } from '../ui/button'
import {useRouter} from 'next/navigation'
const EventCard = ({eventData} : {eventData:GetEventsParams}) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/channel/${eventData._id}`)
  }
  return (
    <div>
      <h1 className='text-3xl'>{eventData.title}</h1>
      <Image src={eventData.thumbnail} height={500} width={500} alt={eventData.title} className="min-h-[20rem] max-h-[20rem] object-fill"/>
      <h1>{eventData.description}</h1>
      <Button onClick={handleClick}>Join Event</Button>
    </div>
  )
}

export default EventCard
