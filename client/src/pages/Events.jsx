import React, { useEffect, useState } from "react";
import EventCard from "../components/MyEventCard";
import { eventData } from "../utility/utility";
import { RegisterEvent } from "../components/RegisterEvent";
import { API } from "../utility/api";
import axios from "axios";

export const Events = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API}/events/my-events`);
        setMyEvents(response.data.data);

        const response2 = await axios.get(`${API}/events/unregistered`);
        setEvents(response2.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <span className="mx-2  text-4xl font-bold  text-gray-800 my-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        My Events
      </span>
      <div className="flex mt-5  h-[200px] w-full ">
        {myEvents.slice(0, 3).map((data, index) => (
          <EventCard
            key={index}
            imageUrl={data.coverImage}
            title={data.title}
            description={data.description}
            link={data.link}
          />
        ))}
      </div>
      <div className="text-5xl font-extrabold text-center text-white my-12">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Events
        </span>
      </div>
      <div className="m-2 mb-5 grid grid-cols-2 gap-5 ">
        {events.map((data, index) => (
          <RegisterEvent
            key={index}
            imageUrl={data.coverImage}
            title={data.title}
            description={data.description}
            link={data.link}
            startDate={data.startDate}
          />
        ))}
      </div>
      <PlusButton />
    </>
  );
};
function PlusButton() {
  const [showTooltip, setToolTip] = useState(false);
  return (
    <>
      <div className="mb-2">
        <span
          className={`${
            showTooltip ? "visible" : "invisible"
          } tooltip rounded shadow-lg p-1 bg-gray-700 text-red-500 -mt-8`}
        >
          Create Event
        </span>
      </div>
      <button
        onMouseEnter={() => setToolTip(true)}
        onMouseLeave={() => setToolTip(false)}
        className=" mb-5 ml-2 flex items-center justify-center w-10 h-10  text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
    </>
  );
}
