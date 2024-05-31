
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

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
            <div className="flex justify-between items-end gap-4 mb-6">
                <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold">Recent Posts</h2>
                <Link href="/posts">
                    <a className="w-30 inline-block bg-rose-600 hover:bg-rose-700 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2">All Posts</a>
                </Link>
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
            <div className="flex justify-center items-end gap-4 my-6">
                <Link href="/posts">
                    <a className="w-30 inline-block bg-rose-600 hover:bg-rose-700 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2">All Posts</a>
                </Link>


            </div>
        </>
    );
}

export default HomePostSection;