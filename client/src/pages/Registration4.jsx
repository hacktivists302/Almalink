import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../utility/api";

export const Registration4 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const { bio, profilePic } = formData;

  const handleNext = async () => {
    try {
      const response = await axios.post(`${API}/users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("../login");
    } catch (error) {
      alert("All fields are required");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://cdn-icons-png.flaticon.com/128/999/999663.png"
            alt="logo"
          />
          AlmaLink
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Step 4: Profile Picture and Bio
            </h2>
            <div className="space-y-4">
              <input
                type="file"
                onChange={(e) => {
                  console.log(e.target.files[0]);

                  setFormData({
                    ...formData,
                    profilePic: e.target.files[0],
                  });
                }}
                className=" bg-slate-500 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  "
              />
              <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                rows="4"
              ></textarea>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleNext}
                  className="py-2.5 px-5 text-white mt-4 bg-slate-500 text-sm font-medium focus:outline-none rounded-full border hover:bg-slate-600 border-gray-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
