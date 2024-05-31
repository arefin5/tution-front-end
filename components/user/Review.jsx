import axios from 'axios';
import moment from 'moment/moment';
import React from 'react';
import { MdDelete } from 'react-icons/md';
import StarRatings from 'react-star-ratings';
import Alert from 'sweetalert2';

function Review({ rate, userId, token, refresh }) {
    const ServerRoot = process.env.NEXT_PUBLIC_BACKEND_URL
    const ApiServer = process.env.NEXT_PUBLIC_API_URL;
    let profileImg;
    if (!rate.postedBy || !rate.postedBy.avatarImg || rate.postedBy.avatarImg === "") {
        if (!rate.postedBy) {

            profileImg = `/boy.svg`
        } else {

            if (rate.postedBy.gender == 'male') {
                profileImg = `/boy.svg`
            } else if (rate.postedBy.gender == "female") {
                profileImg = `/girl.svg`
            } else {
                profileImg = `/boy.svg`
            }
        }
    } else {
        profileImg = `${ServerRoot}/${rate.postedBy.avatarImg}`
    }
    const deleteRating = async (e) => {
        e.preventDefault()
        Alert.fire({
            title: "Are you sure?",
            text: "Do you want to delete?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor:"#e11d48",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${ApiServer}/user/rate/${rate?._id}`, {
                        headers: {
                            token: token,
                        },
                    })

                    .then((res) => {
                        refresh()
                        Alert.fire({
                            title: "Success",
                            text: "Your rating deleted",
                            icon: "success",
                            confirmButtonColor: "#e11d48",
                            confirmButtonText: "Ok",
                        });
                    })
                    .catch(function (error) {
                        Alert.fire({
                            icon: "error",
                            title: "Error...",
                            text: error,
                        });
                    });
            }
        });
    }

    return (
        <div className="w-full mx-auto mb-4 overflow-hidden bg-gray-100 rounded-lg dark:bg-neutral-900">
            <div className="p-2">
                <div>
                    <div className='flex justify-between items-center'>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <img className="object-cover h-8 rounded-full" src={profileImg} alt="Avatar" />

                                <a className="mx-2 font-semibold text-gray-700 dark:text-gray-200">{rate?.postedBy ? rate.postedBy.name : 'Deleted user'}</a>

                            </div>
                            <span className="mx-1 text-[8pt] text-gray-600 dark:text-gray-300">{moment(rate?.updatedAt).fromNow()}</span>
                        </div>
                        <div className="flex items-center flex-row" >

                            <div className="flex items-center">
                                <StarRatings
                                    rating={rate.stars}
                                    starRatedColor="#e11d48"
                                    starDimension='15px'
                                    starSpacing='1px'
                                    numberOfStars={5}
                                    name='rating'
                                />
                            </div>
                            {
                                (rate.postedBy._id == userId) &&
                                <div className="flex items-center">
                                    <button onClick={(event) => { deleteRating(event) }}
                                        className="h-10 w-10 flex justify-center items-center rounded-full text-red-500">
                                        <MdDelete className="h-8 w-8 " />
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{rate.desc}</p>
                </div>
            </div>
        </div>
    );
}

export default Review;