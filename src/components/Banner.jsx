import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/G7RsbBQ/bgImage.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-6 sm:px-10 md:px-16 lg:px-20"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold  leading-tight mb-6">
          <span className="text-red-600">Find Your</span>{" "}
          <span className="text-pink-500">True Companion</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-3xl mx-auto text-gray-200">
          Start your journey towards a meaningful connection today.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-pink-600 to-red-500 text-white font-medium rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              Get Started
            </motion.button>
          </Link>
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition duration-300"
            >
              Learn More
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
