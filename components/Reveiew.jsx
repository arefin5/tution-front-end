
import { FaRegStar } from "react-icons/fa";
import Image from "next/image";
function Reveiew() {
    return (
        <div className=" rounded-lg py-6 sm:py-8 lg:py-12">
            <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
                <div className="mb-8 md:mb-12 text-center">
                    <h2 className="tutor-tit mx-auto text-2xl font-bold">
                        কেন আমরাই শিক্ষার্থী, অভিভাবক <br />
                        ও টিউটরদের প্রথম পছন্দ?
                    </h2>
                    <p className="mt-2">
                        Hear from our satisfied clients and learn how weve helped them take their businesses to new heights.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col justify-center items-start bg-white dark:bg-neutral-800 rounded-lg p-4 lg:p-8">
                        <div className="text-sm text-gray-800
                        
                         dark:text-gray-200 sm:text-base font-semibold mb-4">
                            The insurance company handled everything quickly and efficiently, and I was able to get a new car without having to worry about the cost.
                        </div>
                        <br />
                        <div className="flex items-center border rounded-full px-2 py-1">
                            <FaRegStar color="green" />
                            <span className="ml-1 text-sm font-semibold">5.0</span>
                        </div>
                        
                        <div className="flex">
                        <div className="mt-4 text-left">
                            <Image  src="/Avatar (2).png"
                                width={40}
                                height={30}

                            />
                            </div>
                            <div className="mt-4 text-left">
                            <p className="text-sm font-medium">Skylar Siphron</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Behance</p>
                        </div>
                        </div>
                       
                    </div>
                    <div className="flex flex-col justify-center items-start bg-white dark:bg-neutral-800 rounded-lg p-4 lg:p-8">
                      <div></div>
                        <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold mb-4">
                            I was so impressed with the customer service I received when I filed a claim for my home insurance.
                            The agent was very helpful and understanding, and I felt like my claim was handled quickly.
                        </div>
                        <div className="flex items-center border rounded-full px-2 py-1">
                            <FaRegStar color="green" />
                            <span className="ml-1 text-sm font-semibold">5.0</span>
                        </div>
                        <div className="flex">
                        <div className="mt-4 text-left">
                            <Image  src="/Avatar.png"
                                width={40}
                                height={30}

                            />
                            </div>
                            <div className="mt-4 text-left">
                            <p className="text-sm font-medium">Nolan Korsgaard</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Adobe</p>
                        </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-col justify-center bg-white dark:bg-neutral-800 items-start  rounded-lg p-4 lg:p-8">
                       <Image src="/rev.png"

                        width={30}
                        height={20}
                       />
                        <div className="text-sm text-gray-800 dark:text-gray-200 sm:text-base font-semibold mb-4">
                            I had a medical emergency a few years ago, and I was so grateful. The insurance company covered all of my medical expenses, and I didn’t have to worry about going bankrupt.
                        </div>
                        <div className="flex items-center border rounded-full px-2 py-1">
                            <FaRegStar color="green" />
                            <span className="ml-1 text-sm font-semibold">5.0</span>
                        </div>
                        <div className="flex">
                        <div className="mt-4 text-left">
                            <Image  src="/Avatar (1).png"
                                width={40}
                                height={30}

                            />
                            </div>
                            <div className="mt-4 text-left">
                            <p className="text-sm font-medium">Alfredo Philips</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Dribbble</p>
                        </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reveiew;
