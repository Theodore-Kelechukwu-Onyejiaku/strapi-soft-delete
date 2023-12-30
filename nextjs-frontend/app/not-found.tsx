import Link from 'next/link'
import { VscHome } from "react-icons/vsc";

export default function NotFound() {
    return (
        <div className='h-screen flex flex-col space-y-5 justify-center items-center'>
            <span className=' text-9xl font-bold'>404</span>
            <p className='text-[14px]'>There is nothing here!</p>
            <Link href="/" className='flex items-center border py-3 px-5 rounded-full hover:bg-primary shadow-lg'>
                <VscHome size={24} />
                <span className='ml-2'>Go Home</span>
            </Link>
        </div>
    )
}
