import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/router";
import { MdClear, MdTune, MdFilterList } from "react-icons/md";
const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    router.replace(`/tutors/?search=${search}`);
  };

  const clearSearch = () => {
    setSearch("");
    router.replace(`/tutors/?search=`);
  };

  return (
    <div className="flex">
      {/*  */}
      <div className="flex-auto w-14 mx-auto">
        <button
          className="search-button flex items-center justify-center w-full text-black duration-150 focus:shadow-outline">
          <BiSearch className="text-xl text-gray-600" />
          <span className="text-xl ml-2">Buet</span>
        </button>
      </div>

      {/*  */}
      <div className="flex-auto w-14 mx-auto">
        <button
          className="search-button flex items-center justify-center w-full text-black duration-150 focus:shadow-outline">
          <BiSearch className="text-xl text-gray-600" />
          <span className="text-xl ml-2">DU</span>
        </button>
      </div>
      <div className="flex-auto w-14 mx-auto">
        <button
          className="search-button flex items-center justify-center w-full text-black duration-150 focus:shadow-outline">
          <BiSearch className="text-xl text-gray-600" />
          <span className="text-xl ml-2">DMC</span>
        </button>
      </div>
      <div className="flex-auto w-14 mx-auto">
        <button
          className="search-button flex items-center justify-center w-full text-black duration-150 focus:shadow-outline">
          <BiSearch className="text-xl text-gray-600" />
          <span className="text-xl ml-2">CUM</span>
        </button>
      </div>
      <div className="flex-auto w-14 mx-auto">
        <button
          className="search-button flex items-center justify-center w-full text-black duration-150 focus:shadow-outline">
          <BiSearch className="text-xl text-gray-600" />
          <span className="text-xl ml-2">
          RUET
          </span>
        </button>
      </div>
      <div className="flex-auto w-14 mx-auto">
        <button
          className="search-button flex items-center justify-center w-full text-black duration-150 focus:shadow-outline">
          <BiSearch className="text-xl text-gray-600" />
          <span className="text-xl ml-2">SUST</span>
        </button>
      </div>

      {/*  */}

      <div className="flex-auto w-5 mx-auto">

      </div>
      <div className="flex-auto w-14 mx-auto mt-2">
        <div className="flex relative ">
          <button style={{ display: 'flex', alignItems: 'center' }}>
            <span >Filter</span>

            <MdTune size={24} style={{ marginLeft: '8px' }} />
          </button>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default SearchBar;


// const SearchBar = () => {
//   return (
//     <div className="flex justify-center mt-4">
//       <nav aria-label="Page navigation">
//         <ul className="inline-flex space-x-2">
//           <li>
//             <button className="flex items-center justify-center w-10 h-10 text-green-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100">
//               <BiSearch size={20} className="text-green-600" />
//               <span className="ml-2">DMC</span>
//             </button>
//           </li>
//           <li>
//             <button className="flex items-center justify-center w-10 h-10 text-green-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100">
//               <BiSearch size={20} className="text-green-600" />
//               <span className="ml-2">αUIV</span>
//             </button>
//           </li>
//           <li>
//             <button className="flex items-center justify-center w-10 h-10 text-green-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100">
//               <BiSearch size={20} className="text-green-600" />
//               <span className="ml-2">RUET</span>
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default SearchBar;
