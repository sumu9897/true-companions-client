import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
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
} from "react-icons/fa"; // Added relevant icons
import useAdmin from "../hooks/useAdmin";
import { useState } from "react";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [biodataId, setBiodataId] = useState(null);

  return (
    <div className="font-sans">
      <Navbar />
      <div className="flex mt-16 pt-4">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-primary text-white py-5 px-6">
          <ul>
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    className="flex gap-2 items-center p-2 mb-4 rounded-md hover:bg-blue-600 transition-all"
                    to={"/dashboard/admin"}
                  >
                    <FaUserShield /> Admin Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center p-2 mb-4 rounded-md hover:bg-blue-600 transition-all"
                    to={"/dashboard/manage"}
                  >
                    <FaUsers /> Manage User
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center p-2 mb-4 rounded-md hover:bg-blue-600 transition-all"
                    to={"/dashboard/approvedPremium"}
                  >
                    <FaClipboardCheck /> Approved Premium
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center p-2 mb-4 rounded-md hover:bg-blue-600 transition-all"
                    to={"/dashboard/approvedContactRequest"}
                  >
                    <FaClipboardList /> Approved Contact Request
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className="flex gap-2 items-center p-2 mb-4 rounded-md hover:bg-blue-600 transition-all"
                    to={"/dashboard/create-biodata"}
                  >
                    <FaEdit /> Create Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center p-2 mb-4 rounded-md hover:bg-blue-600 transition-all"
                    to={"/dashboard/edit-biodata"}
                  >
                    <FaEdit /> Edit Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center p-2 mb-4 rounded-md hover:bg-blue-600 transition-all"
                    to={`/biodata/${biodataId || "loading"}`}
                  >
                    <FaEye /> {biodataId ? "View Biodata" : "Loading..."}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center p-2 mb-4 rounded-md hover:bg-blue-600 transition-all"
                    to={"/dashboard/contact-request"}
                  >
                    <FaEnvelope /> My Contact Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center p-2 mb-4 rounded-md hover:bg-blue-600 transition-all"
                    to={"/dashboard/favourites"}
                  >
                    <FaHeart /> My Favourites Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center p-2 mb-4 rounded-md hover:bg-blue-600 transition-all"
                    to={"/dashboard/got-married"}
                  >
                    <FaCheckCircle /> Got Married Form
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
