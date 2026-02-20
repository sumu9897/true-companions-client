import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Upload profile image
      const formData = new FormData();
      formData.append("image", data.photoFile[0]);
      const imgRes = await fetch(IMAGE_HOSTING_API, { method: "POST", body: formData });
      const imgData = await imgRes.json();

      if (!imgData.success) {
        return Swal.fire({ icon: "error", title: "Image upload failed. Please try again." });
      }
      const photoURL = imgData.data.url;

      // Create Firebase user
      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, photoURL);

      // Sync user to DB
      await axiosPublic.post("/users", {
        name: data.name,
        email: data.email,
        photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Welcome to BandhanBD.",
        timer: 1800,
        showConfirmButton: false,
      });
      reset();
      navigate("/");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Registration Failed", text: error.message });
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up — BandhanBD</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-2 text-sm">Join BandhanBD and find your life partner</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                {...register("photoFile", { required: "Profile photo is required" })}
                className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:font-medium hover:file:bg-indigo-100"
              />
              {errors.photoFile && <p className="text-red-500 text-xs mt-1">{errors.photoFile.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                    message: "Must include uppercase, lowercase, and a number",
                  },
                })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Account…" : "Create Account"}
            </button>
          </form>

          <SocialLogin />

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;