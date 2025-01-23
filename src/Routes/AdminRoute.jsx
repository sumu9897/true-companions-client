import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const[isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

  if(loading || isAdminLoading){
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="text-blue-500 text-lg font-medium ml-4">Loading...</p>
        </div>
      );
  }

  if(user && isAdmin) {
    return children;
  }
  return <Navigate to='/' state={{from:location}} replace></Navigate>
}

export default AdminRoute