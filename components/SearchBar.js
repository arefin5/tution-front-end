import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/router";

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
    <div className="flex items-center bg-white rounded-lg shadow-md p-4">
      <BiSearch className="text-gray-600 mr-2" />
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button onClick={clearSearch} className="ml-2 text-gray-600">
          Clear
        </button>
      )}
      
    </div>
  );
};

export default SearchBar;
