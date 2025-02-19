import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, PieChart, Pie, Tooltip, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";

const DashboardPage = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch dashboard statistics
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const pieData = [
    { name: "Male", value: stats.maleCount, color: "#3498db" },
    { name: "Female", value: stats.femaleCount, color: "#e74c3c" },
    { name: "Premium", value: stats.premiumCount, color: "#f1c40f" },
  ];

  const barData = [
    { name: "Total Users", value: stats.biodataCount },
    { name: "Premium Users", value: stats.premiumCount },
    { name: "Revenue", value: stats.revenue },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-600">Total Users</h2>
          <p className="text-2xl font-bold text-gray-800">{stats.biodataCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-600">Male Users</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.maleCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-600">Female Users</h2>
          <p className="text-2xl font-bold text-pink-600">{stats.femaleCount}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Stats</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4CAF50" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
