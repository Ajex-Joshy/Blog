import React, { useContext } from "react";
import { blogContext } from "../utils/BlogProvider";
import { useLocation } from "react-router-dom";

const BlogCard = () => {
  const location = useLocation();
  const blogs = useContext(blogContext);
  if (!blogs) return <div>Loading...</div>;
  const { blogId } = location.state || {};
  const blog = blogs.find((b) => b.id === blogId);

  if (!blogs) return <div>Loading</div>;
  const { id, title, photoURL, displayName, content, createdAt } = blog;
  const PublishedOn = createdAt?.toDate
    ? createdAt.toDate()
    : new Date(createdAt.seconds * 1000);
  return (
    <div className="w-10/12 mx-auto bg-gray-200 rounded-lg shadow-md overflow-hidden p-6 m-4">
      <div className="grid-cols-12 justify-between">
        <div className="col-span-9">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        </div>
        <div className="flex col-span-3">
          <p className="text-sm text-gray-500 my-auto">By {displayName}</p>
          <img src={photoURL} alt={title} className="w-8 rounded-full m-2" />
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">{content}</p>
      <p className="my-3">Published On: {PublishedOn.toLocaleDateString()}</p>
    </div>
  );
};

export default BlogCard;
