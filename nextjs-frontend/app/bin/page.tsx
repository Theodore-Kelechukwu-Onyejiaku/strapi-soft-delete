import RecoverArticle from '../components/Buttons/RecoverArticle'
import BackButton from '../components/Buttons/BackButton';
import { serverURL } from '../utils/urls';
import PermanentDeleteArticle from '../components/Buttons/PermanentDeleteArticle';
import EmptyTrashButton from '../components/Buttons/EmptyTrashButton';

export interface IArticle {
    id: string,
    attributes: {
        name: string,
        deleted: boolean
    }
}


const getBin = async () => {
    try {
        const response = await fetch(`${serverURL}/articles/bin`, {
            method: "GET",
            cache: "no-cache"
        });

        return response.json();
    } catch (error) {
        return null
    }
}

export default async function page() {
    const result = await getBin();
    const articles = result?.data

    return (
        <div>
            <BackButton />
            <p className='text-lg font-bold my-7'>Welcome to Bin</p>
            <p className='p-5 bg-tertiary my-7 text-center font-thin'>
                Articles that have been in Bin more than 30 days will be automatically deleted.
                <EmptyTrashButton />
            </p>
            <div className='flex flex-col my-10 py-10   text-[14px]'>
                {
                    articles?.length > 0 ?
                        articles.map((article: IArticle) => <div key={article.id} className='hover:bg-primary border-b p-2 flex items-center justify-between '>
                            <div className='flex items-center'>
                                <span className='ml-3'>{article?.attributes?.name}</span>
                            </div>
                            <div className='flex'>
                                <PermanentDeleteArticle articleId={article?.id} />
                                <RecoverArticle articleId={article?.id} />
                            </div>
                        </div>)
                        : <p className='text-center text-[14px] text-red-500 bg-tertiary p-5'>No article in the bin at the moment!</p>
                }
            </div>
        </div>
    )
}
