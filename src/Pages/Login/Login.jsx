import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../assets/login/login.png";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Login successful!",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login error:", error.message);

        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error: ${error.message}`,
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Left Section */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <img
            className="max-w-full h-auto object-contain"
            src={login}
            alt="Login Illustration"
          />
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex items-center justify-center px-6 py-8 md:px-16 bg-white shadow-lg">
          <div className="w-full max-w-md">
            <form
              onSubmit={handleLogin}
              className="p-8 bg-white rounded-lg shadow-md"
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Login
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <div className="text-right mt-2">
                  <a href="#" className="text-sm text-blue-500 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Login
                </button>
              </div>
            </form>
            <SocialLogin></SocialLogin>
            <p className="mt-4 text-center text-sm text-gray-600">
              New here?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:underline font-medium"
              >
                Create an account!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
