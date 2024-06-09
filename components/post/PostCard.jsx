
// import axios from 'axios'
// import moment from 'moment'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import React from 'react'
// import { BiBookReader, BiGlobe } from 'react-icons/bi'
// import { BsCalendarWeek, BsGenderAmbiguous } from 'react-icons/bs'
// import { HiOutlineCurrencyBangladeshi } from 'react-icons/hi'
// import { MdOutlineLocationOn } from 'react-icons/md'
// import { SiGoogleclassroom } from 'react-icons/si'
// import Swal from 'sweetalert2'

// function PostCard({ days, desc, division, district, area, gender, liked, lang, subjects, fees, _id, cls, token, type, negotiable, isLast, createdAt }) {
//     const router = useRouter();
//     const like = async (e) => {
//         e.preventDefault();
//         if (token) {
//             await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/like/${_id}`, { likedId: _id }, {
//                 headers: {
//                     token: token
//                 }
//             }).then(async (res) => {
//                 if (router.pathname == '/followings/posts') {
//                     router.push(`/followings/posts?page=1&search`)
//                 } else { }
//                 Swal.fire({
//                     icon: 'success',
//                     title: res.data.type,
//                     text: res.data.msg,
//                     timer: 1500
//                 })
//             }).catch((res) => {

//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error...',
//                     text: res.data.msg,
//                 })
//             })
//         } else {
//             router.push('/')
//         }
//     }
//     const tempLoc = division + district + area + ' ';
//     const loc = tempLoc.split(' ').join('') == '' ? 'All over Bangladesh' : `${area && area + ', '}${district && district + ', '}${division && division + ''}`;

//     return (
//         <>

//             <Link href={type == 'media' ? `/media/post/${_id}` : `/posts/${_id}`} passHref>
//                 <a className={`${isLast ? '' : ''}`} >
//                     <div className={` ${type == 'user' ? `ring-green-500 ring-2` : `ring-rose-600 ring-2`} relative hidden md:block w-full p-2 mx-auto mt-2 ${isLast ? 'bg-gradient-to-b from-white dark:from-neutral-800' : 'bg-white dark:bg-neutral-800'}  rounded-lg`}>
//                         <div className=' m-6'>
//                             <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 md:mt-0 md:text-xl">{desc}</p>
//                         </div>

//                         <div className="relative  grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-8 m-6 mb-10">
//                             <div className="text-gray-800 dark:text-gray-200 group flex gap-2">
//                                 <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
//                                     <SiGoogleclassroom className='w-6 h-6' />
//                                 </div>
//                                 <div>
//                                     <div className="font-semibold mb-1">Class</div>
//                                     <p className="text-sm text-gray-800 dark:text-gray-400">{cls}</p>
//                                 </div>
//                             </div>
//                             <div className="text-gray-800 dark:text-gray-200 group flex gap-2">
//                                 <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
//                                     <BsCalendarWeek className='w-6 h-6' />
//                                 </div>
//                                 <div>
//                                     <div className="font-semibold mb-1">Days/Week</div>
//                                     <p className="text-sm text-gray-800 dark:text-gray-400">{days}</p>
//                                 </div>
//                             </div>
//                             <div className="text-gray-800 dark:text-gray-200 group flex gap-2">
//                                 <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
//                                     <BiBookReader className='w-6 h-6' />
//                                 </div>
//                                 <div>
//                                     <div className="font-semibold mb-1">Tution Subjects</div>
//                                     <p className="text-sm text-gray-800 dark:text-gray-400">{subjects}</p>
//                                 </div>
//                             </div>
//                             <div className="text-gray-800 dark:text-gray-200 group flex gap-2">
//                                 <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
//                                     <MdOutlineLocationOn className='w-6 h-6' />
//                                 </div>
//                                 <div>
//                                     <div className="font-semibold mb-1">Location</div>
//                                     <p className="text-sm text-gray-800 dark:text-gray-400">{loc}</p>
//                                 </div>
//                             </div>
//                             <div className="text-gray-800 dark:text-gray-200 group flex gap-2">
//                                 <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
//                                     <HiOutlineCurrencyBangladeshi className='w-6 h-6' />
//                                 </div>
//                                 <div>
//                                     <div className="font-semibold mb-1">Salary</div>
//                                     <p className="text-sm text-gray-800 dark:text-gray-400">{Number(fees) == 0 || negotiable ? 'Negotiable' : fees}</p>
//                                 </div>
//                             </div>
//                             <div className="text-gray-800 dark:text-gray-200 group flex gap-2">
//                                 <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
//                                     <BiGlobe className='w-6 h-6' />
//                                 </div>
//                                 <div>
//                                     <div className="font-semibold mb-1">Curriculum</div>
//                                     <p className="text-sm text-gray-800 dark:text-gray-400">{lang}</p>
//                                 </div>
//                             </div>
//                             <div className="text-gray-800 dark:text-gray-200 group flex gap-2">
//                                 <div className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">

//                                     <BsGenderAmbiguous className='w-6 h-6' />
//                                 </div>
//                                 <div>
//                                     <div className="font-semibold mb-1">Preferable Gender</div>
//                                     <p className="text-sm">{gender.toLowerCase() == 'male' ? 'Male' : gender.toLowerCase() == 'female' ? 'Female' : gender.toLowerCase() == 'all' ? 'All' : 'All'}</p>
//                                 </div>
//                             </div>
//                             {type == 'user' ? <p className="text-lg text-green-500 right-4 bottom-6 absolute">Free</p> : ``}

//                             <p className="text-sm text-gray-800 right-4 bottom-0 absolute dark:text-gray-400">{moment(createdAt).fromNow()}</p>

//                         </div>
//                     </div>
//                     <div className={` ${type == 'user' ? `ring-green-500 ring-2` : `ring-rose-600 ring-2`}  relative block md:hidden w-full p-2 mx-auto mt-2 ${isLast ? 'bg-gradient-to-b from-white dark:from-neutral-800' : 'bg-white dark:bg-neutral-800'}  rounded-lg`}>

//                         <p className="m-2 text-lg font-semibold text-gray-800 dark:text-gray-200 md:mt-0 md:text-xl">{desc}</p>

//                         <div className=" grid grid-cols-2 mb-4">
//                             <div>
//                                 <div className="text-gray-800 mb-2 dark:text-gray-200 group flex gap-2">
//                                     <div className="w-8 h-8 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
//                                         <SiGoogleclassroom className='w-6 h-6' />
//                                     </div>
//                                     <div>
//                                         <div className="text-sm text-gray-800 dark:text-gray-400">Class</div>
//                                         <p className="text-sm">{cls}</p>
//                                     </div>
//                                 </div>
//                                 <div className="text-gray-800 mb-2 dark:text-gray-200 group flex gap-2">
//                                     <div className="w-8 h-8 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
//                                         <BsCalendarWeek className='w-6 h-6' />
//                                     </div>
//                                     <div>
//                                         <div className="text-sm text-gray-800 dark:text-gray-400">Days/Week</div>
//                                         <p className="text-sm">{days}</p>
//                                     </div>
//                                 </div>
                               
//                                 <div className="text-gray-800 mb-2 dark:text-gray-200 group flex gap-2">
//                                     <div className="w-8 h-8 flex justify-center items-center shrink-0 bg-gray-100
//                                      text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
//                                         <BsGenderAmbiguous className='w-6 h-6' />
//                                     </div>
//                                     <div>
//                                         <div className="text-sm text-gray-800 dark:text-gray-400">Preferable Gender</div>
//                                         <p className="text-sm">{gender.toLowerCase() == 'male' ? 'Male' : gender.toLowerCase() == 'female' ? 'Female' : gender.toLowerCase() == 'all' ? 'All' : 'All'}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className="text-gray-800 mb-2 dark:text-gray-200 group flex gap-2">
//                                     <div className="w-8 h-8 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
//                                         <MdOutlineLocationOn className='w-6 h-6' />
//                                     </div>
//                                     <div>
//                                         <div className="text-sm text-gray-800 dark:text-gray-400">Location</div>
//                                         <p className="text-sm">{loc}</p>

//                                     </div>
//                                 </div>
//                                 <div className="text-gray-800 mb-2 dark:text-gray-200 group flex gap-2">
//                                     <div className="w-8 h-8 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
//                                         <BiBookReader className='w-6 h-6' />
//                                     </div>
//                                     <div>
//                                         <div className="text-sm text-gray-800 dark:text-gray-400">Tution Subjects</div>
//                                         <p className="text-sm">{subjects}</p>
//                                     </div>
//                                 </div>
                               
//                                 <div className="text-gray-800 mb-2 dark:text-gray-200 group flex gap-2">
//                                     <div className="w-8 h-8 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
//                                         <BiGlobe className='w-6 h-6' />
//                                     </div>
//                                     <div>
//                                         <div className="text-sm text-gray-800 dark:text-gray-400">Language</div>
//                                         <p className="text-sm">{lang}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         {type == 'user' ? <p className="text-lg text-green-500 right-4 bottom-6 absolute">Free</p> : ``}
//                         <p className="text-sm text-gray-800 right-4 bottom-2 absolute dark:text-gray-400">{moment(createdAt).fromNow()}</p>
//                     </div>
//                 </a>
//             </Link>
//         </>
//     );
// }

// export default PostCard;

import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BiBookReader, BiGlobe } from 'react-icons/bi'
import { BsCalendarWeek, BsGenderAmbiguous } from 'react-icons/bs'
import { HiOutlineCurrencyBangladeshi } from 'react-icons/hi'
import { MdOutlineLocationOn } from 'react-icons/md'
import { SiGoogleclassroom } from 'react-icons/si'
import Swal from 'sweetalert2'

function PostCard({ days, desc, division, district, area, gender, liked, lang, subjects, fees, _id, cls, token, type, negotiable, isLast, createdAt }) {
    const router = useRouter();
    const like = async (e) => {
        e.preventDefault();
        if (token) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/like/${_id}`, { likedId: _id }, {
                headers: {
                    token: token
                }
            }).then(async (res) => {
                if (router.pathname == '/followings/posts') {
                    router.push(`/followings/posts?page=1&search`)
                } else { }
                Swal.fire({
                    icon: 'success',
                    title: res.data.type,
                    text: res.data.msg,
                    timer: 1500
                })
            }).catch((res) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: res.data.msg,
                })
            })
        } else {
            router.push('/')
        }
    }
    const tempLoc = division + district + area + ' ';
    const loc = tempLoc.split(' ').join('') == '' ? 'All over Bangladesh' : `${area && area + ', '}${district && district + ', '}${division && division + ''}`;

    return (
        <>
            <Link href={type == 'media' ? `/media/post/${_id}` : `/posts/${_id}`} passHref>
                <a className={`${isLast ? '' : ''}`}>
                    <div className={`relative w-full p-4 mx-auto mt-2 bg-white dark:bg-neutral-800 border hover:border-green-500 transition duration-300 rounded-lg`}>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{desc}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-4">
                            <div className="flex items-center gap-2">
                                <SiGoogleclassroom className='w-6 h-6 text-gray-600 dark:text-gray-300' />
                                <div>
                                    <div className="font-semibold">Class</div>
                                    <p className="text-sm text-gray-800 dark:text-gray-400">{cls}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <BsCalendarWeek className='w-6 h-6 text-gray-600 dark:text-gray-300' />
                                <div>
                                    <div className="font-semibold">Days/Week</div>
                                    <p className="text-sm text-gray-800 dark:text-gray-400">{days}</p>
                                </div>
                            </div>
                           
                            <div className="flex items-center gap-2">
                                <MdOutlineLocationOn className='w-6 h-6 text-gray-600 dark:text-gray-300' />
                                <div>
                                    <div className="font-semibold">Location</div>
                                    <p className="text-sm text-gray-800 dark:text-gray-400">{loc}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <BiBookReader className='w-6 h-6 text-gray-600 dark:text-gray-300' />
                                <div>
                                    <div className="font-semibold">Tuition Subjects</div>
                                    <p className="text-sm text-gray-800 dark:text-gray-400">{subjects}</p>
                                </div>
                            </div>
                           
                            <div className="flex items-center gap-2">
                                <BiGlobe className='w-6 h-6 text-gray-600 dark:text-gray-300' />
                                <div>
                                    <div className="font-semibold">Curriculum</div>
                                    <p className="text-sm text-gray-800 dark:text-gray-400">{lang}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 special-post">
                                <HiOutlineCurrencyBangladeshi className='w-6 h-6 text-gray-600 dark:text-gray-300' />
                                <div>
                                    <div className="font-semibold">Salary</div>
                                    <p className="text-sm text-gray-800 dark:text-gray-400">{Number(fees) == 0 || negotiable ? 'Negotiable' : fees}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <BsGenderAmbiguous className='w-6 h-6 text-gray-600 dark:text-gray-300' />
                                <div>
                                    <div className="font-semibold">Preferable Gender</div>
                                    <p className="text-sm text-gray-800 dark:text-gray-400">{gender.toLowerCase() === 'male' ? 'Male' : gender.toLowerCase() === 'female' ? 'Female' : 'All'}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-800 dark:text-gray-400 mt-4">{moment(createdAt).fromNow()}</p>
                    </div>
                </a>
            </Link>
        </>
    );
}

export default PostCard;
