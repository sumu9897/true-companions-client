import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaCrown } from "react-icons/fa";

const Premium = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: profiles = [], isLoading, isError } = useQuery({
    queryKey: ["premium-profiles", sortOrder],
    queryFn: async () => {
      const res = await axiosPublic.get("/biodatas/premium", {
        params: { order: sortOrder },
      });
      return res.data;
    },
  });

  const handleViewProfile = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/biodata/${id}`);
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load premium profiles.
      </div>
    );

  return (
    <section className="py-16 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FaCrown className="text-yellow-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Premium Profiles
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Members</h2>
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          >
            <option value="asc">Age: Low to High</option>
            <option value="desc">Age: High to Low</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Profile Image */}
                <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                  <img
                    src={profile.profileImage || `https://ui-avatars.com/api/?name=${profile.name}&size=200&background=e0e7ff&color=4f46e5`}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <FaCrown size={10} /> Premium
                  </span>
                  <span className="absolute bottom-3 left-3 bg-white/90 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    ID #{profile.biodataId}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-3">{profile.name}</h3>
                  <div className="space-y-1.5 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <FaUser size={12} className="text-indigo-400 shrink-0" />
                      <span>{profile.biodataType} · Age {profile.age}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt size={12} className="text-indigo-400 shrink-0" />
                      <span>{profile.permanentDivision}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBriefcase size={12} className="text-indigo-400 shrink-0" />
                      <span>{profile.occupation}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewProfile(profile._id)}
                    className="w-full py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-12">
              No premium profiles available yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Premium;