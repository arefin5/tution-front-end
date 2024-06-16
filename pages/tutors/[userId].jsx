import Sidebar from "../../components/page/Sidebar";
import Review from "../../components/user/Review";
import WriteReview from "../../components/user/WriteReview";
//-------icons
import {
  BiBookReader,
  BiHeart,
  BiShareAlt,
  BiPhoneCall,
  BiMessage,
} from "react-icons/bi";
import {
  MdOutlineLocationOn,
  MdReportProblem,
  MdVerified,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsGenderAmbiguous } from "react-icons/bs";
//--------libraries
import axios from "axios";
import Alert from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import {
  FaFacebookSquare,
  FaHeart,
  FaInstagramSquare,
  FaLinkedin,
  FaPen,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import Link from "next/link";
import { AppContext } from "../_app";
import { NextSeo } from "next-seo";
import Image from "next/image";
import DetailsTabs from "../../components/user/UserDetailsTabs";
import AvatarGroup from "../../components/user/AvatarGroup";
import { Squircle } from "corner-smoothing";

function Tutor({ userData, token, loadingState }) {
  const { user } = useContext(AppContext);
  const router = useRouter();

  const [social, setSocial] = useState([{ icon: "fb", link: "" }]);
  const [education, setEducation] = useState([
    { exam: "", dep: "", result: "", year: "", institute: "" },
  ]);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userPhone, setUserPhone] = useState(null);
  const [userBio, setUserBio] = useState("");
  const [userClass, setUserClass] = useState("");
  const [userSubjects, setUserSubjects] = useState("");
  const [userInstitute, setUserInstitute] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [userRate, setUserRate] = useState([]);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [areas, setAreas] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData == null) {
      router.push("/404");
    } else {
      setUserId(userData._id);
      setUserPhone(userData.phone);
      setUserName(userData.name);
      setUserBio(userData.bio);
      setUserClass(userData.class);
      setUserSubjects(userData.subjects);
      setUserAge(userData.age);
      setUserInstitute(userData.institute);
      setUserDepartment(userData.department);
      setUserGender(userData.gender);
      setUserAvatar(userData.avatarImg);
      setDivision(userData.division);
      setDistrict(userData.district);
      setAreas(userData.areas);
      setEducation(userData.education);
      setSocial(userData.social);
      setUserRate(userData.ratings);
      setIsFollowed(userData.isFollowed);
      setLoading(loadingState);
    }
  }, []);

  const updateRatings = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`)
      .then((res) => {
        setUserRate(res.data.ratings);
      });
  };

  const comeToInbox = async (e) => {
    e.preventDefault();
    if (token != null) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/inbox/`,
          { chatWith: userId },
          {
            headers: {
              token: token,
            },
          }
        )
        .then((res) => {
          router.push(`/inbox/chat/${res.data.chatId}`);
        })
        .catch(() => {
          Alert.fire({
            icon: "error",
            title: "Error...",
            text: "Something went wrong..! ",
          });
        });
    } else {
      router.push("/login");
    }
  };

  const follow = async (e) => {
    e.preventDefault();
    if (token != null) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/follow/`,
          { followId: userId },
          {
            headers: {
              token: token,
            },
          }
        )
        .then((res) => {
          Alert.fire({
            icon: "success",
            title: res.data.type,
            text: res.data.msg,
          });
          setIsFollowed(res.data.msg === "user has been followed");
        })
        .catch(() => {
          Alert.fire({
            icon: "error",
            title: "Not allowed",
            text: "You cannot follow or unfollow this user",
          });
        });
    } else {
      router.push("/login");
    }
  };

  const phoneCall = (e) => {
    e.preventDefault();
    window.open(`tel:+${userPhone}`, "_system");
  };

  const share = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    Alert.fire({
      title: "Link copied",
      text: "User profile link has been copied",
    });
  };

  const totalRatings = userRate.length || 1;
  const getSumByKey = (arr, key) => {
    return arr.reduce(
      (accumulator, current) => accumulator + Number(current[key]),
      0
    );
  };
  var stars = getSumByKey(userRate, "stars");
  var rating = Number(stars) / Number(totalRatings) || 0;

  let profileImg;
  if (!userAvatar || userAvatar === "") {
    profileImg = userGender == "male" ? `/boy.svg` : `/girl.svg`;
  } else {
    profileImg = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userAvatar}`;
  }

  return (
    <>
      {userData && (
        <>
          <NextSeo
            title={`TuitionApp - ${userData?.name} | Tutor`}
            description={userData?.bio}
            openGraph={{
              type: "article",
              title: `TuitionApp - ${userData?.name} | Tutor`,
              description: `${userData?.bio}`,
              site_name: "TuitionApp",
              images: [
                {
                  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userData?.avatarImg}`,
                  width: 600,
                  height: 600,
                  alt: "TuitionApp",
                },
              ],
            }}
          />
          <div className="flex flex-col lg:flex-row 2xl:flex-row xl:flex-row TpostBanner">
            <div className="basis-full lg:basis-9/12 2xl:basis-9/12 xl:basis-9/12 mb-8 lg:mb-0">
              <div className="max-w-screen-xl md:px-8 mx-auto">
                <div className="bg-white dark:bg-neutral-800 md:rounded-lg md:p-8">
                  <div>
                    <div className="md:mb-20">
                      <Image
                        src={
                          userData.coverImg
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userData?.coverImg}`
                            : "/coverprofile.png"
                        }
                        layout="responsive"
                        width={300}
                        height={100}
                        objectFit="cover"
                        className="md:rounded-t-lg relative" // Maintain the top-left rounding
                        
                      />

                      <div
                        style={{ marginTop: "-100px" }}
                        className="absolute left-1/2 md:left-[200px] transform -translate-x-1/2 flex items-center ml-2 justify-center w-32 h-32 md:w-48 md:h-48 bg-white rounded-full border-4 border-white z-50"
                      >
                        <img
                          src={profileImg}
                          alt="Profile image"
                          className="rounded-full"
                        />
                      </div>
                    </div>
                        <div className="relative md:static -top-10 md:-top-0 z-20 rounded-[40px] bg-white">
                      <div className="flex flex-row md:flex-col">
                        {/*  */}
                        <div className="flex flex-col md:flex-row w-full items-center justify-between sm:w-full md:w-full  md:mb-0 mt-5 md:mt-0">
                          {/* icons */}
                          <div className="">
                            <p className="font-semibold text-gray-800 dark:text-gray-200 text-xl md:text-3xl flex items-center mt-14 md:mt-0 ">
                              {userName}
                              {userData?.verified !== true && (
                                <MdVerified className="text-blue-600 w-5 h-5 ml-2 verified-col" />
                              )}
                            </p>
                            <div className="flex flex-row md:flex-col items-center md:items-stretch mt-2 md:mt-0">
                              <p className="underline underline-offset-1 text-slate-500 mb-2 mr-2 cursor-pointer text-lg font-semibold">
                                {userData?.followers} Followers
                              </p>
                              <AvatarGroup userData={userData} />
                            </div>
                          </div>
                          {/*  */}
                          <div className="grid">
                            <div className="mt-[-10px]">
                              {social.map((x, index) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    window.open(
                                      x.link.startsWith("http")
                                        ? x.link
                                        : "https://" + x.link,
                                      "_system"
                                    );
                                  }}
                                >
                                  <a
                                    target={"_blank"}
                                    className="inline-block text-gray-600 dark:text-gray-600 rounded-xl m-1 mt-8"
                                  >
                                    {x.icon == "fb" ? (
                                      <div className="">
                                        <svg
                                          width="44"
                                          height="44"
                                          viewBox="0 0 44 44"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            x="0.545968"
                                            y="0.543404"
                                            width="42.3855"
                                            height="42.3855"
                                            rx="21.1928"
                                            stroke="#E5E5E5"
                                            strokeWidth="1.08681"
                                          />
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M25.9996 16.5624H23.6412C23.3369 16.5624 22.9565 16.6385 22.9565 17.171V19.6054H25.9996V22.0399H22.9565V29.3432H20.5221V22.0399H17.479V19.6054H20.5221V17.4753C20.5221 15.2691 21.5871 14.1279 23.6412 14.1279H25.9996V16.5624Z"
                                            fill="#171717"
                                          />
                                        </svg>
                                      </div>
                                    ) : x.icon == "ig" ? (
                                      <div className="">
                                        <svg
                                          width="45"
                                          height="44"
                                          viewBox="0 0 45 44"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            x="1.49067"
                                            y="0.543404"
                                            width="42.3855"
                                            height="42.3855"
                                            rx="21.1928"
                                            stroke="#E5E5E5"
                                            strokeWidth="1.08681"
                                          />
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M22.683 15.5014C24.7132 15.5014 24.9544 15.509 25.7565 15.5449C26.4977 15.5797 26.9009 15.7036 27.1693 15.8079C27.5236 15.9459 27.7769 16.11 28.0431 16.3763C28.3094 16.6426 28.4735 16.8958 28.6115 17.2512C28.7159 17.5186 28.8398 17.9218 28.8735 18.664C28.9104 19.465 28.9169 19.7052 28.9169 21.7365C28.9169 23.7666 28.9104 24.0079 28.8735 24.8099C28.8398 25.5511 28.7159 25.9544 28.6126 26.2228C28.4735 26.5771 28.3083 26.8303 28.0431 27.0966C27.7976 27.3491 27.4987 27.5433 27.1683 27.665C26.8998 27.7693 26.4977 27.8932 25.7554 27.9269C24.9544 27.9639 24.7142 27.9704 22.683 27.9704C20.6518 27.9704 20.4116 27.9639 19.6095 27.9269C18.8683 27.8932 18.4662 27.7693 18.1967 27.6661C17.8665 27.5439 17.5679 27.3493 17.3229 27.0966C17.0704 26.8511 16.8762 26.5521 16.7545 26.2217C16.6501 25.9533 16.5262 25.5511 16.4925 24.8089C16.4556 24.0079 16.4491 23.7666 16.4491 21.7365C16.4491 19.7052 16.4556 19.465 16.4925 18.663C16.5262 17.9218 16.6501 17.5196 16.7534 17.2501C16.8925 16.8958 17.0577 16.6426 17.3229 16.3763C17.5891 16.11 17.8424 15.9459 18.1977 15.8079C18.4651 15.7036 18.8683 15.5797 19.6106 15.546C20.4116 15.509 20.6518 15.5025 22.683 15.5025M22.683 14.1299C20.6181 14.1299 20.3583 14.1386 19.5476 14.1755C18.7379 14.2136 18.1836 14.3429 17.7011 14.5309C17.1934 14.7218 16.7335 15.0211 16.3534 15.408C15.9669 15.7881 15.668 16.248 15.4775 16.7556C15.2894 17.2371 15.1601 17.7913 15.1232 18.5999C15.0862 19.4107 15.0775 19.6704 15.0775 21.7365C15.0775 23.8014 15.0862 24.0611 15.1232 24.8719C15.1601 25.6816 15.2894 26.2348 15.4775 26.7184C15.6709 27.2183 15.9317 27.6422 16.3545 28.066C16.7773 28.4877 17.2011 28.7485 17.7022 28.942C18.1847 29.13 18.7379 29.2593 19.5476 29.2963C20.3583 29.3332 20.617 29.3419 22.683 29.3419C24.7479 29.3419 25.0077 29.3332 25.8184 29.2963C26.6281 29.2593 27.1813 29.13 27.6649 28.942C28.1726 28.7512 28.6325 28.4518 29.0126 28.0649C29.3991 27.6848 29.698 27.2249 29.8885 26.7173C30.0766 26.2348 30.2059 25.6816 30.2428 24.8719C30.2798 24.0611 30.2885 23.8014 30.2885 21.7365C30.2885 19.6715 30.2798 19.4118 30.2428 18.601C30.2059 17.7913 30.0766 17.2382 29.8885 16.7545C29.6977 16.2469 29.3984 15.7869 29.0115 15.4069C28.6313 15.0204 28.1714 14.7214 27.6638 14.5309C27.1824 14.3429 26.6281 14.2136 25.8195 14.1766C25.0088 14.1397 24.7479 14.131 22.683 14.131"
                                            fill="#171717"
                                          />
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M22.683 17.8314C21.6473 17.8314 20.6541 18.2428 19.9218 18.9751C19.1895 19.7074 18.7781 20.7007 18.7781 21.7363C18.7781 22.772 19.1895 23.7652 19.9218 24.4975C20.6541 25.2298 21.6473 25.6412 22.683 25.6412C23.7186 25.6412 24.7118 25.2298 25.4442 24.4975C26.1765 23.7652 26.5879 22.772 26.5879 21.7363C26.5879 20.7007 26.1765 19.7074 25.4442 18.9751C24.7118 18.2428 23.7186 17.8314 22.683 17.8314ZM22.683 24.2718C22.0105 24.2718 21.3656 24.0047 20.8901 23.5292C20.4146 23.0537 20.1475 22.4088 20.1475 21.7363C20.1475 21.0638 20.4146 20.4189 20.8901 19.9434C21.3656 19.4679 22.0105 19.2008 22.683 19.2008C23.3554 19.2008 24.0004 19.4679 24.4759 19.9434C24.9514 20.4189 25.2185 21.0638 25.2185 21.7363C25.2185 22.4088 24.9514 23.0537 24.4759 23.5292C24.0004 24.0047 23.3554 24.2718 22.683 24.2718ZM27.6551 17.6771C27.6551 17.9192 27.5589 18.1514 27.3877 18.3226C27.2165 18.4938 26.9843 18.59 26.7422 18.59C26.5001 18.59 26.2679 18.4938 26.0967 18.3226C25.9255 18.1514 25.8293 17.9192 25.8293 17.6771C25.8293 17.435 25.9255 17.2028 26.0967 17.0315C26.2679 16.8603 26.5001 16.7642 26.7422 16.7642C26.9843 16.7642 27.2165 16.8603 27.3877 17.0315C27.5589 17.2028 27.6551 17.435 27.6551 17.6771Z"
                                            fill="#171717"
                                          />
                                        </svg>
                                      </div>
                                    ) : x.icon == "tt" ? (
                                      <div className="">
                                        <svg
                                          width="44"
                                          height="44"
                                          viewBox="0 0 44 44"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            x="0.96296"
                                            y="0.543404"
                                            width="42.3855"
                                            height="42.3855"
                                            rx="21.1928"
                                            stroke="#E5E5E5"
                                            strokeWidth="1.08681"
                                          />
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M28.2415 18.6163V18.9967C28.2415 23.1048 25.1224 27.8976 19.3406 27.8976C17.5908 27.8976 15.9171 27.3651 14.5477 26.5283C14.776 26.5283 15.0803 26.6043 15.3085 26.6043C16.7539 26.6043 18.1233 26.0718 19.1884 25.235C17.819 25.235 16.6779 24.322 16.2975 23.1048C16.5257 23.1048 16.6779 23.1809 16.9061 23.1809C17.2104 23.1809 17.5147 23.1809 17.7429 23.1048C16.2975 22.8005 15.3085 21.5833 15.3085 20.0618V19.9857C15.3085 20.2139 16.1453 20.3661 16.6779 20.3661C15.841 19.8335 15.2324 18.8445 15.2324 17.7795C15.2324 17.1708 15.3846 16.6383 15.6889 16.1819C17.2104 18.0838 19.4927 19.301 22.1554 19.4531C22.0032 19.1488 21.9272 18.9206 21.9272 18.6924C21.9272 16.9426 23.2965 15.5732 25.0463 15.5732C25.9592 15.5732 26.72 15.9536 27.3286 16.5622C28.0133 16.4101 28.698 16.1819 29.3066 15.8015C29.0784 16.5622 28.5458 17.1708 27.9372 17.5512C28.5458 17.4752 29.1544 17.323 29.763 17.0948C29.3066 17.6273 28.8501 18.1598 28.2415 18.6163Z"
                                            fill="#171717"
                                          />
                                        </svg>
                                      </div>
                                    ) : x.icon == "in" ? (
                                      <div className="">
                                        <svg
                                          width="44"
                                          height="44"
                                          viewBox="0 0 44 44"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            x="1.01826"
                                            y="0.543404"
                                            width="42.3855"
                                            height="42.3855"
                                            rx="21.1928"
                                            stroke="#E5E5E5"
                                            strokeWidth="1.08681"
                                          />
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M17.9511 29.2678H14.6798V18.7693H17.9511V29.2678ZM16.2774 17.476C15.2884 17.476 14.6038 16.7913 14.6038 15.8784C14.6038 14.9655 15.2884 14.2808 16.3535 14.2808C17.4186 14.2808 18.0272 14.9655 18.0272 15.8784C18.0272 16.7913 17.4186 17.476 16.2774 17.476ZM29.8191 29.2678H26.5478V23.486C26.5478 22.1166 26.0913 21.2037 24.8741 21.2037C23.9612 21.2037 23.4286 21.8123 23.2004 22.421C23.1243 22.6492 23.1243 22.9535 23.1243 23.2578V29.2678H19.853V22.1166C19.853 20.8233 19.777 19.7583 19.777 18.7693H22.5918L22.744 20.2147H22.82C23.2765 19.53 24.2655 18.541 26.0152 18.541C28.1454 18.541 29.743 19.9865 29.743 23.0296V29.2678H29.8191Z"
                                            fill="#171717"
                                          />
                                        </svg>
                                      </div>
                                    ) : x.icon == "yt" ? (
                                      <div className="">
                                        <svg
                                          width="45"
                                          height="44"
                                          viewBox="0 0 45 44"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            x="1.43525"
                                            y="0.543404"
                                            width="42.3855"
                                            height="42.3855"
                                            rx="21.1928"
                                            stroke="#E5E5E5"
                                            strokeWidth="1.08681"
                                          />
                                          <path
                                            d="M29.9176 18.0497C29.8317 17.726 29.6623 17.4306 29.4264 17.193C29.1904 16.9553 28.8963 16.7838 28.5732 16.6955C27.3875 16.376 22.6284 16.376 22.6284 16.376C22.6284 16.376 17.8704 16.376 16.6836 16.6955C16.3606 16.784 16.0664 16.9556 15.8303 17.1932C15.5942 17.4308 15.4245 17.7261 15.3381 18.0497C15.0208 19.2441 15.0208 21.7361 15.0208 21.7361C15.0208 21.7361 15.0208 24.2282 15.3381 25.4226C15.4243 25.7461 15.5939 26.0414 15.8301 26.2789C16.0662 26.5163 16.3605 26.6876 16.6836 26.7756C17.8704 27.0963 22.6284 27.0963 22.6284 27.0963C22.6284 27.0963 27.3865 27.0963 28.5722 26.7756C28.8953 26.6879 29.1896 26.5167 29.4256 26.2792C29.6616 26.0417 29.8309 25.7463 29.9165 25.4226C30.2361 24.2282 30.2361 21.7361 30.2361 21.7361C30.2361 21.7361 30.2361 19.2441 29.9176 18.0497ZM21.0721 23.9988V19.4734L25.0498 21.7361L21.0721 23.9988Z"
                                            fill="#171717"
                                          />
                                        </svg>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </a>
                                </button>
                              ))}
                            </div>
                            <div className="hidden md:inline-block ">
                              <button className="px-3 py-2 mt-4 rounded border hover:shadow-md flex items-center bg-primary-500 text-black">
                                <FaPen className="mr-2 text-green-500" />{" "}
                                <span className="">Edit Profile</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div></div>
                    </div>

                    {/* Tabs Start */}
                    <DetailsTabs data={userData} rating={rating} />
                    {/* Tabs End */}
                  </div>
                </div>
              </div>
              {/* Other sections can follow here */}
            </div>
            
        </>
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const token = parseCookies(ctx).authToken || null;
  const res = await fetch(`${process.env.API_URL}/user/${ctx.query.userId}`, {
    // @ts-ignore
    headers: {
      token: token,
      loadingState: false,
    },
  });
  let user = await res.json();
  return {
    props: {
      userData: user._id ? user : null,
      loadingState: false,
      token: token,
    },
  };
}

export default Tutor;
