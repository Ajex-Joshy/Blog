import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Swal from "sweetalert2";

const BlogTitleCard = React.memo(
  ({ blog: { id, title, photoURL, displayName }, myBlog }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
      navigate("/edit-blog", { state: { blogId: id } });
    };

    const handleDelete = async () => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "blogs", id));
        } catch (error) {
          console.error("Error deleting blog: ", error);
        }
      }
    };

    return (
      <div
        className="w-8/12 bg-amber-200 mx-auto m-4 p-4 rounded-lg cursor-pointer"
        onClick={() => navigate("/blog", { state: { blogId: id } })}
      >
        <div className="flex justify-between items-center">
          <div className="flex">
            <img className="w-8 rounded-full" src={photoURL} alt="" />
            <p className="m-2 my-auto">{displayName}</p>
          </div>
          {myBlog && (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div>
          <p className="text-2xl font-bold m-2">{title}</p>
        </div>
      </div>
    );
  }
);

export default BlogTitleCard;
