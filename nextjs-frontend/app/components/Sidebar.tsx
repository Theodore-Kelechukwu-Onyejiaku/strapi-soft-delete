import Link from "next/link";
import { TfiWrite } from "react-icons/tfi";
import { SiAppwrite } from "react-icons/si";
import { FiTrash2 } from "react-icons/fi";
import AddArticleModal from "./AddArticleModal";
import { serverURL } from "../utils/urls";

const getArticles = async () => {
    try {
        const response = await fetch(`${serverURL}/articles`, {
            method: "GET",
            cache: "no-cache"
        });
        return response.json();
    } catch (error) {
        console.log(error)
    }
}

export default async function Sidebar() {
    const result = await getArticles();
    const noOfArticles = result?.data?.length

    return (
        <div className=' font-poppins font-thin '>
            <div className="fixed top-0 z-[30] h-full visible  sm:w-[287px] bg-primary p-5">
                <Link href="/" className='flex'>
                    <TfiWrite size={40} />
                    <span className="text-[22px] ml-3 font-poppins">Article System</span>
                </Link>

                <AddArticleModal />
                <div className="flex flex-col space-y-3 text-black2 text-[14px]">
                    <Link href="/articles" className="hover:bg-secondary px-5 py-1 rounded-full flex items-center">
                        <SiAppwrite size={24} />
                        <span className="ml-3">My Articles</span>
                    </Link>
                    <Link href="/bin" className="hover:bg-secondary px-5 py-1 rounded-full flex items-center ">
                        <FiTrash2 size={24} />
                        <span className="ml-3">Trash</span>
                    </Link>

                </div>
                <div className="">
                    <div className="mt-20 w-fit border border-black rounded-full px-5 py-1">
                        <span className="text-blue-500 text-[14px] font-extrabold">Total Articles ({noOfArticles || 0})</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
