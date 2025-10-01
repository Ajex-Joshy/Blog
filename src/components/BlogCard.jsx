import React, { useContext, useMemo, useState, useEffect } from "react";
import { blogContext } from "../utils/BlogProvider";
import { useLocation } from "react-router-dom";
import { PROFILE_PHOTO } from "../utils/constants";
import { toast } from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const BlogCard = () => {
  const location = useLocation();
  const { blogId } = location.state || {};
  const [blog, setBlog] = useState();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", blogId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBlog(data);
        } else {
          toast.error("Blog not found");
        }
      } catch (error) {
        toast.error("Failed to fetch blog");
      }
    };
    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);
  if (!blog) return <div>loading..</div>;
  const { title, photoURL, displayName, content, createdAt } = blog;
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
          <img
            src={photoURL || PROFILE_PHOTO}
            className="w-8 rounded-full m-2"
          />
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed">{content}</p>
      <p className="my-3">Published On: {PublishedOn.toLocaleDateString()}</p>
    </div>
  );
};

export default BlogCard;
