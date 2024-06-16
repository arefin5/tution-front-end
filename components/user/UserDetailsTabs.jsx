
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
import { VscKebabVertical } from "react-icons/vsc";

const Tabs = ({ data, rating }) => {
  const userInfo = data;

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
    position: "absolute",
    left: "0",
    bottom: "-17px",
    width: "100%",
    height: "3px",
    backgroundColor: "#10B981", // Tailwind green-500
  };

  const handleTabClick = (tabIndex, linkId) => {
    setOpenTab(tabIndex);
    const element = document.getElementById(linkId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex flex-wrap md:ml-7 -mt-10 md:-mt-0">
        <div className="w-full">
          <ul className="flex mb-0 list-none pt-3 pb-4 flex-row" role="tablist">
            <li className="flex-auto text-center">
              <a
                className={
                  "font-medium font-['Inter', sans-serif] px-1 text-sm md:text-2xl md:px-5 block leading-normal " +
                  (openTab === 1 ? "text-green-500" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);

                  handleTabClick(1,'link1')
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
                style={openTab === 1 ? { position: "relative" } : {}}
              >
                {openTab === 1 && <span style={afterStyles} />}
                Details
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "font-medium font-['Inter', sans-serif] px-1  text-sm md:text-2xl  md:px-5 block leading-normal " +
                  (openTab === 2 ? "text-green-500" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);

                  handleTabClick(2,'link2')
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
                style={openTab === 2 ? { position: "relative" } : {}}
              >
                {openTab === 2 && <span style={afterStyles} />}
                Education
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "font-medium font-['Inter', sans-serif] px-1  text-sm md:text-2xl  md:px-5 block leading-normal " +
                  (openTab === 3 ? "text-green-500" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);

                  handleTabClick(3,'link3')
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
                style={openTab === 3 ? { position: "relative" } : {}}
              >
                {openTab === 3 && <span style={afterStyles} />}
                Experience
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "font-medium font-['Inter', sans-serif] px-1  text-sm md:text-2xl  md:px-5 block leading-normal " +
                  (openTab === 4 ? "text-green-500" : "text-black")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);

                  handleTabClick(4,'link4')
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
                style={openTab === 4 ? { position: "relative" } : {}}
              >
                {openTab === 4 && <span style={afterStyles} />}
                Reviews
              </a>
            </li>
          </ul>
          <div
            id="link1"
            className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border-t border-black"
          >
            <div className="px-4 py-5 flex-auto top-id">
              <div className="tab-content tab-space">
                <div id="link1">
                  <div className="flex flex-row">
                    {userInfo.gender && (
                      <p
                        className=" text-xl font-['Roboto
', sans-serif] font-normal flex items-center capitalize"

                      >
                        {/* <BsGenderMale className="mr-1" /> */}
                        <Image 
                        src="/man.png"
                        width={21}
                        height={21}
                         className=" Image-rep"
                      />
                        <p className="ml-1 mr-3 ">{userInfo.gender}</p>
                      </p>
                    )}
                    {userInfo.age && (
                      <p
                        className="others  mt-1 mx-2 text-xl font-['Roboto
', sans-serif] font-normal flex items-center"
                      >
                      <Image 
                        src="/calendar.png"
                        width={21}
                        height={21}
                         className=" Image-rep"
                      />
                      <p className="ic-contents">
                      Joined on {userInfo.age}
                      </p>
                        {/* <FaCalendarAlt className="mr-1" /> */}
                        
                      </p>
                    )}
                  </div>
                  <p className="text-lg mt-5 text-[#00000097] leading-6 font-['Inter', sans-serif]">
                    {userInfo.bio}
                  </p>
                  <div className="mt-5">
                    {userInfo?.subjects && (
                      <div className="my-3">
                        <h5
                          className="flex items-center text-xl font-['Roboto
', sans-serif] font-normal leading-6"
                        >
                         <Image 
                        src="/book.svg"
                        width={21}
                        height={21}
                         className="mr-1 Image-rep"
                        
                      />
                          {/* <BiBookBookmark className="mr-1" /> */}
                          <span className"main-content">
                         
                          Tuition Subjects:
                           </span>
                        </h5>
                        <p
                          className="ic-content text-xl font-['Roboto
', sans-serif] font-normal leading-6 text-[#00000097]"
                        >
                          {userInfo?.subjects}
                        </p>
                      </div>
                    )}
                    {userInfo?.class && (
                      <div className="my-3">
                        <h5
                          className="flex items-center text-xl font-['Roboto
', sans-serif] font-normal leading-6"
                        >
                        <Image 
                        src="/clock.png"
                        width={21}
                        height={21}
                        className="mr-1 Image-rep"
                        
                      />
                          {/* <FaRegClock className="mr-1" /> */}
                          Preferable Class:
                        </h5>
                        <p
                          className="ic-content text-xl font-['Roboto
', sans-serif] font-normal leading-6 text-[#00000097]"
                        >
                          {userInfo?.class}
                        </p>
                      </div>
                    )}
                    {userInfo?.area && (
                      <div className="my-3">
                        <h5
                          className="flex items-center text-xl font-['Roboto
', sans-serif] font-normal leading-6"
                        >

                          <MdOutlineLocationOn className="mr-1 text-2xl" />
                          Preferable Area:
                        </h5>
                        <p
                          className="ic-content  text-xl font-['Roboto
', sans-serif] font-normal leading-6 text-[#00000097]"
                        >
                          {userInfo?.area}
                        </p>
                      </div>
                    )}
                    {userInfo?.email && (
                      <div className="my-3">
                        <h5
                          className="flex items-center text-xl font-['Roboto
', sans-serif] font-normal leading-6"
                        >
                          <MdMarkEmailUnread className="mr-1 text-2xl" />
                          Email:
                        </h5>
                        <p
                          className="ic-content text-xl font-['Roboto
', sans-serif] font-normal leading-6 text-[#00000097]"
                        >
                          {userInfo?.email}
                        </p>
                      </div>
                    )}

                    <div className="border my-10 border-[#000000c8] rounded w-auto md:w-[500px]">
                      <div className="flex items-center justify-between mt-8 my-3 p-2">
                        {/* <h4>Rank: 542</h4>{" "} */}
                        <h4></h4> 
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
                  </div>
                </div>
                <div id="link2" className="my-5 mb-10">
                  <h3
                    id="link2"
                    className="text-2xl font-['Roboto
', sans-serif] font-semibold leading-6"
                  >
                    Education
                  </h3>
                  {userInfo?.edu?.map((item, index) => {
                    return (
                      <div
                        key={index + 1}
                        className={
                          "mt-3 border-inherit " +
                          (index === 0 ? "" : "border-t-2")
                        }
                      >
                        <h5
                          className="flex items-center text-xl font-['Roboto
', sans-serif] font-normal leading-6"
                        >
                          <FaGraduationCap className="mr-1 text-2xl" />
                          {item?.institute}
                        </h5>
                        <p
                          className="text-xl ic-content  font-['Roboto
', sans-serif] font-normal leading-6 text-[#00000097]"
                        >
                          {item?.department}
                        </p>
                        <p
                          className="text-xl ic-content  font-['Roboto
', sans-serif] font-normal leading-6 text-[#00000097]"
                        >
                          {item?.year}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div id="link3" className="my-5 mb-10">
                  <h3
                    className="text-2xl font-['Roboto
', sans-serif] font-semibold leading-6"
                  >
                    Experience
                  </h3>
                  {userInfo?.experience?.map((item, index) => {
                    return (
                      <div key={index + 1}>
                        <h5
                          className=" flex items-center text-xl font-['Roboto
', sans-serif] font-normal leading-6"
                        >
                          <GrUserExpert className="mr-1 text-2xl" />
                          {item?.title}
                        </h5>
                        <p
                          className="ic-content text-xl font-['Roboto
', sans-serif] font-normal leading-6 text-[#00000097]"
                        >
                          {item?.desc}
                        </p>
                        <p
                          className=" text-xl font-['Roboto
', sans-serif] font-normal leading-6 text-[#00000097]"
                        >
                          {item?.year}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div id="link4">
                  <div className="grid flex-wrap">
                    <div>
                      <h4 className="flex items-center justify-center text-xl font-['Roboto', sanes-serif] text-[#00000097] font-semibold">
                        <MdOutlineDoNotDisturb className="mr-1" />
                        অভিযোগ করুন
                      </h4>
                      <h4 className="text-2xl md:text-3xl font-['Roboto', sanes-serif] font-semibold mt-5">
                        রিটিংস দিন
                      </h4>
                      <p
                        className="text-xl font-['Ruda
', sans-serif] font-normal leading-10 text-[#00000097]"
                      >
                        Tell others what you think
                      </p>
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
                                        className="textarea textarea-primary w-full bg-slate-200 rounded mt-2 p-2"
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

                    <div className="flex flex-col md:flex-row items-center justify-between my-4">
                      <div>
                        <h4
                          className="text-green-500 my-1 text-xl md:text-2xl font-['Roboto
', sans-serif] font-normal leading-9"
                        >
                          একটি রিভিও লিখুন
                        </h4>
                        <h4
                          className="text-black flex items-center text-lg md:text-3xl font-['Roboto
', sans-serif] font-semibold leading-10 "
                        >
                          রিটিংস এবং রিভিউস <GrCircleInformation className="ml-2" />
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
                                    <h5 className="text-sm md:text-lg text-center">
                                      {item?.postedBy?.name}
                                    </h5>

                                    <p className="ml-5 font-semibold text-xs md:text-sm mt-2">
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

export default Tabs;
