import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const Pagination = ({
  links: { next, prev },
  meta: { from, to, total },
  updateUrl,
}) => {
  const handlePrevBtn = () => {
    updateUrl(prev);
  };
  const handleNextBtn = () => {
    updateUrl(next);
  };
  return (
    <div className="px-6 py-4 flex justify-between items-center">
      <div className="">
        <p>
          showing {from} to {to} of {total} entries
        </p>
      </div>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          onClick={handlePrevBtn}
          disabled={!prev}
          type="button"
          className="size-10 flex items-center justify-center text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:scale-105 hover:text-blue-700 focus:z-10 focus:ring-2  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 disabled:opacity-40 disabled:pointer-events-none"
        >
          <HiArrowLeft />
        </button>

        <button
          onClick={handleNextBtn}
          disabled={!next}
          type="button"
          className="size-10 flex items-center justify-center text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:scale-105 hover:text-blue-700 focus:z-10 focus:ring-2  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 disabled:opacity-40 disabled:pointer-events-none"
        >
          <HiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
