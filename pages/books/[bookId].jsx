import head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { useEffect, useState } from "react";
import BookSidebar from "../../components/page/BookSidebar";

function Book({ data }) {
    const router = useRouter();

    const [content, setContent] = useState();
    const [img, setImg] = useState();
    const [id, setId] = useState('');
    const [pdf, setPdf] = useState('');
    const [name, setName] = useState('');
    const [bookData, setBookData] = useState(null);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        console.log(data.book)
        if (data.book == null) {
            router.push('/404')
        } else {
            setName(data.book.title)
            setImg(data.book.img)
            setId(data.book._id)
            setPdf(data.book.pdf)
            setContent(data.book.desc)
            setBookData(data.book)
            setUserData(data.user)
        }
    }, []);
    let cover;
    if (!img || img === "") {
        cover = `/cover.svg`
    } else {
        cover = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`
    }
    return (
        <div className='flex '>
            <head>
                <title>TuitionApp - {name}</title>
            </head>
            <div className="h-full justify-center w-full lg:mb-8 md:mb-6 sm:mb-4 mb-2">
                <div className="max-w-screen-xl px-4  md:px-8 mx-auto">
                    <div className="text-gray-800 dark:text-gray-200">
                        <div className=" justify-center overflow-hidden relative mb-6 md:mb-8">
                            <div className="max-w-screen-lg">
                                <div className="bg-gray-100 aspect-video  overflow-hidden rounded-lg shadow-lg relative mb-6 md:mb-8">
                                    <img src={cover} loading="lazy" alt={name} className="w-full h-full object-cover object-center" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-2xl md:text-3xl font-semibold mb-4" >{name}</p>
                                    </div>
                                    <div className="flex justify-end ">
                                        {(pdf !== "") ?
                                            <Link href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${pdf}`}>
                                                <a target='_blank' className="inline-block bg-rose-600 hover:bg-rose-700 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2">Download PDF</a>
                                            </Link> : ''
                                        }
                                    </div>
                                </div>
                            </div>

                            <div dangerouslySetInnerHTML={{ __html: content }} className="max-w-screen-lg px-4 overflow-hidden break-words break-all md:px-8 mx-auto">
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
}

export async function getServerSideProps(ctx) {
    const token = parseCookies(ctx).authToken || null

    const res = await fetch(`${process.env.API_URL}/book/${ctx.query.bookId}`)
    const book = await res.json()

    return {
        props: {
            data: book,
            token: token
        },
    };

}

export default Book;