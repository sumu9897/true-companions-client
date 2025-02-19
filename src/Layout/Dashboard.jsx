import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaEdit,
  FaEye,
  FaEnvelope,
  FaHeart,
  FaCheckCircle,
  FaUsers,
  FaClipboardCheck,
  FaUserShield,
  FaClipboardList,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import Navbar from "../Pages/Shared/Navbar";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { user } = useAuth();
  const userId = user?.id;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex mt-16 pt-4">
        {/* Sidebar Toggle Button */}
        <button
          className="lg:hidden fixed top-20 left-4 z-50 bg-primary text-white p-2 rounded-md shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed top-16 left-0 bg-primary text-white py-5 px-6 shadow-lg h-screen transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:w-64`}
        >
          <ul className="space-y-4">
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    className="flex gap-3 items-center p-3 rounded-lg hover:bg-blue-600 transition"
                    to="/dashboard/admin"
                  >
                    <FaUserShield /> Admin Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-3 items-center p-3 rounded-lg hover:bg-blue-600 transition"
                    to="/dashboard/manage"
                  >
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-3 items-center p-3 rounded-lg hover:bg-blue-600 transition"
                    to="/dashboard/approvedPremium"
                  >
                    <FaClipboardCheck /> Approved Premium
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-3 items-center p-3 rounded-lg hover:bg-blue-600 transition"
                    to="/dashboard/approvedContactRequest"
                  >
                    <FaClipboardList /> Approved Contact Requests
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className="flex gap-3 items-center p-3 rounded-lg hover:bg-blue-600 transition"
                    to="/dashboard/edit-biodata"
                  >
                    <FaEdit /> Edit Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-3 items-center p-3 rounded-lg hover:bg-blue-600 transition"
                    to="/dashboard/view-biodata"
                  >
                    <FcViewDetails /> View Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-3 items-center p-3 rounded-lg hover:bg-blue-600 transition"
                    to="/dashboard/contact-request"
                  >
                    <FaEnvelope /> My Contact Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-3 items-center p-3 rounded-lg hover:bg-blue-600 transition"
                    to="/dashboard/my-favourites"
                  >
                    <FaHeart /> My Favourite Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-3 items-center p-3 rounded-lg hover:bg-blue-600 transition"
                    to="/dashboard/got-married"
                  >
                    <FaCheckCircle /> Got Married Form
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-8 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;