import Link from 'next/link';
import { CiBookmark } from "react-icons/ci";
import DeleteArticle from './components/Buttons/DeleteArticle';
import { serverURL } from './utils/urls';
import SearchBar from './components/SearchBar';

export interface IArticle {
  id: string,
  attributes: {
    name: string,
    content: string,
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
    console.error(error)
  }
}
export default async function Home() {
  const result = await getArticles();
  const articles = result?.data

  return (
    <div>
      <SearchBar />
      <div className='grid grid-cols-3 gap-y-10 my-10 mx-5 pb-20 relative'>
        {
          articles?.length > 0 ? articles.map((article: IArticle) => <div key={article?.id} className=' w-[270px] h-[250px] bg-primary shadow overflow-hidden px-1 pb-12 rounded-lg border-none hover:border hover:border-secondary hover:bg-tertiary'>
            <div className='flex items-center justify-between h-[30px] px-3 py-5'>
              <CiBookmark size={24} />
              <div className='flex justify-end items-center'>
                <span className='text-[14px] font-bold'>{article?.attributes?.name.length <= 20 ? article?.attributes?.name : article?.attributes?.name?.slice(0, 20) + "..."}</span>
                <DeleteArticle articleId={article?.id} />
              </div>
            </div>
            <Link href={`/articles/${article?.id}`} className='h-[90%] rounded-lg px-10 bg-white flex flex-col justify-center space-y-3 text-[5px] border'>
              <span className='font-bold text-[7px]'>{article?.attributes?.name}</span>
              <span> {article?.attributes?.content}</span>
            </Link>
          </div>)
            :
            <p className='text-center col-span-3 text-[14px] text-red-500 bg-tertiary p-5 w-full'>No article available at the moment</p>
        }
      </div>
    </div>
  )
}
