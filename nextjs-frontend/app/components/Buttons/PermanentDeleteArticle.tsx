"use client"

import { useRouter } from "next/navigation";
import { serverURL } from "../../utils/urls";
import { toast } from "react-toastify";


export interface Props {
    articleId: string
}

export default function PermanentDeleteArticle({ articleId }: Props) {
    const router = useRouter();

    const handleDelParmanently = async () => {
        try {
            // /articles/:id/permanent-delete
            const response = await fetch(`${serverURL}/articles/${articleId}/permanent-delete`, {
                method: "DELETE",
            });
            const result = await response.json();

            if (result.data) {
                toast.success("Article Deleted Permanently")
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
        <button onClick={handleDelParmanently} className='border p-3 rounded-full w-40 hover:bg-red-500 shadow-lg hover:text-white'>Delete Permanently</button>
    )
}
