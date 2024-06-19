import FormComponent from "@/components/shared/ClubFormComponent"
import { auth } from "@clerk/nextjs/server"
import { getClub } from "@/lib/actions/club.action"
interface Params{
    id:string
}
const UpdateClub = async ({params} : {params:Params}) => {
    const { id } = params;
    const {sessionClaims} = auth()
     const userId = sessionClaims?.userId as string
    const data =  await getClub(id)
    return (
        <>
        <h1>Update Club</h1>
        <FormComponent userId={userId} type="Update" club={data} club_id={data._id}/>
        </>
    )
}
export default UpdateClub