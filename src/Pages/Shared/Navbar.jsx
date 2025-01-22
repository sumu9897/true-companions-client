import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Handle logout and display toast message
  const handleLogOut = () => {
    logOut()
      .then(() => {
        // Show success toast
        toast.success("Logged out successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
        // Show error toast
        toast.error(`Error: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const navOptions = (
    <>
      <li>
        <Link
          to="/"
          className="text-gray-700 hover:text-indigo-500 font-medium transition"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/biodatapage"
          className="text-gray-700 hover:text-indigo-500 font-medium transition"
        >
          Biodatas
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          className="text-gray-700 hover:text-indigo-500 font-medium transition"
        >
          About Us
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="text-gray-700 hover:text-indigo-500 font-medium transition"
        >
          Contact Us
        </Link>
      </li>

      {user ? (
        <>
          {/* Show logged-in user's name */}
          <span>{user?.displayName}</span>
          <li>
            <Link
              to="/dashboard/manage"
              className="text-gray-700 hover:text-indigo-500 font-medium transition"
            >
              Dashboard
            </Link>
          </li>
          <button
            onClick={handleLogOut}
            className="text-gray-700 hover:text-red-500 font-medium transition"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <li>
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-500 font-medium transition"
            >
              Login
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Website Logo" className="h-8 w-8" />
          <span className="text-lg font-bold text-gray-700">
            True Companions
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">{navOptions}</ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-indigo-500 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle Mobile Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-white border-t border-gray-200`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4">
          {navOptions}
        </ul>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
