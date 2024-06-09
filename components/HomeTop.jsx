
import Image from "next/image";
import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import LocationSelector from "./utils/LocationSelector"; // Assume you have this component

const HomeTop = () => {
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
    <div className="relative w-full h-96">
      <Image
        src="/homeb.png"
        layout="fill"
        objectFit="cover"
        alt="Banner"
        className="z-0"
      />
      <div className="top-home  absolute  flex flex-col items-center justify-center text-center text-white z-10">
        <h1 className="home-title"> টিউটর খোঁজায় আসুক নতুন মাত্রা। <br />
আনন্দ ময় হোক সবার শিক্ষা যাত্রা।</h1>
       <p className="home-sub">এখন খুব সহজেই দেশের সেরা সব শিক্ষক শিক্ষিকা অথবা কমিশন মুক্ত টিউশন খুঁজে পান <br />
       টিউশন অ্যাপে। </p>
       <div  className="flex home-icon">
       <Image src="/playstore.png" width={195} height={55}/>
       <Image src="/apple.png" width={195} height={55}/>
       </div>
      </div>
    </div>
  );
};

export default HomeTop;
// background: #1DA463;

