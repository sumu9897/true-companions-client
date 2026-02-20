import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaEdit, FaEye, FaEnvelope, FaHeart, FaCheckCircle,
  FaUsers, FaClipboardCheck, FaUserShield, FaClipboardList,
  FaBars, FaTimes, FaSignOutAlt, FaTachometerAlt,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import Swal from "sweetalert2";

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? "bg-white/20 text-white"
      : "text-indigo-100 hover:bg-white/10"
  }`;

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogOut = () => {
    Swal.fire({
      title: "Log out?",
      text: "You will be signed out of your account.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => navigate("/"));
      }
    });
  };

  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard/admin" className={navLinkClass}>
          <FaTachometerAlt /> Admin Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage" className={navLinkClass}>
          <FaUsers /> Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/approvedPremium" className={navLinkClass}>
          <FaClipboardCheck /> Approve Premium
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/approvedContactRequest" className={navLinkClass}>
          <FaClipboardList /> Contact Requests
        </NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <NavLink to="/dashboard/edit-biodata" className={navLinkClass}>
          <FaEdit /> Edit Biodata
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/view-biodata" className={navLinkClass}>
          <FaEye /> View Biodata
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/contact-request" className={navLinkClass}>
          <FaEnvelope /> My Contact Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-favourites" className={navLinkClass}>
          <FaHeart /> My Favourites
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/got-married" className={navLinkClass}>
          <FaCheckCircle /> Got Married
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 z-40 flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-indigo-600">
          <span className="text-white text-xl font-bold tracking-tight">BandhanBD</span>
          <p className="text-indigo-300 text-xs mt-0.5">
            {isAdmin ? "Admin Panel" : "User Dashboard"}
          </p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {isAdmin ? adminLinks : userLinks}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-indigo-600">
          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-indigo-100 hover:bg-white/10 text-sm font-medium transition-colors"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <span className="text-indigo-700 font-semibold">BandhanBD Dashboard</span>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;