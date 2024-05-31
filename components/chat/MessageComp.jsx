import moment from "moment";
import Swal from "sweetalert2";
import { BsCheckAll } from "react-icons/bs";
import React from "react";

function MessageComp({ own, text, img, time, data }) {
    const openImage = () => {
        Swal.fire({
            imageUrl: img,
            imageHeight: '100%',
            imageWidth: '100%',
            imageAlt: 'image',
            width: '80%',
        })
    }
    return (
        <>
            <div className={`${own == true ? 'flex  w-full mt-2 space-x-3 max-w-xs ml-auto justify-end' : 'flex  w-full mt-2 space-x-3 max-w-xs'}`}>
                <div className={``}>
                    <div className={`${own == true ? ' bg-rose-700 text-white p-3 rounded-l-lg rounded-br-lg' : 'bg-gray-300 dark:bg-gray-700 dark:text-white p-3 rounded-r-lg rounded-bl-lg '} `}>
                        <p className="text-md break-all">{text}</p>
                        {img !== null && img !== '' ?
                            <img onClick={openImage} className=" w-auto h-44 rounded-md mt-2" src={img} alt="" />
                            : <></>
                        }
                    </div>
                    <div style={{ 'fontSize': '8pt', }} className={`${own == true ? ' text-right' : 'text-left'} flex justify-between mb-1 text-gray-800/80 dark:text-gray-200/50`}>
                        <p>
                            {moment(time).fromNow()}
                        </p>
                        {own == true &&
                            <BsCheckAll className={`w-4 h-4 ml-3 ${data?.seen ? 'text-rose-600 ' : ''}`} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MessageComp;