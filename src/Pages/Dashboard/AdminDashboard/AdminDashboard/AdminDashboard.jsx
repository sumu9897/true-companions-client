import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchBiodataStats();
  }, []);

  const fetchBiodataStats = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/biodata/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch biodata stats");
      }

      const data = await res.json();
      setBiodataStats(data);
    } catch (error) {
      console.error("Error fetching biodata stats:", error);
      setError("Failed to load statistics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {loading ? (
        <p className="loading-text">Loading data...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="stats-container">
          <div className="stats-card">
            <h2>Biodata Statistics</h2>
            <ul className="stats-list">
              <li>
                <strong>Total Biodatas:</strong> {biodataStats.total}
              </li>
              <li>
                <strong>Male Biodatas:</strong> {biodataStats.male}
              </li>
              <li>
                <strong>Female Biodatas:</strong> {biodataStats.female}
              </li>
              <li>
                <strong>Premium Biodatas:</strong> {biodataStats.premium}
              </li>
            </ul>
          </div>

          <div className="stats-card">
            <h2>Revenue</h2>
            <p>
              <strong>Total Revenue:</strong> ${biodataStats.revenue}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
