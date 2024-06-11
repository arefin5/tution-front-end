// //---------components

// import Sidebar from '../../components/page/Sidebar'
// import Review from '../../components/user/Review'
// import WriteReview from '../../components/user/WriteReview';
// //-------icons
// import { BiBookReader, BiHeart, BiShareAlt, BiPhoneCall, BiMessage } from 'react-icons/bi';
// import { MdOutlineLocationOn, MdReportProblem, MdVerified } from 'react-icons/md';
// import { SiGoogleclassroom } from 'react-icons/si';
// import { BsGenderAmbiguous, } from 'react-icons/bs';
// //--------libraries
// import axios from 'axios';
// import Alert from 'sweetalert2';
// import { useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { parseCookies } from 'nookies';
// import React from 'react';
// import { FaFacebookSquare, FaHeart, FaInstagramSquare, FaLinkedin, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa';
// import Link from 'next/link';
// import { AppContext } from '../_app';
// import { NextSeo } from 'next-seo';
// import Image from 'next/image';
// function Tutor({ userData, token, loadingState }) {
//     const { user } = useContext(AppContext);
//     console.log(user)

//     const router = useRouter();

//     const [social, setSocial] = useState([
//         { icon: 'fb', link: '' },

//     ])
//     const [education, setEducation] = useState([
//         { exam: '', dep: '', result: '', year: '', institute: '' },
//     ])
//     const [userName, setUserName] = useState('');
//     const [userId, setUserId] = useState('');
//     const [userPhone, setUserPhone] = useState(null);
//     const [userBio, setUserBio] = useState('');
//     const [userClass, setUserClass] = useState('');
//     const [userSubjects, setUserSubjects] = useState('');
//     const [userInstitute, setUserInstitute] = useState('');
//     const [userDepartment, setUserDepartment] = useState('');
//     const [userAge, setUserAge] = useState('');
//     const [userGender, setUserGender] = useState('');
//     const [userAvatar, setUserAvatar] = useState(null);
//     const [userRate, setUserRate] = useState([]);

//     const [division, setDivision] = useState('');
//     const [district, setDistrict] = useState('');
//     const [areas, setAreas] = useState([]);
//     const [isFollowed, setIsFollowed] = useState(false);
//     const [loading, setLoading] = useState(true);


//     //-----------auth-check



//     useEffect(() => {

//         if (userData == null) {
//             router.push('/404')
//         } else {
//             setUserId(userData._id);
//             setUserPhone(userData.phone);
//             setUserName(userData.name);
//             setUserBio(userData.bio);
//             setUserClass(userData.class);
//             setUserSubjects(userData.subjects);
//             setUserAge(userData.age);
//             setUserInstitute(userData.institute);
//             setUserDepartment(userData.department);
//             setUserGender(userData.gender);
//             setUserAvatar(userData.avatarImg);
//             setDivision(userData.division);
//             setDistrict(userData.district);
//             setAreas(userData.areas);

//             setEducation(userData.education);
//             setSocial(userData.social);
//             setUserRate(userData.ratings);
//             setIsFollowed(userData.isFollowed);
//             setLoading(loadingState)
//         }

//         return () => {

//         };
//     }, []);

//     const updateRatings = async () => {
//         await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
//         ).then(async (res) => {
//             setUserRate(res.data.ratings)
//         })
//     }

//     const comeToInbox = async (e) => {
//         e.preventDefault();
//         if (token != null) {
//             await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inbox/`, { chatWith: userId }, {
//                 headers: {
//                     token: token
//                 }
//             }).then(async (res) => {
//                 router.push(`/inbox/chat/${res.data.chatId}`)
//             }).catch(() => {
//                 Alert.fire({
//                     icon: 'error',
//                     title: 'Error...',
//                     text: "Something went wrong..! ",
//                 })
//             })
//         } else {
//             router.push('/login')
//         }
//     }

//     const follow = async (e) => {
//         e.preventDefault();

//         if (token != null) {
//             await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/follow/`, { followId: userId }, {
//                 headers: {
//                     token: token
//                 }
//             }).then(async (res) => {
//                 Alert.fire({
//                     icon: 'success',
//                     title: res.data.type,
//                     text: res.data.msg,
//                 })
//                 if (res.data.msg == 'user has been Unfollowed') {
//                     setIsFollowed(false)
//                 } else if (res.data.msg == 'user has been followed') {
//                     setIsFollowed(true)
//                 }
//             }).catch((res) => {
//                 Alert.fire({
//                     icon: 'error',
//                     title: 'Not allowed',
//                     text: "You can not follow or unfollow this user",
//                 })
//             })
//         } else {
//             router.push('/login')
//         }

//     }
//     const phoneCall = (e) => {
//         e.preventDefault();

//         window.open(`tel:+${userPhone}`, '_system');


//     }
//     const share = (e) => {
//         e.preventDefault();
//         navigator.clipboard.writeText(window.location.href);
//         Alert.fire({
//             title: 'Link copied',
//             text: 'User profile link has been copied',
//         })
//     }

//     //---------delet post handler
//     const totalRatings = userRate.length || 1
//     const getSumByKey = (arr, key) => {
//         return arr.reduce((accumulator, current) => accumulator + Number(current[key]), 0)
//     }
//     var stars = getSumByKey(userRate, 'stars')
//     var rating = Number(stars) / Number(totalRatings) || 0;

//     let profileImg;
//     if (!userAvatar || userAvatar === "") {
//         if (userGender == 'male') {
//             profileImg = `/boy.svg`
//         } else if (userGender == "female") {
//             profileImg = `/girl.svg`
//         } else {
//             profileImg = `/boy.svg`
//         }
//     } else {
//         profileImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userAvatar}`
//     }
//     return (
//         <>
//             {
//                 userData ?
//                     <>
//                         <NextSeo
//                             title={`TuitionApp - ${userData?.name} | Tutor`}
//                             description={userData?.bio}
//                             openGraph={{
//                                 type: 'article',
//                                 title: `TuitionApp - ${userData?.name} | Tutor`,
//                                 description: `${userData?.bio}`,
//                                 site_name: 'TuitionApp',
//                                 images: [
//                                     {
//                                         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userData?.avatarImg}`,
//                                         width: 600,
//                                         height: 600,
//                                         alt: 'TuitionApp',
//                                     },
//                                 ],
//                             }}
//                         />
//                         <div className='flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col '>

//                             < div className="2xl:basis-9/12 xl:basis-9/12 lg:basis-9/12 md:basis-full sm:basis-full basis-full h-full lg:mb-8 md:mb-6 sm:mb-4 mb-2" >
//                                 <div className="max-w-screen-xl px-2  md:px-8 mx-auto">
//                                     <div className=" w-11/12 md:px-8 md:py-4 mx-auto gap-5 bg-white dark:bg-neutral-800  rounded-t-lg grid  grid-cols-1 md:grid-cols-12">
//                                         <div className='md:col-span-7'>
//                                         <div className="profile-cover w-12/8 h-96">
//                                             <Image
//         src="/tutorbanner.png"
//         width={300}
//         height={100}
//       />
//                                             </div>
//                                             <div className="flex w-full items-end justify-end mb-5  md:hidden ">
//                                                 {
//                                                     social.map((x, index) => (
//                                                         <button key={index} onClick={
//                                                             () => {
//                                                                 window.open(x.link.startsWith("http") ? x.link : 'https://' + x.link, '_system')
//                                                             }
//                                                         }>
//                                                             <a target={'_blank'} className="inline-block text-gray-600 dark:text-gray-600 rounded-xl m-1 b">
//                                                                 {
//                                                                     x.icon == 'fb' ? <FaFacebookSquare className={`w-8 h-8 `} /> :
//                                                                         x.icon == 'ig' ? <FaInstagramSquare className={`w-8 h-8 `} /> :
//                                                                             x.icon == 'tt' ? <FaTwitterSquare className={`w-8 h-8 `} /> :
//                                                                                 x.icon == 'in' ? <FaLinkedin className={`w-8 h-8 `} /> :
//                                                                                     x.icon == 'yt' ? <FaYoutubeSquare className={`w-8 h-8 `} /> : ''
//                                                                 }
//                                                             </a>
//                                                         </button>
//                                                     ))
//                                                 }
//                                             </div>
//                                             <div className="flex flex-col mt-12 md:mt-24 justify-center items-center w-full">
                                           

//                                                 <div className='relative  z-10 w-32 h-32 md:w-48  md:h-48 overflow-hidden bg-neutral-900  rounded-full '>
//                                                     <img src={profileImg} alt='Profile image' />
//                                                 </div>
//                                                 <div className=' w-10/12 mx-6 h-28 md:h-32 rounded-3xl -mt-16 md:-mt-24 bg-gray-100 dark:bg-neutral-900 '></div>
//                                             </div>
//                                             <div className="flex justify-between align-middle mt-4 items-center w-full px-4">
//                                                 <div className="flex flex-row items-center">
//                                                     <p className=" my-3 text-lg text-left font-semibold text-gray-800 dark:text-gray-200 md:text-3xl">{userName}</p>
//                                                     {userData?.verified &&
//                                                         <div className=" w-5 h-5 ml-2">
//                                                             <MdVerified className="w-full h-full " color='green' />
//                                                         </div>
//                                                     }
//                                                 </div>

//                                                 <p className=" my-3 text-sm text-left text-gray-800 dark:text-gray-200 md:text-lg">{userAge && userAge + ' years old'}</p>

//                                             </div>
//                                             <div className="flex flex-col w-full px-4">
//                                                 <div className='flex mb-6 flex-row justify-between align-middle'>
//                                                     <p className="mt-2 flex flex-row items-center text-lg font-semibold text-gray-800 dark:text-gray-200 md:mt-0 ">

//                                                         <div className='w-8 h-8 rounded-full bg-gray-100 text-gray-600 dark:bg-neutral-600 dark:text-gray-300 mr-2 flex justify-center items-center'>
//                                                             <BsGenderAmbiguous className={`w-5 h-5 mr-2 `} />
//                                                         </div>
//                                                         {userGender.toLowerCase() == 'male' ? 'Male' : userGender.toLowerCase() == 'female' ? 'Female' : userGender.toLowerCase() == 'custom' ? 'Custom' : ''}
//                                                     </p>

//                                                 </div>
//                                                 <p className="mt-10 m-6 text-md text-gray-800 dark:text-gray-200 md:mt-0 ">{userBio}</p>
//                                             </div>
//                                         </div>
//                                         <div className='mt-2 md:col-span-5'>
//                                             <div className="hidden md:flex min-w-0 items-end justify-end mb-5 ">
//                                                 {
//                                                     social.map((x, index) => (
//                                                         <Link key={index} href={`${x.link}`} passHref>
//                                                             <a target={'_blank'} className="inline-block text-gray-600 dark:text-gray-600 rounded-xl m-1 b">
//                                                                 {
//                                                                     x.icon == 'fb' ? <FaFacebookSquare className={`w-8 h-8 `} /> :
//                                                                         x.icon == 'ig' ? <FaInstagramSquare className={`w-8 h-8 `} /> :
//                                                                             x.icon == 'tt' ? <FaTwitterSquare className={`w-8 h-8 `} /> :
//                                                                                 x.icon == 'in' ? <FaLinkedin className={`w-8 h-8 `} /> :
//                                                                                     x.icon == 'yt' ? <FaYoutubeSquare className={`w-8 h-8 `} /> : ''
//                                                                 }
//                                                             </a>
//                                                         </Link>
//                                                     ))
//                                                 }
//                                             </div>

                                          
                                           
                                          
                                           
                                           
//                                         </div>
//                                     </div>
                                    
//                                     <div className="  w-11/12 p-8 mx-auto  bg-white dark:bg-neutral-800 ">
//                                         <div className="my-6">
//                                             <p className="mt-2  text-lg font-semibold text-gray-800 dark:text-gray-200 md:mt-0 ">Educational Details:</p>
//                                         </div>
//                                         <div className='overflow-x-auto'>
//                                             <table className=" w-full border-collapse border-4 border-neutral-200 text-gray-700 dark:text-gray-200 h-12 px-4 dark:border-neutral-700">
//                                                 <thead>
//                                                     <tr>
//                                                         <th className="border-4 text-left border-neutral-200 text-gray-600 dark:text-gray-300 text-md lg:text-lg xl:text-xl 2xl:text-2xl  h-12 px-4 dark:border-neutral-700">Exam</th>
//                                                         <th className="border-4 text-left border-neutral-200 text-gray-600 dark:text-gray-300 text-md lg:text-lg xl:text-xl 2xl:text-2xl  h-12 px-4 dark:border-neutral-700">Sec/dep</th>
//                                                         <th className="border-4 text-left border-neutral-200 text-gray-600 dark:text-gray-300 text-md lg:text-lg xl:text-xl 2xl:text-2xl  h-12 px-4 dark:border-neutral-700">Result</th>
//                                                         <th className="border-4 text-left border-neutral-200 text-gray-600 dark:text-gray-300 text-md lg:text-lg xl:text-xl 2xl:text-2xl  h-12 px-4 dark:border-neutral-700">Year</th>
//                                                         <th className="border-4 text-left border-neutral-200 text-gray-600 dark:text-gray-300 text-md lg:text-lg xl:text-xl 2xl:text-2xl  h-12 px-4 dark:border-neutral-700">Institutions</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {education.map((degree, index) => (
//                                                         <tr key={index}>
//                                                             <td className="border-4 border-neutral-200 text-gray-700 text-md lg:text-lg xl:text-xl 2xl:text-2xl dark:text-gray-200 h-12 px-4 dark:border-neutral-700">{degree.exam}</td>
//                                                             <td className="border-4 border-neutral-200 text-gray-700 text-md lg:text-lg xl:text-xl 2xl:text-2xl dark:text-gray-200 h-12 px-4 dark:border-neutral-700">{degree.dep}</td>
//                                                             <td className="border-4 border-neutral-200 text-gray-700 text-md lg:text-lg xl:text-xl 2xl:text-2xl dark:text-gray-200 h-12 px-4 dark:border-neutral-700">{degree.result}</td>
//                                                             <td className="border-4 border-neutral-200 text-gray-700 text-md lg:text-lg xl:text-xl 2xl:text-2xl dark:text-gray-200 h-12 px-4 dark:border-neutral-700">{degree.year}</td>
//                                                             <td className="border-4 border-neutral-200 text-gray-700 text-md lg:text-lg xl:text-xl 2xl:text-2xl dark:text-gray-200 h-12 px-4 dark:border-neutral-700">{degree.institute}</td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                         <div className='overflow-x-auto mt-4'>
//                                             <table className=" w-full border-collapse border-4 border-neutral-200 text-gray-700 dark:text-gray-200 h-12 px-4 dark:border-neutral-700">
//                                                 <thead>
//                                                     <tr>
//                                                         <th className="border-4 text-center w-1/2 border-neutral-200 text-gray-600 dark:text-gray-300 text-md lg:text-lg xl:text-xl 2xl:text-2xl  h-12 px-4 dark:border-neutral-700">Department</th>
//                                                         <th className="border-4 text-center w-1/2 border-neutral-200 text-gray-600 dark:text-gray-300 text-md lg:text-lg xl:text-xl 2xl:text-2xl  h-12 px-4 dark:border-neutral-700">Institute</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     <tr>
//                                                         <td className="border-4 text-center w-1/2 border-neutral-200 text-gray-700 text-md lg:text-lg xl:text-xl 2xl:text-2xl dark:text-gray-200 h-12 px-4 dark:border-neutral-700">{userDepartment}</td>
//                                                         <td className="border-4 text-center w-1/2 border-neutral-200 text-gray-700 text-md lg:text-lg xl:text-xl 2xl:text-2xl dark:text-gray-200 h-12 px-4 dark:border-neutral-700">{userInstitute}</td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>

//                                         </div>
//                                     </div>

//                                     <div className="  w-11/12 p-4 mx-auto  bg-white dark:bg-neutral-800  rounded-b-lg">
//                                         <div className=''>
//                                             <div>
//                                                 <WriteReview title={'Review this tutor'} userId={userId} token={token} updateRatings={updateRatings} totalRating={rating} />
//                                             </div>
//                                         </div>
//                                         <div className="">
//                                             <p className="mt-2 my-6 text-lg font-semibold text-gray-800 dark:text-gray-200 md:mt-0 ">Recent Reviews:</p>
//                                         </div>
//                                         <div className=''>
//                                             <div>
//                                                 {userRate.map((rate, i) => (
//                                                     <Review key={i} userId={user?._id} token={token} refresh={updateRatings} rate={rate} />
//                                                 ))}

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div >
//                             <div className="2xl:basis-3/12 xl:basis-3/12 lg:basis-3/12 md:basis-full sm:basis-full basis-full ">
//                                 Right Side
//                             </div>
//                         </div >
//                     </>

//                     : ''
//             }
//         </>

//     );
// }
// export async function getServerSideProps(ctx) {
//     const token = parseCookies(ctx).authToken || null
//     const res = await fetch(`${process.env.API_URL}/user/${ctx.query.userId}`, {
//         // @ts-ignore
//         headers: {
//             token: token,
//             loadingState: false,

//         }
//     })
//     let user = await res.json()
//     return {
//         props: {
//             userData: user._id ? user : null,
//             loadingState: false,
//             token: token
//         },
//     };
// }
// export default Tutor;
import Sidebar from '../../components/page/Sidebar'
import Review from '../../components/user/Review'
import WriteReview from '../../components/user/WriteReview';
//-------icons
import { BiBookReader, BiHeart, BiShareAlt, BiPhoneCall, BiMessage } from 'react-icons/bi';
import { MdOutlineLocationOn, MdReportProblem, MdVerified } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { BsGenderAmbiguous, } from 'react-icons/bs';
//--------libraries
import axios from 'axios';
import Alert from 'sweetalert2';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React from 'react';
import { FaFacebookSquare, FaHeart, FaInstagramSquare, FaLinkedin, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa';
import Link from 'next/link';
import { AppContext } from '../_app';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

function Tutor({ userData, token, loadingState }) {
    const { user } = useContext(AppContext);
    const router = useRouter();

    const [social, setSocial] = useState([{ icon: 'fb', link: '' }]);
    const [education, setEducation] = useState([{ exam: '', dep: '', result: '', year: '', institute: '' }]);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userPhone, setUserPhone] = useState(null);
    const [userBio, setUserBio] = useState('');
    const [userClass, setUserClass] = useState('');
    const [userSubjects, setUserSubjects] = useState('');
    const [userInstitute, setUserInstitute] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userGender, setUserGender] = useState('');
    const [userAvatar, setUserAvatar] = useState(null);
    const [userRate, setUserRate] = useState([]);
    const [division, setDivision] = useState('');
    const [district, setDistrict] = useState('');
    const [areas, setAreas] = useState([]);
    const [isFollowed, setIsFollowed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userData == null) {
            router.push('/404')
        } else {
            setUserId(userData._id);
            setUserPhone(userData.phone);
            setUserName(userData.name);
            setUserBio(userData.bio);
            setUserClass(userData.class);
            setUserSubjects(userData.subjects);
            setUserAge(userData.age);
            setUserInstitute(userData.institute);
            setUserDepartment(userData.department);
            setUserGender(userData.gender);
            setUserAvatar(userData.avatarImg);
            setDivision(userData.division);
            setDistrict(userData.district);
            setAreas(userData.areas);
            setEducation(userData.education);
            setSocial(userData.social);
            setUserRate(userData.ratings);
            setIsFollowed(userData.isFollowed);
            setLoading(loadingState)
        }
    }, []);

    const updateRatings = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`).then(res => {
            setUserRate(res.data.ratings)
        })
    }

    const comeToInbox = async (e) => {
        e.preventDefault();
        if (token != null) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inbox/`, { chatWith: userId }, {
                headers: {
                    token: token
                }
            }).then(res => {
                router.push(`/inbox/chat/${res.data.chatId}`)
            }).catch(() => {
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

    const follow = async (e) => {
        e.preventDefault();
        if (token != null) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/follow/`, { followId: userId }, {
                headers: {
                    token: token
                }
            }).then(res => {
                Alert.fire({
                    icon: 'success',
                    title: res.data.type,
                    text: res.data.msg,
                })
                setIsFollowed(res.data.msg === 'user has been followed')
            }).catch(() => {
                Alert.fire({
                    icon: 'error',
                    title: 'Not allowed',
                    text: "You cannot follow or unfollow this user",
                })
            })
        } else {
            router.push('/login')
        }
    }

    const phoneCall = (e) => {
        e.preventDefault();
        window.open(`tel:+${userPhone}`, '_system');
    }

    const share = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        Alert.fire({
            title: 'Link copied',
            text: 'User profile link has been copied',
        })
    }

    const totalRatings = userRate.length || 1;
    const getSumByKey = (arr, key) => {
        return arr.reduce((accumulator, current) => accumulator + Number(current[key]), 0)
    }
    var stars = getSumByKey(userRate, 'stars');
    var rating = Number(stars) / Number(totalRatings) || 0;

    let profileImg;
    if (!userAvatar || userAvatar === "") {
        profileImg = userGender == 'male' ? `/boy.svg` : `/girl.svg`;
    } else {
        profileImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userAvatar}`
    }

    return (
        <>
            {userData && (
                <>
                    <NextSeo
                        title={`TuitionApp - ${userData?.name} | Tutor`}
                        description={userData?.bio}
                        openGraph={{
                            type: 'article',
                            title: `TuitionApp - ${userData?.name} | Tutor`,
                            description: `${userData?.bio}`,
                            site_name: 'TuitionApp',
                            images: [
                                {
                                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userData?.avatarImg}`,
                                    width: 600,
                                    height: 600,
                                    alt: 'TuitionApp',
                                },
                            ],
                        }}
                    />
                    <div className='flex flex-col lg:flex-row 2xl:flex-row xl:flex-row'>
                        <div className="basis-full lg:basis-9/12 2xl:basis-9/12 xl:basis-9/12 mb-8 lg:mb-0">
                            <div className="max-w-screen-xl px-2 md:px-8 mx-auto">
                                <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 md:p-8">
                                    <div className="relative mb-8">
                                        <Image
                                            src="/tutorbanner.png"
                                            layout="responsive"
                                            width={300}
                                            height={100}
                                            objectFit="cover"
                                            className="rounded-t-lg"
                                        />

<div className="absolute bottom-0 transform -translate-x-1/2 translate-y-1/2 w-32 h-32
 md:w-48 md:h-48 bg-white rounded-full border-4 profile  md:items-center border-white">
                                            <img src={profileImg} alt='Profile image' className="rounded-full" />
                                        </div>
                                    </div>
                                    <div className="text-center mt-16">
                                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 md:text-3xl">{userName}</h1>
                                        {userData?.verified && (
                                            <div className="inline-block ml-2">
                                                <MdVerified className="text-green-500 w-6 h-6" />
                                            </div>
                                        )}
                                        <p className="text-gray-800 dark:text-gray-200 mt-2">{userAge && `${userAge} years old`}</p>
                                    </div>
                                    
                                   
                                </div>
                            </div>
                            {/* Other sections can follow here */}
                        </div>
                        <div className="basis-full lg:basis-3/12 2xl:basis-3/12 xl:basis-3/12">
                            <Sidebar />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export async function getServerSideProps(ctx) {
    const token = parseCookies(ctx).authToken || null
    const res = await fetch(`${process.env.API_URL}/user/${ctx.query.userId}`, {
        // @ts-ignore
        headers: {
            token: token,
            loadingState: false,

        }
    })
    let user = await res.json()
    return {
        props: {
            userData: user._id ? user : null,
            loadingState: false,
            token: token
        },
    };
}

export default Tutor;
