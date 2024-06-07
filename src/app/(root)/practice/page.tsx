import { getPopulateClub } from "@/lib/actions/club.action"
const page = async() => {
    const userId = '6645d5959b484f92c187ed0c'
   const data =  await getPopulateClub(userId)
   console.log(data)
  return (
    <div>
      Practicing Populate
    </div>
  )
}

export default page
