import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import Swal from "sweetalert2";
import { FaBars, FaTimes } from "react-icons/fa";

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"
  }`;

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out",
          timer: 1200,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch(() => {});
  };

  const dashboardPath = isAdmin ? "/dashboard/admin" : "/dashboard/edit-biodata";

  const navLinks = (
    <>
      <li><NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink></li>
      <li><NavLink to="/biodatapage" className={linkClass} onClick={() => setMenuOpen(false)}>Biodatas</NavLink></li>
      <li><NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>About Us</NavLink></li>
      <li><NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>Contact Us</NavLink></li>
      {user && (
        <li>
          <NavLink to={dashboardPath} className={linkClass} onClick={() => setMenuOpen(false)}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-indigo-700 tracking-tight">BandhanBD</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">{navLinks}</ul>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=4f46e5&color=fff`}
                alt={user.displayName}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-200"
              />
              <span className="text-sm font-medium text-gray-700 hidden lg:block">
                {user.displayName}
              </span>
              <button
                onClick={handleLogOut}
                className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 shadow-md">
          <ul className="flex flex-col gap-4">{navLinks}</ul>
          <div className="mt-4 pt-4 border-t border-gray-100">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=4f46e5&color=fff`}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.displayName}</span>
                </div>
                <button
                  onClick={handleLogOut}
                  className="text-sm text-red-500 font-medium"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;