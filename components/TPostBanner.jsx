
import Image from "next/image";
import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import LocationSelector from "./utils/LocationSelector"; // Assume you have this component

const TPostBanner = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className=" w-full h-96 TpostBanner">
     <div className=" ">
     
     
      <div className="flex  items-center justify-center text-center z-10">
      <Image 
            src="/undraw.png"
            height={50}
            width={30}
            />
       <div className="justify-center items-center mx-auto z-10 text-center  " style={{ transform: "translateX(50px)" }} >
       <h1 className="text-4xl font-bold mb-4 baneer-f">টিউশন খোঁজা এখন একদম সোজা !</h1>
       <p className="text-xl baneer-f">সেরা শিক্ষকদের পরিচর্যায় দেশের যেকোন প্রান্ত থেকে অব্যাহত
       <br /> থাকুক পড়াশুনার অগ্রযাত্রা</p>
       </div>
       <div className="justify-end"> 
       <Image 
       src="/undraw.svg"
       height={230}
       width={240}
       />
       </div>
       
       
      </div>
      <div className="bg-white mt-4 w-full max-w-xl flex pt-4 pb-4 pl-6 pr-6 rounded-lg">
      <div className="flex-grow relative bg-white rounded-l-lg">
        <HiOutlineLocationMarker className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-600" />
        <input
          type="text"
          placeholder="Select Location"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none rounded-lg h-12"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="flex-grow relative bg-white rounded-r-lg ml-1">
        <BiSearch className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-600" />
        <input
          type="text"
          placeholder="Search by dept, institute"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none rounded-lg h-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <MdClear className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 cursor-pointer" onClick={clearSearch} />
        )}
      </div>
      <button
        onClick={handleSearch}
        className="bg-green-500 text-white rounded-lg px-6 py-1 ml-2 whitespace-nowrap h-12"
      >
        Search Tutor
      </button>
    </div>
      </div>
    </div>
  );
};

export default TPostBanner;
// background: #1DA463;

