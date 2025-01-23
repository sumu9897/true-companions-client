import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditBiodata = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const currentBiodata = null;
  const divisions = [
    "Dhaka",
    "Chattagra",
    "Rangpur",
    "Barisal",
    "Khulna",
    "Mymensingh",
    "Sylhet",
  ];
  const heights = [
    "4'8\"",
    "4'9\"",
    "5'0\"",
    "5'1\"",
    "5'2\"",
    "5'3\"",
    "5'4\"",
    "5'5\"",
    "5'6\"",
    "5'7\"",
    "5'8\"",
    "5'9\"",
    "6'0\"",
    "6'1\"",
  ];
  const weights = [
    "40 kg",
    "45 kg",
    "50 kg",
    "55 kg",
    "60 kg",
    "65 kg",
    "70 kg",
    "75 kg",
  ];
  const occupations = [
    "Engineer",
    "Doctor",
    "Teacher",
    "Businessperson",
    "Student",
    "Other",
  ];
  const races = ["Fair", "Wheatish", "Dark"];

  const dob = watch("dob");

  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      setValue("age", age);
    }
  }, [dob, setValue]);

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        const bioData = {
          biodataType: data.biodataType,
          name: data.name,
          profileImage: res.data.data.url,
          dob: data.dob,
          age: data.age,
          height: data.height,
          weight: data.weight,
          occupation: data.occupation,
          race: data.race,
          fatherName: data.fatherName,
          motherName: data.motherName,
          permanentDivision: data.permanentDivision,
          presentDivision: data.presentDivision,
          expectedPartnerAge: data.expectedPartnerAge,
          expectedPartnerHeight: data.expectedPartnerHeight,
          expectedPartnerWeight: data.expectedPartnerWeight,
          mobileNumber: data.mobileNumber,
          email: data.email,
        };
        const bioRes = await axiosSecure.post("/biodatas", bioData);
        if (bioRes.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Biodata added successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          // reset();
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while adding biodata.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      console.error(error);
    }
  };
  
  return (
    <div>
      <Helmet>
       <title> Edit Biodata</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Biodata Type
          </label>
          <select
            {...register("biodataType", {
              required: "Please select a biodata type",
            })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select an option</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.biodataType && (
            <p className="text-red-600 text-sm">{errors.biodataType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter Full Name"
            {...register("name", { required: "Full name is required" })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            defaultValue={currentBiodata?.name || user.displayName || ""}
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dob", { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Height
            </label>
            <select
              {...register("height")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option disabled selected>
                Select Height
              </option>
              {heights.map((height) => (
                <option key={height} value={height}>
                  {height}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Weight
            </label>
            <select
              {...register("weight")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option disabled selected>
                Select Weight
              </option>
              {weights.map((weight) => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <select
              {...register("occupation")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option disabled selected>
                Select Occupation
              </option>
              {occupations.map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Race
            </label>
            <select
              {...register("race")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option disabled selected>
                Select Race
              </option>
              {races.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Father's Name
          </label>
          <input
            type="text"
            placeholder="Enter Father Name"
            {...register("fatherName", { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={currentBiodata?.fatherName || ""}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mother's Name
          </label>
          <input
            type="text"
            placeholder="Enter Mother Name"
            {...register("motherName", { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Permanent Division
            </label>
            <select
              {...register("permanentDivision")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option disabled selected>
                Select Division
              </option>
              {divisions.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Present Division
            </label>
            <select
              {...register("presentDivision")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option disabled selected>
                Select Division
              </option>
              {divisions.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expected Partner Age
          </label>
          <input
            type="number"
            {...register("expectedPartnerAge")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expected Height
            </label>
            <select
              {...register("expectedPartnerHeight")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option disabled selected>
                Select Height
              </option>
              {heights.map((height) => (
                <option key={height} value={height}>
                  {height}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expected Weight
            </label>
            <select
              {...register("expectedPartnerWeight")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option disabled selected>
                Select Weight
              </option>
              {weights.map((weight) => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            {...register("mobileNumber")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            disabled
            type="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            defaultValue={user.email || ""}
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700"
        >
          Save and Publish Now
        </button>
      </form>
    </div>
  );
};

export default EditBiodata;
