// RegistrationPage4.js
import React from "react";
import { useNavigate } from "react-router-dom";

export const Registration4 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const { bio, profilePic } = formData;

  const handleNext = () => {
    // Submit form   or redirect to home
    navigate("/");
  };

  return (
    <div>
      <h2>Step 4: Profile Picture and Bio</h2>
      <input
        type="file"
        onChange={(e) =>
          setFormData({ ...formData, profilePic: e.target.files[0] })
        }
      />
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
      ></textarea>
      <button onClick={handleNext}>Submit</button>
    </div>
  );
};
