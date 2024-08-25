import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Registration1 } from "./pages/Registration1";
import { Registration2 } from "./pages/Registration2";
import { Registration3 } from "./pages/Registration3";
import { Registration4 } from "./pages/Registration4";
import { CreateEventPage } from "./pages/CreateEventPage";
import { Events } from "./pages/Events";
import { Event } from "./pages/Event";
import { Chats } from "./pages/Chats";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
import { SideBar } from "./components/SideBar";
import { NavBar } from "./components/NavBar";
import { AdminLogin } from "./pages/AdminLogin";
import Login from "./pages/Login";
import { NotFound } from "./pages/NotFound";

// Layout Component for routes that require Sidebar and Navbar
function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full overflow-x-hidden">
        <NavBar />
        <div className="pl-[80px] pt-2">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="events" element={<Events />} />
            <Route path="event/:userId" element={<Event />} />
            <Route path="chats" element={<Chats />} />
            <Route path="profile" element={<Profile />} />
            <Route path="event/create" element={<CreateEventPage />} />
            <Route path="*" element={<NotFound />} />
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
    enrollmentNumber: "",
    profilePic: null,
  });

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes for the sign-up and registration steps */}
        {/* <Route path="/register" element={<SignUp />} /> */}
        <Route path="/login" element={<Login />} />
        {/* Authentication and Registration Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
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

        {/* Protected Routes with Sidebar and Navbar */}
        <Route path="/user/*" element={<Layout />} />

        {/* Redirect to /user/home or /login if not authenticated */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
