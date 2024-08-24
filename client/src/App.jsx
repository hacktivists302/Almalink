import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Registration1 } from "./pages/Registration1";
import { Registration2 } from "./pages/Registration2";
import { Registration3 } from "./pages/Registration3";
import { Registration4 } from "./pages/Registration4";
import { Events } from "./pages/Events";
import { Chats } from "./pages/Chats";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
import { SideBar } from "./components/SideBar";
import { NavBar } from "./components/NavBar";
import Login from "./pages/Login";

function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full overflow-x-hidden">
        <NavBar />
        <div className="pl-[80px] pt-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    university: "",
    city: "",
    bio: "",
    profilePic: null,
  });

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes for the sign-up and registration steps */}
       {/* <Route path="/register" element={<SignUp />} /> */}
        <Route path="/login" element={<Login/>} />
        <Route
          path="/register/step1"
          element={
            <Registration1 formData={formData} setFormData={setFormData} />
          }
        />
        <Route
          path="/register/step2"
          element={
            <Registration2 formData={formData} setFormData={setFormData} />
          }
        />
        <Route
          path="/register/step3"
          element={
            <Registration3 formData={formData} setFormData={setFormData} />
          }
        />
        <Route
          path="/register/step4"
          element={
            <Registration4 formData={formData} setFormData={setFormData} />
          }
        />

        {/* All other routes use the Layout */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  