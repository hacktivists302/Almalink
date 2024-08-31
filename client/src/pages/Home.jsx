import React, { useEffect, useRef, useState } from "react";
import { dummyEvents, posts } from "../utility/utility";
import { EventCard } from "../components/EventCard";
import GreaterIcon from "../assets/Chevright.svg";
import LessIcon from "../assets/ChevLeft.svg";
import { Communities } from "../components/Communities";
import PostCard from "../components/PostCard";
import axios from "axios";
import { API } from "../utility/api";
import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";

const { theme, style } = buildTheme({
  themeName: "Midnight",
  themeColor: "#7fffd4",
});

// Add your Client ID here ⬇️
const clientId = "df3edf74-90c2-46e5-a0b0-36efe80bd2bd";

export const Home = () => {
  const [events, setEvents] = useState([]);
  const scrollContainerRef = useRef(null);
  const [viewVisible, setViewVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API}/events/unregistered`);
        console.log(response.data.data);
        setEvents(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      // Scrolls the container to the right by 3 card widths
      scrollContainerRef.current.scrollBy({
        left: viewVisible ? 3 * 300 : 3 * -300, // Assuming each EventCard has a width of 300px
        behavior: "smooth",
      });
    }
    setViewVisible(!viewVisible);
  };

  const client = getClient({ clientId });
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  // Toggles the visibility of the chatbot
  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  // Configuration object for the chatbot
  const config = {
    composerPlaceholder: "Type a message...",
    botName: "YUKTA",
    botAvatar: "https://picsum.photos/200/300", // Example avatar image
    botDescription: "",
    email: {
      title: "randomEmail@boptress.com",
      link: "mailto:randomEmail@boptress.com",
    },
    phone: {
      title: "555-555-5555",
      link: "tel:555-555-5555",
    },
    website: {
      title: "Botpress",
      link: "https://botpress.com",
    },
    termsOfService: {
      title: "Terms of Service",
      link: "https://botpress.com/terms",
    },
    privacyPolicy: {
      title: "Privacy Policy",
      link: "https://botpress.com/privacy",
    },
  };
  return (
    <>
      <div className=" w-full flex items-center  relative">
      <style>{style}</style>
      <WebchatProvider theme={theme} configuration={config} client={client}>
        {/* Customized floating action button */}
        <Fab
          onClick={toggleWebchat}
          bpFabIcon={
            <img
              src="https://icon-library.com/images/chat-icon-png/chat-icon-png-29.jpg" // Example custom chat icon image
              alt="Chat Icon"
              style={{ width: "100%", height: "100%" }}
            />
          }
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1001,
            // backgroundColor: "#634433",
            color: "#7fffd4",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
          }}
        />

        {/* Chat window configured as a pop-up */}
        <div
          style={{
            display: isWebchatOpen ? "block" : "none",
            position: "fixed",
            bottom: "90px", // Space above the floating button
            right: "20px",
            width: "350px",
            height: "450px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 1000,
            backgroundColor: "#fff", // Background color for chat
          }}
        >
          <Webchat />
        </div>
      </WebchatProvider>
        <div
          ref={scrollContainerRef}
          className="  pl-5    flex overflow-x-hidden "
        >
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              content={event.content}
              postImg={event.coverImage}
            />
          ))}
        </div>
        <div className="text-slate-400 text-[14px] pl-2 absolute right-0">
          <img
            className="w-[30px] opacity-75 rounded-full bg-slate-300 hover:bg-slate-200 cursor-pointer"
            src={viewVisible ? LessIcon : GreaterIcon}
            onClick={handleScroll}
          />
        </div>
      </div>
      <div className=" grid grid-cols-6 flex-shrink-0">
        <Posts />
        <Communities />
      </div>
    </>
  );
};

function Posts() {
  return (
    <div className="col-span-4 p-5 m-5 flex flex-col gap-2 rounded-lg w-[900px] h-screen ">
      {posts.map((post) => (
        <PostCard
          key={post.postId}
          title={post.title}
          content={post.content}
          author={post.author}
          releaseDate={post.releaseDate}
          postId={post.postId}
        />
      ))}
    </div>
  );
}
