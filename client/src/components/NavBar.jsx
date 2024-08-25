import React from "react";
import SearchIcon from "../assets/Search.svg";
import { useState } from "react";

export const NavBar = () => {
  return (
    <nav className="border ">
      <div className="max-w-screen-2xl  flex flex-wrap items-center  justify-between mx-auto p-4 ">
        <SearchBox />
        <UserProfileDropdown />
      </div>
    </nav>
  );
};

function SearchBox() {
  return (
    <>
      <div className="pl-10 w-[800px]   mx-auto">
        <div className="relative flex items-center">
          <img
            className="absolute  pl-2  pointer"
            src={SearchIcon}
            alt="SearchIcon"
            width={30}
            height={30}
          />
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-500 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none"
            placeholder="Search Events, Posts..."
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mr-12 relative flex-shrink z-100">
      <button
        id="dropdownAvatarNameButton"
        onClick={toggleDropdown}
        className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 focus:ring-4 focus:ring-gray-100 md:me-0"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 me-2 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          alt="user photo"
        />
        Rahul Das
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownAvatarName"
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <div className="font-medium">Pro User</div>
            <div className="truncate">Rahul@hack.com</div>
          </div>
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
