import { getClubs } from "@/lib/actions/club.action"
import Image from "next/image"
import Card from '@/components/shared/ClubCard'
import { GetClubsParams } from "../../../../types"

const  Clubs = async() => {

  const clubs = await getClubs()
  console.log('This component rendered')

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mx-auto w-fit overflow-hidden p-5 bg-gray-50 bg-dotted-pattern bg-contain ">
      {
        clubs?.map((club : GetClubsParams) => (
          <Card isOrganizer={false} key={club._id} clubData={club}/>
        ))
      }
    </div>
  )
}

export default Clubs
