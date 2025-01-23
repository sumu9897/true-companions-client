import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Import trash icon
import { FiLoader } from "react-icons/fi"; // Loading icon
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FavouriteBiodata = () => {
  const [favorites, setFavorites] = useState([]);
  const [biodatas, setBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchFavoritesAndBiodatas = async () => {
      try {
        // Fetch the user's favorite biodata IDs
        const favoritesRes = await axiosSecure.get("/favorites");
        setFavorites(favoritesRes.data);

        // Fetch all biodatas
        const biodatasRes = await axiosSecure.get("/biodatas");
        setBiodatas(biodatasRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesAndBiodatas();
  }, [axiosSecure]);

  const handleDeleteFavorite = async (biodataId) => {
    try {
      await axiosSecure.delete(`/favorites/${biodataId}`);
      toast.success("Favorite deleted successfully");
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.biodataId !== biodataId)
      );
    } catch (error) {
      toast.error(
        `Failed to delete favorite: ${error.response?.data?.message || error.message}`
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FiLoader className="animate-spin text-4xl text-gray-600" />
        <span className="ml-3 text-lg font-bold text-gray-600">Loading...</span>
      </div>
    );
  }

  if (!favorites.length || !biodatas.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-lg text-gray-600">
          {biodatas.length
            ? "You have no favorite biodatas."
            : "No biodatas available."}
        </p>
      </div>
    );
  }

  const mappedFavorites = favorites.map((favorite) => {
    const biodata = biodatas.find((b) => b._id === favorite.biodataId);
    return { ...favorite, ...biodata };
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Favorites</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                Biodata ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                Permanent Address
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
                Occupation
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mappedFavorites.map((favorite) => (
              <tr key={favorite.biodataId} className="hover:bg-gray-100">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {favorite.name || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {favorite.biodataId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {favorite.permanentDivision || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {favorite.occupation || "N/A"}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDeleteFavorite(favorite.biodataId)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <FaTrashAlt className="inline mr-2" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavouriteBiodata;
