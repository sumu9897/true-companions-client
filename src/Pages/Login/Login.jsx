import { useContext } from "react";
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

  const from = location.state?.form?.pathname || "/";

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
        <title>True Companions | Login </title>
      </Helmet>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className=" md:w-1/2 lg:flex-left">
          <img className="size-96 mx-auto" src={login} alt="" />
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
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
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

          <h5>
            New Here? <Link to={"/signup"}>Create an Account!</Link>
          </h5>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </>
  );
};

export default Login;