import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import StarRatings from 'react-star-ratings';
import Swal from 'sweetalert2';

function WriteReview({ userId, token, updateRatings, totalRating,title }) {
    const [rating, setRating] = useState(0);
    const [desc, setDesc] = useState('');
    const changeRating = (newRating, name) => {
        setRating(newRating)
    }
    const handleRate = async (e) => {
        e.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/rate/${userId}`, { stars: rating, desc: desc }, {
            headers: {
                token: token
            }
        }).then(async (res) => {
            setRating(0)
            setDesc('')
            updateRatings()
            Swal.fire({
                icon: 'success',
                title: 'Successful',
                text: res.data.msg,
            })
        }).catch((res) => {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: res.data.msg,
            })
        })
    }

    return (
        <div className='mb-6'>
            <div className="flex justify-between items-center w-full">
                <div className="w-1/2">
                    <p className="mt-2 text-xl md:text-3xl text-left font-semibold text-gray-800 dark:text-gray-200 md:mt-0 ">{title}</p>
                    <p className="mt-2  text-sm text-left font-semibold text-gray-800 dark:text-gray-200 md:mt-0 ">Tell us what you think</p>
                </div>
                <div className=" w-1/2 flex justify-end mb-3 px-4 ">
                    <div className="flex flex-col  justify-center">
                        <div className='flex justify-center'>
                            <p className='text-gray-800 text-5xl md:text-7xl dark:text-gray-200'>{Number((totalRating).toFixed(1))}</p>
                        </div>
                        <div className='flex justify-center'>
                            <StarRatings
                                rating={totalRating}
                                starRatedColor="#e11d48"
                                starDimension='18px'
                                starSpacing='1px'
                                numberOfStars={5}
                                name='rating'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mt-4 flex justify-center">
                <StarRatings
                    rating={rating}
                    changeRating={changeRating}
                    starRatedColor="#e11d48"
                    starEmptyColor="#171717"
                    starDimension='40px'
                    starSpacing='1px'
                    starHoverColor="#e11d48"
                    numberOfStars={5}
                    name='rating'
                /><br />
            </div>
            <div className="w-full mt-4">
                <textarea value={desc} onChange={(event) => { setDesc(event.target.value) }} className="block w-full min-h-max h-34 px-4 py-2 text-neutral-700 bg-white border rounded-md dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></textarea>
            </div>
            <div className="flex justify-center mt-4">
                <button onClick={(event) => { handleRate(event) }} className="px-8 py-2 text-white transition-colors duration-200 transform bg-rose-600 rounded-md hover:bg-rose-700 focus:outline-none focus:bg-rose-700">Rate</button>
            </div>
        </div>
    );
}

export default WriteReview;