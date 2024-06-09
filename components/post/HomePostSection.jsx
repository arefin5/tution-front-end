
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { RiArrowRightLine } from "react-icons/ri";

function HomePostSection({ token, posts }) {
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        if (posts) {
            setPostData(posts.data);
        }
    }, [posts]);
    console.clear()


    return (
        <>
            <div className={`  w-full   p-4 mb-6 h-full`} >
                        <div className="w-full mb-5 mx-auto mx-auto text-center">
                            <h2 className=" text-2xl lg:text-3xl tutor-title">টিউশন পোস্টসমূহ</h2>
                            <p className='home-top-sub'>Hear from our satisfied clients and learn how we&#x27;ve helped them take <br />
                            their businesses to new heights.</p>
                        </div>
                    </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 lg:gap-4">
                {postData.slice(0, 3).map((item, i) => (
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
           
            <div className='w-full max-w-s flex justify-end'>
                <Link href="/posts">
<div className=' items-center text-center mx-auto  text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2 my-4'>
                        <a className="flex">আরও দেখুন
                        <RiArrowRightLine size={25} className=" transform rotate-360 duration-1000" />

                        </a>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default HomePostSection;