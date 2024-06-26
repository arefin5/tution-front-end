
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { parseCookies } from "nookies";
// import { useEffect, useState } from "react";
// import { BiSearch } from "react-icons/bi";
// import { FiCheck } from "react-icons/fi";
// import { MdClear, MdClose } from "react-icons/md";
// import { AiOutlineLeft, AiOutlineRight, AiOutlineUndo } from "react-icons/ai";
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import LocationSelector from "../../components/utils/LocationSelector";
// import Sidebar from "../../components/page/Sidebar";
// import TutorCard from "../../components/user/TutorCard";
// import Alert from "sweetalert2";
// import Head from "next/head";
// import React from "react";
// import Image from "next/image";
// import Banner from "../../components/Banner";
// import SearchBar from "../../components/SearchBar";
// import { Modal, Pagination } from "antd";
// import { GoArrowLeft } from "react-icons/go";
// import { GoArrowRight } from "react-icons/go";
// import { RiArrowLeftLine } from "react-icons/ri";
// import { RiArrowRightLine } from "react-icons/ri";
// import Navbar from "../../components/Navbar"
// import LocationSe from "../../components/LocationS";
// import HomePostSection from "../../components/post/HomePostSection";
// import TPostBanner from "../../components/TPostBanner";

// function Tutors({ token, tutorsRes }) {
//   const router = useRouter();
//   const [start, setStart] = useState(false);
//   const [showFilter, setShowFilter] = useState(false);
//   const [tutorData, setTutorData] = useState([
//     {
//       avatarImg: "",
//       name: "",
//       institute: "",
//       department: "",
//       ratingsCount: "",
//       starsCount: "",
//       verified: "",
//       gender: "",
//       _id: "",
//     },
//   ]);
//   const [customs, setCustom] = useState("Dhaka")

//   const [divission, setDivission] = useState("");
//   const [district, setDistrict] = useState("");
//   const [upozilla, setUpozilla] = useState("");
//   const [gender, setGender] = useState("all");
//   const [search, setSearch] = useState("");
//   const [pages, setPages] = useState(1);
//   const [current, setCurrent] = useState(1);
//   const [lastPage, setLastPage] = useState(false);
//   const [activeComponent, setActiveComponent] = useState('component1'); // Set Component1 as default
//   const [page, setPage] = useState(1);
//   const [totalPosts, setTotalPosts] = useState(10);
//   const [posts, setPosts] = useState([]);


//   const showForm = (e) => {
//     e.preventDefault();
//     setShowFilter(!showFilter);
//   };
//   const filter = (e) => {
//     router.replace(
//       `/tutors/?page=${1}&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${search}`
//     );
//     setShowFilter(!showFilter);
//   };
//   const HandleSearch = (e) => {
//     setActiveComponent("component1")

//     e.preventDefault();
//     router.replace(
//       `/tutors/?page=${1}&div=${divission}&dis=$
//       {district}&upo=${upozilla}&gender=${gender}&search=${search}`
//     );
//   };
//   // custom search
//   const HandleSearchcustom = (e) => {
//     setActiveComponent("component1")
//     setCustom(customs)
//     e.preventDefault();
//     router.replace(
//       `/tutors/?page=${1}&div=${divission}&dis=$
//     {district}&upo=${upozilla}&gender=${gender}&search=${customs}`
//     );
//   };

//   const clearFilter = async (e) => {
//     e.preventDefault();
//     setDivission("");
//     setDistrict("");
//     setUpozilla("");
//     setSearch("");
//     setGender("all");
//     setCurrent(1);
//     setShowFilter(!showFilter);
//     router.replace(`/tutors`);
//   };
//   const clearFilterBtn = async (e) => {
//     e.preventDefault();
//     setDivission("");
//     setDistrict("");
//     setUpozilla("");
//     setSearch("");
//     setGender("all");
//     router.replace(`/tutors`);
//   };
//   const clearSearch = (e) => {
//     setSearch("");
//     router.replace(
//       `/tutors/?page=${1}&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${""}`
//     );
//   };
//   const prevPage = (e) => {
//     if (current > 1) {
//       setCurrent(current - 1);
//       router.replace(
//         `/tutors/?page=${current - 1
//         }&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${""}`
//       );
//     } else {
//       Alert.fire({
//         icon: "info",
//         title: "Not available",
//         text: "This is the first page.",
//         timer: 1500,
//       });
//     }
//   };
//   const nextPage = (e) => {
//     if (current < pages) {
//       setCurrent(current + 1);
//       router.replace(
//         `/tutors/?page=${current + 1
//         }&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${""}`
//       );
//     } else {
//       Alert.fire({
//         icon: "info",
//         title: "Not available",
//         text: "This is the last page.",
//         timer: 1500,
//       });
//     }
//   };
//   // 
//   const handlePageChange = (pageNumber) => {
//     if (pageNumber > 0 && pageNumber <= pages) {
//       router.replace(
//         `/tutors/?page=${pageNumber}`
//       );
//     }
//   };
//   const fetchPosts = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/?page&div&dis&upo&gender&search`, {
//         method: "GET",
//         headers: { token: token }
//       });
//       const data = await res.json();
//       // console.log("data=>",data)
//       if (res.ok) {
//         setPosts(data);
//       } else {
//         console.error("Failed to fetch posts data", data);
//       }
//     } catch (error) {
//       console.error("Error fetching posts data", error);
//     }
//   };
//   // 
//   const handleComponentChange = (componentName) => {
//     setActiveComponent(componentName);
//   };



//   // 
//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'component1':
//         return (
//           <div className="grid 
//         justify-center mx-auto 
//         grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
//             {tutorData.map((item) => (
//               <div className="main-t tu-card-hov" key={item._id}>
//                 <TutorCard
//                   avatarImg={item.avatarImg}
//                   name={item.name}
//                   institute={item.institute}
//                   department={item.department}
//                   ratingsCount={item.ratingsCount}
//                   starsCount={item.starsCount}
//                   verified={item.verified}
//                   gender={item.gender}
//                   id={item._id}
//                 />
//               </div>
//             ))}
//           </div>
//         );
//       case 'component2':
//         return (
//           <div className="max-w-screen-xl mt-12 px-4 md:px-8 mx-auto home-c">
//             <HomePostSection posts={posts} token={token} />
//           </div>
//         );
//       case 'component3':
//         return <TPostBanner />;

//       default:
//         return null;
//     }
//   };
//   // 
//   const BannarImplement = () => {
//     switch (activeComponent) {
//       case 'component1':
//         <Banner />
//       case 'component2':
//         <Banner />
//       case 'component3':
//         return <TPostBanner />;

//       default:
//         return null;
//     }
//   };
//   // 

//   useEffect(() => {
//     setTutorData(tutorsRes.data);
//     setPages(tutorsRes.pages);
//     setCurrent(tutorsRes.current);
//     setStart(!start);
//     fetchPosts();

//   }, [tutorsRes, posts]);

//   return (
//     <div className="banner-main">
//       <Head>
//         <title></title>
//       </Head>
//       <Navbar />
//       {/* <TPostBanner />
//        */}
//       <Banner token={token} search={search} setSearch={setSearch} HandleSearch={HandleSearch} />
//       {/* <LocationSe 

//        division={divission}
//         district={district}
//         area={upozilla}
//         setDivision={setDivission}
//         setDistrict={setDistrict}
//         setArea={setUpozilla}
//       /> */}
//       {/*navigation  */}
//       <div className="navigation-tutor pt-3 mb-4 mt-4 flex justify-center">
//         <div className="flex flex-row mx-auto items-center">
//           <div className="px-2">
//             <p onClick={() => handleComponentChange('component1')}
//               className={`opacity-50 cursor-pointer text-white ${activeComponent === 'component1' ? 'activeB' : ''}`}
//             >টিউটর প্রফাইল |</p>
//             <div className={`mt-5 ${activeComponent === 'component1' ? 'activeBa' : ''}`}
//             >

//             </div>
//           </div>
//           <div className="px-2">
//             <p onClick={() => handleComponentChange('component2')}
//               className={`opacity-50 cursor-pointer text-white ${activeComponent === 'component2' ? 'activeB' : ''}`}
//             >টিউটর পোস্ট |</p>
//             <div className={`mt-5 ${activeComponent === 'component2' ? 'activeBa' : ''}`}
//             >

//             </div>
//           </div>
//           <div className="px-2">
//             <p onClick={() => handleComponentChange('component3')}
//               className={`opacity-50 cursor-pointer text-white ${activeComponent === 'component3' ? 'activeB' : ''}`}>টিউশন পোস্ট</p>
//             <div className={`mt-5 ${activeComponent === 'component3' ? 'activeBa' : ''}`}
//             >

//             </div>
//           </div>
//         </div>
//       </div>
//       <SearchBar HandleSearchcustom={HandleSearchcustom} customs={customs}
//         setActiveComponent={setActiveComponent}
//       />
//       <div className="container 
//       main-tutor
//        mx-auto  2xl:basis-9/12
//         xl:basis-9/12 lg:basis-9/12
//          md:basis-full sm:basis-full
//           basis-full h-full lg:mb-8 md:mb-6 
//           sm:mb-4
//            mb-2">
//         <div>
//           <div
//             className={`flex flex-col w-full   rounded-lg  dark:bg-neutral-800 p-4 mb-6 h-full`}
//           >
//             {renderComponent()}
//             {/*  */}
//           </div>
//           <div
//             className={`flex w-9/12 justify-between items-center gap-4 mb-6 ${showFilter == false ? "hidden" : ""
//               }`}
//           >
//             <div className="flex items-center justify-between  p-4 w-full flex-wrap mb-2 bg-gray-100 rounded-lg dark:bg-neutral-800 ring-2 ring-rose-600 ">
//               <div className="w-full grid grid-cols-3 gap-4 ">
//                 <div className="col-span-4 md:col-span-2 ">
//                   <p className="text-gray-700 dark:text-gray-200 mb-2 ">
//                     Location
//                   </p>
//                   <LocationSelector
//                     division={divission}
//                     district={district}
//                     area={upozilla}
//                     setDivision={setDivission}
//                     setDistrict={setDistrict}
//                     setArea={setUpozilla}
//                   />
//                 </div>
//                 <div className="col-span-4 md:col-span-1">
//                   <p className="text-gray-700 dark:text-gray-200 mb-2">
//                     Tutor Gender
//                   </p>
//                   <select
//                     value={gender}
//                     onChange={(e) => setGender(e.target.value)}
//                     className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:border-rose-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring appearance-none pr-8 rounded leading-tight "
//                     id="grid-state"
//                   >
//                     <option value={"all"}>All</option>
//                     <option value={"male"}>Male</option>
//                     <option value={"female"}>Female</option>
//                   </select>
//                   <p className="text-gray-700 dark:text-gray-200 my-2">
//                     Show nearest tutors
//                   </p>
//                   <Link href="/tutors/my-area" passHref>
//                     <a className="inline-block bg-rose-600 hover:bg-rose-700 active:bg-rose-700 focus-visible:ring ring-rose-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2">
//                       Nearest
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-between mt-6 ml-auto">
//                 <button
//                   onClick={filter}
//                   className="w-full inline-block md:w-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-600 focus-visible:ring ring-blue-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2"
//                 >
//                   Apply Filters
//                 </button>
//                 <button
//                   onClick={clearFilterBtn}
//                   className="w-full inline-block md:w-auto bg-gray-500 hover:bg-gray-600 active:bg-gray-600 focus-visible:ring ring-gray-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-between items-center  mb-4">
//             <div className="flex items-center">

//               {search && (
//                 <button
//                   className="ml-4 bg-gray-200 rounded-lg p-2 text-gray-700 dark:bg-neutral-800 dark:text-gray-300"
//                   onClick={clearSearch}
//                 >
//                   <MdClear className="text-xl" />
//                 </button>
//               )}
//             </div>
//             <div className="flex items-center">

//             </div>
//           </div>
//           {/*  */}
//           {/* Pagination Container */}
//           <div className="flex justify-center mt-4">
//             <nav aria-label="Page navigation">
//               <ul className="inline-flex space-x-2">
//                 <li>
//                   <button className="flex items-center justify-center w-10 h-10 text-green-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100">
//                     <RiArrowLeftLine size={30} className="text-green-600 transform rotate-360 duration-1000" />
//                   </button>
//                 </li>
//                 <li>
//                   <button className="w-10 h-10 text-black-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100">1</button>
//                 </li>
//                 <li>
//                   <button className="w-10 h-10 text-black-600 transition-colors duration-150 rounded-full 
//         focus:shadow-outline hover:bg-green-100">2</button>
//                 </li>
//                 <li>
//                   <button className="w-10 h-10 text-white transition-colors duration-150 bg-green-600 border border-r-0 border-green-600 rounded-full focus:shadow-outline">3</button>
//                 </li>
//                 <li>
//                   <button className="flex items-center justify-center w-10 h-10 text-green-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100">

//                     <RiArrowRightLine size={30} className="text-green-600 transform rotate-360 duration-1000" />


//                   </button>


//                 </li>
//               </ul>
//             </nav>
//           </div>

//           {/*  */}


//         </div>
//       </div>
//     </div>
//   );
// }

// export async function getServerSideProps(ctx) {
//   let token = parseCookies(ctx).authToken || null;
//   const res = await fetch(
//     `${process.env.API_URL}/tutors/?page=${ctx.query.page || 1}&div=${ctx.query.div || ""
//     }&dis=${ctx.query.dis || ""}&upo=${ctx.query.upo || ""}&gender=${ctx.query.gender || "all"
//     }&search=${ctx.query.search || ""}&my=${true}`
//   );
//   const tutors = await res.json();
//   if (tutors) {
//     return {
//       props: {
//         tutorsRes: tutors,
//         token: token,
//       }
//     };
//   }
// }

// export default Tutors;



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
import SearchBar from "../../components/SearchBar";
import { Modal, Pagination } from "antd";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { RiArrowLeftLine } from "react-icons/ri";
import { RiArrowRightLine } from "react-icons/ri";
import Navbar from "../../components/Navbar"
import LocationSe from "../../components/LocationS";
import HomePostSection from "../../components/post/HomePostSection";
import TPostBanner from "../../components/TPostBanner";

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
  const [customs, setCustom] = useState("Dhaka");
  const [divission, setDivission] = useState("");
  const [district, setDistrict] = useState("");
  const [upozilla, setUpozilla] = useState("");
  const [gender, setGender] = useState("all");
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(1);
  const [current, setCurrent] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [activeComponent, setActiveComponent] = useState('component1'); // Set Component1 as default
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(10);
  const [posts, setPosts] = useState([]);

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
    setActiveComponent("component1");
    e.preventDefault();
    router.replace(
      `/tutors/?page=${1}&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${search}`
    );
  };

  // custom search
  const handleSearchCustom = (term, e) => {
    e.preventDefault();
    console.log(term);
    setActiveComponent("component1");
    setCustom(term);
    router.replace(
      `/tutors/?page=${1}&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${term}`
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
        `/tutors/?page=${current - 1}&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${""}`
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
        `/tutors/?page=${current + 1}&div=${divission}&dis=${district}&upo=${upozilla}&gender=${gender}&search=${""}`
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

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= pages) {
      router.replace(`/tutors/?page=${pageNumber}`);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/?page&div&dis&upo&gender&search`, {
        method: "GET",
        headers: { token: token },
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data);
      } else {
        console.error("Failed to fetch posts data", data);
      }
    } catch (error) {
      console.error("Error fetching posts data", error);
    }
  };

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'component1':
        return (
          <div className="grid justify-center mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
            {tutorData.map((item) => (
              <div className="main-t tu-card-hov" key={item._id}>
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
          </div>
        );
      case 'component2':
        return (
          <div className="max-w-screen-xl mt-12 px-4 md:px-8 mx-auto home-c">
            <HomePostSection posts={posts} token={token} />
          </div>
        );
      case 'component3':
        return <TPostBanner />;
      default:
        return null;
    }
  };

  const BannarImplement = () => {
    switch (activeComponent) {
      case 'component1':
      case 'component2':
        return <Banner />;
      case 'component3':
        return <TPostBanner />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setTutorData(tutorsRes.data);
    setPages(tutorsRes.pages);
    setCurrent(tutorsRes.current);
    setStart(!start);
    fetchPosts();
  }, [tutorsRes]);

  return (
    <div className="banner-main">
      <Head>
        <title></title>
      </Head>
      <Navbar />
      <Banner token={token} search={search} setSearch={setSearch} HandleSearch={HandleSearch} />
      <div className="navigation-tutor pt-3 mb-4 mt-4 flex justify-center">
        <div className="flex flex-row mx-auto items-center">
          <div className="px-2">
            <p onClick={() => handleComponentChange('component1')}
              className={`opacity-50 cursor-pointer text-white ${activeComponent === 'component1' ? 'activeB' : ''}`}
            >টিউটর প্রফাইল |</p>
            <div className={`mt-5 ${activeComponent === 'component1' ? 'activeBa' : ''}`}></div>
          </div>
          <div className="px-2">
            <p onClick={() => handleComponentChange('component2')}
              className={`opacity-50 cursor-pointer text-white ${activeComponent === 'component2' ? 'activeB' : ''}`}
            >টিউটর পোস্ট |</p>
            <div className={`mt-5 ${activeComponent === 'component2' ? 'activeBa' : ''}`}></div>
          </div>
          <div className="px-2">
            <p onClick={() => handleComponentChange('component3')}
              className={`opacity-50 cursor-pointer text-white ${activeComponent === 'component3' ? 'activeB' : ''}`}
            >টিউটর বিজ্ঞাপন</p>
            <div className={`mt-5 ${activeComponent === 'component3' ? 'activeBa' : ''}`}></div>
          </div>
        </div>
      </div>
      <div className="search-bar mt-4">
        <SearchBar
         setActiveComponent={setActiveComponent}
         HandleSearchcustom={handleSearchCustom}
        />
      </div>
      <div className="min-h-screen mt-5">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          {renderComponent()}
          <div className="pagination mt-4 flex justify-center items-center">
            <button onClick={prevPage} className="px-3 py-1 bg-gray-200 rounded-l">
              <RiArrowLeftLine />
            </button>
            <Pagination
              current={current}
              total={pages * 10}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
            <button onClick={nextPage} className="px-3 py-1 bg-gray-200 rounded-r">
              <RiArrowRightLine />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Tutors.getInitialProps = async (ctx) => {
  const token = parseCookies(ctx).token;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tutors/?page=${ctx.query.page || 1}&div=${ctx.query.div || ""
    }&dis=${ctx.query.dis || ""}&upo=${ctx.query.upo || ""}&gender=${ctx.query.gender || ""
    }&search=${ctx.query.search || ""}`,
    {
      method: "GET",
      headers: { token: token },
    }
  );
  const tutorsRes = await res.json();
  return {
    token: token,
    tutorsRes: tutorsRes,
  };
};

export default Tutors;
