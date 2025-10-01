import React, { useEffect, useState } from "react";
import BlogTitleCard from "./BlogTitleCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {blogs.map((b) => (
        <BlogTitleCard key={b.id} blog={b} />
      ))}
    </div>
  );
};

export default Home;
