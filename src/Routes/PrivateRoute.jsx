import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="text-blue-500 text-lg font-medium ml-4">Loading...</p>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{from: location}} replace/>;
};

export default PrivateRoute;
