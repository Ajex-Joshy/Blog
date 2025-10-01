import React, { useContext, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { userContext } from "../utils/UserProvider";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WriteABlog = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const title = titleRef.current.value;
      const content = contentRef.current.value;
      const docRef = await addDoc(collection(db, "blogs"), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        title: title,
        content: content,
        createdAt: new Date(Date.now()),
      });
      toast.success("Blog submitted successfully!", {
        autoClose: 2000,
        onClose: () => navigate("/home"),
      });
    } catch (err) {
      console.log("Error adding document: ", err);
    }
  };
  return (
    <div className=" p-10">
      <h1 className="text-2xl text-center font-bold">Write your Blog</h1>
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={titleRef}
          required
        />
        <textarea
          placeholder="Write your blog content here..."
          className="border border-gray-300 rounded px-3 py-2 h-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={contentRef}
          required
        />
        <button
          type="submit"
          className="w-40 mx-auto bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition cursor-pointer"
        >
          Submit
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default WriteABlog;
