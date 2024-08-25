import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../utility/api";

export const Communities = () => {
  const [showForm, setShowForm] = useState(false);
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  const createCommunity = async (e) => {
    e.preventDefault();
    const communityName = e.target.communityName.value;
    const imageUrl = e.target.imageUrl.value;

    try {
      const response = await axios.post(
        `${API}/communities`,
        {
          name: communityName,
          imageUrl,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setCommunities([...communities, response.data.data]);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative col-span-2 mt-5 mr-5 px-5 font-medium text-white bg-gradient-to-b from-slate-700 to-gray-800 rounded-2xl shadow-2xl h-[300px] overflow-hidden">
      <div className="py-4 absolute">
        <div className="text-gray-400 mb-4 text-center tracking-wide uppercase text-sm">
          Communities
        </div>
        {/* Create New Community Button */}
        <div className="text-center mb-4 absolute ">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 absolute bottom-0 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Create New Community
          </button>
        </div>
        <div className="space-y-2">
          {communities.length > 0 ? (
            communities.map((community) => (
              <CommunityComponent
                key={community._id}
                CommunityImg={community.imageUrl}
                CommunityName={community.name}
              />
            ))
          ) : (
            <div className="text-center text-gray-400">
              No communities found. Create one!
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <NewCommunityForm
          onClose={() => setShowForm(false)}
          onSubmit={createCommunity}
        />
      )}
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

function NewCommunityForm({ onClose, onSubmit }) {
  return (
    <div className="inset-0 fixed bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Create Community</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✖️
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Community Name
            </label>
            <input
              type="text"
              name="communityName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Community Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Image URL"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600  hover:text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
