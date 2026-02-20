import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaFilter, FaSearch } from "react-icons/fa";

const DIVISIONS = ["Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];
const ITEMS_PER_PAGE = 20;

const BiodatasPage = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(60);
  const [biodataType, setBiodataType] = useState("");
  const [division, setDivision] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["biodatas", ageMin, ageMax, biodataType, division, currentPage],
    queryFn: async () => {
      const params = {
        ageMin,
        ageMax,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      };
      if (biodataType) params.biodataType = biodataType;
      if (division) params.division = division;
      const res = await axiosPublic.get("/biodatas", { params });
      return res.data;
    },
  });

  const biodatas = data?.biodatas || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleApplyFilters = () => {
    setCurrentPage(1);
    setShowFilter(false);
  };

  const handleReset = () => {
    setAgeMin(18);
    setAgeMax(60);
    setBiodataType("");
    setDivision("");
    setCurrentPage(1);
  };

  const handleViewProfile = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/biodata/${id}`);
    }
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <h3 className="font-bold text-gray-800 flex items-center gap-2">
        <FaFilter className="text-indigo-500" /> Filter Options
      </h3>

      {/* Age Range */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Age Range: {ageMin} – {ageMax}
        </label>
        <div className="space-y-2">
          <div>
            <span className="text-xs text-gray-500">Min Age</span>
            <input
              type="range"
              min={18}
              max={ageMax}
              value={ageMin}
              onChange={(e) => setAgeMin(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
          <div>
            <span className="text-xs text-gray-500">Max Age</span>
            <input
              type="range"
              min={ageMin}
              max={80}
              value={ageMax}
              onChange={(e) => setAgeMax(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Biodata Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Biodata Type</label>
        <select
          value={biodataType}
          onChange={(e) => setBiodataType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Types</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Division */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Division</label>
        <select
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Divisions</option>
          {DIVISIONS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleApplyFilters}
          className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Browse Biodatas — BandhanBD</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-indigo-700 text-white py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-3xl font-bold mb-2">Browse Biodatas</h1>
            <p className="text-indigo-200">
              {totalItems > 0 ? `Showing ${totalItems} verified profiles` : "Find your perfect match"}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-6">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg shadow-sm text-sm font-medium"
          >
            <FaFilter size={14} />
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Filter Sidebar */}
          <aside className={`lg:w-64 shrink-0 ${showFilter ? "block" : "hidden"} lg:block`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          {/* Biodata Grid */}
          <div className="flex-1">
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <div className="text-center py-20 text-red-500">Failed to load biodatas. Please try again.</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {biodatas.length > 0 ? (
                    biodatas.map((biodata) => (
                      <div
                        key={biodata._id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-44 bg-gradient-to-br from-indigo-50 to-purple-50">
                          <img
                            src={biodata.profileImage || `https://ui-avatars.com/api/?name=${biodata.name}&size=200&background=e0e7ff&color=4f46e5`}
                            alt={biodata.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 left-3 bg-white/90 text-xs font-bold text-gray-700 px-2.5 py-1 rounded-full">
                            ID #{biodata.biodataId}
                          </span>
                          <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
                            biodata.biodataType === "Male"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-pink-100 text-pink-700"
                          }`}>
                            {biodata.biodataType}
                          </span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 mb-2">{biodata.name}</h3>
                          <div className="space-y-1 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-2">
                              <FaUser size={11} className="text-indigo-400" />
                              <span>Age {biodata.age}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt size={11} className="text-indigo-400" />
                              <span>{biodata.permanentDivision}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaBriefcase size={11} className="text-indigo-400" />
                              <span>{biodata.occupation}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleViewProfile(biodata._id)}
                            className="w-full py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                      <FaSearch className="mx-auto text-gray-300 mb-3" size={40} />
                      <p className="text-gray-500 font-medium">No biodatas match your filters.</p>
                      <button onClick={handleReset} className="mt-4 text-indigo-600 text-sm underline">
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                      {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        ‹
                      </button>
                      {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium ${
                              currentPage === page
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      {totalPages > 7 && <span className="px-2 text-gray-400">...</span>}
                      {totalPages > 7 && (
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50`}
                        >
                          {totalPages}
                        </button>
                      )}
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BiodatasPage;