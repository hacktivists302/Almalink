import React from "react";
import { useNavigate } from "react-router-dom";

export const Registration3 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const { university, city, enrollmentNumber } = formData;

  const handleNext = () => {
    console.log(formData);
    navigate("/register/step4");
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
              Step 3: University and City
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="University"
                value={university}
                onChange={(e) =>
                  setFormData({ ...formData, university: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="enrollment number"
                value={enrollmentNumber}
                onChange={(e) =>
                  setFormData({ ...formData, enrollmentNumber: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
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
