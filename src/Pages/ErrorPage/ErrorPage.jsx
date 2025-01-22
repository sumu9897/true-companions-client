import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
        <p className="text-2xl md:text-3xl font-semibold mt-4">
          Oops! Page not found
        </p>
        <p className="text-gray-600 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
