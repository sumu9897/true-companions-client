import React from 'react';

const ContactUs = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions or need support? We're here to help. Reach out to us, and we'll get back to you as soon as possible.
          </p>
        </div>

        <form className="bg-white shadow-lg p-8 rounded-lg max-w-2xl mx-auto">
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
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
