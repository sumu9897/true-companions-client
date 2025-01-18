import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            We are dedicated to connecting people with shared values, fostering meaningful relationships, and 
            creating a community where love and connection thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To provide a safe, user-friendly, and effective platform for people to find their perfect companion.
            </p>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              Building a global community where love and connection transcend boundaries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
