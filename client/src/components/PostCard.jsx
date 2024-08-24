import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ title, content, author, releaseDate, postId }) => {
  // Function to truncate content to 100 words
  const truncateContent = (text) => {
    const words = text.split(' ');
    return words.length > 100 ? words.slice(0, 100).join(' ') + '...' : text;
  };  

  return (
    <Link to={`/posts/${postId}`} className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-3xl font-medium mb-2 text-slate-600">{title}</h1>
      <p className="text-gray-600 mb-4">{truncateContent(content)}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{author}</span>
        <span>{new Date(releaseDate).toLocaleDateString()}</span>
      </div>
    </Link>
  );
};

export default PostCard;
