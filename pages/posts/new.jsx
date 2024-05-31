import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LocationSelector from "../../components/utils/LocationSelector";

function NewPost({ token }) {
    const ApiServer = process.env.NEXT_PUBLIC_API_URL

    const router = useRouter();

    const [desc, setdesc] = useState('');
    const [cls, setcls] = useState('');
    const [subjects, setsubjects] = useState('');
    const [days, setdays] = useState('');
    const [salary, setsalary] = useState('');
    const [lan, setLan] = useState(0);
    const [lon, setLon] = useState(0);
    const [lang, setLang] = useState('Bengali-Medium');
    const [gender, setGender] = useState('all');
    const [showPhone, setShowPhone] = useState(false);

    const [divission, setDivission] = useState('');
    const [district, setDistrict] = useState('');
    const [upozilla, setUpozilla] = useState('');

    const [start, setStart] = useState(false);
    const [negotiable, setNegotiable] = useState(false);


    useEffect(() => {
        if (!token || token == null) {
            router.push('/login')
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    setLan(position.coords.latitude);
                    setLon(position.coords.longitude);
                });
            }
            setStart(!start);
        }
    }, []);



    const data = {
        class: cls,
        days: days,
        lang: lang,
        salary: salary,
        subjects: subjects,
        division: divission,
        district: district,
        area: upozilla,
        lan: lan,
        desc: desc,
        lon: lon,
        gender: gender,
        showPhone: showPhone,
        negotiable: negotiable
    }
    const post = (e) => {
        e.preventDefault();
        if (
            cls == '' || desc == '' || subjects == '' || (negotiable == false && salary == '')
        ) {
            Swal.fire({
                title: 'Oops',
                text: "All fields are required",
                icon: 'warning',
                confirmButtonColor: '#6366f1',
                confirmButtonText: 'Ok'
            })
        } else {

            Swal.fire({
                title: 'Are these all information correct?',
                text: "Please check all the information you just entered",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#6366f1',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes. Post'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (lan == 0 || lon == 0) {
                        Swal.fire({
                            title: 'Oops',
                            text: "Please allow the location access from your browser",
                            icon: 'error',
                            confirmButtonColor: '#6366f1',
                            confirmButtonText: 'Ok'
                        })
                    } else {
                        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, data, {
                            headers: {
                                token: token
                            }
                        }).then(res => {
                            setdesc('');
                            setcls('');
                            setsubjects('');
                            setdays('');
                            setsalary('');
                            setLang('');
                            setDivission('');
                            setDistrict('');
                            setUpozilla('');
                            setGender('all');
                            setStart(!start);

                            Swal.fire({
                                title: 'Success',
                                text: "Post has been published",
                                icon: 'success',
                                confirmButtonColor: '#6366f1',
                                confirmButtonText: 'Ok'
                            })
                        })
                    }
                }
            })
        }
    }
    return (
        <div className='flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col '>
            <head>
                <title>TuitionApp - New post</title>
            </head>
            <div className=" h-full w-full lg:mb-8 md:mb-6 sm:mb-4 mb-2">
                <div className=" w-full px-4  md:px-8 mx-auto">
                    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md dark:bg-neutral-800">
                        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">New Post</h2>

                        <form>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" >Title</label>
                                <input value={desc} onChange={(event) => { setdesc(event.target.value) }} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" >Class</label>
                                    <input value={cls} onChange={(event) => { setcls(event.target.value) }} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                </div>

                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" >Subjects</label>
                                    <input value={subjects} onChange={(event) => { setsubjects(event.target.value) }} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                </div>

                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" >Days / week</label>
                                    <select value={days} onChange={e => setdays(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring appearance-none pr-8 rounded leading-tight " id="grid-state">
                                        <option value={1} >1 day / week</option>
                                        <option value={2} >2 days / week</option>
                                        <option value={3} >3 days / week</option>
                                        <option value={4} >4 days / week</option>
                                        <option value={5} >5 days / week</option>
                                        <option value={6} >6 days / week</option>
                                        <option value={7} >7 days / week</option>

                                    </select>

                                </div>


                                <div>
                                    <div className="flex flex-row justify-between items-center">
                                        <label className="text-gray-700 dark:text-gray-200" >Salary</label>
                                        <div className="flex flex-row">
                                            <label className="text-gray-700 dark:text-gray-200" >Negotiable</label>
                                            <input checked={negotiable} onChange={(e) => { setNegotiable(negotiable == true ? false : true) }} type="checkbox" className="block  mx-4 h-5 w-5 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                        </div>
                                    </div>
                                    {
                                        negotiable == false ?
                                            <input value={salary} onChange={(event) => { setsalary(event.target.value) }} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                            : <></>
                                    }
                                </div>
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" >Curriculum</label>
                                    <select value={lang} onChange={e => setLang(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring appearance-none pr-8 rounded leading-tight " id="grid-state">
                                        <option value={'Bengali-Medium'} >Bengali-Medium</option>
                                        <option value={'English-Cambridge'} >English-Cambridge</option>
                                        <option value={'English-Edexcel'} >English-Edexcel</option>
                                        <option value={'English-Version'} >English-Version</option>
                                        <option value={'International-Baccalaureate'} >International-Baccalaureate</option>
                                        <option value={'Madrasa-Medium'} >Madrasa-Medium</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-700 dark:text-gray-200" >Tutor Gender</label>
                                    <select value={gender} onChange={e => setGender(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring appearance-none pr-8 rounded leading-tight " id="grid-state">
                                        <option value={'all'} >All</option>
                                        <option value={'male'} >Male</option>
                                        <option value={'female'}>Female</option>
                                    </select>

                                </div>
                                <div className="flex flex-row items-center">
                                    <label className="text-gray-700 dark:text-gray-200" >Show your phone number</label>
                                    <input defaultChecked={showPhone} onChange={(e) => { setShowPhone(!showPhone) }} type="checkbox" className="block  mx-4 h-5 w-5 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                </div>
                            </div>
                            <div className=' w-full mt-4 gap-4 mb-6' >
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
                            <div className="flex justify-center mt-6">
                                <button onClick={event => post(event)} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-neutral-900 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Post</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>


        </div>
    );
}

export async function getServerSideProps(ctx) {
    let token = parseCookies(ctx).authToken || null;

    return {
        props: {
            token: token
        },
    };
}
export default NewPost;