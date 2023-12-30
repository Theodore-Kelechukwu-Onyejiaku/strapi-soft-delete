"use client"

import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { MdClear } from "react-icons/md";
import { serverURL } from "../utils/urls";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export interface IFormInputs {
    name: string,
    content: string
}

export default function AddArticleModal() {
    const [open, setOpen] = useState<boolean>(false);
    const [newArticle, setNewArticle] = useState<IFormInputs>({ name: "", content: "" })
    const [error, setError] = useState<string>("");

    const router = useRouter()

    const handleModal = () => {
        setOpen(prev => !prev);
        setNewArticle({ name: "", content: "" });
        setError("")
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError("")
        const { value, name } = e.target;
        setNewArticle((prev: IFormInputs) => ({ ...prev, [name]: value }))
    }

    const handleCreateArticle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, content } = newArticle;

        if (!name || !content) {
            setError("All fields are required!")
            return
        }

        try {
            const response = await fetch(`${serverURL}/articles`, {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ data: newArticle }),
                method: "POST",
            });

            const result = await response.json()
            if (result.data) {
                setOpen(false)
                setNewArticle({ name: "", content: "" })
                toast.success("Article created successfully!")
                router.refresh();
                return
            }
            const error = result.error;
            if (error.name === "ValidationError") {
                toast.error(`An article with the name "${newArticle.name}" already exists!`)
            } else {
                toast.error("Something went wrong")
            }
            setNewArticle({ name: "", content: "" })
        } catch (error: unknown) {
            if (error instanceof Error)
                setError(error?.message);
            setNewArticle({ name: "", content: "" })
        }
    }

    return (
        <div>
            <button onClick={handleModal} className=" py-4 px-5 w-28 border flex items-center justify-between shadow-lg bg-white hover:bg-secondary rounded-lg my-5 transition-all duration-500">
                <GoPlus size={24} />
                <span className="text-[14px] text-black1">New</span>
            </button>
            <div className={`${open ? " visible " : " invisible "} h-screen fixed left-0 w-screen top-0 flex flex-col justify-center items-center bg-black bg-opacity-90 z-50 transition-all `}>
                <div className="bg-white p-10 w-1/2 rounded-lg">
                    <form onSubmit={handleCreateArticle} className="w-full py-5 flex flex-col space-y-5">
                        <p className="text-center font-bold text-[20px]">Create an Article</p>
                        <p className="text-red-500 text-center text-sm">{error}</p>
                        <div>
                            <label>Name of Article</label>
                            <input onChange={handleInputChange} value={newArticle?.name} name="name" type="text" placeholder="Article Name" className="w-full border p-2 my-2 text-black2" />
                        </div>
                        <div>
                            <label>Content of Article</label>
                            <textarea onChange={handleInputChange} value={newArticle?.content} name="content" placeholder="Article Content" className="w-full border p-2 my-2 text-black1"></textarea>
                        </div>
                        <button type="submit" className="rounded-full hover:bg-secondary w-fit px-5 py-3 shadow-lg">Create Article</button>
                    </form>
                </div>
                <button onClick={handleModal} className="text-white absolute top-20 right-1/2">
                    <MdClear size={24} />
                </button>
            </div>
        </div>
    )
}
