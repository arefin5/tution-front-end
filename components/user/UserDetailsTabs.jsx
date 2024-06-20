"use-client";
import Image from "next/image";
import React ,{useEffect,useState} from "react"
import {
  FaArrowLeft,
  FaGraduationCap,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import { GrCircleInformation, GrUserExpert } from "react-icons/gr";
import {
  MdOutlineDoNotDisturb,
  MdOutlineFileUpload,
} from "react-icons/md";

const Tabs = ({ data, rating }) => {
  const userInfo = data;

  const [openTab, setOpenTab] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);

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
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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

                  handleTabClick(1, "link1");
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

                  handleTabClick(2, "link2");
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

                  handleTabClick(3, "link3");
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

                  handleTabClick(4, "link4");
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
                      <div
                        className="others  mt-1 mx-2 text-xl font-['Roboto
', sans-serif] font-normal flex flex-row items-center"
                      >
                        <span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z"
                              fill="#292D32"
                            />
                            <path
                              d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z"
                              fill="#292D32"
                            />
                            <path
                              d="M15 22.75H9C3.38 22.75 2.25 20.1 2.25 15.82V9.65C2.25 4.91 3.85 2.98 7.96 2.75H16C16.01 2.75 16.03 2.75 16.04 2.75C20.15 2.98 21.75 4.91 21.75 9.65V15.82C21.75 20.1 20.62 22.75 15 22.75ZM8 4.25C5.2 4.41 3.75 5.29 3.75 9.65V15.82C3.75 19.65 4.48 21.25 9 21.25H15C19.52 21.25 20.25 19.65 20.25 15.82V9.65C20.25 5.3 18.81 4.41 15.98 4.25H8Z"
                              fill="#292D32"
                            />
                            <path
                              d="M20.75 18.3501H3.25C2.84 18.3501 2.5 18.0101 2.5 17.6001C2.5 17.1901 2.84 16.8501 3.25 16.8501H20.75C21.16 16.8501 21.5 17.1901 21.5 17.6001C21.5 18.0101 21.16 18.3501 20.75 18.3501Z"
                              fill="#292D32"
                            />
                            <path
                              d="M12 8.25C10.77 8.25 9.73 8.92 9.73 10.22C9.73 10.84 10.02 11.31 10.46 11.61C9.85 11.97 9.5 12.55 9.5 13.23C9.5 14.47 10.45 15.24 12 15.24C13.54 15.24 14.5 14.47 14.5 13.23C14.5 12.55 14.15 11.96 13.53 11.61C13.98 11.3 14.26 10.84 14.26 10.22C14.26 8.92 13.23 8.25 12 8.25ZM12 11.09C11.48 11.09 11.1 10.78 11.1 10.29C11.1 9.79 11.48 9.5 12 9.5C12.52 9.5 12.9 9.79 12.9 10.29C12.9 10.78 12.52 11.09 12 11.09ZM12 14C11.34 14 10.86 13.67 10.86 13.07C10.86 12.47 11.34 12.15 12 12.15C12.66 12.15 13.14 12.48 13.14 13.07C13.14 13.67 12.66 14 12 14Z"
                              fill="#292D32"
                            />
                          </svg>
                        </span>
                        <span className="ml-1 mr-3">
                          Joined on {userInfo.age}
                        </span>
                        {/* <FaCalendarAlt className="mr-1" /> */}
                      </div>
                    )}
                  </div>
                  <p className="text-lg mt-5 text-[#00000097] leading-6 font-['Inter', sans-serif]">
                    {userInfo.bio}
                  </p>
                  <div className="mt-8">
                    {userInfo?.subjects && (
                      <div className="my-3">
                        <h5 className="flex items-center text-xl font-['Roboto', sans-serif] font-normal leading-6">
                          <Image
                            src="/book.svg"
                            width={21}
                            height={21}
                            className="mr-1 Image-rep"
                          />
                          <span className="main-content ml-2">
                            Tuition Subjects:
                          </span>
                        </h5>
                        <p className="ic-content text-xl font-['Roboto', sans-serif] font-normal leading-6 text-[#00000097]">
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
                          <span className="ml-2">Preferable Class:</span>
                        </h5>
                        <p
                          className="ic-content text-xl font-['Roboto
', sans-serif] font-normal leading-6 text-[#00000097] ml-2"
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
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.6649 13.9755C9.59435 13.9755 7.90295 12.2938 7.90295 10.2136C7.90295 8.13338 9.59435 6.46143 11.6649 6.46143C13.7354 6.46143 15.4268 8.1431 15.4268 10.2233C15.4268 12.3035 13.7354 13.9755 11.6649 13.9755ZM11.6649 7.91953C10.4012 7.91953 9.36105 8.94992 9.36105 10.2233C9.36105 11.4967 10.3914 12.5271 11.6649 12.5271C12.9383 12.5271 13.9687 11.4967 13.9687 10.2233C13.9687 8.94992 12.9285 7.91953 11.6649 7.91953Z"
                              fill="#292D32"
                            />
                            <path
                              d="M11.6649 22.3252C10.2262 22.3252 8.77785 21.7808 7.65026 20.7018C4.78266 17.9412 1.61372 13.5377 2.80936 8.29825C3.88836 3.54484 8.03908 1.41602 11.6649 1.41602C11.6649 1.41602 11.6649 1.41602 11.6746 1.41602C15.3004 1.41602 19.4512 3.54484 20.5301 8.30797C21.7161 13.5474 18.5471 17.9412 15.6795 20.7018C14.5519 21.7808 13.1036 22.3252 11.6649 22.3252ZM11.6649 2.87412C8.83618 2.87412 5.20065 4.38082 4.2383 8.61903C3.18847 13.1975 6.06579 17.1441 8.67093 19.6423C10.3526 21.2656 12.9869 21.2656 14.6686 19.6423C17.264 17.1441 20.1413 13.1975 19.1109 8.61903C18.1389 4.38082 14.4936 2.87412 11.6649 2.87412Z"
                              fill="#292D32"
                            />
                          </svg>
                          <span className="ml-2">Preferable Area:</span>
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
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5251 21.1624H6.80447C3.25643 21.1624 1.21509 19.1211 1.21509 15.5731V8.76858C1.21509 5.22054 3.25643 3.1792 6.80447 3.1792H13.6089C14.0075 3.1792 14.338 3.5097 14.338 3.90825C14.338 4.3068 14.0075 4.6373 13.6089 4.6373H6.80447C4.02436 4.6373 2.67319 5.98847 2.67319 8.76858V15.5731C2.67319 18.3532 4.02436 19.7043 6.80447 19.7043H16.5251C19.3053 19.7043 20.6564 18.3532 20.6564 15.5731V10.7127C20.6564 10.3142 20.9869 9.98367 21.3855 9.98367C21.784 9.98367 22.1145 10.3142 22.1145 10.7127V15.5731C22.1145 19.1211 20.0732 21.1624 16.5251 21.1624Z"
                              fill="#292D32"
                            />
                            <path
                              d="M11.6646 13.016C10.8481 13.016 10.0219 12.7633 9.39002 12.2481L6.34744 9.81794C6.03638 9.56521 5.97806 9.10833 6.2308 8.79727C6.48354 8.48621 6.9404 8.42789 7.25146 8.68063L10.294 11.1108C11.0328 11.7038 12.2868 11.7038 13.0255 11.1108L14.1726 10.197C14.4836 9.94431 14.9502 9.99291 15.1933 10.3137C15.446 10.6248 15.3974 11.0913 15.0766 11.3344L13.9296 12.2481C13.3074 12.7633 12.4812 13.016 11.6646 13.016Z"
                              fill="#292D32"
                            />
                            <path
                              d="M18.9554 9.01131C17.2154 9.01131 15.7961 7.59209 15.7961 5.85209C15.7961 4.11209 17.2154 2.69287 18.9554 2.69287C20.6954 2.69287 22.1146 4.11209 22.1146 5.85209C22.1146 7.59209 20.6954 9.01131 18.9554 9.01131ZM18.9554 4.15097C18.0222 4.15097 17.2542 4.9189 17.2542 5.85209C17.2542 6.78527 18.0222 7.55321 18.9554 7.55321C19.8885 7.55321 20.6565 6.78527 20.6565 5.85209C20.6565 4.9189 19.8885 4.15097 18.9554 4.15097Z"
                              fill="#292D32"
                            />
                          </svg>
                          <span className="ml-2">Email:</span>
                        </h5>
                        <p
                          className="ic-content text-xl font-['Roboto
', sans-serif] font-normal leading-6 text-[#00000097]"
                        >
                          {userInfo?.email}
                        </p>
                      </div>
                    )}
                    {!isLargeScreen ? (
                    <div className="mobile-rank  border mt-6 mb-8 border-[#000000c8] rounded-[10px] w-auto md:w-[500px]">
                      <div className="flex items-center justify-between  p-2 my-2">
                        {/* <h4>Rank: 542</h4>{" "} */}
                        <h4></h4>
                        <div className="flex items-center justify-center">
                          <span className="">
                            <svg
                              width="37"
                              height="36"
                              viewBox="0 0 37 36"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="0.43335"
                                y="0.602539"
                                width="36.5581"
                                height="34.8964"
                                rx="6.64693"
                                fill="#F8F8F8"
                              />
                              <path
                                d="M18.7126 26.7141C18.455 26.7141 18.2058 26.6795 17.998 26.6016C14.8241 25.4678 9.78076 21.4433 9.78076 15.4974C9.78076 12.4682 12.1321 10.0103 15.0235 10.0103C16.4277 10.0103 17.7405 10.5815 18.7126 11.6027C19.6847 10.5815 20.9975 10.0103 22.4016 10.0103C25.293 10.0103 27.6444 12.4769 27.6444 15.4974C27.6444 21.452 22.601 25.4678 19.4271 26.6016C19.2194 26.6795 18.9701 26.7141 18.7126 26.7141ZM15.0235 11.3085C12.8217 11.3085 11.0271 13.1866 11.0271 15.4974C11.0271 21.4087 16.4859 24.6976 18.4052 25.3813C18.5547 25.4332 18.8788 25.4332 19.0283 25.3813C20.9393 24.6976 26.4064 21.4174 26.4064 15.4974C26.4064 13.1866 24.6117 11.3085 22.4099 11.3085C21.147 11.3085 19.9755 11.923 19.2194 12.9875C18.9868 13.3164 18.455 13.3164 18.2224 12.9875C17.4497 11.9143 16.2864 11.3085 15.0235 11.3085Z"
                                fill="#111111"
                              />
                            </svg>
                          </span>
                          <span className="ml-3">
                            <svg
                              width="38"
                              height="36"
                              viewBox="0 0 38 36"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="0.45459"
                                y="0.602539"
                                width="36.5581"
                                height="34.8964"
                                rx="6.64693"
                                fill="#F8F8F8"
                              />
                              <path
                                d="M22.2648 20.9795C21.2677 20.9795 20.3745 21.4572 19.8137 22.1842L14.7662 19.2554C15.0778 18.4869 15.0778 17.6352 14.7662 16.8667L19.8137 13.9379C20.3745 14.6649 21.2677 15.1426 22.2648 15.1426C23.9888 15.1426 25.3805 13.7509 25.3805 12.0269C25.3805 10.3028 23.9888 8.91113 22.2648 8.91113C20.5407 8.91113 19.149 10.3028 19.149 12.0269C19.149 12.4423 19.2321 12.8578 19.3775 13.2109L14.33 16.1604C13.7484 15.4334 12.876 14.9557 11.8789 14.9557C10.1549 14.9557 8.76318 16.3474 8.76318 18.0714C8.76318 19.7955 10.1549 21.1872 11.8789 21.1872C12.876 21.1872 13.7692 20.7094 14.33 19.9824L19.3775 22.9112C19.2321 23.2644 19.149 23.6798 19.149 24.0952C19.149 25.8193 20.5407 27.211 22.2648 27.211C23.9888 27.211 25.3805 25.8193 25.3805 24.0952C25.3805 22.3712 23.9888 20.9795 22.2648 20.9795ZM22.2648 9.76277C23.5318 9.76277 24.5497 10.7806 24.5497 12.0477C24.5497 13.3147 23.5318 14.3325 22.2648 14.3325C20.9977 14.3325 19.9799 13.3147 19.9799 12.0477C19.9799 10.7806 20.9977 9.76277 22.2648 9.76277ZM11.8789 20.3563C10.6119 20.3563 9.59405 19.3385 9.59405 18.0714C9.59405 16.8044 10.6119 15.7866 11.8789 15.7866C13.146 15.7866 14.1638 16.8044 14.1638 18.0714C14.1638 19.3385 13.146 20.3563 11.8789 20.3563ZM22.2648 26.3801C20.9977 26.3801 19.9799 25.3623 19.9799 24.0952C19.9799 22.8282 20.9977 21.8103 22.2648 21.8103C23.5318 21.8103 24.5497 22.8282 24.5497 24.0952C24.5497 25.3623 23.5318 26.3801 22.2648 26.3801Z"
                                fill="#111111"
                                stroke="#111111"
                                strokeWidth="0.415433"
                              />
                            </svg>
                          </span>
                          <span className="ml-3">
                            <svg
                              width="38"
                              height="36"
                              viewBox="0 0 38 36"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="0.475586"
                                y="0.602539"
                                width="36.5581"
                                height="34.8964"
                                rx="6.64693"
                                fill="#F8F8F8"
                              />
                              <path
                                d="M21.0395 23.8665C21.0395 25.1294 20.0175 26.1514 18.7546 26.1514C17.4917 26.1514 16.4697 25.1294 16.4697 23.8665C16.4697 22.6036 17.4917 21.5816 18.7546 21.5816C20.0175 21.5816 21.0395 22.6036 21.0395 23.8665ZM17.716 23.8665C17.716 24.4398 18.1813 24.9051 18.7546 24.9051C19.3279 24.9051 19.7932 24.4398 19.7932 23.8665C19.7932 23.2932 19.3279 22.8279 18.7546 22.8279C18.1813 22.8279 17.716 23.2932 17.716 23.8665Z"
                                fill="#111111"
                              />
                              <path
                                d="M21.0395 12.2346C21.0395 13.4976 20.0175 14.5195 18.7546 14.5195C17.4917 14.5195 16.4697 13.4976 16.4697 12.2346C16.4697 10.9717 17.4917 9.94976 18.7546 9.94976C20.0175 9.94976 21.0395 10.9717 21.0395 12.2346ZM17.716 12.2346C17.716 12.8079 18.1813 13.2732 18.7546 13.2732C19.3279 13.2732 19.7932 12.8079 19.7932 12.2346C19.7932 11.6613 19.3279 11.1961 18.7546 11.1961C18.1813 11.1961 17.716 11.6613 17.716 12.2346Z"
                                fill="#111111"
                              />
                              <path
                                d="M21.0395 18.0506C21.0395 19.3135 20.0175 20.3354 18.7546 20.3354C17.4917 20.3354 16.4697 19.3135 16.4697 18.0506C16.4697 16.7876 17.4917 15.7657 18.7546 15.7657C20.0175 15.7657 21.0395 16.7876 21.0395 18.0506ZM17.716 18.0506C17.716 18.6239 18.1813 19.0891 18.7546 19.0891C19.3279 19.0891 19.7932 18.6239 19.7932 18.0506C19.7932 17.4773 19.3279 17.012 18.7546 17.012C18.1813 17.012 17.716 17.4773 17.716 18.0506Z"
                                fill="#111111"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-black px-2 my-1">
                        <div className="flex items-center p-3">
                          <span className="text-lg mr-2">
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.5182 15.8129L23.3686 19.6634C23.8864 20.1811 23.8864 21.0206 23.3686 21.5384C20.5693 24.3377 16.1376 24.6526 12.9706 22.2773L10.6799 20.5593C8.14476 18.658 5.89274 16.406 3.9914 13.8708L2.27339 11.5802C-0.101898 8.41311 0.213054 3.98143 3.01235 1.18213C3.53012 0.664364 4.36959 0.664364 4.88736 1.18213L8.73778 5.03255C9.30561 5.60038 9.30561 6.52101 8.73778 7.08884L7.25301 8.57361C7.01705 8.80957 6.95855 9.17005 7.10779 9.46852C8.83321 12.9194 11.6313 15.7175 15.0822 17.4429C15.3807 17.5922 15.7412 17.5337 15.9771 17.2977L17.4619 15.8129C18.0297 15.2451 18.9503 15.2451 19.5182 15.8129Z"
                                stroke="#111111"
                                strokeWidth="1.34217"
                              />
                            </svg>

                            {"  "}
                          </span>
                          <span className="grid">
                            <span className="text-lg font-medium">{userInfo?.phone}</span>
                            <span className="text-sm font-light">Click to show number</span>
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-black px-2 my-1">
                        <div className="flex items-center p-3 my-2 text-xl ">
                          <span className="mr-2">
                            <svg
                              width="32"
                              height="27"
                              viewBox="0 0 32 27"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M24.7365 8.98047L18.2392 13.974C17.0096 14.8942 15.2859 14.8942 14.0563 13.974L7.50317 8.98047"
                                stroke="#111111"
                                strokeWidth="1.2463"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.92534 0.894531H23.2865C25.3572 0.9167 27.328 1.7523 28.74 3.20671C30.1521 4.66113 30.882 6.60741 30.7598 8.59227V18.0839C30.882 20.0688 30.1521 22.015 28.74 23.4695C27.328 24.9239 25.3572 25.7595 23.2865 25.7816H8.92534C4.47757 25.7816 1.47986 22.3277 1.47986 18.0839V8.59227C1.47986 4.34847 4.47757 0.894531 8.92534 0.894531Z"
                                stroke="#111111"
                                strokeWidth="1.2463"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>

                            {"  "}
                          </span>
                          <span className="text-lg leading-[30px] font-medium">

                          Message
                          </span>
                        </div>
                      </div>
                    </div>
                    ):(<></>)
                    }
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
                  <div className="grid flex-wrap md:mt-16">
                    <button className="flex items-center justify-center py-3 bg-green-800 text-white mb-5">
                      <MdOutlineFileUpload className="text-2xl mr-1" /> এই
                      প্রফাইলটি শেয়ার করুন
                    </button>
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
                          রিটিংস এবং রিভিউস{" "}
                          <GrCircleInformation className="ml-2" />
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
