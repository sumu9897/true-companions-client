import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { FaEdit, FaEye, FaEnvelope, FaHeart, FaCheckCircle } from 'react-icons/fa';

const Dashboard = () => {
    const isAdmin = true;
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex mt-16 pt-4 ">
        <div className="w-64 min-h-screen bg-primary pt-5 pl-6">
          <ul className="">
           {
            isAdmin ? <>
            <li>
              <NavLink
                className="flex gap-2 items-center"
                to={"/dashboard/admin"}
              >
                <FaEdit /> Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex gap-2 items-center"
                to={"/dashboard/manage"}
              >
                <FaEdit /> Manage User
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex gap-2 items-center"
                to={"/dashboard/approvedPremium"}
              >
                <FaEdit /> Approved Premium
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex gap-2 items-center"
                to={"/dashboard/approvedContactRequest"}
              >
                <FaEdit /> Approved Contact Request
              </NavLink>
            </li>
            </>:<>
             <li>
              <NavLink
                className="flex gap-2 items-center"
                to={"/dashboard/edit-biodata"}
              >
                <FaEdit /> Edit Biodata
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex gap-2 items-center"
                to={"/dashboard/view-biodata"}
              >
                <FaEye /> View Biodata
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex gap-2 items-center"
                to={"/dashboard/contact-request"}
              >
                <FaEnvelope /> My Contact Request
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex gap-2 items-center"
                to={"/dashboard/favourites"}
              >
                <FaHeart /> My Favourites Biodata
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex gap-2 items-center"
                to={"/dashboard/got-married"}
              >
                <FaCheckCircle /> Got Married Form
              </NavLink>
            </li>
            </>
           }
          </ul>
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
