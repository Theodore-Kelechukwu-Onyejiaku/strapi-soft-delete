import BackButton from "@/app/components/Buttons/BackButton";
import { serverURL } from "@/app/utils/urls"

export interface Props {
    params: { id: string }
}

const getArticle = async (id: string) => {
    try {
        const response = await fetch(`${serverURL}/articles/${id}`, {
            cache: "no-cache"
        })
        return response.json();
    } catch (error) {
        console.error(error)
    }
}

export default async function page({ params }: Props) {
    const { id } = params;
    const { data: article } = await getArticle(id)
    return (
        <div>
            <BackButton />
            {
                article ?
                    <div>
                        <p className="text-[20px] font-bold my-7">{article?.attributes?.name}</p>
                        <p className="w-3/4">{article?.attributes?.content}</p>
                    </div>
                    :
                    <p className="text-red-500 text-center h-screen flex flex-col justify-center items-center">Article does not exist</p>

            }

        </div>
    )
}
