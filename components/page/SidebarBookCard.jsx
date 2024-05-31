import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

function SidebarBookCard({ data }) {
    const [img, setImg] = useState();
    const [pdf, setPdf] = useState();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    useEffect(() => {
        setName(data.title)
        setImg(data.img)
        setId(data._id)
        setPdf(data.pdf)
        return () => {
        };
    }, [data]);
    let cover;
    if (!img || img === "") {
        cover = `/cover.svg`
    } else {
        cover = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${img}`
    }
    const pdfUri = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${pdf}`
    return (
        <div className=" w-full my-1 bg-white dark:bg-neutral-800 transition-all duration-150 rounded-lg">
            <div className="flex w-full flex-wrap justify-between items-center">
                <Link href={`/books/${id}`}>
                    <div className="flex flex-row">
                        <div>
                            <a className="group w-14 h-14 block bg-gray-100 rounded-lg cursor-pointer overflow-hidden relative">
                                <img src={cover} loading="lazy" alt="Photo by Jessica Radanavong" className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-200" />
                            </a>
                        </div>
                        <p className="inline-block text-gray-800 dark:text-gray-200 text-md ml-2 cursor-pointer font-semibold transition duration-100 mb-1">{name}</p>
                    </div>
                </Link>
                <Link href={pdfUri} >
                    <a target="_blank" className="flex  h-full">
                        <p className="border border-gray-700 dark:border-gray-200 rounded-lg px-2 py-1 hover:border-rose-600 hover:text-rose-600 cursor-pointer text-gray-800 dark:text-gray-200 text-md  font-semibold">Download</p>
                    </a>
                </Link>
            </div>
        </div>
    );
}



export default SidebarBookCard;