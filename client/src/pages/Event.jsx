import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Event = () => {
  const { userId } = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    // Using dummy data instead of fetching from a backend
    const dummyData = {
      userId: "12345",
      title: "Annual Alumni Meetup",
      content:
        "Join us for our annual alumni meetup where you can reconnect with old friends, network, and share your experiences.",
      image: "https://via.placeholder.com/600x400",
      date: "2024-09-15",
    };

    if (userId === dummyData.userId) {
      setEventData(dummyData);
    }
  }, [userId]);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <section className=" dark:bg-gray-900 py-8 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          src={eventData.image}
          alt={eventData.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {eventData.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {eventData.content}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(eventData.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <a
              href="#"
              className="text-blue-500 dark:text-blue-400 hover:underline"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

