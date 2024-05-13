import Link from "next/link"
import Image from "next/image"
const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center flex-between flex flex-col gap-4 text-center sm:flex-row max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
        <Link href='/'>
        <Image src='/assets/images/logo.jpg' alt="bac-image" width={38} height={38} />
        </Link>
        <p>
          2024 Bacancy. All rights resvered
        </p>
      </div>
    </footer>
  )
}

export default Footer
