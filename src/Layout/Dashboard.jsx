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
} from "react-icons/fa"; // Added relevant icons
import useAuth from "../hooks/useAuth";
import Navbar from "../Pages/Shared/Navbar";
import useAdmin from "../hooks/useAdmin";
 // Import your auth hook to get the user

const Dashboard = () => {
  const [isAdmin] = useAdmin()
  // const isAdmin = 'admin';
  const { user } = useAuth(); // Assuming useAuth provides the logged-in user info
  const userId = user?.id; // Replace 'id' with the actual property for the user ID in your auth system

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
                    to={`/dashboard/edit-biodata`}
                  >
                    <FaEdit /> Edit Biodata
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="flex gap-2 items-center p-2 mb-4 rounded-md hover:bg-blue-600 transition-all"
                    to={`/dashboard/view-biodata`}
                  >
                    <FaEdit /> View Biodata
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
                    to={"/dashboard/my-favourites"}
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
