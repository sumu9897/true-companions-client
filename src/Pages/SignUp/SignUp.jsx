import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import signup from "../../assets/signup/signup.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Prepare the image for upload
      const formData = new FormData();
      const imageFile = data.photoURL[0];

      if (!imageFile) {
        Swal.fire({
          title: "No image selected",
          text: "Please select a photo to upload.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      formData.append("image", imageFile);

      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        const imageURL = result.data.url;
        console.log("Image URL:", imageURL);

        createUser(data.email, data.password)
          .then((result) => {
            const loggedUser = result.user;
            // console.log("User created successfully:", loggedUser);

            if (loggedUser) {
              updateUserProfile(data.name, imageURL)
                .then(() => {
                  console.log("User profile info updated");

                  loggedUser
                    .reload()
                    .then(() => {
                      console.log("User profile reloaded:", loggedUser);
                      const userInfo = {
                        name: data.name,
                        email: data.email,
                      };
                      axiosPublic.post("/users", userInfo).then((res) => {
                        if (res.data.insertedId) {
                          console.log('user added to the database')
                          reset();
                          Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User created successfully",
                            showCancelButton: false,
                            timer: 1500,
                          });
                          navigate("/");
                        }
                      });
                    })
                    .catch((error) => {
                      console.error("Error reloading user profile:", error);
                    });
                })
                .catch((error) =>
                  console.log("Error updating user profile:", error)
                );
            }

            Swal.fire({
              title: "User Created Successfully!",
              text: "Welcome to True Companions.",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((error) => {
            console.error("Error creating user:", error.message);

            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
              confirmButtonText: "Try Again",
            });
          });
      } else {
        console.error("Image upload failed:", result);
        Swal.fire({
          title: "Image Upload Failed",
          text: "Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>True Companions | Sign Up</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row-reverse min-h-screen items-center justify-center bg-gray-50">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center p-4">
          <img
            className="max-w-xs sm:max-w-md lg:max-w-full"
            src={signup}
            alt="Sign Up"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 max-w-lg p-6 bg-white shadow-lg rounded-md mx-4 lg:mx-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Sign Up
            </h2>
            <p className="text-sm text-center text-gray-600">
              Create your account to get started!
            </p>

            {/* Name Input */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                {...register("name", { required: true })}
                placeholder="Enter Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <span className="text-red-600 text-sm">Name is required</span>
              )}
            </div>

            {/* Photo Upload Input */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-medium">
                Photo Upload
              </label>
              <input
                type="file"
                {...register("photoURL", { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.photoURL && (
                <span className="text-red-600 text-sm">
                  Photo URL is required
                </span>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="Enter Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">Email is required</span>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 32,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Enter Your Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600 text-sm">
                  Password is required
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600 text-sm">
                  Password must be less than 32 characters
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600 text-sm">
                  Password must be at least 6 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600 text-sm">
                  Password must include uppercase, lowercase, number, and
                  special character
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <input
                type="submit"
                className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                value="Sign Up"
              />
            </div>
          </form>
          <SocialLogin></SocialLogin>

          {/* Login Redirect */}
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
