import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import { AppContext } from "../../_app";
import Head from "next/head";
import React from "react";
import Resizer from "react-image-file-resizer";
import Alert from "sweetalert2";

function Verify({ userData, token }) {
    const { setUser } = useContext(AppContext);
    // const ApiServer = process.env.NEXT_PUBLIC_API_URL
    // const ServerRoot = process.env.NEXT_PUBLIC_ROOT_URL


    const photoRef = useRef(null);
    const nidRef = useRef(null);
    const studentCardRef = useRef(null);
    const officePhotoRef = useRef(null);
    const router = useRouter();



    const [sending, setSending] = useState(false);
    const [photoNew, setPhotoNew] = useState(``);
    const [nidNew, setNidNew] = useState(``);
    const [studentCardNew, setStudentCardNew] = useState(``);
    const [officePhotoNew, setOfficePhotoNew] = useState(``);
    const [officeLocation, setOfficeLocation] = useState(``);


    //-----------auth-check
    useEffect(() => {
        if (!token || token == null) {
            router.push("/login");
        } else {
            if (userData) {

            } else {
                router.push("/login");
            }
        }
    }, []);


    const resizePhoto = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                1200,
                1200,
                "jpeg",
                80,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });


    const upload = async (e, t) => {
        const file = e.target.files[0];
        if (file) {
            if (
                file.type == "image/png" ||
                file.type == "image/jpeg" ||
                file.type == "image/jpg"
            ) {
                if (t == "photo") {
                    await resizePhoto(file).then((data) => {
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(data);
                        fileReader.onload = (event) => {
                            // @ts-ignore
                            setPhotoNew(event.target.result);
                        };
                    });
                } else if (t == "nid") {
                    await resizePhoto(file).then((data) => {
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(data);
                        fileReader.onload = (event) => {
                            // @ts-ignore
                            setNidNew(event.target.result);
                        };
                    });
                } else if (t == "student") {
                    await resizePhoto(file).then((data) => {
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(data);
                        fileReader.onload = (event) => {
                            // @ts-ignore
                            setStudentCardNew(event.target.result);
                        };
                    });
                } else if (t == "office") {
                    await resizePhoto(file).then((data) => {
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(data);
                        fileReader.onload = (event) => {
                            // @ts-ignore
                            setOfficePhotoNew(event.target.result);
                        };
                    });
                }
            } else {
                Alert.fire({
                    title: "Oops",
                    text: "Only PNG and JPEG format is supported.",
                    icon: "error",
                    confirmButtonColor: "#6366f1",
                    confirmButtonText: "Ok",
                    timer: 1500,
                });
            }
        }
    };

    //---------Save handler

    const data = {
        photo: photoNew,
        nid: nidNew,
        student: studentCardNew,
        office: officePhotoNew,
        location: officeLocation,
    }

    const handleSubmit = (e) => {
        setSending(true);
        axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}/verify`,
                data,
                {
                    headers: {
                        token: token,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((res) => {

                if (res.data.status == "failed") {
                    Alert.fire({
                        icon: "error",
                        title: "OOps",
                        text: res.data.msg,
                    });
                    setSending(false);
                    if (res.data.type == "details") {
                        router.push("/settings/profile/edit");
                    }
                } else {
                    setSending(false);
                    if (res.data.url) {
                        router.push(res.data.url);
                    }
                }
            })
            .catch((res) => {
                Alert.fire({
                    title: "OOps",
                    text: res || "Something went wrong",
                    icon: "error",
                    confirmButtonColor: "#6366f1",
                    confirmButtonText: "Ok",
                    timer: 1500,
                });
            });
    };


    console.log(userData)

    return (
        <div className="flex 2xl:flex-row  xl:flex-row  lg:flex-row md:flex-col sm:flex-col flex-col ">
            <Head>
                <title>TuitionApp - Edit account</title>
            </Head>
            <div className=" h-full w-full lg:mb-8 md:mb-6 sm:mb-4 mb-2">
                <div className=" w-full px-4  md:px-8 mx-auto">

                    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Verification form</h2>
                        <div>
                            {
                                userData.user.role == 'media' &&
                                <>
                                    <div>
                                        <label className="text-gray-700 dark:text-gray-200" >Office Location</label>
                                        <input value={officeLocation} onChange={e => setOfficeLocation(e.target.value)} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            ref={officePhotoRef}
                                            onChange={(e) => upload(e, "office")}
                                            className="hidden"
                                        />
                                        <div className=" w-full grid md:grid-cols-2 grid-cols-1 justify-between items-end my-10 border-t-2 border-rose-300 py-4 ">

                                            <div className="flex items-center my-2 gap-4 justify-between">
                                                <p className="text-gray-700 dark:text-gray-200" >Office  Photo</p>
                                                <button
                                                    onClick={() => {
                                                        // @ts-ignore
                                                        officePhotoRef.current.click();
                                                    }}
                                                    className="px-6 py-2 rounded-lg text-gray-100 bg-rose-600 flex justify-center items-center"
                                                >
                                                    <p>Select</p>
                                                </button>
                                            </div>
                                            {
                                                officePhotoNew !== `` &&
                                                <img src={officePhotoNew || ""} className='w-64 my-2 mx-auto' alt="Cover Img" />
                                            }
                                        </div>
                                    </div>
                                </>

                            }
                            {
                                userData.user.role == 'tutor' &&
                                <>

                                    <div>
                                        <input
                                            type="file"
                                            ref={studentCardRef}
                                            onChange={(e) => upload(e, "student")}
                                            className="hidden"
                                        />
                                        <div className=" w-full grid md:grid-cols-2 grid-cols-1 justify-between items-end my-10 border-t-2 border-rose-300 py-4 ">

                                            <div className="flex items-center my-2 gap-4 justify-between">
                                                <p className="text-gray-700 dark:text-gray-200" >Student Card</p>
                                                <button
                                                    onClick={() => {
                                                        // @ts-ignore
                                                        studentCardRef.current.click();
                                                    }}
                                                    className="px-6 py-2 rounded-lg text-gray-100 bg-rose-600 flex justify-center items-center"
                                                >
                                                    <p>Select</p>
                                                </button>
                                            </div>
                                            {
                                                studentCardNew !== `` &&
                                                <img src={studentCardNew || ""} className='w-64 my-2 mx-auto' alt="Cover Img" />
                                            }
                                        </div>
                                    </div>
                                </>

                            }
                            {
                                (userData.user.role == 'media' || userData.user.role == 'tutor') &&
                                <>

                                    <div>
                                        <input
                                            type="file"
                                            ref={nidRef}
                                            onChange={(e) => upload(e, "nid")}
                                            className="hidden"
                                        />
                                        <div className=" w-full grid md:grid-cols-2 grid-cols-1 justify-between items-end my-10 border-t-2 border-rose-300 py-4 ">

                                            <div className="flex items-center my-2 gap-4 justify-between">
                                                <p className="text-gray-700 dark:text-gray-200" >NID Card</p>
                                                <button
                                                    onClick={() => {
                                                        // @ts-ignore
                                                        nidRef.current.click();
                                                    }}
                                                    className="px-6 py-2 rounded-lg text-gray-100 bg-rose-600 flex justify-center items-center"
                                                >
                                                    <p>Select</p>
                                                </button>
                                            </div>
                                            {
                                                nidNew !== `` &&
                                                <img src={nidNew || ""} className='w-64 my-2 mx-auto' alt="Cover Img" />
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            ref={photoRef}
                                            onChange={(e) => upload(e, "photo")}
                                            className="hidden"
                                        />
                                        <div className=" w-full grid md:grid-cols-2 grid-cols-1 justify-between items-end my-10 border-t-2 border-rose-300 py-4 ">

                                            <div className="flex items-center my-2 gap-4 justify-between">
                                                <p className="text-gray-700 dark:text-gray-200" >Photo</p>
                                                <button
                                                    onClick={() => {
                                                        // @ts-ignore
                                                        photoRef.current.click();
                                                    }}
                                                    className="px-6 py-2 rounded-lg text-gray-100 bg-rose-600 flex justify-center items-center"
                                                >
                                                    <p>Select</p>
                                                </button>
                                            </div>
                                            {
                                                photoNew !== `` &&
                                                <img src={photoNew || ""} className='w-64 my-2 mx-auto' alt="Cover Img" />
                                            }
                                        </div>
                                    </div>
                                </>

                            }
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={(event) => handleSubmit(event)}
                                    className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-neutral-700 rounded-md hover:bg-neutral-600 focus:outline-none focus:bg-neutral-600"
                                >
                                    {sending ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>


        </div>
    );
}
export async function getServerSideProps(ctx) {
    let token = parseCookies(ctx).authToken || null;
    if (token) {
        let res;
        try {
            res = await fetch(`${process.env.API_URL}/my-profile`, {
                headers: {
                    token: token,
                },
            });
        } catch (error) {
            res = await fetch(`${process.env.API_URL}/my-profile`, {
                headers: {
                    token: token,
                },
            });
        }
        const user = await res.json();
        return {
            props: {
                userData: user.user ? user : null,
                token: token,
            },
        };
    } else {
        return {
            props: {
                userData: null,
                token: null,
            },
        };
    }
}

export default Verify;
