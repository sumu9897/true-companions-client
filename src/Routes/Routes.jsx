import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

// Public pages
import Home from "../Pages/Home/Home";
import BiodatasPage from "../Pages/BiodatasPage/BiodatasPage";
import BiodataDetails from "../Pages/BiodataDetails/BiodataDetails";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import About from "../Pages/About/About";
import ContactUs from "../Pages/Contact/ContactUs";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

// User Dashboard
import EditBiodata from "../Pages/Dashboard/User/EditBiodata";
import ViewBiodata from "../Pages/Dashboard/User/ViewBiodata";
import MyContactRequest from "../Pages/Dashboard/User/MyContactRequest";
import FavouriteBiodata from "../Pages/Dashboard/User/FavouriteBiodata";
import GotMarriedForm from "../Pages/Dashboard/User/GotMarriedForm";
import CheckOut from "../Pages/Dashboard/User/CheckOut";

// Admin Dashboard
import DashboardPage from "../Pages/Dashboard/Admin/DashboardPage";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ApprovedPremium from "../Pages/Dashboard/Admin/ApprovedPremium";
import ApprovedContactReq from "../Pages/Dashboard/Admin/ApprovedContactReq";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "biodatapage", element: <BiodatasPage /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <ContactUs /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "biodata/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout/:biodataId",
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // User routes
      { path: "edit-biodata", element: <EditBiodata /> },
      { path: "view-biodata", element: <ViewBiodata /> },
      { path: "contact-request", element: <MyContactRequest /> },
      { path: "my-favourites", element: <FavouriteBiodata /> },
      { path: "got-married", element: <GotMarriedForm /> },
      // Admin routes
      { path: "admin", element: <AdminRoute><DashboardPage /></AdminRoute> },
      { path: "manage", element: <AdminRoute><ManageUsers /></AdminRoute> },
      { path: "approvedPremium", element: <AdminRoute><ApprovedPremium /></AdminRoute> },
      { path: "approvedContactRequest", element: <AdminRoute><ApprovedContactReq /></AdminRoute> },
    ],
  },
]);