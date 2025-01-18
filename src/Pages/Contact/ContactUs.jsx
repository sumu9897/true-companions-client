import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions or need support? We're here to help. Reach out to us, and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Phone */}
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <FaPhoneAlt className="text-4xl mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
            <p className="text-gray-600 mt-2">+880 1710-456789</p>
          </div>

          {/* Email */}
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <FaEnvelope className="text-4xl mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
            <p className="text-gray-600 mt-2">support@truecompanions.com</p>
          </div>

          {/* Address */}
          <div className="bg-white shadow-lg p-6 rounded-lg text-center">
            <FaMapMarkerAlt className="text-4xl mx-auto text-primary mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Visit Us</h3>
            <p className="text-gray-600 mt-2">123 Banani, Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white shadow-lg p-8 rounded-lg max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
          <form>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                placeholder="Write your message"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-pink-100 text-white hover:text-black font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Social Media Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Follow Us</h3>
          <div className="flex justify-center gap-8">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-gray-600 hover:text-blue-600 transition duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-gray-600 hover:text-blue-400 transition duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-gray-600 hover:text-blue-700 transition duration-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
