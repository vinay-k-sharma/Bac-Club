
import { FlipWords } from "@/components/ui/flip-words";
import LampComponent from "@/components/shared/LampComponent";
import { words } from "../../../constants/constants";
import Card from "@/components/shared/Card";
import { getClubs } from "@/lib/actions/club.action";
import { GetClubsParams } from "../../../types";
const Home = async () => {

   const clubs = await getClubs()
  
  return (
    <>
     
    <LampComponent />
        <section>
        <div className="h-[20rem] flex justify-center items-center px-4 bg-gray-200 bg-dotted-pattern bg-contain">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400  ">
        With Bac-Club
        <FlipWords words={words} /> {" "}
        with ease
      </div>
    </div>
      </section>

      <section className="mt-6  ">
        <h1 className="flex justify-center text-4xl tracking-tight mb-4 ">Bacancy Clubs</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mx-auto w-fit overflow-hidden p-5 bg-gray-50 bg-dotted-pattern bg-contain ">
      {
        clubs?.map((club : GetClubsParams) => (
          <Card isOrganizer={false} key={club._id} clubData={club}/>
        ))
      }
    </div>
      </section>

      <section className="mt-6">
        <h1 className="flex justify-center  text-4xl tracking-tight mb-4">Bacancy Communities</h1>
      </section>
    </>
  )
}

export default Home
