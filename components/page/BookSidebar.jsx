import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

function BookSidebar({ data, cover }) {
    const [img, setImg] = useState();
    const [name, setName] = useState();
    const [PDF, setPDF] = useState();





    useEffect(() => {

        if (data) {
            setPDF(data.pdf)
        }
        return () => { };
    }, [data]);


    return (
        <div className="w-full mx-auto">
            <div className='w-full mb-8 mx-auto'>

                <div className="flex flex-col items-center bg-white dark:bg-neutral-800 rounded-lg p-4 lg:p-8">
                    <div className=" aspect-video rounded w-full  bg-neutral-200 dark:bg-neutral-800  overflow-hidden  mb-2 md:mb-4">
                        <img src={cover} loading="lazy" alt="Photo by Elizeu Dias" className="w-full h-full object-cover object-center" />
                    </div>

                    <div>
                        <hr className="my-4"/>
  

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookSidebar;