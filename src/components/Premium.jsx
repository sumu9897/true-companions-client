import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

const Premium = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order

  // Fetch premium profiles
  const { data: profiles, isError, isLoading, refetch } = useQuery({
    queryKey: ["premium", sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get("/premium-profiles", {
        params: { order: sortOrder },
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  // Handle sort order change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    refetch(); // Refetch data with new sort order
  };

  // Redirect to details page
  const handleViewProfile = (id) => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/biodata/${id}`);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500">Failed to load profiles.</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Premium Members</h2>

      <div className="flex justify-end mb-4">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="asc">Sort by Age: Ascending</option>
          <option value="desc">Sort by Age: Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles?.length > 0 ? (
          profiles.map((profile) => (
            <div
              key={profile._id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={profile.profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h4 className="text-lg font-semibold">{profile.name}</h4>
              <p className="text-gray-600">
                <strong>Type:</strong> {profile.biodataType}
              </p>
              <p className="text-gray-600">
                <strong>Division:</strong> {profile.permanentDivision}
              </p>
              <p className="text-gray-600">
                <strong>Age:</strong> {profile.age}
              </p>
              <p className="text-gray-600">
                <strong>Occupation:</strong> {profile.occupation}
              </p>
              <button
                onClick={() => handleViewProfile(profile._id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No premium profiles found.</p>
        )}
      </div>
    </div>
  );
};

export default Premium;
