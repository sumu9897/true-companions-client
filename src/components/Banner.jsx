import React from "react";

const Banner = () => {
  return (
    <div
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/G7RsbBQ/bgImage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          Welcome to True Companions
        </h1>
        <p className="mt-4 text-sm sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto">
          Discover meaningful connections effortlessly. Start your journey to a
          perfect partnership with trust and ease.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-6 sm:px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
            Get Started
          </button>
          <button className="px-6 sm:px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-800 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
