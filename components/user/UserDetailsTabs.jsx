"use-client";
import Image from "next/image";
import React from "react";
import { BiBookBookmark, BiLike } from "react-icons/bi";
import { BsGenderMale } from "react-icons/bs";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaGraduationCap,
  FaRegClock,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import { GrCircleInformation, GrUserExpert } from "react-icons/gr";
import {
  MdCall,
  MdCancel,
  MdMarkEmailUnread,
  MdOutlineDoNotDisturb,
  MdOutlineLocationOn,
  MdOutlineMessage,
  MdShare,
} from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";
import { VscKebabVertical } from "react-icons/vsc";

const Tabs = ({ data, rating }) => {
  const userInfo = data.data;

  // console.log({ userInfo });

  // console.log({
  //   ratings: userInfo.ratings,
  //   postedBy: userInfo.ratings[0]?.postedBy,
  // });
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
  if (!userInfo.avatarImg || userInfo.avatarImg === "") {
    profileImg = userInfo.gender == "male" ? `/boy.svg` : `/girl.svg`;
  } else {
    profileImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userInfo.avatarImg}`;
  }
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul className="flex mb-0 list-none pt-3 pb-4 flex-row" role="tablist">
            <li className="flex-auto text-center">
              <a
                className={
                  "text-md font-semibold px-1 md:px-5 block leading-normal " +
                  (openTab === 1 ? "text-green-500" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#"
                role="tablist"
              >
                Details
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md font-semibold px-1 md:px-5 block leading-normal " +
                  (openTab === 2 ? "text-green-500" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Education
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md font-semibold px-1 md:px-5 block leading-normal " +
                  (openTab === 3 ? "text-green-500" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Experience
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-md font-semibold px-1 md:px-5 block leading-normal " +
                  (openTab === 4 ? "text-green-500" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Reviews
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border-t-2 border-black">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"}>
                  <div className="flex flex-row">
                    {userInfo.gender && (
                      <p className="mx-2 flex items-center capitalize">
                        <BsGenderMale className="mr-1" />
                        {userInfo.gender}
                      </p>
                    )}
                    {userInfo.age && (
                      <p className="mx-2 flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        Joined on {userInfo.age}
                      </p>
                    )}
                  </div>
                  <p className="text-lg mt-3">{userInfo.bio}</p>
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

                              <button
                                onClick={() => setShowContactModal(false)}
                                className="absolute top-0 left-0 p-3 m-2 hover:bg-slate-100 rounded-full"
                              >
                                <MdCancel />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                    {/* Modal End */}
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"}>
                  {userInfo?.edu?.map((item, index) => {
                    return (
                      <div
                        key={index + 1}
                        className={
                          "mt-3 border-inherit " +
                          (index === 0 ? "" : "border-t-2")
                        }
                      >
                        <h5 className="flex items-center font-semibold">
                          <FaGraduationCap className="mr-1 text-2xl" />
                          {item?.institute}
                        </h5>
                        <p>{item?.department}</p>
                        <p>{item?.year}</p>
                      </div>
                    );
                  })}
                </div>
                <div className={openTab === 3 ? "block" : "hidden"}>
                  {userInfo?.experience?.map((item, index) => {
                    return (
                      <div key={index + 1}>
                        <h5 className="flex items-center font-semibold">
                          <GrUserExpert className="mr-1 text-2xl" />
                          {item?.title}
                        </h5>
                        <p>{item?.desc}</p>
                        <p>{item?.year}</p>
                      </div>
                    );
                  })}
                </div>
                <div className={openTab === 4 ? "block" : "hidden"}>
                  <div className="grid flex-wrap">
                    <div>
                      <h4 className="flex items-center justify-center text-lg sm:text-2xl">
                        <MdOutlineDoNotDisturb className="mr-1" />
                        অভিযোগ করুন
                      </h4>
                      <h4 className="text-lg sm:text-2xl mt-5">রিটিংস দিন</h4>
                      <p>Tell others what you think</p>
                      <div className="grid justify-center my-4">
                        <div
                          className="inline-block  mx-auto my-5 hover:drop-shadow-md"
                          onClick={() => setShowModal(true)}
                        >
                          <div className="flex items-center justify-center cursor-pointer">
                            <span className="mx-2">
                              <FaRegStar className="text-2xl" />
                            </span>
                            <span className="mx-2">
                              <FaRegStar className="text-2xl" />
                            </span>
                            <span className="mx-2">
                              <FaRegStar className="text-2xl" />
                            </span>
                            <span className="mx-2">
                              <FaRegStar className="text-2xl" />
                            </span>
                            <span className="mx-2">
                              <FaRegStar className="text-2xl" />
                            </span>
                          </div>
                        </div>

                        {/* Modal Start */}

                        {showModal ? (
                          <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none py-20">
                              <div className="relative w-96">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                                  {/*header*/}
                                  <div className="relative">
                                    <Image
                                      src="/tutorbanner.png"
                                      layout="responsive"
                                      width={300}
                                      height={100}
                                      objectFit="cover"
                                      className="rounded-t-lg"
                                    />
                                    <div className="absolute bottom-0 transform -translate-x-1 translate-y-1/4 w-20 h-20 bg-white rounded-full border-4 profile  md:items-center border-white">
                                      <img
                                        src={profileImg}
                                        alt="Profile image"
                                        className="rounded-full"
                                      />
                                    </div>

                                    <button
                                      onClick={() => setShowModal(false)}
                                      className="absolute top-1 left-1 p-5"
                                    >
                                      <FaArrowLeft />
                                    </button>

                                    <div
                                      div
                                      className="grid items-center justify-center mt-16 font-semibold pb-3 border-b"
                                    >
                                      <h5 className="text-center">
                                        {userInfo?.name}
                                      </h5>
                                      <p className="text-base text-center mt-5 text-slate-600">
                                        How was your experience with
                                        <br />
                                        <span className="font-semibold">
                                          {userInfo?.name}
                                        </span>
                                        ?
                                      </p>
                                    </div>
                                  </div>
                                  {/*body*/}
                                  <div className="grid items-center">
                                    <h5 className="text-base text-center mt-5 text-slate-600">
                                      Your overall rating
                                    </h5>
                                    <div className="relative p-6 flex justify-center text-yellow-500 border-b">
                                      {Array.from({ length: 5 }).map(
                                        (_, index) => (
                                          <span
                                            className="text-xl mx-2 cursor-pointer"
                                            key={index}
                                            onClick={() =>
                                              setCurrentRating(index + 1)
                                            }
                                          >
                                            <FaRegStar />
                                          </span>
                                        )
                                      )}
                                    </div>
                                    <div className="p-4">
                                      <p>Add detail review</p>
                                      <textarea
                                        className="textarea textarea-primary w-full bg-slate-200 rounded mt-2"
                                        name="review-desc"
                                        id=""
                                        placeholder="Enter here"
                                      ></textarea>
                                    </div>
                                  </div>
                                  {/*footer*/}
                                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                      className="bg-blue-500 text-white w-full font-bold capitalize text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                      type="button"
                                      onClick={() => setShowModal(false)}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                          </>
                        ) : null}
                        {/* Modal End */}
                      </div>
                    </div>

                    <div className="flex items-center justify-between my-4">
                      <div>
                        <h4 className="text-green-500 my-1  text-lg sm:text-2xl">
                          একটি রিভিও লিখুন
                        </h4>
                        <h4 className="text-black flex items-center my-1  text-lg sm:text-2xl">
                          রিটিংস এবং রিভিউস <GrCircleInformation />
                        </h4>
                      </div>
                      <div className="grid text-center">
                        <h4>{rating || 0}</h4>

                        <div className="flex flex-row text-green-500 text-2xl">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index}>
                              {rating || 0 > index ? (
                                <FaStar color="green" />
                              ) : (
                                <FaRegStar color="green" />
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      {userInfo?.ratings?.map((item, index) => {
                        return (
                          <div key={index + 1}>
                            <div className="flex items-center justify-start mt-10">
                              <div className="flex items-baseline w-full">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item?.postedBy?.avatarImg}`}
                                  alt="Profile image"
                                  className="rounded-full w-10 h-10 mr-2"
                                />
                                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                  <div className="flex w-full md:w-1/2">
                                    <h5 className="text-lg sm:text-xs md:text-lg lg:text-lg text-center">
                                      {item?.postedBy?.name}
                                    </h5>

                                    <p className="ml-5 font-semibold text-sm mt-2">
                                      Create {calculateDaysAgo(item.createdAt)}{" "}
                                      days ago
                                    </p>
                                  </div>
                                  <div className="flex flex-row justify-center md:justify-start md:justify-stretch mt-5 md:mt-0 text-green-500 text-lg lg:text-2xl ml-5 text-center w-full md:w-1/2">
                                    {Array.from({ length: 5 }).map(
                                      (_, index) => (
                                        <span key={index}>
                                          {item?.stars || 0 > index ? (
                                            <FaStar color="green" />
                                          ) : (
                                            <FaRegStar color="green" />
                                          )}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {item?.desc && (
                              <div className="mt-5 p-3 bg-neutral-200 rounded">
                                <p>{item?.desc}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DetailsTabs(data) {
  return (
    <>
      <Tabs data={data} />
    </>
  );
}
