import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import { MdClear, MdClose } from "react-icons/md";
import { AiOutlineLeft, AiOutlineRight, AiOutlineUndo } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import LocationSelector from "../../components/utils/LocationSelector";
import Sidebar from "../../components/page/Sidebar";
import TutorCard from "../../components/user/TutorCard";
import Alert from "sweetalert2";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import Banner from "../../components/Banner";
function Tutors({ token, tutorsRes }) {
  const router = useRouter();

  const [start, setStart] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [tutorData, setTutorData] = useState([
    {
      avatarImg: "",
      name: "",
      institute: "",
      department: "",
      ratingsCount: "",
      starsCount: "",
      verified: "",
      gender: "",
      _id: "",
    },
  ]);
  const [divission, setDivission] = useState("");
  const [district, setDistrict] = useState("");
  const [upozilla, setUpozilla] = useState("");

  const [gender, setGender] = useState("all");
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(1);
  const [current, setCurrent] = useState(1);
  const [lastPage, setLastPage] = useState(false);

  const showForm = (e) => {
    e.preventDefault();
    setShowFilter(!showFilter);
  };
  const filter = (e) => {
    router.replace(
      `/tutors/?page=${1}&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${search}`
    );
    setShowFilter(!showFilter);
  };
  const HandleSearch = (e) => {
    e.preventDefault();
    router.replace(
      `/tutors/?page=${1}&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${search}`
    );
  };

  const clearFilter = async (e) => {
    e.preventDefault();
    setDivission("");
    setDistrict("");
    setUpozilla("");
    setSearch("");
    setGender("all");
    setCurrent(1);
    setShowFilter(!showFilter);
    router.replace(`/tutors`);
  };
  const clearFilterBtn = async (e) => {
    e.preventDefault();
    setDivission("");
    setDistrict("");
    setUpozilla("");
    setSearch("");
    setGender("all");
    router.replace(`/tutors`);
  };
  const clearSearch = (e) => {
    setSearch("");
    router.replace(
      `/tutors/?page=${1}&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${""}`
    );
  };
  const prevPage = (e) => {
    if (current > 1) {
      setCurrent(current - 1);
      router.replace(
        `/tutors/?page=${current - 1
        }&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${""}`
      );
    } else {
      Alert.fire({
        icon: "info",
        title: "Not available",
        text: "This is the first page.",
        timer: 1500,
      });
    }
  };
  const nextPage = (e) => {
    if (current < pages) {
      setCurrent(current + 1);
      router.replace(
        `/tutors/?page=${current + 1
        }&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${""}`
      );
    } else {
      Alert.fire({
        icon: "info",
        title: "Not available",
        text: "This is the last page.",
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    setTutorData(tutorsRes.data);
    console.log(tutorsRes.data);
    setPages(tutorsRes.pages);
    setCurrent(tutorsRes.current);
    setStart(!start);
  }, [tutorsRes]);

  return (

    <div className="">

      <Head>
        <title>TuitionApp - All Tutors</title>
      </Head>

{/*      
      <div className="relative w-full h-96">
        <Image
          src="/tutorbanner.png"
          layout="fill"
          objectFit="cover"
          alt="Tutor Banner"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white z-10">
          <h1 className="text-4xl font-bold mb-4">দেশের সবচাইতে বড় টিউটর প্ল্যাটফর্মে স্বাগতম!</h1>
          <p className="text-xl opacity-50">সেরা শিক্ষকদের পরিচর্যায় দেশের যেকোন প্রান্ত থেকে<br />অব্যাহত থাকুক পড়াশুনার অগ্রযাত্রা</p>
        </div>
      </div> */}
<Banner />

      <div className="2xl:basis-9/12 xl:basis-9/12 lg:basis-9/12 md:basis-full sm:basis-full 
      basis-full h-full lg:mb-8 md:mb-6 sm:mb-4 mb-2">
        <div>
          <div
            className={`flex flex-col w-full  bg-white rounded-lg  dark:bg-neutral-800 p-4 mb-6 h-full`}
          >

           {/* <Image src= '/tutorbanner.png'  height={400} width={1000} />
<h1>দেশের সবচাইতে বড় টিউটর প্ল্যাটফর্মে স্বাগতম!</h1>
<p>সেরা শিক্ষকদের পরিচর্যায় দেশের যেকোন প্রান্ত থেকে <br />
 অব্যাহত থাকুক পড়াশুনার অগ্রযাত্রা</p> */}

            <div className="w-full justify-between flex mb-5">
              <h2 className="text-gray-800 dark:text-gray-200 text-2xl lg:text-3xl font-bold">
                All Registered tutors
              </h2>
            </div>
            <div className="w-full flex flex-row">
              <div className="w-full flex ">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className=" bg-neutral-100 focus:outline-none dark:bg-neutral-900 text-gray-700 dark:text-gray-200 items-center h-10 w-full px-3 text-sm"
                  type="text"
                  placeholder="Search…"
                />
                {search !== "" && (
                  <button
                    onClick={(event) => {
                      clearSearch(event);
                    }}
                    className="w-10 focus:border-0  h-10 flex justify-center items-center shrink-0 bg-neutral-100  dark:bg-neutral-900 text-gray-700 dark:text-gray-200 transition duration-100"
                  >
                    <MdClear className="w-6 h-6" />
                  </button>
                )}
                <button
                  onClick={(event) => {
                    HandleSearch(event);
                  }}
                  className="w-10 focus:border-0  h-10 flex justify-center items-center shrink-0 bg-rose-600 hover:bg-rose-700 active:bg-rose-700 text-white rounded-r-lg shadow-lg transition duration-100"
                >
                  <BiSearch className="w-6 h-6" />
                </button>
              </div>
              <div className="ml-2 flex gap-1 justify-end">
                {(divission !== "" || gender !== "all" || search !== "") && (
                  <button
                    onClick={(e) => clearFilterBtn(e)}
                    className={` w-10  h-10  flex justify-center items-center shrink-0 bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700 text-white rounded-lg  transition duration-100`}
                  >
                    <AiOutlineUndo className="w-6 h-6" />
                  </button>
                )}
                <button
                  onClick={(e) => showForm(e)}
                  className={`p-2 h-10 md:w-40 flex justify-center items-center ${showFilter == true
                    ? "bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700"
                    : "bg-rose-600 hover:bg-rose-700 active:bg-rose-700"
                    }  text-white rounded-lg shadow-lg transition duration-100`}
                >
                  {showFilter == true ? (
                    <MdClose className="w-6 h-6" />
                  ) : (
                    <HiOutlineLocationMarker className="w-5 h-5" />
                  )}
                  <p className="text-white mb-2 m-2">Location</p>
                </button>
              </div>
            </div>
          </div>
          <div
            className={`flex w-full justify-between items-center gap-4 mb-6 ${showFilter == false ? "hidden" : "block"
              }`}
          >
            <div className="flex items-center justify-between  p-4 w-full flex-wrap mb-2 bg-gray-100 rounded-lg dark:bg-neutral-800 ring-2 ring-rose-600 ">
              <div className="w-full grid grid-cols-3 gap-4 ">
                <div className="col-span-4 md:col-span-2 ">
                  <p className="text-gray-700 dark:text-gray-200 mb-2 ">
                    Location
                  </p>
                  <LocationSelector
                    division={divission}
                    district={district}
                    area={upozilla}
                    setDivision={setDivission}
                    setDistrict={setDistrict}
                    setArea={setUpozilla}
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
                    className="w-10 md:w-12 h-10 md:h-12 flex
                     justify-center items-center shrink-0 
                     bg-rose-600 hover:bg-rose-700 active:bg-rose-700 
                     text-white rounded-lg shadow-lg transition duration-100"
                  >
                    <FiCheck className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
            {tutorData.map((item, i) => (
              <>
                <TutorCard
                  key={i}
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
              </>
            ))}
          </div>
        </div>
        <div className="flex mt-6 justify-center items-center gap-4">
          <button
            onClick={(e) => prevPage(e)}
            className={` px-3 h-10 flex justify-center items-center shrink-0 ${current == 1
              ? "bg-neutral-500 cursor-not-allowed"
              : "bg-rose-600 hover:bg-rose-700 active:bg-rose-700"
              }  text-white rounded-lg shadow-lg transition duration-100`}
          >
            <AiOutlineLeft className="w-6 h-6" /> Prev
          </button>
          <div className="px-3 h-10 flex justify-center items-center shrink-0 bg-rose-600 text-white rounded-lg shadow-lg transition duration-100">
            {current + "/" + pages}
          </div>
          <button
            onClick={(e) => nextPage(e)}
            className={` px-3 h-10 flex justify-center items-center shrink-0 ${current == pages
              ? "bg-neutral-500 cursor-not-allowed"
              : "bg-rose-600 hover:bg-rose-700 active:bg-rose-700"
              } text-white rounded-lg shadow-lg transition duration-100`}
          >
            Next <AiOutlineRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="2xl:basis-3/12 xl:basis-3/12 lg:basis-3/12 md:basis-full sm:basis-full basis-full ">
        {/* <Sidebar /> */}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  let token = parseCookies(ctx).authToken || null;
  const res = await fetch(
    `${process.env.API_URL}/tutors/?page=${ctx.query.page || 1}&div=${ctx.query.div || ""
    }&dis=${ctx.query.dis || ""}&upo=${ctx.query.upo || ""}&gender=${ctx.query.gender || "all"
    }&search=${ctx.query.search || ""}&my=${true}`
  );
  const tutors = await res.json();
  if (tutors) {
    return {
      props: {
        tutorsRes: tutors,
        token: token,
      }
    };
  }
}

export default Tutors;
