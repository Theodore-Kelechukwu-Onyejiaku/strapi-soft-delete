import Link from 'next/link'
import { CiBookmark } from "react-icons/ci";
import DeleteArticle from '../components/Buttons/DeleteArticle';
import { serverURL } from '../utils/urls';
import BackButton from '../components/Buttons/BackButton';

export interface IArticle {
    id: string,
    attributes: {
        name: string,
        deleted: boolean
    }
}

const getArticles = async () => {
    try {
        const response = await fetch(`${serverURL}/articles`, {
            method: "GET",
            cache: "no-cache"
        });

        return response.json();
    } catch (error) {
        return null
    }
}

export default async function page() {
    const result = await getArticles();
    const articles = result?.data

    return (
        <div className=''>
            <BackButton />
            <p className='text-lg font-bold my-7'>My Articles</p>
            <div className='flex w-full flex-col my-10 px-20 py-10   text-[14px]'>
                {articles?.length > 0 ? articles.map((article: IArticle) =>
                    <div key={article?.id} className='hover:bg-primary border-b p-5 flex items-center justify-between '>
                        <div className='flex items-center'>
                            <CiBookmark size={24} />
                            <Link href={`/articles/${article?.id}`} className='ml-3'>{article?.attributes?.name}</Link>
                        </div>
                        <DeleteArticle articleId={article.id} />
                    </div>)
                    : <p className='text-center text-[14px] text-red-500 bg-tertiary p-5'>No article available at the moment</p>
                }
            </div>
        </div>
    )
}
