import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from '../../../assets/logo.webp'; // Adjust the path as necessary

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8 lg:space-y-0">
          {/* Logo and About */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Website Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-white">True Companions</span>
            </Link>
            <p className="text-center lg:text-left text-gray-400">
              Connecting hearts and minds, one biodata at a time. Find your true match here.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-indigo-400 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/biodatas" className="hover:text-indigo-400 transition">
                    Biodatas
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-indigo-400 transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-indigo-400 transition">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/faq" className="hover:text-indigo-400 transition">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-indigo-400 transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-indigo-400 transition">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Subscribe</h3>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} True Companions. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-500 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-500 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-500 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-500 transition"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
