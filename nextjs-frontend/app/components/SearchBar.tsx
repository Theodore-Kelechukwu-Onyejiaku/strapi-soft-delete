"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaCircleInfo, FaRecycle } from 'react-icons/fa6'
import { GoSearch } from 'react-icons/go'
import { MdClear } from 'react-icons/md'
import { serverURL } from '../utils/urls'

export interface IArticle {
    id: string,
    attributes: {
        name: string,
    }
}
export default function SearchBar() {
    const [keyword, setKeyword] = useState<string>("");
    const [articles, setArticles] = useState<IArticle[]>([])
    const [error, setError] = useState<string>("")

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await fetch(`${serverURL}/articles`, {
                    method: "GET",
                });
                const { data } = await response.json();
                setArticles(data)
            } catch (error: unknown) {
                if (error instanceof Error)
                    setError(error.message)
            }
        }
        getArticles();
    }, [])

    return (
        <div className='relative'>
            <div className='flex items-center justify-between space-x-10'>
                <div className='w-3/4 relative'>
                    <div className='input-container focus-within:bg-white focus-within:shadow-lg bg-primary w-full flex items-center rounded-full px-5 h-14'>
                        <GoSearch size={24} />
                        <input onChange={handleSearch} value={keyword} type='text' placeholder='Search' className='ml-3 bg-transparent outline-none border-none w-full capitalize' />
                        <button onClick={() => { setKeyword("") }}><MdClear size={24} /></button>
                    </div>
                    {
                        keyword ?
                            <div className=" rounded-b-xl   h-[250px] shadow-lg bg-white pb-20 absolute z-50 w-full">
                                <div className="py-3 bg-white  overflow-y-scroll  absolute w-full  h-[200px] p-5">
                                    {
                                        error
                                            ? (
                                                <div className="text-red-500 flex items-center justify-center shadow-2xl p-3 rounded-md">
                                                    <FaCircleInfo size={30} />
                                                    <span className="ml-2">{error}</span>
                                                </div>
                                            )
                                            :
                                            <div>
                                                {articles.find((article) => article.attributes.name.toLowerCase().includes(keyword.trim().toLowerCase())) ? null
                                                    : (
                                                        <div className="text-center p-20">
                                                            <p className="text-red-500">No article found!</p>
                                                        </div>
                                                    )}
                                                {
                                                    keyword && articles
                                                        .filter((article) => {
                                                            if (keyword.trim() === '') {
                                                                return article;
                                                            }
                                                            if (article?.attributes?.name?.toLowerCase().includes(keyword.trim().toLowerCase())) {
                                                                return article;
                                                            }
                                                            return null;
                                                        })
                                                        .map((article) => (
                                                            <Link href={`/articles/${article.id}`} key={article.id} className="p-5 bg-primary hover:bg-secondary inset-1 flex items-center justify-betwee  py-2 px-3 w-full ">
                                                                {article?.attributes?.name}
                                                            </Link>
                                                        ))}
                                            </div>
                                    }
                                </div>
                            </div>
                            : null
                    }

                </div>

                <div className='w-1/4 flex justify-end'>
                    <Link href="/bin" className='flex'>
                        <FaRecycle size={24} />
                        <span className='ml-3'>Recycle Bin</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
