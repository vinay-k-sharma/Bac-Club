// import FormComponent from "@/components/shared/FormComponent"
import { auth } from "@clerk/nextjs/server"

import JoinClubButton from "@/components/shared/JoinClubButton";
import { Button } from "@/components/ui/button";
import { getClub } from "@/lib/actions/club.action";
import Image from "next/image";


// const CreateClub = () => {
//     
//   return (
//     <div>
//         <h1>Update Club</h1>
//       <FormComponent userId={userId} type="Update"/>
//     </div>
//   )
// }

// export default CreateClub
interface Params {
  id: string;
}

const ClubDetailPage = async ({ params }: { params: Params }) => {
  const { id } = params;
   const {sessionClaims} = auth()
    const userId = sessionClaims?.userId as string
   const data =  await getClub(id)


  return (
<>
      {
        <div>
          <h1>{data.title }</h1>
          <div>{data.description}</div>
          <Image src={data.thumbnail} alt={data.title} height={500} width={500}/>
          <p>{data.category}</p>
          <p>Hello {data._id}</p>
          {/* <Button onClick={handleClick}>Join Club</Button> */}
          <JoinClubButton club_id = {data._id} user_id = {userId} />
          </div>
      }
</>
  )
}

export default ClubDetailPage

