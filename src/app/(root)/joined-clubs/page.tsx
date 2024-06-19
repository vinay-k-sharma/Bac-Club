import { getClubs } from "@/lib/actions/club.action"
import { GetClubsParams } from "../../../../types"
import { auth } from "@clerk/nextjs/server"
import Card from "@/components/shared/ClubCard"
const JoinedCLubs = async() => {
    const {sessionClaims} = auth()
    const userId = sessionClaims?.userId as string
    const clubs = await getClubs()
  const joinedClubs = () => {
    return clubs.filter((club:GetClubsParams) => (
        club.users?.includes(userId)
    ))
  }
    const clubData = joinedClubs()
 
    return (
        <>
       <h1 className="flex justify-center  text-3xl tracking-tight mt-4 mb-4">Joined Clubs</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mx-auto w-fit overflow-hidden p-5 bg-gray-50 bg-dotted-pattern bg-contain ">
      {
        clubData?.map((club : GetClubsParams) => (
          <Card isOrganizer={false} key={club._id} clubData={club}/>
        ))
      }
    </div>
        </>
    )
}
export default JoinedCLubs