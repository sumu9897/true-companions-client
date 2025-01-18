import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import ContactUs from "../Pages/Contact/ContactUs";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import "../index.css"
import Dashboard from "../Layout/Dashboard";
import ViewBioData from "../Pages/Dashboard/ViewBioData/ViewBioData";
import PrivateRoute from "./PrivateRoute";
import EditBioData from "../Pages/Dashboard/EditBioData/EditBioData";
import UserContactRequest from "../Pages/Dashboard/UserContactRequest/UserContactRequest";
import UserFavourites from "../Pages/Dashboard/UserFavourites/UserFavourites";
import GotMarriedForm from "../Pages/Dashboard/GotMarriedForm/GotMarriedForm";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard/AdminDashboard";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import ApproedPremium from "../Pages/Dashboard/AdminDashboard/ApproedPremium/ApproedPremium";
import ContactRequest from "../Pages/Dashboard/AdminDashboard/ContactRequest/ContactRequest";
import BiodatasPage from "../Pages/BiodatasPage/BiodatasPage";
import CreateBioData from "../Pages/Dashboard/CreateBioData/CreateBioData";
import AdminRoute from "./AdminRoute";
import BiodataDetails from "../Pages/BiodataDetails/BiodataDetails";
import CheckOut from "../Pages/CheckOut/CheckOut";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/biodatapage',
            element: <BiodatasPage></BiodatasPage>
        },
        {
            path: '/about',
            element: <About></About>
        },
        {
            path: '/contact',
            element: <ContactUs></ContactUs>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'signup',
            element: <SignUp></SignUp>
        },
        {
            path: '/biodata/:id',
            element: <BiodataDetails></BiodataDetails>
        },
        {
            path: '/checkout/:id',
            element: <CheckOut></CheckOut>
        }
    ]
  },
  {
    path: "dashboard",
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
        {
            path: 'biodata/:id',
            element: <ViewBioData></ViewBioData>
        },
        
        {
            path:'create-biodata',
            element: <CreateBioData></CreateBioData>
        },
        {
            path:'edit-biodata',
            element: <EditBioData></EditBioData>,
        },
        {
            path:'my-contact-request',
            element: <UserContactRequest></UserContactRequest>,
        },
        {
            path: 'my-favourites',
            element: <UserFavourites></UserFavourites>
        },
        {
            path: 'got-married',
            element:<GotMarriedForm></GotMarriedForm>
        },
        // Admin Routes
        {
            path: 'admin',
            element:<AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
        },
        {
            path: 'manage',
            element: <ManageUsers></ManageUsers>
        },
        {
            path: 'approvedPremium',
            element:<ApproedPremium></ApproedPremium>
        },
        {
            path: 'approvedContactRequest',
            element: <ContactRequest></ContactRequest>
        },

    ]
  }
]);
