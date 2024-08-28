import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../utility/api";
import axios from "axios";

export const Communities = () => {
  const [communityName, setCommunityName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API}/communities`);
        setCommunities(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [communities]);

  const createCommunity = async () => {
    console.log(showForm);
    try {
      const response = await axios.post(`${API}/users/register`, showForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setCommunities([...communities, response.data.data]);
    } catch (error) {
      console.log("error", error);
      alert("All fields are required");
    }
  };

  return (
    <div className="col-span-2 mt-5 mr-5 px-5 font-medium text-white bg-gradient-to-b from-slate-700 to-gray-800 rounded-2xl shadow-2xl h-[300px] flex flex-col">
      <div className="py-4 flex-grow overflow-y-auto overflow-x-hidden">
        <div className="text-gray-400 mb-4 text-center tracking-wide uppercase text-sm">
          Communities
        </div>
        <div className="space-y-2">
          {communities.map((community) => (
            <CommunityComponent
              key={community._id}
              CommunityImg={community.imageUrl}
              CommunityName={community.name}
              onJoin={() => alert(`Joined ${community.name}!`)}
            />
          ))}
        </div>
      </div>

      {/* Create New Community Button */}
      <div className="py-4 text-center bg-gray-800 mt-auto">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Create New Community
        </button>
      </div>

      {showForm && (
        <NewCommunityForm
          communityName={communityName}
          imageFile={imageFile}
          setCommunityName={setCommunityName}
          setImageFile={setImageFile}
          createCommunity={createCommunity}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};


const CommunityComponent = ({ CommunityImg, CommunityName, onJoin }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm">
      <div className="flex items-center">
        <img
          src={CommunityImg}
          alt={CommunityName}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="ml-3 text-gray-800 font-medium">{CommunityName}</div>
      </div>
      <button
        onClick={onJoin}
        className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition duration-200"
      >
        Join
      </button>
    </div>
  );
};

function NewCommunityForm({
  onClose,
  createCommunity,
  communityName,
  setCommunityName,
  imageFile,
  setImageFile,
}) {
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, including uploading the image file
    console.log("Community Name:", communityName);
    console.log("Selected Image File:", imageFile);

    // Perform any necessary actions here, like sending the data to an API

    onClose(); // Close the form after submission
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Create Community</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✖
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Community Name
            </label>
            <input
              type="text"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Community Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Community Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={createCommunity}
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
}
