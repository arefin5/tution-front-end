//---------components
//-------icons
import { BiBookReader, BiDirections, BiGlobe, BiHeart, BiMessage, BiSend, BiShareAlt } from 'react-icons/bi';
import { MdOutlineLocationOn, MdReportProblem } from 'react-icons/md';


//--------libraries
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { FaHeart, } from 'react-icons/fa';
import Alert from 'sweetalert2';
// import { GiCancel, GiCogLock, } from 'react-icons/gi';
import moment from 'moment';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { BsCalendarWeek, BsFillTelephoneForwardFill, BsGenderAmbiguous } from 'react-icons/bs';
import { HiOutlineCurrencyBangladeshi } from 'react-icons/hi';
import { SiGoogleclassroom } from 'react-icons/si';
import Comment from '../../components/post/comment';
import { AppContext } from '../_app';
// import StarRatings from 'react-star-ratings';
function Post({ data, token }) {
    const router = useRouter();
    const { user } = useContext(AppContext);
    const [tab, setTab] = useState('details');
    const [isLiked, setIsLiked] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const [lan, setLan] = useState(null);
    const [lon, setLon] = useState(null);
    const [text, setText] = useState("");
    //-----------auth-check
    const comeToInbox = async (e) => {
        e.preventDefault();
        if (token != null) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inbox/`, { chatWith: data?.author._id }, {
                headers: {
                    token: token
                }
            }).then(async (res) => {
                if (res?.data?.chatId) {
                    router.push(`/inbox/chat/${res.data.chatId}`)
                } else if (res?.data?.err) {
                    Alert.fire({
                        icon: 'info',
                        title: 'Need to upgrade',
                        text: res?.data.msg,
                        
                    })
                    router.push(`/settings/profile/upgrade`)
                } else {
                    Alert.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: "Something went wrong..! ",
                    })
                }
            }).catch((e) => {
                console.log(e)
                Alert.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: "Something went wrong..! ",
                })
            })
        } else {
            router.push('/login')
        }
    }
    const like = async (e) => {
        e.preventDefault();
        if (token != null) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/like/${data?._id}`, { likedId: data?._id }, {
                headers: {
                    token: token
                }
            }).then(async (res) => {
                if (router.pathname == '/followings/posts') {
                    router.push(`/followings/posts?page=1&search`)
                } else { }
                Alert.fire({
                    icon: 'success',
                    title: res.data.type,
                    text: res.data.msg,
                    timer: 1500
                })
                if (res.data.msg == 'Added to favorites') {
                    setIsLiked(true)
                } else if (res.data.msg == 'Removed from favorites') {
                    setIsLiked(false)

                }
            }).catch((res) => {
                Alert.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: res.data.msg,
                })
            })
        } else {
            router.push('/login')
        }
    }
    // const apply = async (e) => {
    //     e.preventDefault();
    //     if (token != null) {
    //         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/apply/${data?._id}`, { applyId: data?._id }, {
    //             headers: {
    //                 token: token
    //             }
    //         }).then(async (res) => {
    //             router.replace(router.asPath)
    //             Alert.fire({
    //                 icon: res.data.icon || 'success',
    //                 title: res.data.type,
    //                 text: res.data.msg,
    //                 timer: 1500
    //             })
    //             if (res.data.msg == 'Successfully Applied') {
    //                 setIsApplied(true)
    //             } else if (res.data.msg == 'Successfully removed') {
    //                 setIsApplied(false)
    //             }
    //         }).catch((res) => {
    //             console.log(res)
    //             Alert.fire({
    //                 icon: 'error',
    //                 title: 'Error...',
    //                 text: 'Something went wrong',
    //             })
    //         })
    //     } else {
    //         router.push('/login')
    //     }
    // }
    const comment = async (e) => {
        e.preventDefault();
        if (token != null) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/comment/${data?._id}`, { postId: data?._id, desc: text }, {
                headers: {
                    token: token
                }
            }).then(async (res) => {
                setText('')
                router.replace(router.asPath)
            }).catch((res) => {
                Alert.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: res.data.err,
                })
            })
        } else {
            router.push('/login')
        }
    }
    const getDirection = (e) => {
        if (lan && lon) {
            if (data?.lan && data?.lon) {
                window.open(`https://www.google.com/maps/dir/?api=1&origin=${lan},${lon}&destination=${data?.lan},${data?.lon}&z=15`, '_blank')
            } else {
                Alert.fire({
                    title: 'Oops',
                    text: "This post has no google map location",
                    icon: 'error',
                    confirmButtonColor: '#6366f1',
                    confirmButtonText: 'Ok'
                })
            }
        } else {
            Alert.fire({
                title: 'Oops',
                text: "Please allow the location access from your browser",
                icon: 'error',
                confirmButtonColor: '#6366f1',
                confirmButtonText: 'Ok'
            })
        }
    }

    const share = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        Alert.fire({
            title: 'Link copied',
            text: 'User profile link has been copied',
        })
    }
    const phoneCall = (e) => {
        e.preventDefault();
        if (token) {
            if (user?.role == 'user') {
                Alert.fire({
                    title: "Upgrade",
                    text: "You need to upgrade",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#6366f1",
                    confirmButtonText: "Upgrade",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/settings/profile/upgrade')
                    }
                });
            } else {
                if (data?.author?.phone) {
                    navigator.clipboard.writeText(`+${data?.author?.phone}`);
                    Alert.fire({
                        title: 'Phone number copied',
                        text: 'Phone number copied has been copied',
                    })
                } else {
                    Alert.fire({
                        title: "Not allowed",
                        text: "This user is un willing to share his/her phone number",
                        icon: "error",
                    })
                }
            }
        } else {
            Alert.fire({
                title: "Login",
                text: "You need to login",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#6366f1",
                confirmButtonText: "Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push('/login')
                }
            });
        }
    }

    let profileImg;
    if (!data.author?.avatarImg || data.author?.avatarImg === "") {
        profileImg = `/boy.svg`
    } else {
        profileImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${data?.author.avatarImg}`
    }
    useEffect(() => {

        if (data == null) {
            router.push('/404')
        } else {
            console.log(data)
            setIsLiked(data.isLiked)
            setIsApplied(data.isApplied)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    // @ts-ignore
                    setLan(position.coords.latitude);
                    // @ts-ignore
                    setLon(position.coords.longitude);
                });
            }
        }
        return () => {

        };
    }, [data]);
    return (
        <>

            <NextSeo
                title={`TuitionApp - ${data?.desc}`}
                description={`${data?.class} | ${data?.subjects} | ${data?.days} days`}
                openGraph={{
                    type: 'article',
                    title: `TuitionApp - ${data?.desc}`,
                    description: `${data?.class} | ${data?.subjects} | ${data?.days} days`,
                    site_name: 'TuitionApp',
                    images: [
                        {
                            url: `https://tuitionappbd.com/seo-small.jpg`,
                            width: 500,
                            height: 283,
                            alt: 'TuitionApp',
                        },
                    ],
                }}
            />

            <div className='flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col '>

                < div className="2xl:basis-9/12 xl:basis-9/12 lg:basis-9/12 md:basis-full sm:basis-full basis-full h-full lg:mb-8 md:mb-6 sm:mb-4 mb-2" >
                    <div className="max-w-screen-xl px-2  md:px-8 mx-auto">
                        <div className=" w-full md:w-11/12 mx-auto bg-white dark:bg-neutral-800  mb-6 rounded-lg ">

                            <div className='px-6 md:px-10'>
                                <div className="flex flex-row justify-center items-center w-full">
                                    <div className=' mt-10 '>
                                        <img src={profileImg} alt='Profile image' className='rounded-full w-24 md:w-44 aspect-square ' />
                                    </div>

                                </div>
                                <div className="flex flex-col justify-center items-center my-4 w-full">
                                    <div className="flex flex-row align-middle items-center">
                                        <div className=" my-3 text-lg  font-semibold text-gray-800 dark:text-gray-200 md:text-3xl">{data?.author?.name}</div>
                                        {/* {data?.author.verified &&
                                            <MdVerified className="w-4 h-4 ml-3 text-rose-600" />
                                        } */}
                                    </div>
                                    <div className="flex flex-row align-middle items-center ">
                                        <div className=" text-sm md:text-lg  text-gray-600 dark:text-gray-400">Posted as Guardian of the student</div>

                                    </div>
                                    {/* <div className='flex flex-row mb-8 gap-20'>
                                        <Link href={`/media/${data?.author.phone}`} passHref>
                                            <a className="flex flex-row h-12 mt-4 text-gray-800 text-lg dark:text-gray-300 rounded-b-lg ">
                                                <div className={`bg-neutral-200 dark:bg-neutral-700 h-12 p-8 rounded-lg flex justify-center items-center  flex-grow rounded-bl-lg hover:bg-neutral-200 dark:hover:bg-neutral-700`}>
                                                    <p className=''>Media profile</p>
                                                </div>
                                            </a>
                                        </Link>
                                        <div className="flex flex-col mt-4  justify-center">
                                            <div className='flex justify-center'>
                                                <p className='text-gray-800 text-5xl md:text-3xl dark:text-gray-200'>{((Number(data?.ratings.stars) / (Number(data?.ratings.total)==0?1:Number(data?.ratings.total))).toFixed(1))}</p>
                                            </div>
                                            <div className='flex justify-center'>
                                                <StarRatings
                                                    rating={Number(data?.ratings.stars) / (Number(data?.ratings.total)==0?1:Number(data?.ratings.total))}
                                                    starRatedColor="#FACC32"
                                                    starDimension='18px'
                                                    starSpacing='1px'
                                                    numberOfStars={5}
                                                    name='rating'
                                                />
                                            </div>
                                        </div>

                                    </div> */}

                                </div>



                            </div>
                            <div className="flex flex-row h-12 mt-4 text-gray-800 text-lg dark:text-gray-300 rounded-b-lg ">
                                <button onClick={(event) => { setTab('details') }} className={`${tab == 'details' ? 'bg-neutral-200 dark:bg-neutral-700' : ''} flex justify-center items-center h-full flex-grow rounded-bl-lg hover:bg-neutral-200 dark:hover:bg-neutral-700`}>
                                    <p className=''>Details</p>
                                </button>
                                <button onClick={(event) => { setTab('comments') }} className={`${tab == 'comments' ? 'bg-neutral-200 dark:bg-neutral-700' : ''} flex justify-center items-center h-full flex-grow hover:bg-neutral-200 dark:hover:bg-neutral-700`}>
                                    <p className=''>Comments</p>
                                </button>

                            </div>
                        </div>
                        {
                            tab == 'details' &&
                            <>
                                <div className="  mx-auto">

                                    <div className=" w-full md:w-11/12 px-8 relative py-4 mx-auto  bg-white dark:bg-neutral-800 rounded-lg flex  lg:flex-row flex-col-reverse justify-between">
                                        <div className='w-full'>
                                            <div className="flex flex-col ">
                                                <div className="text-gray-800 dark:text-gray-200 mt-5 group flex ">
                                                    <p className="my-4  text-lg font-semibold text-gray-800 dark:text-gray-200 md:mt-0 md:text-xl">{data?.desc}</p>
                                                </div>
                                                <div className='w-full flex flex-row'>
                                                    <div className='w-full'>

                                                        <div className="text-gray-800 mb-6 dark:text-gray-200 group flex gap-4">
                                                            <div className="w-10  h-10 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
                                                                <SiGoogleclassroom className='w-5 h-5' />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm  mb-1">Class</div>
                                                                <p className="text-lg text-black dark:text-white">{data?.class}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-gray-800 mb-6 dark:text-gray-200 group flex gap-4">
                                                            <div className="w-10  h-10 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
                                                                <BsCalendarWeek className='w-5 h-5' />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm  mb-1">Days/Week</div>
                                                                <p className="text-lg text-black dark:text-white">{data?.days}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-gray-800 mb-6 dark:text-gray-200 group flex gap-4">
                                                            <div className="w-10  h-10 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
                                                                <BiBookReader className='w-5 h-5' />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm  mb-1">Subjects</div>
                                                                <p className="text-lg text-black dark:text-white">{data?.subjects}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-gray-800 mb-6 dark:text-gray-200 group flex gap-4">
                                                            <div className="w-10  h-10 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
                                                                <MdOutlineLocationOn className='w-5 h-5' />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm  mb-1">Location</div>
                                                                <p className="text-lg text-black dark:text-white">{data?.area && data?.area + ', '}{data?.district && data?.district + ', '}{data?.division}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='w-full'>

                                                        <div className="text-gray-800 mb-6 dark:text-gray-200 group flex gap-4">
                                                            <div className="w-10  h-10 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
                                                                <HiOutlineCurrencyBangladeshi className='w-5 h-5' />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm  mb-1">Salary</div>
                                                                <p className="text-lg text-black dark:text-white">{Number(data?.salary) == 0 || data?.negotiable ? 'Negotiable' : data?.salary}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-gray-800 mb-6 dark:text-gray-200 group flex gap-2">
                                                            <div className="w-10  h-10 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">
                                                                <BiGlobe className='w-5 h-5' />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm  mb-1">Curriculum</div>
                                                                <p className="text-lg text-black dark:text-white">{data?.lang}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-gray-800 mb-6 dark:text-gray-200 group flex gap-2">
                                                            <div className="w-10  h-10 flex justify-center items-center shrink-0 bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-full">

                                                                <BsGenderAmbiguous className='w-5 h-5' />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm  mb-1">Preferable Gender</div>
                                                                <p className="text-lg text-black dark:text-white">{data?.gender == 'male' ? 'Male' : data?.gender == 'female' ? 'Female' : data?.gender == 'all' ? 'All' : 'All'}</p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className=" absolute bottom-6 right-6 text-lg text-gray-800 dark:text-gray-200 ">Posted {moment(data?.createdAt).fromNow()}</p>
                                    </div>

                                </div>

                                <div className=" mt-6 mx-auto">
                                    <div className=" w-full md:w-11/12 h-80 relative mx-auto border-4 border-white dark:border-0 bg-white dark:bg-neutral-800  rounded-lg ">
                                        {
                                            data &&
                                            <iframe
                                                className={'rounded-lg w-full h-full'}
                                                width="300"
                                                height="170"
                                                // frameborder={"0"}
                                                // scrolling={"no"}
                                                // marginheight={"0"}
                                                // marginwidth={"0"}
                                                src={`https://www.google.com/maps?q=${data?.lan},${data?.lon}&hl=es;z%3D14&amp&output=embed`}
                                            >
                                            </iframe>
                                        }
                                        <div className=" w-40 bottom-4 left-4 absolute z-10 items-center mb-3 ">
                                            <button onClick={e => getDirection(e)} className="w-full   h-10 flex justify-center items-center bg-rose-600 hover:bg-rose-700 active:bg-rose-700 text-white rounded-lg  transition duration-100">
                                                <BiDirections className='w-6 h-6' /><p className='mx-5'>Direction</p>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </>
                        }
                        {
                            tab == 'comments' &&
                            <>
                                <div className="  mx-auto">
                                    <div className=" w-full md:w-11/12 px-4 relative py-4 mx-auto  bg-white dark:bg-neutral-800 rounded-lg ">
                                        <div className="flex h-22 w-full">
                                            <textarea

                                                value={text}
                                                autoFocus
                                                onChange={(e) => setText(e.target.value)}
                                                className=" focus:outline-none bg-neutral-100 h-auto dark:bg-neutral-900 text-gray-700 dark:text-gray-200 items-center p-2 rounded-xl mr-4 w-full px-3 text-sm"
                                                placeholder="Type your comment.."
                                            />
                                            <button
                                                onClick={(event) => {
                                                    comment(event)
                                                }}
                                                className="w-10 mr-1 focus:border-0 md:w-12 h-10 flex justify-center items-center shrink-0 bg-rose-600 hover:bg-rose-700 active:bg-rose-700 text-white rounded-lg shadow-lg transition duration-100"
                                            >
                                                <BiSend className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="  mx-auto">
                                    <div className=" w-full md:w-11/12 px-8 relative py-4 mx-auto ">
                                        {
                                            data?.comments?.map((item, i) => (
                                                <>
                                                    <Comment
                                                        key={i}
                                                        owner={item?.commentedBy?._id}
                                                        text={item.desc}
                                                        time={item.createdAt}
                                                        data={item}
                                                        token={token}
                                                        userId={user?._id}
                                                    />
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>

                        }
                        {/* {
                            tab == 'applied' &&
                            <>


                                <div className="  mx-auto">
                                    <div className=" w-full md:w-11/12 px-8 relative py-4 mx-auto ">
                                        {
                                            data?.applied.filter(user => user.role == 'tutor').map((item, i) => (
                                                <>
                                                    <Link href={`/tutors/${item._id}`}>
                                                        <a className="flex flex-row h-16 mb-2 items-center bg-white dark:bg-neutral-800 rounded-lg p-4 cursor-pointer">
                                                            <div
                                                                className={`w-12 relative bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mr-4`}
                                                            >
                                                                <img
                                                                    src={item.avatarImg.length > 0 ? (process.env.NEXT_PUBLIC_BACKEND_URL + item.avatarImg) : '/boy.svg'}
                                                                    loading="lazy"
                                                                    alt=""
                                                                    className={`w-full h-full object-cover rounded-full  object-center`}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col h-full items-start  overflow-hidden truncate w-[90%]">
                                                                <div className="text-gray-800 flex flex-row items-center dark:text-gray-300 md:text-lg font-bold text-center">
                                                                    {item?.name}
                                                                    {item?.verified && <MdVerified className="w-4 h-4 ml-3" />}
                                                                </div>

                                                            </div>
                                                        </a>
                                                    </Link>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>


                            </>
                        } */}


                    </div>
                </div >
                <div className="2xl:basis-3/12 xl:basis-3/12 lg:basis-3/12 md:basis-full sm:basis-full basis-full mx-2 md:px-4 md:pl-0 md:pr-6 ">
                    <div className='w-full md:sticky md:top-16 md:right-8'>
                        <div className=' py-2 bg-white rounded-lg dark:bg-neutral-800'>
                            <div className='flex flex-col md:flex-row border-b-2 border-gray-300 dark:border-gray-600 '>
                                <div className="flex w-full justify-center md:justify-end  m-4 mb-3 ">

                                    <button onClick={(event) => { like(event) }} className={` mx-1 h-10  w-10 flex justify-center items-center  bg-gray-100  dark:bg-neutral-600 ${isLiked ? 'text-rose-600' : 'text-gray-600 dark:text-gray-300'}  rounded-lg `}>
                                        {
                                            isLiked ?
                                                <FaHeart className='w-6 h-6' /> :
                                                <BiHeart className='w-6 h-6' />
                                        }
                                    </button>
                                    <button onClick={(event) => { share(event) }} className=" mx-1 h-10 w-10 flex justify-center items-center  bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-lg ">
                                        <BiShareAlt className='w-6 h-6' />
                                    </button>

                                    <Link href={`/posts/report/${data?._id}`} passHref>
                                        <a className=" mx-1 h-10 w-10 flex justify-center items-center bg-gray-100 text-gray-600 dark:bg-neutral-900 dark:text-gray-300 rounded-lg ">
                                            <MdReportProblem className='w-6 h-6' />
                                        </a>
                                    </Link>
                                </div>
                            </div>

                            {/* <div className="flex w-full my-2 items-start  ">
                                {
                                    isApplied ?
                                        <button onClick={(event) => { apply(event) }} className=" w-full text-gray-200 m-2 flex mx-4 px-5 p-2  items-center bg-rose-600 rounded-lg  text-lg ">
                                            <div className='w-10 h-10 rounded-full   flex justify-center items-center'>
                                                <GiCancel className='w-6 h-6' />
                                            </div>
                                            <p className='mx-5 font-semibold text-lg dark:text-gray-300'>Cancel</p>
                                        </button> :
                                        <button onClick={(event) => { apply(event) }} className=" w-full text-gray-200 m-2 flex mx-4 px-5 p-2  items-center bg-rose-600 rounded-lg  text-lg ">
                                            <div className='w-10 h-10 rounded-full   flex justify-center items-center'>
                                                <RiArticleFill className='w-6 h-6' />
                                            </div>
                                            <p className='mx-5 font-semibold text-lg dark:text-gray-300'>Apply</p>
                                        </button>
                                }
                            </div> */}


                            <div className="flex w-full my-2 items-start  ">
                                <button onClick={event => phoneCall(event)} className="w-full text-gray-200 m-2 mx-4 flex px-5 p-2  items-center bg-rose-600 rounded-lg  text-lg">
                                    <div className='w-10 h-10 rounded-full bg-rose-600 text-gray-200 flex justify-center items-center'>
                                        <BsFillTelephoneForwardFill className='w-6 h-6' />
                                    </div>
                                    <p className='mx-5 font-semibold text-lg dark:text-gray-300'>{
                                        ['super', 'admin', 'tutor'].includes((user?.role || 'undefined').toString()) ? `Call +${data?.author?.phone}` : 'Call'
                                    }</p>
                                </button>
                            </div>

                            <div className="flex w-full my-2 items-start  ">

                                <button onClick={event => comeToInbox(event)} className="w-full text-gray-200 m-2 mx-4 flex px-5 p-2  items-center bg-rose-600 rounded-lg  text-lg">
                                    <div className='w-10 h-10 rounded-full bg-rose-600 text-gray-200 flex justify-center items-center'>
                                        <BiMessage className='w-6 h-6' />
                                    </div>
                                    <p className='mx-5 font-semibold text-lg dark:text-gray-300'>Message</p>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>



    );
}

export async function getServerSideProps(ctx) {
    const token = parseCookies(ctx).authToken || null
    const res = await fetch(`${process.env.API_URL}/posts/${ctx.query.postId}`, {
        // @ts-ignore
        headers: {
            token: token,
            loadingState: false,

        }
    })
    let data = await res.json()
    console.log(data)
    return {
        props: {
            data: data?._id ? data : null,
            loadingState: false,
            token: token
        },
    };
}
export default Post;