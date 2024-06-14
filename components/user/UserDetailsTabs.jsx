
"use-client";
import Image from "next/image";
import React from "react";
import { BiBookBookmark, BiLike } from "react-icons/bi";
import { BsGenderMale } from "react-icons/bs";
import {
  FaCalendarAlt,
  FaGraduationCap,
  FaRegClock,
  FaStar,
} from "react-icons/fa";
import {  GrUserExpert } from "react-icons/gr";
import {
  MdCall,
  MdMarkEmailUnread,
  MdOutlineLocationOn,
  MdOutlineMessage,
  MdShare,
} from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";
import { VscKebabVertical } from "react-icons/vsc";

const Tabs = ({ data, rating }) => {
  const userInfo = data.data;

  const [openTab, setOpenTab] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);
  const [showContactModal, setShowContactModal] = React.useState(false);
  const [currentRating, setCurrentRating] = React.useState(0);

  const calculateDaysAgo = (dateString) => {
    const createdDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - createdDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  let profileImg;
  if (!userInfo?.avatarImg || userInfo?.avatarImg === "") {
    profileImg = userInfo?.gender == "male" ? `/boy.svg` : `/girl.svg`;
  } else {
    profileImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userInfo?.avatarImg}`;
  }

  const afterStyles = {
    content: "''",
    position: 'absolute',
    left: '0',  
    bottom: '-18px',
    width: '100%',
    height: '4px',
    backgroundColor: '#10B981', // Tailwind green-500
  };
  return (
    <>
      <div className="flex flex-wrap ml-8">
        <div className="w-full">
          <ul className="flex mb-0 list-none pt-3 pb-4 flex-row" role="tablist">
            <li className="flex-auto text-center">
              <a
                className={
                  "text-md font-semibold px-1 md:px-5 block leading-normal " +
                  (openTab === 1 ? "text-green-500 " : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#"
                role="tablist"
                style={openTab === 1 ? { position: 'relative' } : {}}
              >
                {openTab === 1 && <span style={afterStyles} />}
                Details
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md font-semibold px-1 md:px-5 block leading-normal " +
                  (openTab === 2 ? "text-green-500 " : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"style={openTab === 2 ? { position: 'relative' } : {}}
              >
                {openTab === 2 && <span style={afterStyles} />}
                Education
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md font-semibold px-1 md:px-5 block leading-normal " +
                  (openTab === 3 ? "text-green-500 " : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"style={openTab === 3 ? { position: 'relative' } : {}}
              >
                {openTab === 3 && <span style={afterStyles} />}
                Experience
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md font-semibold px-1 md:px-5 block leading-normal " +
                  (openTab === 4 ? "text-green-500 " : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"style={openTab === 4 ? { position: 'relative' } : {}}
              >
                {openTab === 4 && <span style={afterStyles} />}
                Reviews
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border-t border-black">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"}>
                  <div className="flex flex-row">
                    {userInfo?.gender && (
                      <p className="mx-2 flex items-center capitalize">
                        <BsGenderMale className="mr-1" />
                        {userInfo?.gender}
                      </p>
                    )}
                    {userInfo?.age && (
                      <p className="mx-2 flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        Joined on {userInfo?.age}
                      </p>
                    )}
                  </div>
                  <p className="text-lg mt-3">{userInfo?.bio}</p>
                  <div className="mt-3">
                    {userInfo?.subjects && (
                      <div className="my-3">
                        <h5 className="flex items-center font-semibold">
                          <BiBookBookmark className="mr-1" />
                          Tuition Subjects:
                        </h5>
                        <p>{userInfo?.subjects}</p>
                      </div>
                    )}
                    {userInfo?.class && (
                      <div className="my-3">
                        <h5 className="flex items-center font-semibold">
                          <FaRegClock className="mr-1" />
                          Preferable Class:
                        </h5>
                        <p>{userInfo?.class}</p>
                      </div>
                    )}
                    {userInfo?.area && (
                      <div className="my-3">
                        <h5 className="flex items-center font-semibold">
                          <MdOutlineLocationOn className="mr-1 text-2xl" />
                          Preferable Area:
                        </h5>
                        <p>{userInfo?.area}</p>
                      </div>
                    )}
                    {userInfo?.email && (
                      <div className="my-3">
                        <h5 className="flex items-center font-semibold">
                          <MdMarkEmailUnread className="mr-1 text-2xl" />
                          Email:
                        </h5>
                        <p>{userInfo?.email}</p>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowContactModal(true)}
                        className="text-slate-500 flex-shrink-0 border-2 p-3 rounded-full"
                      >
                        <SiGooglemessages />
                      </button>
                    </div>

                    {/* Modal Start */}

                    {showContactModal ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none py-20">
                          <div className="relative w-96">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                              {/*header*/}

                              <div className="border border-black rounded">
                                <div className="flex items-center justify-between mt-8 my-3 p-2">
                                  <h4>Rank: 542</h4>{" "}
                                  <div className="flex items-center justify-center">
                                    <span className="p-2 rounded mx-1 bg-slate-100">
                                      <BiLike />
                                    </span>
                                    <span className="p-2 rounded mx-1 bg-slate-100">
                                      <MdShare />
                                    </span>
                                    <span className="p-2 rounded mx-1 bg-slate-100">
                                      <VscKebabVertical />
                                    </span>
                                  </div>
                                </div>
                                <div className="border-t border-black">
                                  <div className="flex items-center p-2 my-2">
                                    <span className="text-lg mr-2">
                                      <MdCall className="text-xl" />
                                      {"  "}
                                    </span>
                                    {userInfo?.phone}
                                  </div>
                                </div>
                                <div className="border-t border-black">
                                  <div className="flex items-center p-2 my-2">
                                    <span className="text-lg mr-2">
                                      <MdOutlineMessage className="text-xl" />
                                      {"  "}
                                    </span>
                                    Message
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                                <button
                                  className="text-red-500 hover:text-red-800 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none"
                                  type="button"
                                  onClick={() => setShowContactModal(false)}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"}>
                  {userInfo?.educationalQualification && (
                    <div className="my-3">
                      <h5 className="flex items-center font-semibold">
                        <FaGraduationCap className="mr-1 text-2xl" />
                        Educational Qualification:
                      </h5>
                      <p>{userInfo?.educationalQualification}</p>
                    </div>
                  )}
                  {userInfo?.experience && (
                    <div className="my-3">
                      <h5 className="flex items-center font-semibold">
                        <GrUserExpert className="mr-1 text-2xl" />
                        Experience:
                      </h5>
                      <p>{userInfo?.experience}</p>
                    </div>
                  )}
                </div>
                <div className={openTab === 3 ? "block" : "hidden"}>
                  {userInfo?.experience && (
                    <div className="my-3">
                      <h5 className="flex items-center font-semibold">
                        <GrUserExpert className="mr-1 text-2xl" />
                        Experience:
                      </h5>
                      <p>{userInfo?.experience}</p>
                    </div>
                  )}
                </div>
                <div className={openTab === 4 ? "block" : "hidden"}>
                  {userInfo?.reviews?.map((review, index) => (
                    <div key={index} className="border rounded mb-3 p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Image
                            src={profileImg}
                            alt="profile image"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <h5 className="ml-2 font-semibold">
                            {review.reviewerName}
                          </h5>
                        </div>
                        <p>{calculateDaysAgo(review.createdAt)} days ago</p>
                      </div>
                      <div className="mt-2">
                        <p>{review.comment}</p>
                        <div className="flex mt-2">
                          {[...Array(5)].map((star, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
