import React from "react";
import { Link } from "react-router-dom";

export const Profile = () => {
  return <div>
    <ProfileComponent/>
    
  </div>;
};

function ProfileComponent() {
  return (
    <div>
      <Link >
      <img
        class="rounded-full p-2 border-2 cursor w-36 h-36"
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        alt="Extra large avatar"
        ></img>
        </Link>
    </div>
  );
}

function BioComponent(){
  
}