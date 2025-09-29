import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Sign from "./components/Sign";
import UserProvider from "./utils/UserProvider.jsx";
import MyBlogs from "./components/MyBlogs.jsx";
import WriteABlog from "./components/WriteABlog.jsx";
import Home from "./components/Home.jsx";
import BlogCard from "./components/BlogCard.jsx";
import BlogProvider from "./utils/BlogProvider.jsx";
import EditBlog from "./components/EditBlog.jsx";

function App() {
  return (
    <div>
      <UserProvider>
        <BlogProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/sign" element={<Sign />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/my-blogs" element={<MyBlogs />} />
                <Route path="/write-a-blog" element={<WriteABlog />} />
                <Route path="/blog" element={<BlogCard />} />
                <Route path="/edit-blog" element={<EditBlog />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </BlogProvider>
      </UserProvider>
    </div>
  );
}

export default App;
