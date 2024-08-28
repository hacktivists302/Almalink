import React, { useEffect, useState } from "react";
import EventCard from "../components/MyEventCard";
import { RegisterEvent } from "../components/RegisterEvent";
import { Popup } from "../components/Popup";
import { API } from "../utility/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Events = () => {
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
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
      {/* Popup for Event Form */}
      {popup && <EventForm onClose={() => setPopup(false)} />}

      {/* My Events Section */}
      <SectionTitle
        title="My Events"
        gradient="from-purple-400 via-pink-500 to-red-500"
      />
      <div className="flex mt-5 h-[200px] w-full">
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

      {/* Available Events Section */}
      <SectionTitle
        title="Events"
        gradient="from-blue-500 to-purple-600"
        centered
      />
      <div className="m-2 mb-5 grid grid-cols-2 gap-5">
        {events.map((data, index) => (
          <RegisterEvent
            key={index}
            imageUrl={data.coverImage}
            title={data.title}
            description={data.description}
            link={data.link}
            startDate={data.startDate}
            eventId={data._id}
          />
        ))}
      </div>

      {/* Plus Button for Creating Event */}
      <PlusButton popup={popup} setPopup={setPopup} />
    </>
  );
};

// Section Title Component
const SectionTitle = ({ title, gradient, centered = false }) => (
  <div
    className={`text-4xl font-bold ${
      centered ? "text-center" : "text-left"
    } my-8`}
  >
    <span
      className={`bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}
    >
      {title}
    </span>
  </div>
);

// Plus Button Component
const PlusButton = ({ popup, setPopup }) => {
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
        onClick={() => setPopup(!popup)}
        onMouseEnter={() => setToolTip(true)}
        onMouseLeave={() => setToolTip(false)}
        className="mb-5 ml-2 flex items-center justify-center w-10 h-10 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
    </>
  );
};

// Event Form Component
const EventForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, startDate, startTime, endDate, coverImage });
    onClose(); // Close the popup after submission
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Create Event</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            ✖
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Title"
            type="text"
            value={title}
            onChange={setTitle}
            placeholder="Event Title"
            required
          />
          <TextAreaField label={"Description"}   onChange={(e)=>setDescription(e.target.value)} placeholder={"Enter Description.."} required/>
          <InputField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={setStartDate}
            required
          />  
          <InputField
            label="Start Time"
            type="time"
            value={startTime}
            onChange={setStartTime}
            required
          />
          <InputField
            label="End Date"
            type="date"
            value={endDate}
            onChange={setEndDate}
            required
          />
          <InputField
            label="Cover Image URL"
            type="url"
            value={coverImage}
            onChange={setCoverImage}
            placeholder="https://example.com/image.jpg"
          />

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Field Component
// import { FaCalendarAlt } from "react-icons/fa"; // Example icon

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div className="mb-4">
    <label className="block text-slate-900">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-200 p-2 border rounded text-slate-700 focus:outline-none focus:border-blue-400"
      placeholder={placeholder}
      required={required}
    />
  </div>
);


// Reusable TextArea Field Component
const TextAreaField = ({ label, value, onChange, placeholder, required }) => (
  <div className="mb-4">
    <label className="block text-slate-900">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-200 p-2 border rounded text-slate-700 focus:outline-none focus:border-blue-400"
      placeholder={placeholder}
      required={required}
    />
  </div>
);
