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
      }
    ],
  },{
    path: 'dashboard',
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'manage',
        element :<ManageUsers></ManageUsers>
      }
    ]
  }
]);
