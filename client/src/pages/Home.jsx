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
      <div className="w-screen flex items-center  relative">
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
        <ViewAll handleScroll={handleScroll} viewVisible={viewVisible} />
      </div>
      <div className=" grid grid-cols-6 flex-shrink-0">
        <Posts />
        <Communities />
      </div>
    </>

  );
};

function ViewAll({ handleScroll, viewVisible }) {
  return (
    <>
      <div className="text-slate-400 text-[14px] pl-2 absolute right-0">
        <img
          className="w-[30px] rounded-full bg-slate-300 hover:bg-slate-200 cursor-pointer"
          src={viewVisible ? GreaterIcon : LessIcon}
          onClick={handleScroll}
        />
        {viewVisible ? (
          <div className="mt-2 hover:underline">
            <a href="/events">view all</a>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

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
