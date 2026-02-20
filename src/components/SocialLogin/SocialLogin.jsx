import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photoURL: result.user?.photoURL,
      };
      await axiosPublic.post("/users", userInfo);
      Swal.fire({
        icon: "success",
        title: "Signed in with Google!",
        timer: 1200,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Sign-in Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="mt-4">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-400">or continue with</span>
        </div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
      >
        <FaGoogle className="text-red-500" />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;