import React from 'react'
import { IoMenu } from "react-icons/io5";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image';
import { Separator } from "@/components/ui/separator"
import Navitems from './Navitems';


  
const Mobilenav = () => {
  return (
    <nav className='md:hidden'>
        <Sheet>
  <SheetTrigger className='align-middle'>
    <IoMenu className='text-2xl'/>
  </SheetTrigger>
  <SheetContent className='flex flex-col gap-6 bg-white md:hidden'>
  <Image src='/assets/images/logo.jpg' alt="bac-image" width={38} height={38} />
  <Separator className='border border-gray-300' />
  <Navitems/>
  </SheetContent>
</Sheet>

    </nav>
  )
}

export default Mobilenav
