import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers, FaCrown } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchTerm}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now an Admin!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakePremium = (user) => {
    axiosSecure.patch(`/users/premium/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now a Premium User!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Total Users: {users.length}
        </h2>
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded-lg border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                #
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">
                Role
              </th>
              <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="py-3 px-4 text-sm text-gray-700">{index + 1}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{user.name}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>
                <td className="py-3 px-4 text-center">
                  {user.role === "admin" ? (
                    <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                      Admin
                    </span>
                  ) : user.role === "premium" ? (
                    <span className="px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-full">
                      Premium
                    </span>
                  ) : (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
                      >
                        <FaUsers className="text-white text-lg" />
                      </button>
                      <button
                        onClick={() => handleMakePremium(user)}
                        className="bg-yellow-500 text-white rounded-full p-2 hover:bg-yellow-600 transition"
                      >
                        <FaCrown className="text-white text-lg" />
                      </button>
                    </div>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="text-red-600 hover:text-red-800 transition"
                    disabled={user.role === "admin"}
                  >
                    <FaTrashAlt className="text-xl" />
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

export default ManageUsers;
