import { Helmet } from "react-helmet-async";
import { useQueryClient } from "@tanstack/react-query";
import { FaTrashAlt, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useFavorite from "../../../hooks/useFavorite";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";

const FavouriteBiodata = () => {
  const [favourites, refetch, isLoading] = useFavorite();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Remove from Favourites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/favourites/${id}`);
        refetch();
        queryClient.invalidateQueries(["favourites"]);
        Swal.fire({ icon: "success", title: "Removed!", timer: 1200, showConfirmButton: false });
      } catch {
        Swal.fire({ icon: "error", title: "Failed to remove favourite." });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>My Favourites — BandhanBD</title>
      </Helmet>

      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Favourite Biodatas</h1>
          <p className="text-gray-500 text-sm mt-1">
            Profiles you have saved for later review.
          </p>
        </div>

        {isLoading ? (
          <Loading />
        ) : favourites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-5xl mb-4">💝</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No Favourites Yet</h3>
            <p className="text-gray-500 text-sm mb-6">
              Browse biodatas and add profiles you like to your favourites.
            </p>
            <button
              onClick={() => navigate("/biodatapage")}
              className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
            >
              Browse Biodatas
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    {["Profile", "Biodata ID", "Division", "Occupation", ""].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {favourites.map((fav) => (
                    <tr key={fav._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={fav.profileImage || `https://ui-avatars.com/api/?name=${fav.name}&size=40&background=e0e7ff&color=4f46e5`}
                            alt={fav.name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <span className="font-semibold text-gray-900 text-sm">{fav.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        #{fav.biodataId || "—"}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <FaMapMarkerAlt size={11} className="text-indigo-400" />
                          {fav.permanentDivision || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <FaBriefcase size={11} className="text-indigo-400" />
                          {fav.occupation || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleDelete(fav._id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove from favourites"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FavouriteBiodata;