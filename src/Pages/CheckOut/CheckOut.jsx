import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckOut = () => {
  const { biodataId } = useParams(); // Get biodataId from the URL
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      const res = await axiosSecure.post("/contact-requests", data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      alert("Request submitted. Please wait for admin approval.");
    } catch (error) {
      console.error("Error submitting contact request:", error);
      alert("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Checkout - Request Contact Information</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-100 p-4 rounded shadow-md">
        <input
          type="hidden"
          name="biodataId"
          value={biodataId}
          readOnly
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Your Email:</label>
          <input
            type="email"
            name="selfEmail"
            defaultValue={localStorage.getItem("user-email")}
            readOnly
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Stripe Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded shadow hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
