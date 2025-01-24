import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const GotMarriedForm = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    coupleImage: "",
    successStory: "",
    marriageDate: "",
    reviewStar: 0,
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setFormData((prevData) => ({
          ...prevData,
          coupleImage: data.data.display_url,
        }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("An error occurred while uploading the image.");
    } finally {
      setUploading(false);
    }
  };

  const handleStarClick = (rating) => {
    setFormData((prevData) => ({
      ...prevData,
      reviewStar: rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.selfBiodataId ||
      !formData.partnerBiodataId ||
      !formData.successStory ||
      !formData.marriageDate ||
      !formData.reviewStar
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      const response = await axiosSecure.post("/successStory", formData);
      toast.success("Success story submitted successfully!");
      setFormData({
        selfBiodataId: "",
        partnerBiodataId: "",
        coupleImage: "",
        successStory: "",
        marriageDate: "",
        reviewStar: 0,
      });
    } catch (error) {
      console.error("Error submitting success story:", error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Submit Your Success Story
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Self Biodata ID:
          </label>
          <input
            type="text"
            name="selfBiodataId"
            value={formData.selfBiodataId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Partner Biodata ID:
          </label>
          <input
            type="text"
            name="partnerBiodataId"
            value={formData.partnerBiodataId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Couple Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          {uploading && <p className="text-blue-500 mt-2">Uploading image...</p>}
          {formData.coupleImage && (
            <img
              src={formData.coupleImage}
              alt="Couple"
              className="mt-4 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marriage Date:
          </label>
          <input
            type="date"
            name="marriageDate"
            value={formData.marriageDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review Star:
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className={`cursor-pointer ${
                  formData.reviewStar >= star ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Success Story Review:
          </label>
          <textarea
            name="successStory"
            value={formData.successStory}
            onChange={handleChange}
            rows="5"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default GotMarriedForm;
