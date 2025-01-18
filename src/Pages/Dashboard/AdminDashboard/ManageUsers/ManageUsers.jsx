import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users",{
        headers: {
            authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
      });
      return res.data;
    },
  });
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
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
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      Manage User
      <div>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="pl-4">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Member Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th className="pl-4">{index + 1}</th>
                <td className="pl-8">{user.name}</td>
                <td>{user.email}</td>
                <td className="text-center">
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-primary btn-lg"
                      disabled={user.role === "admin"} // Disable button if user is admin
                    >
                      <FaUsers className="text-white rounded-lg text-4xl p-2"></FaUsers>
                    </button>
                  )}
                </td>
                <td></td>
                <td className="text-center">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg"
                    disabled={user.role === "admin"} // Disable button if user is admin
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
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
