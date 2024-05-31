import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

function Comment({ owner, text, time, data, token, userId }) {
    const router = useRouter();
    const comment = async (e) => {
        e.preventDefault();
        if (token != null) {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/comment/${data?._id}`, {
                headers: {
                    token: token
                }
            }).then(async (res) => {

                router.replace(router.asPath)
            }).catch((res) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: res.data.err,
                })
            })
        } else {
            router.push('/login')
        }
    }
    var avatar = data?.commentedBy?.avatarImg;
    return (
        <>
            <div className={`flex flex-row w-full mt-2 space-x-3 max-w-xs justify-start `}>
                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={(avatar && avatar !== '') ? (process.env.NEXT_PUBLIC_BACKEND_URL + '/' + avatar) : '/boy.svg'} alt="" />
                <div className={``}>
                    <div className={` bg-white dark:bg-neutral-800 text-gray-800 p-2 rounded-l-lg rounded-br-lg   dark:text-white rounded-r-lg rounded-bl-lg '} `}>
                        <div className="flex flex-row items-center gap-4 justify-between">

                            {data?.commentedBy?.role == 'tutor' || data?.commentedBy?.role == 'media' ?
                                <Link href={data?.commentedBy?.role == 'media' ? `/media/${data?.commentedBy?.phone}` : data.commentedBy?.role == 'tutor' ? `/tutors/${data?.commentedBy?._id}` : ''} passHref>
                                    <a><p className="text-lg text-rose-600 font-bold break-all">{data?.commentedBy?.name}</p></a>
                                </Link> :
                                <p className="text-lg font-bold break-all">{data?.commentedBy?.name}</p>
                            }
                            {
                                owner == userId &&
                                <button
                                    onClick={e => { comment(e) }}
                                    className="h-8 w-8 flex justify-center items-center rounded-full text-red-500">
                                    <MdDelete className="h-5 " />
                                </button>
                            }
                        </div>
                        <pre className="text-md break-all font-sans ">{text}</pre>
                    </div>
                    <div style={{ 'fontSize': '8pt', }} className={` flex justify-between mb-1 text-gray-800/80 dark:text-gray-200/50`}>
                        <p>
                            {moment(time).fromNow()}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comment;