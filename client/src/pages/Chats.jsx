import React from "react";
import { People } from "../components/People";
import { ChatContainer } from "../components/ChatContainer";

export const Chats = () => {
  return (
    <>
      <div className="grid grid-cols-8  w-full h-[650px] m-2">
        <People />
        <ChatContainer />
      </div>
    </>
  );
};

export default Chats;
