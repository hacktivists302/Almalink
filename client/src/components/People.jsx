import React from "react";
import { SearchPeople } from "./SearchPeople";

export const People = () => {
  return (
    <div className="   scrollbar overflow-y-hidden hover:overflow-y-scroll col-span-2 border border-black rounded-lg p-2">
      <SearchPeople />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
      <ChatProfileComponent />
    </div>
  );
};

const ChatProfileComponent = () => {
  return (
    <div className="mx-2 rounded-lg border hover:bg-slate-300 flex gap-10 hover:cursor shadow-xl my-2 shadow-indigo-100 ">
      <img
        class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
        alt="Bordered avatar"
      />
      <div className="text-slate-500 text-center flex   items-center w-full font-bold">Rahul Das</div>
    </div>
  );
};
