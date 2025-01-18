import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateBioData = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

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

  // Calculate age based on dob
  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      setValue("age", age);
    }
  }, [dob, setValue]);

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const imageUrl = res.data.data.display_url;
      const bioData = {
        name: data.name,
        age: data.age,
        biodataType: data.biodataType,
        dob: data.dob,
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
        profileImage: imageUrl,
      };
      try {
        const response = await axiosSecure.post("/biodata", bioData);
        if (response.status === 200) {
          console.log("Bio data saved successfully:", response.data);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Bio data saved successfully!",
          });
        }
      } catch (error) {
        console.error("Error saving bio data:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to save bio data. Please try again.",
        });
      }
    }

    // console.log(res.data);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Create Biodata</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Biodata Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Biodata Type
          </label>
          <select
            {...register("biodataType", { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option disabled selected>
              Select an option
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter Full Name"
            {...register("name", { required: true })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
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

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save and Publish Now
        </button>
      </form>
    </div>
  );
};

export default CreateBioData;
