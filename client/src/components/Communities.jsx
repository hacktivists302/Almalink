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
<<<<<<< HEAD
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
=======
    <div className="col-span-2 mt-5 mr-5 px-5 font-medium text-white bg-gradient-to-b from-slate-700 to-gray-800 rounded-2xl shadow-2xl h-[300px] flex flex-col">
      <div className="py-4 flex-grow overflow-y-auto overflow-x-hidden">
        <div className="text-gray-400 mb-4 text-center tracking-wide uppercase text-sm">
          Communities
        </div>
        <div className="space-y-2">
          <CommunityComponent
            CommunityImg={
              "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            }
            CommunityName={"Tech for Good"}
            onJoin={() => alert("Joined Tech for Good!")}
          />
          <CommunityComponent
            CommunityImg={
              "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            }
            CommunityName={"Green Developers"}
            onJoin={() => alert("Joined Green Developers!")}
          />
          <CommunityComponent
            CommunityImg={
              "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            }
            CommunityName={"Open Source Enthusiasts"}
            onJoin={() => alert("Joined Open Source Enthusiasts!")}
          />
          <CommunityComponent
            CommunityImg={
              "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            }
            CommunityName={"Wildlife Conservationists"}
            onJoin={() => alert("Joined Wildlife Conservationists!")}
          />
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
>>>>>>> 0b9a68d28fb29c5585ee0b9a60d6c32af2ea3052
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

<<<<<<< HEAD
function NewCommunityForm({ onClose, onSubmit }) {
=======
function NewCommunityForm({ onClose }) {
  const [communityName, setCommunityName] = useState("");
  const [imageFile, setImageFile] = useState(null);

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

>>>>>>> 0b9a68d28fb29c5585ee0b9a60d6c32af2ea3052
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
<<<<<<< HEAD
        <form onSubmit={onSubmit}>
=======
        <form onSubmit={handleSubmit}>
>>>>>>> 0b9a68d28fb29c5585ee0b9a60d6c32af2ea3052
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Community Name
            </label>
            <input
              type="text"
<<<<<<< HEAD
              name="communityName"
=======
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
>>>>>>> 0b9a68d28fb29c5585ee0b9a60d6c32af2ea3052
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
<<<<<<< HEAD
              type="text"
              name="imageUrl"
=======
              type="file"
              accept="image/*"
              onChange={handleImageChange}
>>>>>>> 0b9a68d28fb29c5585ee0b9a60d6c32af2ea3052
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
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


