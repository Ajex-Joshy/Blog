import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-6">
      <h1 className="text-6xl md:text-8xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl md:text-2xl text-gray-800 mb-6">
        Oops! The page you're looking for does not exist.
      </p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default Error;
