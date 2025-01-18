import React from "react";
import { FaUsers, FaHeart, FaGlobe, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* About Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            We are dedicated to connecting people with shared values, fostering meaningful relationships, and
            creating a community where love and connection thrive.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <FaHeart className="text-primary text-3xl mr-4" />
              <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-600">
              To provide a safe, user-friendly, and effective platform for people to find their perfect companion.
            </p>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <div className="flex items-center mb-4">
              <FaGlobe className="text-primary text-3xl mr-4" />
              <h3 className="text-2xl font-semibold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-gray-600">
              Building a global community where love and connection transcend boundaries.
            </p>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white shadow-lg p-8 rounded-lg text-center">
              <FaUsers className="text-4xl mx-auto text-primary mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Community</h4>
              <p className="text-gray-600">
                We believe in the power of community and the importance of building genuine relationships.
              </p>
            </div>
            <div className="bg-white shadow-lg p-8 rounded-lg text-center">
              <FaHandshake className="text-4xl mx-auto text-primary mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Trust</h4>
              <p className="text-gray-600">
                Trust is the foundation of meaningful relationships, and we strive to create a safe space for all.
              </p>
            </div>
            <div className="bg-white shadow-lg p-8 rounded-lg text-center">
              <FaHeart className="text-4xl mx-auto text-primary mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Love</h4>
              <p className="text-gray-600">
                We are passionate about fostering love and connection in every interaction.
              </p>
            </div>
            <div className="bg-white shadow-lg p-8 rounded-lg text-center">
              <FaGlobe className="text-4xl mx-auto text-primary mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Global Reach</h4>
              <p className="text-gray-600">
                Our platform connects individuals across the world, transcending borders and cultures.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 bg-primary text-white rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
          <p className="text-lg mb-8">Join our community today and begin your journey towards meaningful connections.</p>
          <a href="/get-started" className="px-6 py-3 bg-white text-primary text-lg font-semibold rounded-lg hover:bg-gray-200 transition">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
