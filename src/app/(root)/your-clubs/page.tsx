import { getClubs } from '@/lib/actions/club.action'
import { auth } from '@clerk/nextjs/server'
import { GetClubsParams } from '../../../../types'
import Card from '@/components/shared/Card'
// import { CardBody,CardContainer,CardItem } from '@/components/ui/3d-card'
const page = async () => {
    const {sessionClaims} = auth()
    const userId = sessionClaims?.userId as string
  
    const clubs = await getClubs()
    
    const getClubCreatorClubs = () => {
      return clubs.filter((club : GetClubsParams) => {
      return  club.organizer === userId
      })
    }
    const organizerClubs =  getClubCreatorClubs()

  return (
    <div>
      Your Clubs
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mx-auto w-fit overflow-hidden p-5 bg-gray-50 bg-dotted-pattern bg-contain ">
      {
        organizerClubs.map((club : GetClubsParams) => (
          <Card key={club._id} clubData={club} isOrganizer={true}/>
        ))
      }
      </div>
    </div>
  )
}

export default page
