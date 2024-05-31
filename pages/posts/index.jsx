import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight, AiOutlineUndo } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { FiCheck } from 'react-icons/fi';
import { MdClear, MdClose } from 'react-icons/md';
import Swal from 'sweetalert2';
import Sidebar from '../../components/page/Sidebar';
import LocationSelector from '../../components/utils/LocationSelector';

import React from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import PostCard from '../../components/post/PostCard';
import PriceRange from '../../components/utils/PriceRange';


function Posts({ token, postsRes, }) {

    const router = useRouter();

    const [start, setStart] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [postData, setPostData] = useState([]);
    const [divission, setDivission] = useState('');
    const [district, setDistrict] = useState('');
    const [upozilla, setUpozilla] = useState('');
    const [union, setUnion] = useState('');
    const [search, setSearch] = useState('');
    const [gender, setGender] = useState('all');
    const [pages, setPages] = useState(1);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(20000);
    const [current, setCurrent] = useState(1);

    const showForm = (e) => {
        e.preventDefault();
        setShowFilter(!showFilter);
    }
    const filter = (e) => {
        router.replace(`/posts/?page=${current}&div=${divission}&dis=${district}&upo=${upozilla}&min=${min}&max=${max}&search=${search}&gender=${gender}`)
        setShowFilter(!showFilter);
    }
    const HandleSearch = (e) => {
        e.preventDefault();
        router.replace(`/posts/?page=${current}&div=${divission}&dis=${district}&upo=${upozilla}&min=${min}&max=${max}&search=${search}&gender=${gender}`)
    }

    const clearFilter = async (e) => {
        e.preventDefault();
        setDivission('');
        setDistrict('');
        setUpozilla('');
        setSearch('')
        setMin(1)
        setMax(20000)
        setGender('all')
        setShowFilter(!showFilter);
        router.replace(`/posts`)
    }
    const clearFilterBtn = async (e) => {
        e.preventDefault();
        setDivission('');
        setDistrict('');
        setUpozilla('');
        setSearch('')
        setMin(1)
        setGender('all')
        setMax(20000)
        router.replace(`/posts`)
    }
    const clearSearch = (e) => {
        setSearch('')
        router.replace(`/posts/?page=${current}&div=${divission}&dis=${district}&upo=${upozilla}&min=${min}&max=${max}&search=${''}`)
    }
    const prevPage = (e) => {
        if (current > 1) {
            setCurrent(current - 1)
            router.replace(`/posts/?page=${current - 1}&div=${divission}&dis=${district}&upo=${upozilla}&min=${min}&max=${max}&search=${''}`)
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
            router.replace(`/posts/?page=${current + 1}&div=${divission}&dis=${district}&upo=${upozilla}&min=${min}&max=${max}&search=${''}`)
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
        setPostData(postsRes.data);
        setPages(postsRes.pages);
        setCurrent(postsRes.current);
        setStart(!start);
    }, [postsRes]);
    return (
        <div className='flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col '>
            <head>
                <title>TuitionApp - All Posts</title>
            </head>
            <div className="2xl:basis-9/12 xl:basis-9/12 lg:basis-9/12 md:basis-full sm:basis-full basis-full h-full lg:mb-8 md:mb-6 sm:mb-4 mb-2">
                <div className="max-w-screen-xl px-4  md:px-8 mx-auto">

                    <div className={`flex flex-col w-full  bg-white rounded-lg  dark:bg-neutral-800 p-4 mb-6 h-full`} >
                        <div className="w-full justify-between flex mb-5">
                            <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold">All tuition posts</h2>

                        </div>
                        <div className='w-full flex flex-row'>
                            <div className="w-full flex ">
                                <input value={search} onChange={e => setSearch(e.target.value)} className=" bg-neutral-100 focus:outline-none dark:bg-neutral-900 text-gray-700 dark:text-gray-200 items-center h-10 w-full px-3 text-sm" type="text" placeholder="Search…" />
                                {
                                    search !== '' &&
                                    <button onClick={(event) => { clearSearch(event) }} className="w-10 focus:border-0  h-10 flex justify-center items-center shrink-0 bg-neutral-100  dark:bg-neutral-900 text-gray-700 dark:text-gray-200 transition duration-100">
                                        <MdClear className='w-6 h-6' />
                                    </button>
                                }
                                <button onClick={(event) => { HandleSearch(event) }} className="w-10 focus:border-0  h-10 flex justify-center items-center shrink-0 bg-rose-600 hover:bg-rose-700 active:bg-rose-700 text-white rounded-r-lg shadow-lg transition duration-100">
                                    <BiSearch className='w-6 h-6' />
                                </button>
                            </div>
                            <div className='ml-2 flex gap-1 justify-end'>
                                {
                                    (divission !== '' || gender !== 'all' || search !== '') &&
                                    <button onClick={e => clearFilterBtn(e)} className={` w-10  h-10  flex justify-center items-center shrink-0 bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700 text-white rounded-lg  transition duration-100`}>
                                        <AiOutlineUndo className='w-6 h-6' />
                                    </button>
                                }
                                <button onClick={e => showForm(e)} className={`p-2 h-10 md:w-40 flex justify-center items-center ${showFilter == true ? 'bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700' : 'bg-rose-600 hover:bg-rose-700 active:bg-rose-700'}  text-white rounded-lg shadow-lg transition duration-100`}>
                                    {showFilter == true ?
                                        <MdClose className='w-6 h-6' />
                                        :
                                        <HiOutlineLocationMarker className='w-5 h-5' />
                                    }
                                    <p className="text-white mb-2 m-2" >Location</p>
                                </button>

                            </div>
                        </div>
                    </div>
                    <div className={`flex w-full justify-between items-center gap-4 mb-6 ${showFilter == false ? 'hidden' : 'block'}`} >
                        <div className="flex items-center justify-between  p-4 w-full flex-wrap mb-2 bg-gray-100 rounded-lg  dark:bg-neutral-800 ring-2 ring-rose-600 ">
                            <div className='w-full'>
                                <label className="text-gray-700 dark:text-gray-200" >Location</label>
                                <LocationSelector

                                    division={divission}
                                    district={district}
                                    area={upozilla}
                                    setDivision={setDivission}
                                    setDistrict={setDistrict}
                                    setArea={setUpozilla}
                                />
                            </div>
                            <div className='w-full grid grid-cols-3 gap-4 '>
                                <div className='col-span-4 md:col-span-2 '>
                                    <p className="text-gray-700 dark:text-gray-200 mb-2 " >Salary range</p>
                                    <div>
                                        <PriceRange minValue={min} maxValue={max} setMin={setMin} setMax={setMax} min={1} max={20000} step={1} priceCap={500} />
                                    </div>
                                </div>
                                <div className='col-span-4 md:col-span-1'>
                                    <p className="text-gray-700 dark:text-gray-200 mb-2" >Tutor Gender</p>
                                    <select value={gender} onChange={e => setGender(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring appearance-none pr-8 rounded leading-tight " id="grid-state">
                                        <option value={'all'} >All</option>
                                        <option value={'male'} >Male</option>
                                        <option value={'female'}>Female</option>
                                    </select>
                                    <p className="text-gray-700 dark:text-gray-200 my-2" >Find nearest posts</p>
                                    <Link href="/posts/my-area" passHref>
                                        <a className="inline-block bg-rose-600 hover:bg-rose-700 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2">Nearest</a>
                                    </Link>

                                </div>
                            </div>
                            <div className='w-full mt-4 justify-center items-center '>
                                <div className="w-full justify-center items-center flex gap-4">
                                    <button onClick={e => clearFilter(e)} className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700 text-white rounded-lg  transition duration-100">
                                        <AiOutlineUndo className='w-6 h-6' />
                                    </button>
                                    <button onClick={e => filter(e)} className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-rose-600 hover:bg-rose-700 active:bg-rose-700 text-white rounded-lg  transition duration-100">
                                        <FiCheck className='w-6 h-6' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1  gap-2 lg:gap-4">
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
                                type={item.type}

                                fees={item.salary}
                                negotiable={item.negotiable}
                                createdAt={item.createdAt}
                                token={token}
                                isLast={false}

                            />
                        ))}

                    </div>
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
                </div>
            </div>
            <div className="2xl:basis-3/12 xl:basis-3/12 lg:basis-3/12 md:basis-full sm:basis-full basis-full ">
                <Sidebar />
            </div>
        </div >
    );
}

export async function getServerSideProps(ctx) {
    console.log(ctx.query)
    const { page, div, dis, upo, gender, min, max, search } = ctx.query
    let token = parseCookies(ctx).authToken || null;
    const res = await fetch(`${process.env.API_URL}/posts/?page=${page || 1}&div=${div || ''}&dis=${dis || ''}&upo=${upo || ''}&gender=${gender || 'all'}&min=${min || 1}&max=${max || 99999999}&search=${search || ''}`)
    const posts = await res.json()
    if (posts) {
        return {
            props: {
                postsRes: posts,
                token: token

            }
        };
    }
}
export default Posts;