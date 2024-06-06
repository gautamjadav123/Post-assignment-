import React, { useContext } from "react";
import { PostContext } from "./context/PostContext";

const Card = ({ post }) => {
  const { removePost } = useContext(PostContext);

  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden m-4">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-blacktext-black  mb-4">{post.body}</p>
        <div className="text-gray-400 text-sm">
          {new Date().toLocaleString()}
        </div>
      </div>
      <button
        onClick={() => removePost(post.id)}
        className="absolute top-2 right-2 text-red-500"
      >
        &times;
      </button>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
    </div>
  );
};

export default Card;
