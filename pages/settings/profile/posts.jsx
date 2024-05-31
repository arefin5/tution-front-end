import React from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { BiBookReader, BiEdit, BiTrash } from 'react-icons/bi';
import axios from 'axios';
import { BsCalendarWeek } from 'react-icons/bs';
import { HiOutlineCurrencyBangladeshi } from 'react-icons/hi';
import { MdOutlineLocationOn } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { ImNewTab } from 'react-icons/im';
import Swal from 'sweetalert2';

const Posts = ({ userData, token }) => {
    const ApiServer = process.env.NEXT_PUBLIC_API_URL
    const ServerRoot = process.env.NEXT_PUBLIC_BACKEND_URL
    const router = useRouter();
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        if (!token || token == null) {
            router.push('/login')
        } else {
            if (userData) {
                setPosts(userData.user.posts)

            } else {
                router.push('/login')

            }
        }
        return () => {
        };

    }, []);


    const update = async (id) => {
        try {
            await fetch(`${ApiServer}/my-profile`, {
                headers: {
                    'token': token,
                }
            }).then((res) => res.json())
                .then((data) => {
                    setPosts(data.user.posts)
                })
                .catch((err) => {
                })
        } catch (err) {
        }

    }
    //---------delet post handler
    const deletePost = (i) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will not be able to undo it",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6366f1',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${ApiServer}/posts/${i}`, {
                    headers: {
                        'token': token,
                    }
                }).then(res => {
                    update(i);
                    Swal.fire({
                        title: 'Success',
                        text: "Post has been deleted",
                        icon: 'success',
                        confirmButtonColor: '#6366f1',
                        confirmButtonText: 'Ok',
                        timer: 1500
                    })
                })
            }
        })
    }

    console.clear();
    return (
        <div className='flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col '>
            <head>
                <title>TuitionApp - Favourite posts</title>
            </head>
            <div className="2xl:basis-9/12 xl:basis-9/12 lg:basis-9/12 md:basis-full sm:basis-full basis-full h-full lg:mb-8 md:mb-6 sm:mb-4 mb-2">
                <div className="max-w-screen-xl px-4  md:px-8 mx-auto">
                    <div className="flex justify-between items-center gap-4 mb-6">
                        <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold">My posts</h2>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 lg:gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 lg:gap-4">
                            {posts.map((post, index) => (
                                <div key={index} className=" w-11/12 px-8 py-4 mx-auto mt-4 bg-white dark:bg-neutral-800 shadow-lg rounded-lg">
                                    <p className="mt-2 m-6 text-lg font-semibold text-gray-800 dark:text-gray-200 md:mt-0 md:text-xl">{post?.desc}</p>
                                    <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-8 m-6 mb-10">

                                        <div className="text-gray-800 dark:text-gray-200 group flex gap-4">
                                            <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-rose-600 group-hover:bg-rose-700 group-active:bg-rose-700 text-white rounded-lg shadow-lg transition duration-100">
                                                <SiGoogleclassroom className='w-6 h-6' />
                                            </div>
                                            <div>
                                                <div className="font-semibold mb-1">Class</div>
                                                <p className="text-sm text-gray-800 dark:text-gray-400">{post?.class}</p>
                                            </div>
                                        </div>
                                        <div className="text-gray-800 dark:text-gray-200 group flex gap-4">
                                            <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-rose-600 group-hover:bg-rose-700 group-active:bg-rose-700 text-white rounded-lg shadow-lg transition duration-100">
                                                <BsCalendarWeek className='w-6 h-6' />
                                            </div>
                                            <div>
                                                <div className="font-semibold mb-1">Days/Week</div>
                                                <p className="text-sm text-gray-800 dark:text-gray-400">{post?.days}</p>
                                            </div>
                                        </div>
                                        <div className="text-gray-800 dark:text-gray-200 group flex gap-4">
                                            <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-rose-600 group-hover:bg-rose-700 group-active:bg-rose-700 text-white rounded-lg shadow-lg transition duration-100">
                                                <BiBookReader className='w-6 h-6' />
                                            </div>
                                            <div>
                                                <div className="font-semibold mb-1">Tution Subjects</div>
                                                <p className="text-sm text-gray-800 dark:text-gray-400">{post?.subjects}</p>
                                            </div>
                                        </div>
                                        <div className="text-gray-800 dark:text-gray-200 group flex gap-4">
                                            <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-rose-600 group-hover:bg-rose-700 group-active:bg-rose-700 text-white rounded-lg shadow-lg transition duration-100">
                                                <MdOutlineLocationOn className='w-6 h-6' />
                                            </div>
                                            <div>
                                                <div className="font-semibold mb-1">Location</div>
                                                <p className="text-sm text-gray-800 dark:text-gray-400">{post?.area + ', ' + post?.district + ', ' + post?.division}</p>
                                            </div>
                                        </div>
                                        <div className="text-gray-800 dark:text-gray-200 group flex gap-4">
                                            <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-rose-600 group-hover:bg-rose-700 group-active:bg-rose-700 text-white rounded-lg shadow-lg transition duration-100">
                                                <HiOutlineCurrencyBangladeshi className='w-6 h-6' />
                                            </div>
                                            <div>
                                                <div className="font-semibold mb-1">Salary</div>
                                                <p className="text-sm text-gray-800 dark:text-gray-400">{post?.salary}</p>
                                            </div>
                                        </div>
                                        <div className=" flex gap-4">
                                            {
                                                post.type === 'media' &&
                                                <Link href={`/media/post/${post?._id}`} passHref>
                                                    <a className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-rose-600 hover:bg-rose-700 active:bg-rose-700 text-white rounded-lg shadow-lg transition duration-100">
                                                        <ImNewTab className='w-6 h-6' />
                                                    </a>
                                                </Link>
                                            }
                                            <Link href={`/posts/edit/${post?._id}`} passHref>
                                                <a className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700 text-white rounded-lg shadow-lg transition duration-100">
                                                    <BiEdit className='w-6 h-6' />
                                                </a>
                                            </Link>

                                            <button onClick={() => deletePost(post?._id)} className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg shadow-lg transition duration-100">
                                                <BiTrash className='w-6 h-6' />
                                            </button>


                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export async function getServerSideProps(ctx) {
    let token = parseCookies(ctx).authToken || null;
    if (token) {
        const res = await fetch(`${process.env.API_URL}/my-profile`, {
            headers: {
                token: token
            }
        })
        const user = await res.json()
        return {
            props: {
                userData: user.user ? user : null,
                token: token
            },
        };
    } else {
        return {
            props: {
                userData: null,
                token: null
            },
        };
    }
}
export default Posts;
