import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/router";
import { MdClear, MdTune, MdFilterList} from "react-icons/md";
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
  <div className="flex-auto w-14 mx-auto">
    <div className="flex relative bg-white rounded-r-lg ml-1">
      <BiSearch className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-600" />
      <input
        type="text"
        placeholder="BUEV"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none rounded-lg h-12"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <MdClear
          className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 cursor-pointer"
          onClick={clearSearch}
        />
      )}
    </div>
  </div>

  {/*  */}
  <div className="flex-auto w-14 mx-auto">
    <div className="flex relative bg-white rounded-r-lg ml-1">
      <BiSearch className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-600" />
      <input
        type="text"
        placeholder="DU"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none rounded-lg h-12"

        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <MdClear
          className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 cursor-pointer"
          onClick={clearSearch}
        />
      )}
    </div>
  </div>
  {/*  */}
  <div className="flex-auto w-14 mx-auto">
    <div className="flex relative bg-white rounded-r-lg ml-1">
      <BiSearch className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-600" />
      <input
        type="text"
        placeholder="DU"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none rounded-lg h-12"

        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <MdClear
          className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 cursor-pointer"
          onClick={clearSearch}
        />
      )}
    </div>
  </div>
  {/*  */}
  <div className="flex-auto w-14 mx-auto">
    <div className="flex relative bg-white rounded-r-lg ml-1">
      <BiSearch className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-600" />
      <input
        type="text"
        placeholder="DU"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none rounded-lg h-12"

        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <MdClear
          className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 cursor-pointer"
          onClick={clearSearch}
        />
      )}
    </div>
  </div>
  {/*  */}
  <div className="flex-auto w-14 mx-auto">
    <div className="flex relative bg-white rounded-r-lg ml-1">
      <BiSearch className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-600" />
      <input
        type="text"
        placeholder="DU"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none rounded-lg h-12"

        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <MdClear
          className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 cursor-pointer"
          onClick={clearSearch}
        />
      )}
    </div>
  </div>
  {/*  */}
  <div className="flex-auto w-14 mx-auto">
    <div className="flex relative bg-white rounded-r-lg ml-1">
      <BiSearch className="absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-600" />
      <input
        type="text"
        placeholder="DU"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none rounded-lg h-12"

        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <MdClear
          className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 cursor-pointer"
          onClick={clearSearch}
        />
      )}
    </div>
  </div>
  {/*  */}
  <div className="flex-auto w-5 mx-auto">
   
  </div>
  <div className="flex-auto w-14 mx-auto mt-2">
    <div className="flex relative ">
    <button style={{ display: 'flex', alignItems: 'center' }}>
    <span >Filter</span>

      <MdTune size={24} style={{ marginLeft : '8px' }} />
    </button>    
    </div>
  </div>
  {/*  */}
</div>
  );
};

export default SearchBar;
