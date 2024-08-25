import React, { useState } from "react";
<<<<<<< HEAD
=======
import { Registration1 } from "./pages/Registration1";
import { Registration2 } from "./pages/Registration2";
import { Registration3 } from "./pages/Registration3";
import { Registration4 } from "./pages/Registration4";
>>>>>>> 0b9a68d28fb29c5585ee0b9a60d6c32af2ea3052
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CreateEventPage } from "./pages/CreateEventPage";
import { Events } from "./pages/Events";
import { Event } from "./pages/Event";
import { Chats } from "./pages/Chats";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
import { SideBar } from "./components/SideBar";
import { NavBar } from "./components/NavBar";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminAlumni } from "./pages/AdminAlumni"; // Import the new AdminAlumni component
import { AdminApproval } from "./pages/AdminApproval"; // Import the new AdminApproval component
import Login from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { LandingPage } from "./pages/LandingPage";

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

// AdminLayout Component for admin-specific routes
function AdminLayout() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Admin Sidebar */}
      <SideBar />
      <div className="flex flex-col w-full">
        {/* Admin Navbar */}
        <NavBar />
        <div className="pl-[80px] pt-2 flex-grow">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="alumni" element={<AdminAlumni />} />
            <Route path="approval" element={<AdminApproval />} />
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
<<<<<<< HEAD
        {/* <Route path="/register" element={<SignUp />} /> */}
        <Route path="/login" element={<Login />} />
        {/* Authentication and Registration Routes */}
=======
>>>>>>> 0b9a68d28fb29c5585ee0b9a60d6c32af2ea3052
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<LandingPage />} />

        {/* Registration Steps */}
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

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />} />

        {/* Redirect to /user/home or /login if not authenticated */}

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}




export default App;
