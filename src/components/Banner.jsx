import React from "react";

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
      <div className="relative z-10 text-center text-white px-6 sm:px-10 md:px-16 lg:px-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide leading-tight mb-6">
          <span className="text-red-600">Welcome to</span> <span className="text-pink-500">True Companions</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-3xl mx-auto text-gray-200">
          Discover meaningful connections with trust and ease. Your journey to a perfect partnership begins here.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-red-500 text-white font-medium rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300">
            Get Started
          </button>
          <button className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
