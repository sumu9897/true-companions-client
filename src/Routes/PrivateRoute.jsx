
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } =useAuth()
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{from: location}} replace/>;
};

export default PrivateRoute;
