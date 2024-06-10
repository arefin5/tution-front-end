
// import Image from "next/image";
// import { useState } from "react";
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { BiSearch } from "react-icons/bi";
// import { MdClear } from "react-icons/md";
// import LocationSelector from "./utils/LocationSelector"; // Assume you have this component

// const HomeButom = () => {
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Implement search functionality
//   };

//   const clearSearch = () => {
//     setSearch("");
//   };

//   return (
//     <div className="relative w-full main-over">
//       <Image
//         src="/download app (1).svg"
//         layout="fill"
//         objectFit="cover"
//         alt="Banner"
//         className="z-0"
//       />
//       <div className="butom-home  absolute  flex flex-col items-start justify-start text-center text-white z-10">
//         <h1 className="botom-title"> টিউশন খোঁজা এখন একদম সোজা !  </h1>
//        <p className="home-sub">কমিশন মুক্ত টিউশন পেতে এখনই ডাউনলোড করুন আমাদের মোবাইল অ্যাপ। </p>
//        <main style={mainStyle}>
//        <div style={containerStyle}>
//       <button style={buttonStyle}>Hug × Hug</button>
//     </div>
//       </main>
//       </div>
//     </div>
//   );
// };

// export default HomeButom;
import Image from "next/image";
import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import LocationSelector from "./utils/LocationSelector"; // Assume you have this component

const HomeButom = () => {
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
    <div className="relative w-full main-over">
      <Image
        src="/download app (1).svg"
        layout="fill"
        objectFit="cover"
        alt="Banner"
        className="z-0"
      />
      <div className="butom-home absolute flex flex-col items-start justify-start text-center text-white z-10">
        <h1 className="botom-title">টিউশন খোঁজা এখন একদম সোজা!</h1>
        <p className="home-sub">কমিশন মুক্ত টিউশন পেতে এখনই ডাউনলোড করুন আমাদের মোবাইল অ্যাপ।</p>
        <div style={containerStyle}>
          <button style={buttonStyle}>ডাউনলোড করুন</button>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px', // Adjust margin as needed
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#E11D48',
  backgroundColor: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  outline: 'none',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

export default HomeButom;

