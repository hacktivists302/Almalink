import React from "react";

import { Link } from "react-router-dom";

const EventCard = ({ imageUrl, title, description, link }) => {
  return (
    <div className=" mx-5 relative w-64 h-50   overflow-hidden  rounded-lg shadow-lg group">
      <img
        src={imageUrl}
        alt={title}
        className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-center items-center text-white p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm mb-4">{description.slice(0, 20)}</p>
        <Link to={link} className="text-blue-400 underline">
          {"Read More >"}
        </Link>
      </div>
    </div>
  );
};
export default EventCard;
