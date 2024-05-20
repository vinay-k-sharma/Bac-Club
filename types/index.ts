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
export type GetClubsParams = {
    clubData : {
        title:string,
        description:string,
        thumbnail:string,
        category:string
    }
}
export type JoinClubParams = {
    club_id : string,
    user_id:string
}