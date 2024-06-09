import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu icon */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
          {/* Logo - hidden on mobile when menu is open */}
          {!isOpen && (
            <div className="text-xl font-bold text-red-600 md:block">
              <span className="font-black">tuiti</span>
              <span className="text-red-500">Q</span>
              <span>napp</span>
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/home">
            <a className="text-gray-700 hover:text-red-600">হোম</a>
          </Link>
          <Link href="/products">
            <a className="text-gray-700 hover:text-red-600">প্রোডাক্ট</a>
          </Link>
          <Link href="/services">
            <a className="text-gray-700 hover:text-red-600">সার্ভিস</a>
          </Link>
          <button className="bg-gray-100 p-2 rounded text-gray-700 hover:bg-gray-200">বং</button>
          <span className="text-gray-700">📞 16910</span>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">লগইন</button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-4">
          <Link href="/home">
            <a className="text-gray-700 hover:text-red-600">হোম</a>
          </Link>
          <Link href="/products">
            <a className="text-gray-700 hover:text-red-600">প্রোডাক্ট</a>
          </Link>
          <Link href="/services">
            <a className="text-gray-700 hover:text-red-600">সার্ভিস</a>
          </Link>
          <button className="bg-gray-100 p-2 rounded text-gray-700 hover:bg-gray-200">বং</button>
          <span className="text-gray-700">📞 16910</span>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">লগইন</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
