import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const StatusBadge = ({ status }) => {
  const styles = {
    approved: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

const MyContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["my-contact-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contact-requests/mine");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/contact-requests/${id}`);
        queryClient.invalidateQueries(["my-contact-requests"]);
        Swal.fire({ icon: "success", title: "Deleted!", timer: 1200, showConfirmButton: false });
      } catch {
        Swal.fire({ icon: "error", title: "Failed to delete request." });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>My Contact Requests — BandhanBD</title>
      </Helmet>

      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Contact Requests</h1>
          <p className="text-gray-500 text-sm mt-1">
            Track your contact information requests. Approved requests reveal the profile's contact details.
          </p>
        </div>

        {isLoading ? (
          <Loading />
        ) : requests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-5xl mb-4">📬</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No Requests Yet</h3>
            <p className="text-gray-500 text-sm">
              Browse biodatas and request contact information to start connecting.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    {["Name", "Biodata ID", "Status", "Mobile", "Email", ""].map((h) => (
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
                  {requests.map((req) => (
                    <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                        {req.biodataName || "—"}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">#{req.biodataId}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {req.status === "approved" && req.mobileNumber ? (
                          <span className="flex items-center gap-1.5">
                            <FaPhone size={11} className="text-emerald-500" />
                            {req.mobileNumber}
                          </span>
                        ) : (
                          <span className="text-gray-300">Hidden</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {req.status === "approved" && req.contactEmail ? (
                          <span className="flex items-center gap-1.5">
                            <FaEnvelope size={11} className="text-emerald-500" />
                            {req.contactEmail}
                          </span>
                        ) : (
                          <span className="text-gray-300">Hidden</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete request"
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

export default MyContactRequest;