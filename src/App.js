import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { PostContext, PostProvider } from "./context/PostContext";

const App = () => {
  const { posts, loading, currentPage, postsPerPage, paginate } =
    useContext(PostContext);

  useEffect(() => {
    const timer = setTimeout(() => {}, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="min-h-screen bg-[#e4eaf0] p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <nav className="inline-flex space-x-2">
          {Array.from(
            { length: Math.ceil(posts.length / postsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
                } border border-gray-300 rounded-md`}
              >
                {i + 1}
              </button>
            )
          )}
        </nav>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <PostProvider>
    <App />
  </PostProvider>
);

export default AppWrapper;
