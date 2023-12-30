"use client"

import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { serverURL } from "../../utils/urls";
import { useRouter } from "next/navigation";

export interface Props {
    articleId: string
}
export default function DeleteArticleButton({ articleId }: Props) {
    const router = useRouter()


    const handleSoftDeleteArticle = async () => {
        try {
            const response = await fetch(`${serverURL}/articles/${articleId}/soft-delete`, {
                method: "PUT",
            });
            const result = await response.json();

            if (result.data) {
                toast.success("Article Deleted!")
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
        <button onClick={handleSoftDeleteArticle} className="ml-3"><AiOutlineDelete size={24} color="red" /></button>
    )
}
