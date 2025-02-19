import React from 'react';
import { FaUser, FaSearch, FaHandshake, FaHeart } from 'react-icons/fa';

const Works = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-700">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our simple and effective process helps you connect with the right partner. Here’s how it works:
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <FaUser className="text-4xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Step 1: Create Your Profile</h3>
            <p className="text-gray-600 mt-2">
              Register and fill out your profile with important information about yourself, preferences, and what you're looking for in a partner.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <FaSearch className="text-4xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Step 2: Browse & Filter Biodata</h3>
            <p className="text-gray-600 mt-2">
              Browse through a curated list of biodata and use filters to find matches that align with your values, preferences, and goals.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <FaHandshake className="text-4xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Step 3: Connect & Engage</h3>
            <p className="text-gray-600 mt-2">
              Reach out to potential matches and start a conversation. Whether you prefer to chat online or arrange a meeting, the choice is yours.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <FaHeart className="text-4xl text-primary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Step 4: Find Your Perfect Match</h3>
            <p className="text-gray-600 mt-2">
              Build a relationship with your chosen match and explore a future filled with love and companionship.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Get Started?</h3>
          <p className="text-lg text-gray-600 mb-6">
            Join our platform today and begin your journey to find the perfect partner!
          </p>
          <a
            href="/signup"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Works;
