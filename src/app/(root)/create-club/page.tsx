import FormComponent from "@/components/shared/FormComponent"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


const CreateClub = () => {
    const {sessionClaims} = auth()
    const userId = sessionClaims?.userId as string
    


    // If the user does not have the admin role, redirect them to the home page
    // if (sessionClaims?.role !== "admin") {
    //   redirect("/");
    // }
  return (
    <div>
        <h1>Create Club</h1>
      <FormComponent userId={userId} type="Create"/>
    </div>
  )
}

export default CreateClub
