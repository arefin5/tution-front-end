// import axios from "axios";
// import head from 'next/head'
// import React from "react";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";

// function ContactUs() {
//     const [name, setName] = useState('');
//     const [company, setCompany] = useState('');
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');
//     const [subjects, setSubjects] = useState('');
//     const [desc, setDesc] = useState('');
//     const [lan, setLan] = useState(0);
//     const [lon, setLon] = useState(0);

//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(position => {
//                 setLan(position.coords.latitude);
//                 setLon(position.coords.longitude);
//             });
//         }
//     }, []);
//     const data = {
//         name: name,
//         company: company,
//         phone: phone,
//         email: email,
//         subjects: subjects,
//         lan: lan,
//         lon: lon,
//         desc: desc,
//     }
//     const submit = (e) => {
//         e.preventDefault();
//         if (lan == 0 || lon == 0) {
//             Swal.fire({
//                 title: 'Location is required',
//                 text: "Please allow the location access from your browser",
//                 icon: 'error',
//                 confirmButtonColor: "#e11d48",
//                 confirmButtonText: 'Ok'
//             })
//         } else {
//             axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, data, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }).then(() => {
//                 setName('');
//                 setCompany('');
//                 setPhone('');
//                 setEmail('');
//                 setSubjects('');
//                 setDesc('');
//                 Swal.fire({
//                     title: 'Success',
//                     text: "Thanks for contacting us",
//                     confirmButtonColor: "#e11d48",
//                     confirmButtonText: 'Ok'
//                 })
//             })
//         }
//     }
//     return (
//         <div className='flex 2xl:flex-row  xl:flex-row 
//          lg:flex-row md:flex-col sm:flex-col flex-col '>
//             <head>
//                 <title>যোগাযোগ করুন </title>
//             </head>
//             <div className="w-full px-12 md:px-8 mx-auto  lg:mb-8 md:mb-6 sm:mb-4 mb-2">
//                 <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
//                     <div className="container px-12 py-16 mx-auto">
//                         <div className="mb-8 md:mb-12">
//                             <h2 className="text-gray-800 dark:text-gray-200 
//                             text-2xl lg:text-3xl font-bold  mb-4 md:mb-6">যোগাযোগ করুন</h2>
//                             <section className="max-w-4xl p-6 mx-auto ">
//                                 <form>
//                                 <h2 className="text-gray-800 dark:text-gray-200 
//                             text-2xl lg:text-3xl font-bold  mb-4 md:mb-6">যোগাযোগ করুন</h2>
//                                     <div className='mt-4'>
//                                         <label className="text-gray-700 dark:text-gray-200" >Name</label>
//                                         <input value={name} onChange={(event) => { setName(event.target.value) }} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-neutral-200 border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
//                                     </div>

//                                     <div className='mt-4'>
//                                         <label className="text-gray-700 dark:text-gray-200" >Company</label>
//                                         <input value={company} onChange={(event) => { setCompany(event.target.value) }} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-neutral-200 border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
//                                     </div>
//                                     <div className='mt-4'>
//                                         <label className="text-gray-700 dark:text-gray-200" >Email</label>
//                                         <input value={email} onChange={(event) => { setEmail(event.target.value) }} type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-neutral-200 border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
//                                     </div>
//                                     <div className='mt-4'>
//                                         <label className="text-gray-700 dark:text-gray-200" >Phone</label>
//                                         <input value={phone} onChange={(event) => { setPhone(event.target.value) }} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-neutral-200 border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
//                                     </div>
//                                     <div className='mt-4'>
//                                         <label className="text-gray-700 dark:text-gray-200" >Subjects</label>
//                                         <input value={subjects} onChange={(event) => { setSubjects(event.target.value) }} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-neutral-200 border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
//                                     </div>
//                                     <div className='mt-4'>
//                                         <label className="text-gray-700 dark:text-gray-200" >Description</label>
//                                         <textarea value={desc} onChange={(event) => { setDesc(event.target.value) }} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-neutral-200 border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
//                                     </div>
//                                     <div className="flex justify-center mt-6">
//                                         <button onClick={event => submit(event)} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-rose-600 rounded-md hover:bg-rose-700 focus:outline-none ">Submit</button>
//                                     </div>
//                                 </form>
//                             </section>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default ContactUs;
import axios from "axios";
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function ContactUs() {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [subjects, setSubjects] = useState('');
    const [desc, setDesc] = useState('');
    const [lan, setLan] = useState(0);
    const [lon, setLon] = useState(0);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setLan(position.coords.latitude);
                setLon(position.coords.longitude);
            });
        }
    }, []);

    const data = {
        name: name,
        company: company,
        phone: phone,
        email: email,
        subjects: subjects,
        lan: lan,
        lon: lon,
        desc: desc,
    }

    const submit = (e) => {
        e.preventDefault();
        if (lan === 0 || lon === 0) {
            Swal.fire({
                title: 'Location is required',
                text: "Please allow the location access from your browser",
                icon: 'error',
                confirmButtonColor: "#e11d48",
                confirmButtonText: 'Ok'
            });
        } else {
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                setName('');
                setCompany('');
                setPhone('');
                setEmail('');
                setSubjects('');
                setDesc('');
                Swal.fire({
                    title: 'Success',
                    text: "Thanks for contacting us",
                    confirmButtonColor: "#e11d48",
                    confirmButtonText: 'Ok'
                });
            });
        }
    }

    return (
        <div className=' bg-white flex flex-col 2xl:flex-row xl:flex-row lg:flex-row md:flex-col sm:flex-col'>
            <Head>
                <title>যোগাযোগ করুন</title>
            </Head>
            <div className=" w-full px-12 md:px-8 mx-auto lg:mb-8 md:mb-6 sm:mb-4 mb-2">
                <div className="">
                    <div className="container px-12 py-16 mx-auto">
                        <div className="mb-8 md:mb-12">
                            <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold mb-4 md:mb-6">যোগাযোগ করুন</h2>
                            <section className="max-w-4xl p-6 mx-auto">
                                <form>
                                    <div className='mt-4'>
                                        <label className="text-gray-700 dark:text-gray-200">আপনার নাম </label>
                                        <input value={name} onChange={(event) => { setName(event.target.value) }} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-neutral-200 border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                    </div>

                                    {/* <div className='mt-4'>
                                        <label className="text-gray-700 dark:text-gray-200">Company</label>
                                        <input value={company} onChange={(event) => { setCompany(event.target.value) }} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-neutral-200 border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                    </div> */}
                                    {/* <div className='mt-4'>
                                        <label className="text-gray-700 dark:text-gray-200">Email</label>
                                        <input value={email} onChange={(event) => { setEmail(event.target.value) }} type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-neutral-200 border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                    </div> */}
                                    <div className='mt-4'>
                                        <label className="text-gray-700 dark:text-gray-200">ফোন নাম্বার </label>
                                        <input value={phone} onChange={(event) => { setPhone(event.target.value) }}
                                            type="text"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-neutral-200 border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                    </div>
                                    {/* <div className='mt-4'>
                                        <label className="text-gray-700 dark:text-gray-200">Subjects</label>
                                        <input value={subjects} onChange={(event) => { setSubjects(event.target.value) }} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-neutral-200 border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                    </div> */}
                                    <div className='mt-4'>
                                        <label className="text-gray-700 dark:text-gray-200">মেসেজ/ যোগাযোগের কারন </label>
                                        <textarea value={desc} onChange={(event) => { setDesc(event.target.value) }} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-neutral-200 border border-gray-200 rounded-md dark:bg-neutral-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                    </div>
                                    <div className="flex justify-center mt-6">
                                        <button onClick={event => submit(event)} className="px-6 py-4
                                         leading-5 text-white transition-colors duration-200 transform
                                          bg-green-600 rounded-md hover:bg-rose-700 focus:outline-none">সাবমিট করুন </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full px-12 md:px-8 mx-auto lg:mb-8 md:mb-6 sm:mb-4 mb-2">
                <div className="">
                    <div className="container px-12 py-16 mx-auto">
                        <div className="mb-8 md:mb-12">
                            <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
                            </h2>
                            <section className="max-w-4xl p-6 mx-auto">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/2 p-4">

                                    </div>
                                    <div className="md:w-1/2 p-4">

                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">@ ইমেইল </h3>
                                    <p className="text-gray-700 dark:text-gray-300">tutionappbd@gmail.com</p>
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                                        ফোন নাম্বার </h3>
                                    <p className="text-gray-700 dark:text-gray-300">+৮৮০১৭৫০৬২১৬২৫</p>
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                                        ঠিকানা </h3>
                                    <p className="text-gray-700 dark:text-gray-300">  ৩০/৫ ব্লক-বি,পলাশবাড়ী, আশুলিয়া
                                        <br />
                                        সাভার ,ঢাকা-১৩৪৯
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
