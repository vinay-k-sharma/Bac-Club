export type CreateUserParams = {
    clerkId: string
    firstName:string
    lastName:string
    username:string
    email:string
    photo:string
}

export type UpdateUserParams = {
    firstName:string
    lastName:string
    username:string
    photo:string
}

export type CreateClubParams = {
    userId: string,
    clubData : {
        title: string,
        description: string,
        thumbnail:string,
        category:string,
    }
    path:string
}
export type CreateEventParams = {
    title:string,
    description:string,
    thumbnail:string
}
export type UpdateClubParams = {
    userId: string,
    club : {
        title: string,
        description: string,
        thumbnail:string,
        category:string,
        _id:string
    }
    path:string
}
export type GetClubsParams = {
   
        title:string,
        description:string,
        thumbnail:string,
        category:string,
        _id:string,
        organizer:string,
        users? : string[]
}

export type GetEventsParams = {
        _id:string,
        title:string,
        description:string,
        thumbnail:string,
        images?:string[],
        startDate?:string,
        endDate?:string
}


export type JoinClubParams = {
    club_id : string,
    user_id:string
}

export type GetMembersParams  = {
    firstName:string,
    lastName:string,

}