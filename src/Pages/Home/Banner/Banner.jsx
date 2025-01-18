import React from 'react';

const Banner = () => {
  return (
    <div
      className="banner relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.ibb.co.com/G7RsbBQ/bgImage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Welcome to True Companions
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl leading-relaxed">
          Find your perfect partner with ease and trust! Start your journey to meaningful connections.
        </p>
        
        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-6">
          <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
            Get Started
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-800 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
