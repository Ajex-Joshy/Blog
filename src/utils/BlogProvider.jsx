import React, { createContext, useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const blogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogs);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  });
  // NB: [] is empty
  const value = useMemo(() => blogs, [blogs]);
  return <blogContext.Provider value={value}>{children}</blogContext.Provider>;
};

export default BlogProvider;
