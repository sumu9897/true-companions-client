import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BiodatasPage = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // State for filters and pagination
  const [filters, setFilters] = useState({
    ageRange: [0, 100],
    type: "",
    division: "",
  });
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 20; // Number of items per page

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["biodatas", filters, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        params: {
          ageMin: filters.ageRange[0] || 0,
          ageMax: filters.ageRange[1] || 100,
          biodataType: filters.type || undefined,
          division: filters.division || undefined,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      return res.data; 
    },
  });

  const biodatas = data?.biodatas || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === "ageRange" ? value.split(",").map(Number) : value,
    }));
    setCurrentPage(1); // Reset to first page on filter change
    refetch();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    refetch();
  };

  const handleViewProfile = (id) => {
    if (localStorage.getItem("access-token")) {
      navigate(`/biodata/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="biodatas-page flex flex-col lg:flex-row gap-4 p-4">
      {/* Filters Section */}
      <div className="filters w-full lg:w-1/4 bg-gray-100 p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        <label className="block mb-2">Age Range:</label>
        <input
          type="text"
          name="ageRange"
          placeholder="e.g., 20,40"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleFilterChange}
        />

        <label className="block mb-2">Biodata Type:</label>
        <select
          name="type"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label className="block mb-2">Division:</label>
        <select
          name="division"
          className="w-full p-2 border rounded"
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chattagra">Chattagra</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Barisal">Barisal</option>
          <option value="Khulna">Khulna</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Sylhet">Sylhet</option>
        </select>
      </div>

      {/* Biodatas List Section */}
      <div className="biodatas w-full lg:w-3/4">
        <h3 className="text-lg font-semibold mb-4">All Biodatas</h3>

        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load biodatas.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {biodatas.length > 0 ? (
                biodatas.map((biodata) => (
                  <div
                    key={biodata._id}
                    className="biodata-card border rounded-lg shadow-md p-4 flex flex-col items-center"
                  >
                    <img
                      src={biodata.profileImage || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <p className="text-sm font-semibold">
                      Biodata ID: {biodata.biodataId}
                    </p>
                    <p className="text-sm">Type: {biodata.biodataType}</p>
                    <p className="text-sm">Division: {biodata.permanentDivision}</p>
                    <p className="text-sm">Age: {biodata.age}</p>
                    <p className="text-sm">Occupation: {biodata.occupation}</p>
                    <button
                      onClick={() => handleViewProfile(biodata._id)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                    >
                      View Profile
                    </button>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No biodatas found.
                </p>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="pagination mt-6 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded shadow ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BiodatasPage;
