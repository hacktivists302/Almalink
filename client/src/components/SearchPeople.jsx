import React from "react";

export const SearchPeople = () => {
  return (
    <>
      <div className="flex items-center max-w-sm mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            id="simple-search"
            className="outline-none border   text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  "
            placeholder="Search Freinds,alumini..."
            required
          />

          <button
            type="submit"
            className="absolute  right-0 top-0.5  p-2.5 ms-2 text-sm font-medium text-white bg-slate-700 rounded-full  hover:bg-slate-500  "
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="grey"
              viewBox="0 0 20 20"
            >
              <path
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchPeople;
