import React from 'react';

const SuccessCounter = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Achievements</h2>
          <p className="mt-4 text-lg text-gray-600">
            We’re proud of our growing community and the success we’ve achieved together. Here are some of our milestones:
          </p>
        </div>

        {/* Success Counters */}
        <div className="flex justify-center space-x-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-4xl font-bold text-indigo-600">500+</h3>
            <p className="text-lg text-gray-700 mt-2">Total Biodata</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-4xl font-bold text-blue-600">300+</h3>
            <p className="text-lg text-gray-700 mt-2">Male Biodata</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-4xl font-bold text-pink-600">200+</h3>
            <p className="text-lg text-gray-700 mt-2">Female Biodata</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCounter;
