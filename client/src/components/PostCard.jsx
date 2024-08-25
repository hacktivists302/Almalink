import React, { useState } from "react";
import { Link } from "react-router-dom";

const PostCard = ({ title, content, author, releaseDate, postId }) => {
  const [likes, setLikes] = useState(0); // Initialize like count

  // Function to truncate content to 100 words
  const truncateContent = (text) => {
    const words = text.split(" ");
    return words.length > 100 ? words.slice(0, 100).join(" ") + "..." : text;
  };

  // Function to handle like button click
  const handleLike = () => {
    setLikes(likes + 1); // Increment like count
  };

  return (
    <div className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/posts/${postId}`} className="block mb-4">
        <h1 className="text-3xl font-medium mb-2 text-slate-600">{title}</h1>
        <p className="text-gray-600 mb-4">{truncateContent(content)}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{author}</span>
          <span>{new Date(releaseDate).toLocaleDateString()}</span>
        </div>
      </Link>
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={handleLike}
          className="flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-1 fill-red-600" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
