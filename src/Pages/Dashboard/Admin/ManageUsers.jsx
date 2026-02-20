import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield, FaCrown, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const RoleBadge = ({ role }) => {
  const styles = {
    admin: "bg-emerald-100 text-emerald-700",
    premium: "bg-amber-100 text-amber-700",
    user: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${styles[role] || styles.user}`}>
      {role || "user"}
    </span>
  );
};

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    clearTimeout(window._searchTimer);
    window._searchTimer = setTimeout(() => setDebouncedSearch(e.target.value), 400);
  };

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: debouncedSearch ? { search: debouncedSearch } : {},
      });
      return res.data;
    },
  });

  const invalidate = () => queryClient.invalidateQueries(["users"]);

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Make ${user.name} an Admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      confirmButtonText: "Yes, make admin",
    }).then(async (r) => {
      if (r.isConfirmed) {
        await axiosSecure.patch(`/users/admin/${user._id}`);
        invalidate();
        Swal.fire({ icon: "success", title: `${user.name} is now Admin`, timer: 1400, showConfirmButton: false });
      }
    });
  };

  const handleMakePremium = (user) => {
    Swal.fire({
      title: `Grant Premium to ${user.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d97706",
      confirmButtonText: "Yes, grant premium",
    }).then(async (r) => {
      if (r.isConfirmed) {
        await axiosSecure.patch(`/users/premium/${user._id}`);
        invalidate();
        Swal.fire({ icon: "success", title: `${user.name} is now Premium!`, timer: 1400, showConfirmButton: false });
      }
    });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: `Delete ${user.name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
    }).then(async (r) => {
      if (r.isConfirmed) {
        await axiosSecure.delete(`/users/${user._id}`);
        invalidate();
        Swal.fire({ icon: "success", title: "User deleted", timer: 1400, showConfirmButton: false });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Manage Users — BandhanBD Admin</title>
      </Helmet>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
            <p className="text-gray-500 text-sm mt-1">
              {users.length} user{users.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search by name…"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-56"
            />
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    {["#", "User", "Email", "Role", "Actions"].map((h) => (
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
                  {users.map((user, i) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-sm text-gray-400">{i + 1}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}&size=36&background=e0e7ff&color=4f46e5`}
                            alt={user.name}
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                          <span className="font-semibold text-gray-900 text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="px-5 py-4">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {user.role !== "admin" && (
                            <button
                              onClick={() => handleMakeAdmin(user)}
                              title="Make Admin"
                              className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                            >
                              <FaUserShield size={14} />
                            </button>
                          )}
                          {user.role !== "premium" && user.role !== "admin" && (
                            <button
                              onClick={() => handleMakePremium(user)}
                              title="Make Premium"
                              className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                            >
                              <FaCrown size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(user)}
                            title="Delete User"
                            disabled={user.role === "admin"}
                            className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <FaTrashAlt size={14} />
                          </button>
                        </div>
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

export default ManageUsers;