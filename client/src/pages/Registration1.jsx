// RegistrationPage1.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegistrationPage1 = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const { name, email, phone, password } = formData;

  const handleNext = () => {
    navigate("/register/step2");
  };

  return (
    <div>
      <h2>Step 1: Enter your details</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};
