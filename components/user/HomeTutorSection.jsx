import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { AiOutlineLeft, AiOutlineRight, AiOutlineUndo } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdClear, MdClose } from "react-icons/md";
import Slider from "react-slick";
import TutorCard from "./TutorCard";
import LocationSelector from "../utils/LocationSelector";
import { RiArrowRightLine } from "react-icons/ri";

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={`w-10 h-10 absolute top-[50%] z-20 left-0 -mt-5 bottom-0 rounded-lg bg-rose-600 flex justify-center items-center cursor-pointer hover:bg-rose-700 focus:bg-rose-700 text-white`}
      onClick={onClick}
    >
      <AiOutlineLeft className="w-6 h-6" />
    </div>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className={`w-10 h-10 absolute top-[50%] z-20 right-0 -mt-5 bottom-0 rounded-lg bg-rose-600 flex justify-center items-center cursor-pointer hover:bg-rose-700 focus:bg-rose-700 text-white`}
      onClick={onClick}
    >
      <AiOutlineRight className="w-6 h-6" />
    </div>
  );
}

function HomeTutorSection({ token, tutors }) {
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [gender, setGender] = useState("all");
  const [search, setSearch] = useState("");

  const showForm = (e) => {
    e.preventDefault();
    setShowFilter(!showFilter);
  };
  const filter = (e) => {
    router.push(
      `/tutors/?page=${1}&div=${division}&dis=${district}&upo=${area}&gender=${gender}&search=${search}`
    );
    setShowFilter(!showFilter);
  };
  const HandleSearch = (e) => {
    e.preventDefault();
    router.push(
      `/tutors/?page=${1}&div=${division}&dis=${district}&upo=${area}&gender=${gender}&search=${search}`
    );
  };

  const clearFilter = async (e) => {
    e.preventDefault();
    setDivision("");
    setDistrict("");
    setArea("");
    setSearch("");
    setGender("all");
    setShowFilter(!showFilter);
    router.push(`/tutors`);
  };
  const clearFilterBtn = async (e) => {
    e.preventDefault();
    setDivision("");
    setDistrict("");
    setArea("");
    setSearch("");
    setGender("all");
    router.push(`/tutors`);
  };
  const clearSearch = (e) => {
    setSearch("");
    router.push(
      `/tutors/?page=${1}&div=${division}&dis=${district}&upo=${area}&gender=${gender}&search=${""}`
    );
  };
  const [tutorData, setTutorData] = useState([]);
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1216,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          speed: 500,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 764,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          speed: 500,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          speed: 500,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };
  useEffect(() => {
    if (tutors) {
      setTutorData(tutors.data);
    }
  }, [tutors]);
  return (
    <>
      <div className="flex justify-between items-end gap-4 mb-6">
        <div className="  w-full">
          <div className={`  w-full   p-4 mb-6 h-full`}>
            <div className="w-full mb-5 mx-auto mx-auto text-center">
              <h2 className=" text-2xl lg:text-3xl tutor-title">
                জনপ্রিয় টিউটরসমূহ
              </h2>
              <p className="home-top-sub">
                Hear from our satisfied clients and learn how we&#x27;ve helped
                them take <br />
                their businesses to new heights.
              </p>
            </div>
          </div>
          <div
            className={`flex w-full justify-between 
                    items-center gap-4 mb-6 ${
                      showFilter == false ? "hidden" : "block"
                    }`}
          >
            <div
              className="flex items-center justify-between  
                        p-4 w-full flex-wrap mb-2 bg-gray-100 rounded-lg dark:bg-neutral-800 
                        ring-2 ring-rose-600 "
            >
              \
              <div className="w-full grid grid-cols-3 gap-4 ">
                <div className="col-span-4 md:col-span-2 ">
                  <p className="text-gray-700 dark:text-gray-200 mb-2 ">
                    Location
                  </p>
                  <LocationSelector
                    division={division}
                    district={district}
                    area={area}
                    setDivision={setDivision}
                    setDistrict={setDistrict}
                    setArea={setArea}
                  />
                </div>
                <div className="col-span-4 md:col-span-1">
                  <p className="text-gray-700 dark:text-gray-200 mb-2">
                    Tutor Gender
                  </p>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring appearance-none pr-8 rounded leading-tight "
                    id="grid-state"
                  >
                    <option value={"all"}>All</option>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                  </select>
                  <p className="text-gray-700 dark:text-gray-200 my-2">
                    Show nearest tutors
                  </p>
                  <Link href="/tutors/my-area" passHref>
                    <a className="inline-block bg-rose-600 hover:bg-rose-700 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2">
                      Nearest
                    </a>
                  </Link>
                </div>
              </div>
              <div className="w-full mt-4 justify-center items-center ">
                <div className="w-full justify-center items-center flex gap-4">
                  <button
                    onClick={(e) => clearFilter(e)}
                    className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700 text-white rounded-lg shadow-lg transition duration-100"
                  >
                    <AiOutlineUndo className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => filter(e)}
                    className="w-10 md:w-12 h-10 md:h-12 flex justify-center items-center shrink-0 bg-rose-600 hover:bg-rose-700 active:bg-rose-700 text-white rounded-lg shadow-lg transition duration-100"
                  >
                    <FiCheck className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="mx-auto w-full">
          <Slider {...settings}>
            {tutorData.slice(0, 10).map((item, i) => (
              <div
                key={i}
                className=" w-48 md:w-4/12 lg:w-3/12 xl:w-4/12 m-2 p-2  mx-auto sm:mx-4"
              >
                <TutorCard
                  avatarImg={item.avatarImg}
                  name={item.name}
                  institute={item.institute}
                  department={item.department}
                  ratingsCount={item.ratingsCount}
                  starsCount={item.starsCount}
                  verified={item.verified}
                  gender={item.gender}
                  id={item._id}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="w-full max-w-s flex justify-end">
        <Link href="/tutors">
          <div className=" items-center text-center mx-auto  text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2 my-4">
            <a className="flex">
              আরও দেখুন
              <RiArrowRightLine
                size={25}
                className=" transform rotate-360 duration-1000"
              />
            </a>
          </div>
        </Link>
      </div>
    </>
  );
}

export default HomeTutorSection;
