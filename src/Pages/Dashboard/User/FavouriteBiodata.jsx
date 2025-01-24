import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useFavorite from "../../../hooks/useFavorite";

const FavouriteBiodata = () => {
  const [favorite, refetch] = useFavorite();
  const [loading, setLoading] = useState(true); 
  const axiosSecure = useAxiosSecure(); 

  // Handle delete favorite
  const handleDeleteFavorite = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/favorites/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your favorite has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            toast.error("Error deleting favorite!");
            console.error(error);
          });
      }
    });
  };

  // Wait for data loading
  useEffect(() => {
    if (favorite.length > 0) {
      setLoading(false);
    }
  }, [favorite]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FiLoader className="animate-spin text-4xl text-gray-600" />
        <span className="ml-3 text-lg font-bold text-gray-600">Loading...</span>
      </div>
    );
  }

  if (favorite.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-lg text-gray-600">You have no favorite biodatas.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Favorites</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Biodata ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">Occupation</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {favorite.map((fav) => (
              <tr key={fav._id}>
                <td className="px-6 py-4 text-sm text-gray-900">{fav.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{fav.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{fav.occupation || "N/A"}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDeleteFavorite(fav._id)}
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
