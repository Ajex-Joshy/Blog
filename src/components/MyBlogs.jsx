import React, { useContext, useEffect, useState } from "react";
import { blogContext } from "../utils/BlogProvider";
import { userContext } from "../utils/UserProvider";
import BlogTitleCard from "./BlogTitleCard";

const MyBlogs = () => {
  const blogs = useContext(blogContext);
  const { user } = useContext(userContext);
  if (blogs.length === 0 || !user) return <div>Loading</div>;

  const myBlogsList = blogs.filter((b) => {
    return b.uid === user.uid;
  });
  if (myBlogsList.length === 0) return <div>You dont writtem any blogs</div>;
  return (
    <div>
      {myBlogsList.map((b) => (
        <BlogTitleCard key={b.id} blog={b} myBlog={true} />
      ))}
    </div>
  );
};

export default MyBlogs;
