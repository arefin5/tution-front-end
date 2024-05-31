//---------components
import Sidebar from '../components/page/Sidebar'
//-------icons
import { BiBookReader, BiEdit, BiTrash } from 'react-icons/bi';
import { MdOutlineLocationOn, MdVerified } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { BsGenderAmbiguous, BsCalendarEvent, } from 'react-icons/bs';
//--------libraries
import { useRouter } from "next/router";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { parseCookies } from 'nookies';
import React from 'react';
function Profile({ userData, token }) {
    const router = useRouter();
    // @ts-ignore
    const [userDataNew, setUserDataNew] = useState(null);
    const [userAvatar, setUserAvatar] = useState('');
    const [userCover, setUserCover] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userRole, setUserRole] = useState('');
    const [degrees, setDegrees] = useState([]);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        if (!token || token == null) {
            router.push('/login')
        } else {
            if (userData) {
                setUserDataNew(userData);
                setUserRole(userData?.role);
                setUserAvatar(userData?.avatarImg);
                setUserCover(userData?.coverImg);
                setUserGender(userData?.gender);
                setDegrees(userData?.education)
                setRatings(userData?.ratings)
            } else {
                router.push('/login')

            }
        }
        return () => {
        };

    }, [userData, token]);


    //-----------count ratings
    const totalRatings = ratings?.length || 1
    const getSumByKey = (arr, key) => {
        return arr?.reduce((accumulator, current) => accumulator + Number(current[key]), 0)
    }
    var stars = getSumByKey(ratings, 'stars') || 0
    //--------update posts after delete


    console.clear();
    let profileImg;
    if (!userAvatar || userAvatar === "") {
        if (userGender == 'male') {
            profileImg = `/boy.svg`
        } else if (userGender == "female") {
            profileImg = `/girl.svg`
        } else {
            profileImg = `/boy.svg`
        }
    } else {
        profileImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userAvatar}`
    }
    let coverImg;
    if (!userCover || userCover === "") {
        coverImg = `/cover.svg`
    } else {
        coverImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userCover}`
    }


    return (
        <>
            <head>
                <title>TuitionApp - My profile</title>
            </head>
            <div className='flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col '>
                <div className="2xl:basis-9/12 xl:basis-9/12 lg:basis-9/12 md:basis-full sm:basis-full basis-full h-full lg:mb-8 md:mb-6 sm:mb-4 mb-2">
                    <div className="max-w-screen-xl px-4  md:px-8 mx-auto">
                        {userDataNew ?
                            <div className=" w-11/12 px-8 py-4 mx-auto  bg-white dark:bg-neutral-800 shadow-lg rounded-lg">
                                <div>
                                    <div className='w-full flex flex-col justify-center items-center '>
                                        <div className="w-full flex flex-col justify-center items-center ">
                                            <div className='relative  z-10 w-40 h-40 overflow-hidden border-4 bg-neutral-900 border-white rounded-full dark:border-rose-600'>
                                                <img src={profileImg} alt='Profile image' />
                                            </div>
                                            <div className=' w-full md:w-1/2 h-28 rounded-2xl -mt-20 bg-neutral-200 dark:bg-neutral-900 '></div>
                                        </div>
                                        <div className="flex justify-center items-center ">
                                            <p className="mt-4 m-5 mr-1  text-xl font-semibold text-gray-800 dark:text-gray-200 md:text-2xl">{userDataNew.name}</p>
                                            {userDataNew?.verified &&
                                                <div className=" text-rose-600 mr-3">
                                                    <MdVerified className="w-5 h-5" />
                                                </div>
                                            }
                                            <Link href='/settings/profile/edit' passHref>
                                                <a className="w-8 md:w-8 h-5 md:h-5 flex justify-center items-center shrink-0 text-neutral-700 hover:text-neutral-500 dark:text-neutral-300 dark:hover:text-neutral-100 transition duration-100">
                                                    <BiEdit className='w-5 h-5' />
                                                </a>
                                            </Link>
                                        </div>
                                        <div className=" w-full md:w-1/2 mt-2 items-center mb-3 ">
                                            <div className={`flex  top-0 justify-center px-4 py-4 rounded-lg   ${userRole == 'user' ? 'bg-neutral-100 dark:bg-rose-600/10' : userRole == 'tutor' ? 'bg-green-600' : userRole == 'super' ? 'bg-green-600' : userRole == 'admin' ? 'bg-green-600' : userRole == 'media' ? 'bg-green-600' : 'bg-neutral-100 dark:bg-rose-600/10'}`}>
                                                <p className='text-gray-800 font-semibold text-center text-xl dark:text-gray-200'>You are a {userRole == 'user' ? 'Student' : userRole == 'tutor' ? 'Tutor' : userRole == 'super' ? 'Super Admin' : userRole == 'admin' ? 'Admin' : userRole == 'media' ? 'Media' : 'User'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {userRole == 'tutor' || userRole == 'admin' || userRole == 'super' ?
                                        <div className='w-full flex flex-col justify-center items-center '>

                                            <div className=" w-full md:w-1/2 mt-2 items-center mb-3 ">
                                                <div className="flex  top-0 justify-between px-4 py-2 rounded-lg bg-neutral-100 dark:bg-rose-600/10 ">
                                                    <StarRatings
                                                        rating={stars / totalRatings}
                                                        starRatedColor="#FACC32"
                                                        starDimension='18px'
                                                        starSpacing='1px'
                                                        numberOfStars={5}
                                                        name='rating'
                                                    />
                                                    <p className='text-gray-800 dark:text-gray-200'>{Number((stars / totalRatings).toFixed(1))}</p>
                                                </div>
                                            </div>
                                            <div className="">
                                                <p className="mt-2 m-6 text-md font-semibold flex justify-center items-center text-gray-800 dark:text-gray-200 md:mt-0 ">ff{userDataNew.bio}</p>
                                            </div>
                                        </div> :
                                        <></>
                                    }
                                </div>
                                {(userRole == 'tutor') ?
                                    <div className='mt-2  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                        <div className="flex w-full items-start mb-3">
                                            <span className="inline-block p-2 text-rose-600 bg-rose-100 rounded-xl dark:text-white dark:bg-rose-600">
                                                <BiBookReader className={`w-5 h-5 `} />
                                            </span>

                                            <div className="ml-2 w-full md:mt-0">
                                                <p className="text-lg text-gray-700  dark:text-gray-200">Tuition Subjects</p>
                                                <p className="text-sm text-gray-700  dark:text-gray-200">{userDataNew?.subjects}</p>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-start mb-3">
                                            <span className="inline-block p-2 text-rose-600 bg-rose-100 rounded-xl dark:text-white dark:bg-rose-600">
                                                <SiGoogleclassroom className={`w-5 h-5 `} />
                                            </span>

                                            <div className="ml-2 w-full md:mt-0">
                                                <p className="text-lg text-gray-700  dark:text-gray-200">Preferable Classes</p>
                                                <p className="text-sm text-gray-700  dark:text-gray-200">{userDataNew?.class}</p>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-start mb-3">
                                            <span className="inline-block p-2 text-rose-600 bg-rose-100 rounded-xl dark:text-white dark:bg-rose-600">
                                                <MdOutlineLocationOn className={`w-5 h-5 `} />
                                            </span>

                                            <div className="ml-2 w-full md:mt-0">
                                                <p className="text-lg text-gray-700  dark:text-gray-200">Preferable Area</p>
                                                <p className="text-sm text-gray-700  dark:text-gray-200">{userDataNew?.area + ', ' + userDataNew?.district + ', ' + userDataNew?.division}</p>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-start mb-3">
                                            <span className="inline-block p-2 text-rose-600 bg-rose-100 rounded-xl dark:text-white dark:bg-rose-600">
                                                <BsCalendarEvent className={`w-5 h-5 `} />
                                            </span>

                                            <div className="ml-2 w-full md:mt-0">
                                                <p className="text-lg text-gray-700  dark:text-gray-200">Age</p>
                                                <p className="text-sm text-gray-700  dark:text-gray-200">{userDataNew?.age}</p>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-start mb-3">
                                            <span className="inline-block p-2 text-rose-600 bg-rose-100 rounded-xl dark:text-white dark:bg-rose-600">
                                                <BsGenderAmbiguous className={`w-5 h-5 `} />
                                            </span>

                                            <div className="ml-2 w-full md:mt-0">
                                                <p className="text-lg text-gray-700  dark:text-gray-200">Gender</p>
                                                <p className="text-sm text-gray-700  dark:text-gray-200">{userDataNew?.gender}</p>
                                            </div>
                                        </div>
                                    </div> : <></>}
                            </div>
                            : ''}
                    </div>
                    {(userRole == 'tutor') ?
                        <div className="max-w-screen-xl px-4 mt-6 md:px-8 mx-auto">
                            <div className="  w-11/12 p-8 mx-auto  bg-white dark:bg-neutral-800 shadow-lg rounded-lg">
                                <div className="">
                                    <p className="mt-2 my-6 text-lg font-semibold text-gray-800 dark:text-gray-200 md:mt-0 ">Educational Details:</p>
                                </div>
                                <div className='overflow-x-auto'>
                                    <table className=" w-full border-collapse border-4 border-neutral-200 text-gray-700 dark:text-gray-200 h-12 px-4 dark:border-neutral-700">
                                        <thead>
                                            <tr>
                                                <th className="border-4 text-left border-neutral-200 text-rose-600 text-md lg:text-lg xl:text-xl 2xl:text-2xl  h-12 px-4 dark:border-neutral-700">Exam</th>
                                                <th className="border-4 text-left border-neutral-200 text-rose-600 text-md lg:text-lg xl:text-xl 2xl:text-2xl  h-12 px-4 dark:border-neutral-700">Sec/dep</th>
                                                <th className="border-4 text-left border-neutral-200 text-rose-600 text-md lg:text-lg xl:text-xl 2xl:text-2xl  h-12 px-4 dark:border-neutral-700">Result</th>
                                                <th className="border-4 text-left border-neutral-200 text-rose-600 text-md lg:text-lg xl:text-xl 2xl:text-2xl  h-12 px-4 dark:border-neutral-700">Year</th>
                                                <th className="border-4 text-left border-neutral-200 text-rose-600 text-md lg:text-lg xl:text-xl 2xl:text-2xl  h-12 px-4 dark:border-neutral-700">Institutions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {degrees.map((degree, index) => (
                                                <tr key={index}>
                                                    <td className="border-4 border-neutral-200 text-gray-700 text-md lg:text-lg xl:text-xl 2xl:text-2xl dark:text-gray-200 h-12 px-4 dark:border-neutral-700">{degree.exam}</td>
                                                    <td className="border-4 border-neutral-200 text-gray-700 text-md lg:text-lg xl:text-xl 2xl:text-2xl dark:text-gray-200 h-12 px-4 dark:border-neutral-700">{degree.dep}</td>
                                                    <td className="border-4 border-neutral-200 text-gray-700 text-md lg:text-lg xl:text-xl 2xl:text-2xl dark:text-gray-200 h-12 px-4 dark:border-neutral-700">{degree.result}</td>
                                                    <td className="border-4 border-neutral-200 text-gray-700 text-md lg:text-lg xl:text-xl 2xl:text-2xl dark:text-gray-200 h-12 px-4 dark:border-neutral-700">{degree.year}</td>
                                                    <td className="border-4 border-neutral-200 text-gray-700 text-md lg:text-lg xl:text-xl 2xl:text-2xl dark:text-gray-200 h-12 px-4 dark:border-neutral-700">{degree.institute}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div> : <></>}

                </div>
                <div className="2xl:basis-3/12 xl:basis-3/12 lg:basis-3/12 md:basis-full sm:basis-full basis-full ">
                    <Sidebar />
                </div>
            </div>
        </>
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
        const data = await res.json()
        return {
            props: {
                userData: data.user ? data.user : null,
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

export default Profile;


