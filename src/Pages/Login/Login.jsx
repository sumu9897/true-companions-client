import { useContext, useState } from "react";
import login from "../../assets/login/login.png";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "User Login Successful.",
        showClass: {
          popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
        },
        hideClass: {
          popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
        },
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <>
      <Helmet>
        <title>True Companions | Login</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="md:w-1/2 lg:flex-left">
          <img className="size-96 mx-auto" src={login} alt="Login Illustration" />
        </div>
        <div className="md:w-1/2 max-w-sm mx-auto bg-pink-100 p-4">
          <form
            onSubmit={handleLogin}
            className="p-6 bg-white shadow-md rounded-md"
          >
            <h2 className="text-2xl p-6 text-center">LOGIN</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Your Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0121 12c0-5.523-4.477-10-10-10S1 6.477 1 12c0 2.347.835 4.5 2.236 6.157m2.43 2.543A9.953 9.953 0 0012 22c2.256 0 4.33-.747 6.036-2.017M9.172 9.172a4 4 0 015.656 5.656m1.415-1.415a6 6 0 00-8.486-8.486M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.327 1.013-.81 1.978-1.419 2.81M2.458 12C3.732 16.057 7.522 19 12 19c4.478 0 8.268-2.943 9.542-7-.327-1.013-.81-1.978-1.419-2.81"
                    />
                  </svg>
                )}
              </button>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mt-2 inline-block"
              >
                Forgot password?
              </a>
            </div>
            <div className="mt-6">
              <input
                type="submit"
                className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                value="Login"
              />
            </div>
          </form>

          <h5 className="mt-4 text-center">
            New Here?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create an Account!
            </Link>
          </h5>
          <SocialLogin />
        </div>
      </div>
    </>
  );
};

export default Login;
