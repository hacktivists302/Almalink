import React, { useEffect, useRef, useState } from "react";
import { dummyEvents, posts } from "../utility/utility";
import { EventCard } from "../components/EventCard";
import GreaterIcon from "../assets/Chevright.svg";
import LessIcon from "../assets/ChevLeft.svg";
import { Communities } from "../components/Communities";
import PostCard from "../components/PostCard";

export const Home = () => {
  const scrollContainerRef = useRef(null);
  const [viewVisible, setViewVisible] = useState(false);

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

  return (
    <>
      <div className="w-full flex items-center  relative">
        <div
          ref={scrollContainerRef}
          className="  pl-5   flex overflow-x-hidden "
        >
          {dummyEvents.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              content={event.content}
              postImg={event.img}
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
