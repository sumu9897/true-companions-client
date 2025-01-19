import React, { useEffect, useState } from "react";
import { FaUsers, FaMoneyBillAlt, FaMale, FaFemale, FaStar } from "react-icons/fa"; // For icons
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [biodataStats, setBiodataStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    premium: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch biodata stats from the backend when the component mounts
  useEffect(() => {
    fetchBiodataStats();
  }, []);

  const fetchBiodataStats = async () => {
    setLoading(true);
    setError(""); // Reset any existing errors
    try {
      const response = await fetch("/api/biodata/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch biodata stats");
      }

      const data = await response.json();
      setBiodataStats(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching biodata stats:", error);
      setError("Failed to load statistics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard-container p-6">
      <h1 className="dashboard-title text-3xl font-semibold text-center mb-6">
        Admin Dashboard
      </h1>

      {/* Loading or error state */}
      {loading ? (
        <div className="loading-state text-center text-lg">Loading data...</div>
      ) : error ? (
        <div className="error-state text-center text-lg text-red-600">{error}</div>
      ) : (
        <div className="stats-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Biodata Statistics Section */}
          <div className="stats-card bg-white shadow-lg rounded-lg p-6 text-center">
            <FaUsers className="text-5xl text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Total Biodatas</h2>
            <p className="text-2xl">{biodataStats.total}</p>
          </div>

          {/* Male Biodatas */}
          <div className="stats-card bg-white shadow-lg rounded-lg p-6 text-center">
            <FaMale className="text-5xl text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Male Biodatas</h2>
            <p className="text-2xl">{biodataStats.male}</p>
          </div>

          {/* Female Biodatas */}
          <div className="stats-card bg-white shadow-lg rounded-lg p-6 text-center">
            <FaFemale className="text-5xl text-pink-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Female Biodatas</h2>
            <p className="text-2xl">{biodataStats.female}</p>
          </div>

          {/* Premium Biodatas */}
          <div className="stats-card bg-white shadow-lg rounded-lg p-6 text-center">
            <FaStar className="text-5xl text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Premium Biodatas</h2>
            <p className="text-2xl">{biodataStats.premium}</p>
          </div>

          {/* Revenue Section */}
          <div className="stats-card bg-white shadow-lg rounded-lg p-6 text-center">
            <FaMoneyBillAlt className="text-5xl text-green-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
            <p className="text-2xl">${biodataStats.revenue}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
