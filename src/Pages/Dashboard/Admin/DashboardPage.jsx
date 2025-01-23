import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashboardPage = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch dashboard statistics
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard-stats", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-600">Total Biodata</h2>
          <p className="text-2xl font-semibold text-gray-800">{stats.totalBiodata}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-600">Male Biodata</h2>
          <p className="text-2xl font-semibold text-blue-600">{stats.maleBiodata}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-600">Female Biodata</h2>
          <p className="text-2xl font-semibold text-pink-600">{stats.femaleBiodata}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-600">Premium Biodata</h2>
          <p className="text-2xl font-semibold text-yellow-600">{stats.premiumBiodata}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-600">Total Revenue</h2>
          <p className="text-2xl font-semibold text-green-600">${stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
