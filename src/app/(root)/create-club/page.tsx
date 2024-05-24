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
        <h1 className="flex justify-center text-4xl  mb-3 bg-gray-100 bg-dotted-pattern bg-cover bg-center p-5">Create Club</h1>
        <div className="flex justify-center mt-5 ">
      <FormComponent userId={userId} type="Create"/>
      </div>
    </div>
  )
}

export default CreateClub
