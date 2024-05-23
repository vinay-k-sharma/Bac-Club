'use client'
import Image from "next/image"
import { GetClubsParams } from "../../../types"
import Link from "next/link"
import { useState } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

const Card = ({ clubData,isOrganizer }: { clubData: GetClubsParams,isOrganizer:boolean }) =>{
    const router = useRouter()
    const [showDescription,setShowDescription] = useState(false)
    const toggleDescription = () => {
        setShowDescription(!showDescription)
    }
 
return  (
    <div>
        
        <Link href={`/clubs/${clubData._id}`}>
        <h1 className="text-3xl">{clubData.title}</h1>
        <Image src={clubData.thumbnail} height={500} width={500} alt={clubData.title} />
        </Link>
        <span className="text-2xl text-center ">{clubData.category}</span>
        <p className={` font-normal text-gray-800  ${
              showDescription ? "" : "truncate"
            }`}>{clubData.description}</p>
        { showDescription ? ( <button onClick={toggleDescription} className='text-blue-600'>Read Less</button>) : 
        ( <button onClick={toggleDescription} className=" text-clip text-nowrap text-blue-600">Read More</button>)
        }
        {
            isOrganizer ? (
                <Button className="mx-5 mt-2 rounded-2xl" onClick={() => router.push(`/your-clubs/${clubData._id}`)}>Update Club</Button>
            ) : (null)
        }
    </div>
)
}
export default Card