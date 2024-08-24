// RegistrationPage3.js
import React from "react";
import { useNavigate } from "react-router-dom";

export const RegistrationPage3 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const { university, city } = formData;

  const handleNext = () => {
    navigate("/register/step4");
  };

  return (
    <div>
      <h2>Step 3: University and City</h2>
      <input
        type="text"
        placeholder="University"
        value={university}
        onChange={(e) =>
          setFormData({ ...formData, university: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};
