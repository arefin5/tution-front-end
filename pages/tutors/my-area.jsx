import head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React from 'react';
import { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight, AiOutlineUndo } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import Swal from 'sweetalert2';
import Sidebar from '../../components/page/Sidebar'
import TutorCard from '../../components/user/TutorCard'
function MyArea({ token, tutorsArray }) {

    const router = useRouter();

    const [start, setStart] = useState(false);
    const [tutorData, setTutorData] = useState([]);

    const [search, setSearch] = useState('');
    const [pages, setPages] = useState(1);
    const [current, setCurrent] = useState(1);


    const HandleSearch = (e) => {
        e.preventDefault();
        router.replace(`/tutors/my-area?page=${current}&search=${search}`)
    }


    const clearSearch = (e) => {
        setSearch('')
        router.replace(`/tutors/my-area?page=${current}&search=${''}`)
    }
    const prevPage = (e) => {
        if (current > 1) {
            setCurrent(current - 1)
            router.replace(`/tutors/my-area?page=${current - 1}&search=${''}`)
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
            router.replace(`/tutors/my-area?page=${current + 1}&search=${''}`)
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Not available',
                text: 'This is the last page.',
                timer: 1500
            })
        }
    }


    useEffect(() => {
        if (!token || token == null) {
            router.replace('/login')
        } else {
            if (tutorsArray) {
                setTutorData(tutorsArray.data);
                setPages(tutorsArray.pages);
                setCurrent(tutorsArray.current);
                setStart(!start)
            } else {
                router.replace('/login')
            }
        }
        return () => {
        };

    }, [tutorsArray]);
    return (
        <div className='flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col '>
            <head>
                <title>TuitionApp - Tutors in my area</title>
            </head>
            <div className="2xl:basis-9/12 xl:basis-9/12 lg:basis-9/12 md:basis-full sm:basis-full basis-full h-full lg:mb-8 md:mb-6 sm:mb-4 mb-2">
                <div className="max-w-screen-xl px-4  md:px-8 mx-auto">
                    <div className="flex justify-between items-center gap-4 mb-6">
                        <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold">Tutors in Your Area</h2>
                        <Link href="/tutors">
                            <a className="inline-block bg-rose-600 hover:bg-rose-700 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">All Tutors</a>
                        </Link>
                    </div>
                    <div className={`flex w-full justify-between items-center gap-4 mb-6 h-full`} >
                        <div className="w-full flex bg-white rounded-lg dark:bg-neutral-800 p-4">
                            <input value={search} onChange={e => setSearch(e.target.value)} className=" bg-gray-200 dark:bg-neutral-900 text-gray-700 dark:text-gray-200 items-center h-10 w-full px-3 text-sm" type="text" placeholder="Search…" />
                            <button onClick={(event) => { clearSearch(event) }} className="w-10 focus:border-0 md:w-12 h-10 flex justify-center items-center shrink-0 bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700 text-white  transition duration-100">
                                <AiOutlineUndo className='w-6 h-6' />
                            </button>
                            <button onClick={(event) => { HandleSearch(event) }} className="w-10 focus:border-0 md:w-12 h-10 flex justify-center items-center shrink-0 bg-rose-600 hover:bg-rose-700 active:bg-rose-700 text-white rounded-r-lg  transition duration-100">
                                <BiSearch className='w-6 h-6' />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
                        {tutorData.map((item, i) => (
                            <TutorCard
                                key={i}
                                avatarImg={item.avatarImg}
                                name={item.name}

                                institute={item.institute}
                                department={item.department}
                                gender={item.gender}
                                id={item._id}
                                token={token}
                            />
                        ))}
                    </div>
                    <div className="flex mt-6 justify-center items-center gap-4">
                        <button onClick={e => prevPage(e)} className={` px-3 h-10 flex justify-center items-center shrink-0 ${current == 1 ? 'bg-neutral-500 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700 active:bg-rose-700'}  text-white rounded-lg  transition duration-100`}>
                            <AiOutlineLeft className='w-6 h-6' /> Prev
                        </button>
                        <div className="px-3 h-10 flex justify-center items-center shrink-0 bg-rose-600 text-white rounded-lg shadow-lg transition duration-100">
                            {current + '/' + pages}
                        </div>
                        <button onClick={e => nextPage(e)} className={` px-3 h-10 flex justify-center items-center shrink-0 ${current == pages ? 'bg-neutral-500 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700 active:bg-rose-700'} text-white rounded-lg  transition duration-100`}>
                            Next <AiOutlineRight className='w-6 h-6' />
                        </button>
                    </div>
                </div>
            </div>
            <div className="2xl:basis-3/12 xl:basis-3/12 lg:basis-3/12 md:basis-full sm:basis-full basis-full ">
                <Sidebar />
            </div>
        </div>

    );
}


export async function getServerSideProps(ctx) {
    let token = parseCookies(ctx).authToken || null;
    if (token) {
        const res = await fetch(`${process.env.API_URL}/tutors/my-area?page=${ctx.query.page || 1}&search=${ctx.query.search || ''}`, {
            headers: {
                token: token
            }
        })
        const tutors = await res.json()
        return {
            props: {
                tutorsArray: tutors,
                token: token
            },
        };
    } else {
        return {
            props: {
                tutorsArray: null,
                token: null
            },
        };
    }
}

export default MyArea;

const secureFace = async (callback) => {
    const token = ''
    const user = ''
    if (user && token) {
        return callback({ token, user })
    } else {
        //redirect()
    }
}
const page = async ({ searchParams }) => {
    const data = await secureFace(
        async ({ token, user }) => {
            const res = await fetch(`${process.env.API_URL}/tutors/my-area?page=${searchParams.page || 1}&search=${searchParams.search || ''}`, {
                headers: {
                    token: token
                }
            })
            const tutors = await res.json()
            return tutors
        }
    )
    return (
        <div>
            {data.tutors?.map()}
        </div>
    )
}