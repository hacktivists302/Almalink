import React, { useState } from "react";

export  const CreateEventPage = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, like sending data to a backend
    console.log(eventData);
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Event</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Event Description
            </label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter event description"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Event Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Event Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};


