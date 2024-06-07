'use client'
import { Circles } from "react-loader-spinner"

const Loader = () => {

   
	return (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-screen h-screen z-10 bg-[rgba(0,0,0,0.2)]">
			<div className="z-50">
				<Circles 
					height={100}
					width={100}
					color="#F18423"
					ariaLabel="circles-loading"
					visible={true}
				/>
			</div>
		</div>
	)
}

export default Loader
