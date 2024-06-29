

// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { BiSearch } from "react-icons/bi";
// import { MdTune } from "react-icons/md";
// import Slider from "react-slick";

// function SampleNextArrow(props) {
//   const { onClick } = props;
//   return (
//     <div
//       className="absolute top-[50%] z-20 right-0 -mt-5 bottom-0 rounded-lg flex justify-end items-center cursor-pointer hover:bg-rose-700 focus:bg-rose-700 text-white"
//       style={{ width: '85px', height: '42px', background: 'none', color: "black" }}
//       onClick={onClick}
//     >
//       {'>'}
//     </div>
//   );
// }

// const SearchButton = ({ term, onClick, setActiveComponent }) => (
//   <div className="p-1">
//     <button
//       onClick={(e) => {
//         setActiveComponent(term);
//         onClick(term, e);  // Pass the event object
//       }}
//       className="search-button flex items-center justify-center w-full text-black duration-150 focus:shadow-outline bg-white rounded-lg border border-gray-300 hover:bg-gray-100"
//       style={{ height: '36px' }}
//     >
//       <BiSearch className="text-lg text-gray-600" />
//       <span className="text-lg ml-1">{term}</span>
//     </button>
//   </div>
// );

// const SearchBar = ({ HandleSearchcustom, customs, setActiveComponent }) => {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [showMore, setShowMore] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     router.replace(`/tutors/?search=${search}`);
//   };

//   const clearSearch = () => {
//     setSearch("");
//     router.replace(`/tutors/?search=`);
//   };

//   const handlePresetSearch = (term, e) => {
//     setSearch(term);
//     router.replace(`/tutors/?search=${term}`);
//   };

//   const handleCustomSearch = (term, e) => {
//     HandleSearchcustom(term, e);
//   };

//   const presetTerms = ["Buet", "DU", "DMC", "CUM", "RUET", "SUST"];
//   const visibleTerms = showMore || isLargeScreen ? presetTerms : presetTerms.slice(0, 3);

//   const toggleShowMore = () => {
//     setShowMore(!showMore);
//   };

//   return (
//     <>
//       {!isLargeScreen ? (
//         <Slider
//           infinite={true}
//           slidesToShow={3}
//           slidesToScroll={1}
//           speed={500}
//           autoplay={false}
//           nextArrow={<SampleNextArrow />}
//           prevArrow={<div style={{ display: 'none' }} />}
//         >
//           {presetTerms.map((term, index) => (
//             <div key={index} style={{ display: index < 3 || showMore ? 'block' : 'none' }}>
//               <SearchButton term={term} onClick={handlePresetSearch} setActiveComponent={setActiveComponent} />
//             </div>
//           ))}
//         </Slider>
//       ) : (
//         <div className="flex container main-tutor-button flex-wrap justify-center lg:justify-center mx-auto lg:flex-nowrap">
//           {presetTerms.map((term, index) => (
//             <div key={index} className="flex-auto w-1/5 sm:w-1/4 lg:w-auto mx-1 my-1 lg:mx-2 lg:my-0">
//               <SearchButton term={term} onClick={handleCustomSearch} setActiveComponent={setActiveComponent} />
//             </div>
//           ))}
//           <div className="flex-auto w-1/5 sm:w-1/4 lg:w-auto mx-1 my-1 lg:mx-2 lg:my-0">
//             <button className="flex items-center mt-2 justify-center w-full text-black duration-150 focus:shadow-outline bg-white rounded-lg border border-gray-300 hover:bg-gray-100 p-1">
//               <span>Filter</span>
//               <MdTune size={24} style={{ marginLeft: "5px" }} />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SearchBar;

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BiSearch } from "react-icons/bi";
import { MdTune } from "react-icons/md";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-[50%] z-20 right-0 -mt-5 bottom-0 rounded-lg flex justify-end items-center cursor-pointer hover:bg-rose-700 focus:bg-rose-700 text-white"
      style={{ width: '85px', height: '42px', background: 'none', color: "black" }}
      onClick={onClick}
    >
      {'>'}
    </div>
  );
}

const SearchButton = ({ term, onClick, setActiveComponent }) => (
  <div className="p-1">
    <button
      onClick={(e) => {
        setActiveComponent(term);
        onClick(term, e); // Pass the event object
      }}
      className="search-button flex items-center justify-center w-full text-black duration-150 focus:shadow-outline bg-white rounded-lg border border-gray-300 hover:bg-gray-100"
      style={{ height: '36px' }}
    >
      <BiSearch className="text-lg text-gray-600" />
      <span className="text-lg ml-1">{term}</span>
    </button>
  </div>
);

const SearchBar = ({ HandleSearchcustom, customs, setActiveComponent }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showMore, setShowMore] = useState(false);
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

  const handleSearch = (e) => {
    e.preventDefault();
    router.replace(`/tutors/?search=${search}`);
  };

  const clearSearch = () => {
    setSearch("");
    router.replace(`/tutors/?search=`);
  };

  const handlePresetSearch = (term, e) => {
    setSearch(term);
    router.replace(`/tutors/?search=${term}`);
  };

  const handleCustomSearch = (term, e) => {
    HandleSearchcustom(term, e);
  };

  const presetTerms = ["Buet", "DU", "DMC", "CUM", "RUET", "SUST"];
  const visibleTerms = showMore || isLargeScreen ? presetTerms : presetTerms.slice(0, 3);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      {!isLargeScreen ? (
        <Slider
          infinite={true}
          slidesToShow={3}
          slidesToScroll={1}
          speed={500}
          autoplay={false}
          nextArrow={<SampleNextArrow />}
          prevArrow={<div style={{ display: 'none' }} />}
        >
          {presetTerms.map((term, index) => (
            <div key={index} style={{ display: index < 3 || showMore ? 'block' : 'none' }}>
              <SearchButton term={term} onClick={handleCustomSearch} setActiveComponent={setActiveComponent} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex container main-tutor-button flex-wrap justify-center lg:justify-center mx-auto lg:flex-nowrap">
          {presetTerms.map((term, index) => (
            <div key={index} className="flex-auto w-1/5 sm:w-1/4 lg:w-auto mx-1 my-1 lg:mx-2 lg:my-0">
              <SearchButton term={term} onClick={handleCustomSearch} setActiveComponent={setActiveComponent} />
            </div>
          ))}
          <div className="flex-auto w-1/5 sm:w-1/4 lg:w-auto mx-1 my-1 lg:mx-2 lg:my-0">
            <button className="flex items-center mt-2 justify-center w-full text-black duration-150 focus:shadow-outline bg-white rounded-lg border border-gray-300 hover:bg-gray-100 p-1">
              <span>Filter</span>
              <MdTune size={24} style={{ marginLeft: "5px" }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
