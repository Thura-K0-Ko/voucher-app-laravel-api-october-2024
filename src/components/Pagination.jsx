import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const Pagination = ({
  links: { next, prev },
  meta: { from, to, total, links },
  updateUrl,
}) => {
  const handlePrevBtn = () => {
    updateUrl(prev);
  };
  const handleNextBtn = () => {
    updateUrl(next);
  };
  // console.log(links);
  return (
    <div className="px-6 py-4 flex justify-between items-center">
      <div className="">
        <p>
          showing <span className=" font-medium">{from}</span> to{" "}
          <span className=" font-medium">{to}</span> of{" "}
          <span className=" font-medium">{total}</span> entries
        </p>
      </div>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        {/* <button
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
        </button> */}

        {links.map((link) => (
          <button
            key={link.label}
            onClick={() => updateUrl(link.url)}
            disabled={!link.url}
            type="button"
            className={`
              size-10 flex items-center justify-center text-sm font-medium text-gray-900 ${
                link.active ? "bg-blue-500 text-white" : "bg-transparent"
              } first:border-l-2 last:border-r-2 border-y border-gray-900 first:rounded-s-lg last:rounded-e-lg hover:scale-105 hover:text-blue-700 focus:z-10 focus:ring-2  dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 disabled:opacity-40 disabled:pointer-events-none
              `}
          >
            {link.label === "&laquo; Previous" ? (
              <HiArrowLeft />
            ) : link.label === "Next &raquo;" ? (
              <HiArrowRight />
            ) : (
              link.label
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
