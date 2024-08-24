import React from "react";
import { Link } from "react-router-dom";

export const Communities = () => {
  return (
    <div className="col-span-2   mt-5 mr-5 px-5 font-medium text-white bg-gradient-to-b from-slate-700 to-gray-800 rounded-2xl shadow-2xl  h-[300px] overflow-hidden">
      <div className="py-4">
        <div className="text-gray-400 mb-4 text-center tracking-wide uppercase text-sm">
          Communities
        </div>
        <div className="space-y-2">
          <CommunityComponent
            CommunityImg={
              "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            }
            CommunityName={"New Community"}
          />
           <CommunityComponent
            CommunityImg={
              "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            }
            CommunityName={"New Community"}
          /> <CommunityComponent
          CommunityImg={
            "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          }
          CommunityName={"New Community"}
        />
      
        </div>
      </div>
    </div>
  );
};

function CommunityComponent({ CommunityImg, CommunityName }) {
  return (
    <Link
      to={`/community/${CommunityName.toLowerCase().replace(" ", "-")}`}
      className="flex items-center gap-3 p-2 bg-slate-600 rounded-lg hover:bg-slate-500 transition duration-200 transform hover:scale-105"
    >
      <img
        className="w-8 h-8 rounded-full border-2 border-gray-500"
        src={CommunityImg}
        alt={`${CommunityName} avatar`}
      />
      <span className="text-white text-xs truncate">{CommunityName}</span>
    </Link>
  );
}
