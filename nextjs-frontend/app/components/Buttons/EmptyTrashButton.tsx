"use client"

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { serverURL } from '../../utils/urls';

export default function EmptyTrashButton() {
    const router = useRouter();

    const handleEmptyTrash = async () => {
        try {
            const response = await fetch(`${serverURL}/articles/bin/empty`, {
                method: "DELETE",
            });
            const result = await response.json();

            if (result.data) {
                toast.success("Trash emptied successfully!")
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
        <button onClick={handleEmptyTrash} className='text-red-500 ml-5 underline'>Empty Trash</button>
    )
}
