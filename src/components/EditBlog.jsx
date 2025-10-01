import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const EditBlog = () => {
  const location = useLocation();
  const { blogId } = location.state || {};

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", blogId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setContent(data.content);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "blogs", blogId);
      await updateDoc(docRef, {
        title,
        content,
      });
      toast.success("Blog updated successfully!");
      navigate("/my-blogs");
    } catch (error) {
      toast.error("Failed to update blog");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl text-center font-bold">Edit your Blog</h1>
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 h-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-40 mx-auto bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition cursor-pointer"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
