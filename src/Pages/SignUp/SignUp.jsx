import { Helmet } from "react-helmet-async";
import signup from "../../assets/signup/signup.png";
import { data, Link } from "react-router-dom";
import { useForm } from "react-hook-form";


const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data)
  }
  return (
    <>
      <Helmet>
        <title>True Companions | SignUp </title>
      </Helmet>
      <div className="flex flex-col lg:flex-row-reverse min-h-screen">
        <div className=" md:w-1/2 mx-auto lg:flex-left">
          <img className="size-96 mx-auto" src={signup} alt="" />
        </div>
        <div className="md:w-1/2 max-w-sm mx-auto bg-pink-100 p-4">
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-md rounded-md">
              <h2 className="text-2xl p-6 text-center">SIGN UP</h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name")}
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email")}
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
                  {...register("password")}
                  placeholder="Enter Your Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mt-6">
                <input
                  type="submit"
                  className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  value="Sign Up"
                />
              </div>
            </form>
            <h5>
              Already Have an Account? <Link to={"/login"}>Login</Link>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
