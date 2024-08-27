import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../utility/api";

export const Profile = () => {
  const user = {
    name: "John Doe",
    bio: "Passionate software developer with a focus on sustainability and environmental solutions.",
    profilePic: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    interests: ["Sustainability", "Open Source", "Wildlife Conservation"],
    communities: [
      "Tech for Good",
      "Green Developers",
      "Open Source Enthusiasts",
    ],
    jobs: [
      {
        title: "Frontend Developer",
        company: "Tech Corp",
        duration: "2 years",
      },
      {
        title: "Backend Developer",
        company: "Green Solutions",
        duration: "1.5 years",
      },
    ],
  };

  const [currUser, setCurrUser] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API}/users/current-user`);
        setCurrUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="w-scren h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 p-1">
      {/* Inner Container */}
      <div className="bg-white rounded-lg shadow-lg w-full h-full  overflow-auto">
        <div className="flex flex-col md:flex-row">
          {/* Profile Picture */}
          <div className="md:w-1/3 flex justify-center p-6 bg-gray-100">
            <img
              src={currUser.profilePic}
              alt="Profile"
              className="rounded-lg h-40 w-40 object-cover border-4 border-white shadow-lg"
            />
          </div>

          {/* User Details */}
          <div className="md:w-2/3 p-6">
            {/* User Bio */}
            <h2 className="text-2xl font-bold text-gray-800">
              {currUser.name}
            </h2>
            <p className="text-gray-600 mt-2">{user.bio}</p>
            <div className="flex flex-wrap">
              {/* Skills */}
              <div className="mt-6 w-full md:w-1/2">
                <h3 className="text-lg font-semibold text-blue-700">Skills</h3>
                <ul className="mt-2 space-y-2">
                  {user.skills.map((skill, index) => (
                    <li
                      key={index}
                      className="text-gray-500 m-2 font-medium bg-gray-200 px-3 py-1 rounded-md inline-block"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interests */}
              <div className="mt-6 w-full md:w-1/2">
                <h3 className="text-lg font-semibold text-teal-700">
                  Interests
                </h3>
                <ul className="mt-2 space-y-2">
                  {user &&
                    user.interests.map((interest, index) => (
                      <li
                        key={index}
                        className="text-gray-800 m-2 bg-gray-200 px-3 py-1 rounded-md inline-block"
                      >
                        {interest}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Jobs */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-700">Jobs</h3>
              <ul className="mt-2 space-y-2">
                {user.jobs.map((job, index) => (
                  <li
                    key={index}
                    className="text-gray-800 m-2 bg-gray-200 p-3 rounded-md"
                  >
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm">
                      {job.company} - {job.duration}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Communities */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-green-700">
                Communities
              </h3>
              <ul className="mt-2 space-y-2">
                {user.communities.map((community, index) => (
                  <li
                    key={index}
                    className="text-gray-800 m-2 bg-gray-200 px-3 py-1 rounded-md inline-block"
                  >
                    {community}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
