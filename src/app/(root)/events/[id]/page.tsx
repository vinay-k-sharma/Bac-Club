import React from 'react'

interface Params {
    id: string;
  }

const page = ({params} : {params:Params}) => {
    const {id} = params
    console.log(id)
  return (
    <div>
      Event Details Page
    </div>
  )
}

export default page
