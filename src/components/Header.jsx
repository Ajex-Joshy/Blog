import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { userContext } from "../utils/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const Header = () => {
  const { user, dispatch } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "removeUser" });
      navigate("/sign");
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (!user) navigate("/sign");
  }, [user]);

  return (
    <div className="bg-black text-white flex justify-between items-center p-3 px-12">
      <div>
        <Link to="/" className="text-2xl font-bold">
          BLOG.
        </Link>
      </div>

      {user && (
        <div className="flex space-x-6">
          <Link to="/home" className="cursor-pointer hover:text-gray-300">
            Home
          </Link>
          <Link to="/my-blogs" className="cursor-pointer hover:text-gray-300">
            My Blogs
          </Link>
          <Link
            to="/write-a-blog"
            className="cursor-pointer hover:text-gray-300"
          >
            Write a Blog
          </Link>
          <p
            className="cursor-pointer hover:text-gray-300"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      )}

      {/* User Avatar */}
      {user && (
        <div>
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={user.photoURL}
            alt="User Avatar"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
