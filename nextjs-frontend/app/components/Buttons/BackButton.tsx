"use client"

import { useRouter } from 'next/navigation'
import { RiArrowGoBackFill } from "react-icons/ri";
export default function BackButton() {
    const router = useRouter();
    const handleBack = () => {
        router.back()
    }
    return (
        <button onClick={handleBack} className='text-black1 hover:bg-primary px-5 my-3 py-2 bg-white  shadow-md primary-button-curved w-fit flex items-center text-lg'>
            <span className=''>
                <RiArrowGoBackFill />
            </span>
            <span className='ml-1 font-barlow text-[14px]'>Go Back</span>
        </button>
    )
}
