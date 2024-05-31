import Link from "next/link";
import React from "react";

function HomeHero() {
    return (
        <div className="bg-white dark:bg-neutral-800 rounded-lg">
            <div className="container px-6 md:px-12 py-16 mx-auto">
                <div className="items-center lg:flex">
                    <div className="w-full lg:w-1/2">
                        <div className="">
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 lg:text-2xl">টিউশন খোঁজায় আসুক নতুন মাত্রা </p><br />
                            <p className="text-5xl font-semibold text-gray-800 dark:text-gray-200 lg:text-7xl">আনন্দময় হোক</p><br />
                            <p className="text-5xl font-semibold text-rose-600 lg:text-7xl">সবার শিক্ষাযাত্রা </p>
                            <div className="flex flex-col mt-8 space-y-3 lg:space-y-0 lg:flex-row">
                                <Link href='/tutors'>
                                    <a className="inline-block bg-rose-600 hover:bg-rose-700 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                                        <p className="mx-auto">Explore</p>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                        <img className="w-full h-full max-w-md" src="/homeHero.svg" alt="#" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export async function getServerSideProps(context) {

}

export default HomeHero;