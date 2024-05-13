import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import Navitems from "./Navitems"
import Mobilenav from "./Mobilenav"

const Header = () => {
  
  return (
    <header className="w-full border-b">
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex items-center justify-between">
        <Link href='/' className="w-36">
          <Image src='/assets/images/logo.jpg' alt="bac-image" width={38} height={38} />
        </Link>
        <SignedIn>
        <nav className="hidden md:flex md:flex-between w-full max-w-xs">
            <Navitems/>
          </nav>
        </SignedIn>
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/"/>
            <Mobilenav/>
          </SignedIn>
            <SignedOut>
              <Button asChild className="rounded-full" size='lg'>
                <Link href='sign-in'>Login</Link>
              </Button>
            </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header
