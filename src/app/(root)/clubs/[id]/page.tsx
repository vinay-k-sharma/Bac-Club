// import FormComponent from "@/components/shared/FormComponent"
import { auth } from "@clerk/nextjs/server";
import axios from 'axios'
import JoinClubButton from "@/components/shared/JoinClubButton";
import { Button } from "@/components/ui/button";
import { getClub } from "@/lib/actions/club.action";
import { getUserById } from "@/lib/actions/user.actions";
import Image from "next/image";
import { GetEventsParams, GetMembersParams } from "../../../../../types";
import EventCard from "@/components/shared/EventCard";
import CreateEventButton from "@/components/shared/CreateEventButton";
import { getEventById } from "@/lib/actions/event.action";


interface Params {
  id: string;
}

const ClubDetailPage = async ({ params }: { params: Params }) => {
  const { id } = params;
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const data = await getClub(id);
  
  const getEvents = async () => {
    return await Promise.all(
      data.events.map(async(event_id:string) => {
        const eventData = await getEventById(event_id)
        return eventData
      })
    )
  }


  const getMembersName = async () => {
    return await Promise.all(
      data.users.map(async (user: string) => {
        const userData = await getUserById(user);

        return userData;
      })
    );
  };



  const membersName = await getMembersName();
  const events = await getEvents()

  
  const isAdmin = () => {
    if (data.organizer === userId) {
      return true;
    } else {
      return false;
    }
  };


  return (
    <>
      {
        <div>
          <h1>{data.title}</h1>
          <div>{data.description}</div>
          <Image
            src={data.thumbnail}
            alt={data.title}
            height={500}
            width={500}
          />
          <p>{data.category}</p>
          <p>Hello {data._id}</p>
          {/* <Button onClick={handleClick}>Join Club</Button> */}
          <JoinClubButton club_id={data._id} user_id={userId} />
        </div>
      }
      <section>
        <h1 className="flex justify-center text-2xl">Members</h1>
        {membersName.map((member: GetMembersParams) => (
          <div key={member.firstName}>
            <h1>
              {member.firstName} {member.lastName}
            </h1>
          </div>
        ))}
      </section>
      <section>
        <h1 className="flex justify-center text-2xl">Events</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mx-auto w-fit overflow-hidden p-5 bg-gray-50 bg-dotted-pattern bg-contain ">
      {
        events?.map((event : GetEventsParams) => (
          <EventCard  key={event._id} eventData={event}/>
        ))
      } 
    </div>
      </section>
      <div className="flex justify-center"> <CreateEventButton club_id={data._id}/></div>
    
    </>
  );
};

export default ClubDetailPage;
