import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={handlePrevPage}
        className="p-2 mx-2 bg-gray-200 rounded-lg shadow-md dark:bg-neutral-700"
        disabled={currentPage === 1}
      >
        <AiOutlineLeft />
      </button>
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        className="p-2 mx-2 bg-gray-200 rounded-lg shadow-md dark:bg-neutral-700"
        disabled={currentPage === totalPages}
      >
        <AiOutlineRight />
      </button>
    </div>
  );
};

export default Pagination;
