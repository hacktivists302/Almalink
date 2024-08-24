// RegistrationPage2.js
import React from "react";
import { useNavigate } from "react-router-dom";

export const Registration2 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const { role } = formData;

  const handleNext = () => {
    navigate("/register/step3");
  };

  return (
    <div>
      <h2>Step 2: Select your role</h2>
      <select
        value={role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="student">Student</option>
        <option value="alumni">Alumni</option>
      </select>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};
