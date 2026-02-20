import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;

const GotMarriedForm = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const [form, setForm] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    successStory: "",
    marriageDate: "",
    reviewStar: 0,
  });
  const [coupleImageUrl, setCoupleImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axiosPublic.post(IMAGE_HOSTING_API, formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      if (res.data.success) {
        setCoupleImageUrl(res.data.data.url);
        Swal.fire({ icon: "success", title: "Image uploaded!", timer: 1200, showConfirmButton: false });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Image upload failed" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.selfBiodataId || !form.partnerBiodataId || !form.successStory || !form.marriageDate || !form.reviewStar) {
      return Swal.fire({ icon: "warning", title: "Please fill in all required fields." });
    }

    setSubmitting(true);
    try {
      await axiosSecure.post("/success-stories", {
        ...form,
        coupleImage: coupleImageUrl,
      });
      Swal.fire({
        icon: "success",
        title: "Story Submitted!",
        text: "Thank you for sharing your happy story with the BandhanBD community.",
        timer: 2500,
        showConfirmButton: false,
      });
      setForm({ selfBiodataId: "", partnerBiodataId: "", successStory: "", marriageDate: "", reviewStar: 0 });
      setCoupleImageUrl("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.response?.data?.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <>
      <Helmet>
        <title>Got Married — BandhanBD</title>
      </Helmet>

      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Share Your Success Story</h1>
          <p className="text-gray-500 text-sm mt-1">
            Did you find your partner through BandhanBD? Share your story to inspire others!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5"
        >
          {/* Biodata IDs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Your Biodata ID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="selfBiodataId"
                value={form.selfBiodataId}
                onChange={handleChange}
                placeholder="e.g. 12"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Partner's Biodata ID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="partnerBiodataId"
                value={form.partnerBiodataId}
                onChange={handleChange}
                placeholder="e.g. 24"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Marriage Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Marriage Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="marriageDate"
              value={form.marriageDate}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, reviewStar: star }))}
                  className="transition-transform hover:scale-110"
                >
                  <FaStar
                    size={28}
                    className={form.reviewStar >= star ? "text-yellow-400" : "text-gray-200"}
                  />
                </button>
              ))}
              <span className="text-sm text-gray-500 ml-2">
                {form.reviewStar > 0 ? `${form.reviewStar} / 5` : "Select rating"}
              </span>
            </div>
          </div>

          {/* Couple Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Couple Photo (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:font-medium"
            />
            {uploading && (
              <p className="text-indigo-600 text-xs mt-1 animate-pulse">Uploading image…</p>
            )}
            {coupleImageUrl && (
              <img
                src={coupleImageUrl}
                alt="Couple"
                className="mt-3 w-32 h-32 object-cover rounded-xl shadow-sm"
              />
            )}
          </div>

          {/* Success Story */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Your Story <span className="text-red-500">*</span>
            </label>
            <textarea
              name="successStory"
              value={form.successStory}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Tell us how you met and what makes your journey special…"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={submitting || uploading}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting…" : "Submit Success Story"}
          </button>
        </form>
      </div>
    </>
  );
};

export default GotMarriedForm;