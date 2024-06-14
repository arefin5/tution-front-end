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
              <div className="max-w-screen-xl px-2 md:px-8 mx-auto">
                <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 md:p-8">
                  <div>
                    <div className="md:mb-20">
                      <Image
                        src={
                          userData.coverImg
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userData?.coverImg}`
                            : "/tutorbanner.png"
                        }
                        layout="responsive"
                        width={300}
                        height={100}
                        objectFit="cover"
                        className="rounded-t-lg relative" // Maintain the top-left rounding
                      />

                      <div
                        style={{ marginTop: "-100px" }}
                        className="absolute flex items-center ml-2 justify-center w-32 h-32 md:w-48 md:h-48 bg-white rounded-full border-4 border-white"
                      >
                        <img
                          src={profileImg}
                          alt="Profile image"
                          className="rounded-full"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col">
                      {/*  */}
                      <div className="flex w-full items-center justify-between sm:w-full md:w-full mb-5 mt-5 md:mt-0">
                        {/* icons */}
                        <div className="">
                          <p className="font-semibold text-gray-800 dark:text-gray-200 md:text-3xl flex items-center">
                            {userName}
                            {userData?.verified !== true && (
                              <MdVerified className="text-blue-600 w-5 h-5 ml-2 verified-col" />
                            )}
                          </p>
                          <div className="flex flex-row md:flex-col items-center md:items-stretch">
                            <p className="hover:underline underline-offset-1 text-slate-500 mb-2 mr-2 cursor-pointer">
                              {userData?.followers} Followers
                            </p>
                            <AvatarGroup userData={userData} />
                          </div>
                        </div>
                        {/*  */}
                        <div></div>
                        <div className="grid">
                          <div>
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
                                    <div className="icons">
                                      <FaFacebookSquare
                                        className={`w-6 h-6 `}
                                      />
                                    </div>
                                  ) : x.icon == "ig" ? (
                                    <div className="icons">
                                    <FaInstagramSquare className={`w-6 h-6 `} />
                                    </div>
                                   
                                  ) : x.icon == "tt" ? (
                                    <div className="icons">
                                    <FaTwitterSquare className={`w-6 h-6 `} />
                                    </div>
                                  ) : x.icon == "in" ? (
                                    <div className="icons">
                                    <FaLinkedin className={`w-6 h-6 `} />
                                    </div>
                                  ) : x.icon == "yt" ? (
                                    <div className="icons">
                                    <FaYoutubeSquare className={`w-6 h-6 `} />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </a>
                              </button>
                            ))}
                          </div>
                          <div className="inline-block ">
                            <button className="px-3 py-2 mt-4 rounded border hover:shadow-md flex items-center bg-primary-500 text-black">
                              <FaPen className="mr-2 text-green-500" />{" "}
                              <span className="hidden md:inline-block ">
                                Edit Profile
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tabs Start */}
                    <DetailsTabs data={userData} rating={rating} />
                    {/* Tabs End */}
                  </div>
                </div>
              </div>
              {/* Other sections can follow here */}
            </div>
            {/* <div className="basis-full lg:basis-3/12 2xl:basis-3/12 xl:basis-3/12">
              <Sidebar />
            </div> */}
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