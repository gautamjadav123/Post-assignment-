import React, { createContext, useState, useEffect } from "react";

const PostContext = createContext();

const sampleImages = [
  "https://source.unsplash.com/random/400x300?nature",
  "https://source.unsplash.com/random/400x300?city",
  "https://source.unsplash.com/random/400x300?technology",
  "https://source.unsplash.com/random/400x300?people",
  "https://source.unsplash.com/random/400x300?food",
  "https://source.unsplash.com/random/400x300?animal",
  "https://source.unsplash.com/random/400x300?fashion",
  "https://source.unsplash.com/random/400x300?travel",
];

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      const postsWithImages = data.map((post) => ({
        ...post,
        image: sampleImages[Math.floor(Math.random() * sampleImages.length)],
      }));
      setPosts(postsWithImages);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const removePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        currentPage,
        postsPerPage,
        removePost,
        paginate,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
