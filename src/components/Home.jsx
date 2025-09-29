import React, { useContext, useState } from "react";
import BlogTitleCard from "./BlogTitleCard";
import { useEffect } from "react";
import { blogContext } from "../utils/BlogProvider";

const Home = () => {
  const blogs = useContext(blogContext);
  if (blogs.length === 0) return <div>Loading...</div>;

  return (
    blogs && (
      <div>
        {blogs.map((b) => (
          <BlogTitleCard key={b.id} blog={b} />
        ))}
      </div>
    )
  );
};

export default Home;
