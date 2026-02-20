import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";

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

    signIn(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          timer: 1200,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Login — BandhanBD</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2 text-sm">Sign in to your BandhanBD account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
            >
              Sign In
            </button>
          </form>

          <SocialLogin />

          <p className="text-center text-sm text-gray-500 mt-6">
            New to BandhanBD?{" "}
            <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;