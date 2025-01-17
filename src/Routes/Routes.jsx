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
        }
    ]
  },
  {
    path: "dashboard",
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
        {
            path: 'view-biodata',
            element: <ViewBioData></ViewBioData>
        }
    ]
  }
]);
