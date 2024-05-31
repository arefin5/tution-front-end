//---------components

import Sidebar from '../../components/page/Sidebar'
import Review from '../../components/user/Review'
import WriteReview from '../../components/user/WriteReview';
//-------icons
import { BiHeart, BiMessage } from 'react-icons/bi';
import { MdReportProblem, MdVerified } from 'react-icons/md';

//--------libraries
import axios from 'axios';
import Swal from 'sweetalert2';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import { FaFacebookSquare, FaHeart, FaInstagramSquare, FaLinkedin, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import PostCard from '../../components/post/PostCard';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { AppContext } from '../_app';
import { NextSeo } from 'next-seo';
function MediaPage({ mediaData, token, loadingState }) {
    const { user } = useContext(AppContext);

    const router = useRouter();
    console.log(router)

    const [social, setSocial] = useState([
        { icon: 'fb', link: '' },

    ])
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userPhone, setUserPhone] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userBio, setUserBio] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userCover, setUserCover] = useState('');
    const [userRate, setUserRate] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [postData, setPostData] = useState([]);
    const [division, setDivision] = useState('');
    const [district, setDistrict] = useState('');
    const [areas, setAreas] = useState([]);
    const [tab, setTab] = useState('posts');

    const [isFollowed, setIsFollowed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [lastPage, setLastPage] = useState(false);
    const [verified, setVerified] = useState(false);
    const [pages, setPages] = useState(1);



    //-----------auth-check



    useEffect(() => {

        if (mediaData == null) {
            router.push('/404')
        } else {
            console.log(mediaData)
            setUserId(mediaData._id);
            setUserPhone(mediaData.phone);
            setUserEmail(mediaData.email);
            setUserName(mediaData.name);
            setUserBio(mediaData.bio);
            setPostData(mediaData.posts)
            setCurrent(mediaData.current)
            setLastPage(mediaData.lastPage)
            setPages(mediaData.pages)
            setUserDepartment(mediaData.department);
            setUserAvatar(mediaData.avatarImg);
            setUserCover(mediaData.coverImg);
            setDivision(mediaData.division);
            setDistrict(mediaData.district);
            setAreas(mediaData.areas);
            setSocial(mediaData.social);
            setUserRate(mediaData.ratings);
            setIsFollowed(mediaData.isFollowed);
            setVerified(mediaData.verified);
            setFollowers(mediaData.followersArray);
            setLoading(loadingState)
        }

        return () => {

        };
    }, [mediaData]);

    const updateRatings = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/media/${userPhone}`,
            {
                headers: {
                    token: token
                }
            }).then(async (res) => {
                setUserRate(res.data.ratings)
            }).catch(err => {
                console.log(err)
            })
    }
    const comeToInbox = async (e) => {
        e.preventDefault();
        if (token != null) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inbox/`, { chatWith: userId }, {
                headers: {
                    token: token
                }
            }).then(async (res) => {
                router.push(`/inbox/chat/${res.data.chatId}`)
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: "Something went wrong..! ",
                })
            })
        } else {
            router.push('/login')
        }
    }

    const follow = async (e) => {
        e.preventDefault();

        if (token != null) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/follow/`, { followId: userId }, {
                headers: {
                    token: token
                }
            }).then(async (res) => {
                Swal.fire({
                    icon: 'success',
                    title: res.data.type,
                    text: res.data.msg,
                })
                if (res.data.msg == 'user has been Unfollowed') {
                    setIsFollowed(false)
                    router.push(router.asPath)
                } else if (res.data.msg == 'user has been followed') {
                    router.push(router.asPath)
                    setIsFollowed(true)
                }
            }).catch((res) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Not allowed',
                    text: "You can not follow or unfollow this user",
                })
            })
        } else {
            router.push('/login')
        }

    }
    const phoneCall = (e) => {
        e.preventDefault();
        if (token != null) {
            if (userPhone) {
                window.open(`tel:+${userPhone}`, '_system');
            } else {
                Swal.fire({
                    title: 'Only for Tutors',
                    text: "You need to upgrade to pro member (Become a tutor)",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: "#e11d48",
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Upgrade'
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/settings/profile/upgrade')
                    }
                })
            }
        } else {
            router.push('/login')
        }
    }
    const share = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        Swal.fire({
            title: 'Link copied',
            text: 'User profile link has been copied',
        })
    }
    const prevPage = (e) => {
        if (current > 1) {
            setCurrent(current - 1)
            router.push(`/media/${router.query.mediaPhone}/?page=${current - 1}`)

        } else {
            Swal.fire({
                icon: 'info',
                title: 'Not available',
                text: 'This is the first page.',
                timer: 1500
            })
        }
    }
    const nextPage = (e) => {
        if (current < pages) {
            setCurrent(current + 1)
            router.push(`/media/${router.query.mediaPhone}/?page=${current + 1}`)
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Not available',
                text: 'This is the last page.',
                timer: 1500
            })
        }
    }
    //---------delet post handler
    const totalRatings = userRate.length || 1
    const getSumByKey = (arr, key) => {
        return arr.reduce((accumulator, current) => accumulator + Number(current[key]), 0)
    }
    var stars = getSumByKey(userRate, 'stars')
    var rating = Number(stars) / Number(totalRatings) || 0;

    let profileImg;
    if (!userAvatar || userAvatar === "") {
        profileImg = `/boy.svg`
    } else {
        profileImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userAvatar}`
    }
    let coverImg;
    if (!userCover || userCover === "") {
        coverImg = `/boy.svg`

    } else {
        coverImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userCover}`
    }

    return (
        <>
            {
                mediaData ?
                    <>
                        <NextSeo
                            title={`TuitionApp - ${mediaData?.name} | Media`}
                            description={mediaData?.bio}
                            openGraph={{
                                type: 'article',
                                title: `TuitionApp - ${mediaData?.name} | Media`,
                                description: `${mediaData?.bio}`,
                                site_name: 'TuitionApp',
                                images: [
                                    {
                                        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${mediaData?.avatarImg}`,
                                        width: 600,
                                        height: 600,
                                        alt: 'TuitionApp',
                                    },
                                ],
                            }}
                        />
                
                        <div className='flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col '>

                            < div className="2xl:basis-9/12 xl:basis-9/12 lg:basis-9/12 md:basis-full sm:basis-full basis-full h-full lg:mb-8 md:mb-6 sm:mb-4 mb-2" >
                                <div className="max-w-screen-xl px-2  md:px-8 mx-auto">
                                    <div className=" w-full  mx-auto bg-white dark:bg-neutral-800  mb-8 rounded-lg ">
                                        <div className=' w-full  aspect-[12/5] md:aspect-[18/5] rounded-t-lg bg-rose-600  '>
                                            <img src={coverImg} alt='Profile image' className=' w-full h-full object-cover rounded-t-lg ' />
                                        </div>
                                        <div className='px-6 md:px-10'>
                                            <div className="flex flex-row justify-between items-start w-full">
                                                <div className=' -mt-10 md:-mt-20'>
                                                    <img src={profileImg} alt='Profile image' className='rounded-full w-24 md:w-48 ring-4 md:ring-8 ring-white dark:ring-gray-800 aspect-square ' />
                                                </div>
                                                <div className="flex justify-end align-middle items-center w-full">
                                                    <div className="flex w-full  justify-end  my-3 ">
                                                        <button onClick={(event) => { follow(event) }} className={` mx-1 h-8 md:h-10 w-8 md:w-32 font-bold gap-1 flex justify-center items-center  bg-gray-200  dark:bg-neutral-900 ${isFollowed ? 'text-rose-600' : 'text-gray-600 hover:ring-2 ring-rose-600 dark:text-gray-300'}  rounded-lg `}>
                                                            {
                                                                isFollowed ?
                                                                    <>
                                                                        <FaHeart className='w-6 h-6' />
                                                                        <p className='hidden md:block'>Following</p>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <BiHeart className='w-6 h-6' />
                                                                        <p className='hidden md:block'>Follow</p>
                                                                    </>
                                                            }

                                                        </button>
                                                        <button onClick={(event) => { comeToInbox(event) }} className=" mx-1 h-8 md:h-10 w-8 md:w-32 font-bold gap-1 flex justify-center items-center  bg-gray-200 text-gray-600 hover:ring-2 ring-rose-600 dark:bg-neutral-900 dark:text-gray-300 rounded-lg ">
                                                            <BiMessage className='w-6 h-6' />

                                                            <p className='hidden md:block'>Message</p>

                                                        </button>
                                                        <Link href={`/media/report/${userPhone}`} passHref>

                                                            <a className=" mx-1 h-8 md:h-10 w-8 md:w-32 font-bold gap-1 flex justify-center items-center bg-gray-200 text-gray-600 hover:ring-2 ring-rose-600 dark:bg-neutral-900 dark:text-gray-300 rounded-lg ">
                                                                <MdReportProblem className='w-6 h-6' />
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" ">
                                                <div className="flex flex-row align-middle items-center w-full">
                                                    <div className=" my-3 text-lg text-left font-semibold text-gray-800 dark:text-gray-200 md:text-3xl">{userName}</div>
                                                    {mediaData?.verified &&
                                                        <div className=" w-5 h-5 ml-2">
                                                            <MdVerified className="w-full h-full text-rose-600" />
                                                        </div>
                                                    }
                                                </div>

                                            </div>

                                            <div>
                                                <div className="flex -space-x-4">
                                                    {
                                                        followers?.slice(0, 5).map((item, i) => (
                                                            <>
                                                                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={item.avatarImg.length > 0 ? (process.env.NEXT_PUBLIC_BACKEND_URL + item.avatarImg) : '/boy.svg'} alt="" />
                                                            </>
                                                        ))
                                                    }
                                                    {
                                                        followers.length > 5 &&
                                                        <p className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">{`+ ${followers.length - 5}`}</p>
                                                    }
                                                </div>
                                            </div>


                                        </div>
                                        <div className="flex flex-row h-12 mt-4 text-gray-800 text-lg dark:text-gray-300 rounded-b-lg ">
                                            <button onClick={(event) => { setTab('posts') }} className={`${tab == 'posts' ? 'bg-neutral-200 dark:bg-neutral-700' : ''} flex justify-center items-center h-full flex-grow rounded-bl-lg hover:bg-neutral-200 dark:hover:bg-neutral-700`}>
                                                <p className=''>Posts</p>
                                            </button>
                                            <button onClick={(event) => { setTab('reviews') }} className={`${tab == 'reviews' ? 'bg-neutral-200 dark:bg-neutral-700' : ''} flex justify-center items-center h-full flex-grow hover:bg-neutral-200 dark:hover:bg-neutral-700`}>
                                                <p className=''>Reviews</p>
                                            </button>
                                            <button onClick={(event) => { setTab('info') }} className={`${tab == 'info' ? 'bg-neutral-200 dark:bg-neutral-700' : ''} flex justify-center items-center h-full flex-grow rounded-br-lg hover:bg-neutral-200 dark:hover:bg-neutral-700`}>
                                                <p className=''>General info</p>
                                            </button>
                                        </div>
                                    </div>
                                    {tab == 'reviews' &&
                                        <div className="  w-full  mx-auto bg-white dark:bg-neutral-800 mb-8 rounded-lg ">
                                            <div className="  w-11/12 p-4 mx-auto  bg-white dark:bg-neutral-800  rounded-b-lg">
                                                <div className=''>
                                                    <div>
                                                        <WriteReview title={'Review this media'} userId={userId} token={token} updateRatings={updateRatings} totalRating={rating} />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <p className="mt-2 my-6 text-lg font-semibold text-gray-800 dark:text-gray-200 md:mt-0 ">Recent Reviews:</p>
                                                </div>
                                                <div className=''>
                                                    <div>
                                                        {userRate.map((rate, i) => (
                                                            <Review key={i} userId={user?._id} token={token} refresh={updateRatings} rate={rate} />
                                                        ))}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        tab == 'info' &&
                                        <div className="  w-full  mx-auto bg-white dark:bg-neutral-800 p-8 mb-8 rounded-lg ">
                                            <p className="text-lg font-bold text-gray-800  dark:text-gray-300">
                                                About
                                            </p>
                                            <pre className="text-md font-sans w-full h-full text-gray-800 m-1 dark:text-gray-300">
                                                {userBio}
                                            </pre>
                                            <p className="text-lg font-bold text-gray-800 mt-4  dark:text-gray-300">
                                                Social Links:
                                            </p>

                                            <div className="flex w-full items-start justify-start mb-5">
                                                {
                                                    social.map((x, index) => (
                                                        <button key={index} onClick={
                                                            () => {
                                                                x.link.length > 0 && window?.open(x.link.startsWith("http") ? x.link : 'https://' + x.link, '_system')
                                                            }
                                                        }>
                                                            <a target={'_blank'} className="inline-block text-gray-600 dark:text-gray-600 hover:text-rose-600 rounded-xl m-1 b">
                                                                {
                                                                    x.icon == 'fb' ? <FaFacebookSquare className={`w-8 h-8 `} /> :
                                                                        x.icon == 'ig' ? <FaInstagramSquare className={`w-8 h-8 `} /> :
                                                                            x.icon == 'tt' ? <FaTwitterSquare className={`w-8 h-8 `} /> :
                                                                                x.icon == 'in' ? <FaLinkedin className={`w-8 h-8 `} /> :
                                                                                    x.icon == 'yt' ? <FaYoutubeSquare className={`w-8 h-8 `} /> : ''
                                                                }
                                                            </a>
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                            <p className="text-lg font-bold text-gray-800 mt-4 dark:text-gray-300">
                                                Phone
                                            </p>
                                            <a href={`tel:+${userPhone}`} className="text-md font-sans w-full h-full text-gray-800 m-1 dark:text-gray-300">
                                                {'+' + userPhone}
                                            </a>
                                            <p className="text-lg font-bold text-gray-800 mt-4 dark:text-gray-300">
                                                Email
                                            </p>
                                            <a href={`mailto:${userEmail}`} className="text-md font-sans w-full h-full text-gray-800 m-1 dark:text-gray-300">
                                                {userEmail}
                                            </a>
                                            <p className="text-lg font-bold text-gray-800 mt-4 dark:text-gray-300">
                                                Office Location
                                            </p>
                                            <pre className="text-md font-sans w-full h-full text-gray-800 m-1 dark:text-gray-300">
                                                {userDepartment}
                                            </pre>
                                            <p className="text-lg font-bold text-gray-800 mt-4 dark:text-gray-300">
                                                Service area
                                            </p>
                                            <p className="text-md font-sans w-full h-full text-gray-800 m-1 dark:text-gray-300">
                                                {division + ' > ' + district + ' > '}
                                            </p>
                                            <div className="text-md flex flex-wrap text-gray-800 m-1 dark:text-gray-300">
                                                {areas?.map((item, i) => (<>
                                                    <div

                                                        className={`text-gray-800 dark:text-gray-300 text-center flex items-center justify-center px-5 py-2 bg-neutral-200 dark:bg-neutral-900 m-2 rounded-full `}
                                                    >
                                                        {item}
                                                    </div>
                                                </>
                                                ))
                                                }
                                            </div>

                                        </div>
                                    }
                                    {
                                        tab == 'posts' &&
                                        <>
                                            {postData.map((item, i) => (
                                                <PostCard
                                                    key={i}
                                                    cls={item.class}
                                                    days={item.days}
                                                    desc={item.desc}
                                                    division={item.division}
                                                    district={item.district}
                                                    area={item.area}
                                                    gender={item.gender}
                                                    liked={item.liked}
                                                    lang={item.lang}
                                                    subjects={item.subjects}
                                                    _id={item._id}
                                                    fees={item.salary}
                                                    negotiable={item.negotiable}
                                                    createdAt={item.createdAt}
                                                    token={token}
                                                    type={'media'}
                                                    isLast={false}

                                                />
                                            ))}
                                            <div className="flex mt-6 justify-center items-center gap-4">
                                                <button onClick={e => prevPage(e)} className={` px-3 h-10 flex justify-center items-center shrink-0 ${current == 1 ? 'bg-neutral-500 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700 active:bg-rose-700'}  text-white rounded-lg  transition duration-100`}>
                                                    <AiOutlineLeft className='w-6 h-6' /> Prev
                                                </button>
                                                <div className="px-3 h-10 flex justify-center items-center shrink-0 bg-rose-600 text-white rounded-lg  transition duration-100">
                                                    {current + '/' + pages}
                                                </div>
                                                <button onClick={e => nextPage(e)} className={` px-3 h-10 flex justify-center items-center shrink-0 ${current == pages ? 'bg-neutral-500 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700 active:bg-rose-700'} text-white rounded-lg  transition duration-100`}>
                                                    Next <AiOutlineRight className='w-6 h-6' />
                                                </button>
                                            </div>
                                        </>
                                    }


                                </div>
                            </div >
                            <div className="2xl:basis-3/12 xl:basis-3/12 lg:basis-3/12 md:basis-full sm:basis-full basis-full ">
                                <Sidebar />
                            </div>
                        </div >
                    </>

                    : ''
            }
        </>

    );
}

export async function getServerSideProps(ctx) {
    const token = parseCookies(ctx).authToken || null
    const res = await fetch(`${process.env.API_URL}/media/${ctx.query.mediaPhone}?page=${ctx.query.page || 1}`, {
        // @ts-ignore
        headers: {
            token: token,
            loadingState: false,

        }
    })
    let media = await res.json()
    return {
        props: {
            mediaData: media._id ? media : null,
            loadingState: false,
            token: token
        },
    };
}
export default MediaPage;