"use client"

import { FaRecycle } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { serverURL } from '../../utils/urls';


export interface Props {
    articleId: string
}

export default function RecoverArticle({ articleId }: Props) {
    const router = useRouter();

    const handleRecoverArticle = async () => {
        try {
            const response = await fetch(`${serverURL}/articles/bin/${articleId}/recover`, {
                method: "PUT",
            });
            const result = await response.json();

            if (result.data) {
                toast.success("Article Recovered!")
                router.refresh();
            } else {
                toast.error("Something went wrong!")
            }

        } catch (error: unknown) {
            if (error instanceof Error)
                toast.error(error.message)
        }
    }
    return (
        <button onClick={handleRecoverArticle} className='ml-3 border p-3 rounded-full w-40 flex items-center justify-center hover:bg-secondary shadow-lg'><FaRecycle /><span className='ml-3'>Recover</span></button>
    )
}
