import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import ContactUs from "../Pages/Contact/ContactUs";
import About from "../Pages/About/About";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import PrivateRoute from "./PrivateRoute";
import EditBiodata from "../Pages/Dashboard/User/EditBiodata";
import ViewBiodata from "../Pages/Dashboard/User/ViewBiodata";
import AdminRoute from "./AdminRoute";
import BiodatasPage from "../Pages/BiodatasPage/BiodatasPage";
import BiodataDetails from "../Pages/BiodataDetails/BiodataDetails";
import ApprovedPremium from "../Pages/Dashboard/Admin/ApprovedPremium";
import MyContactRequest from "../Pages/Dashboard/User/MyContactRequest";
import FavouriteBiodata from "../Pages/Dashboard/User/FavouriteBiodata";
import GotMarriedForm from "../Pages/Dashboard/User/GotMarriedForm";
import CheckOut from "../Pages/Dashboard/User/CheckOut";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DashboardPage from "../Pages/Dashboard/Admin/DashboardPage";
import ApprovedContactReq from "../Pages/Dashboard/Admin/ApprovedContactReq";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/biodatapage",
        element: <BiodatasPage></BiodatasPage>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
      {
        path: "/biodata/:id",
        element: <BiodataDetails></BiodataDetails>
      },
      
      {
        path: 'checkout/:id',
        element: (<PrivateRoute>
          
          <Elements stripe={stripePromise}>
            <CheckOut />
          </Elements>
        </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'manage',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
      },
      {
        path: 'admin',
        element: <AdminRoute><DashboardPage></DashboardPage></AdminRoute>,
      },
      {
        path: 'approvedPremium',
        element: <AdminRoute><ApprovedPremium></ApprovedPremium></AdminRoute>,
      },
      {
        path: 'approvedContactRequest',
        element: <AdminRoute><ApprovedContactReq></ApprovedContactReq></AdminRoute>,
      },
      {
        path: 'edit-biodata',
        element: <EditBiodata></EditBiodata>,
      },
      {
        path: 'view-biodata',
        element: <ViewBiodata></ViewBiodata>,
      },
      {
        path: 'contact-request',
        element: <MyContactRequest></MyContactRequest>,
      },
      {
        path: 'my-favourites',
        element: <FavouriteBiodata></FavouriteBiodata>,
      },
      {
        path: 'got-married',
        element: <GotMarriedForm></GotMarriedForm>,
      },
    ],
  }
  
  
]);
