import React from "react";
import { useNavigate } from "react-router-dom";

export const RegistrationPage2 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const { role } = formData;

  const handleNext = () => {
    if (role) {
      navigate("/register/step3");
    } else {
      alert("Please select a role before proceeding.");
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
          <div className="p-6">
            <SelectRole role={role} setFormData={setFormData} />
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={handleNext}
                className="py-2.5 px-5 text-white bg-slate-500 text-sm font-medium focus:outline-none rounded-full border hover:bg-slate-600 border-gray-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function SelectRole({ role, setFormData }) {
  return (
    <div className="max-w-sm mx-auto">
      <label
        htmlFor="role"
        className="block mt-10 text-center mb-5 text-3xl font-medium text-gray-900 dark:text-white"
      >
        Select your role
      </label>
      <select
        id="role"
        value={role}
        onChange={(e) => setFormData({ role: e.target.value })}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>
          Choose your role
        </option>
        <option value="alumni">Alumni</option>
        <option value="student">Student</option>
      </select>
    </div>
  );
}
