import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaCheckCircle, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

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

const ApprovedContactReq = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["all-contact-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contact-requests");
      return res.data;
    },
  });

  const handleApprove = async (req) => {
    const result = await Swal.fire({
      title: "Approve Contact Request?",
      text: `This will reveal contact details for Biodata #${req.biodataId} to ${req.requesterEmail}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      confirmButtonText: "Yes, approve",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/contact-requests/${req._id}/approve`);
        queryClient.invalidateQueries(["all-contact-requests"]);
        Swal.fire({
          icon: "success",
          title: "Request Approved!",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to approve",
          text: error.response?.data?.message || "Please try again.",
        });
      }
    }
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <>
      <Helmet>
        <title>Contact Requests — BandhanBD Admin</title>
      </Helmet>

      <div>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Requests</h1>
            <p className="text-gray-500 text-sm mt-1">
              {pendingCount > 0
                ? `${pendingCount} request${pendingCount > 1 ? "s" : ""} awaiting approval`
                : "All requests have been processed"}
            </p>
          </div>
          {pendingCount > 0 && (
            <span className="bg-amber-100 text-amber-700 text-sm font-bold px-3 py-1.5 rounded-full">
              {pendingCount} Pending
            </span>
          )}
        </div>

        {isLoading ? (
          <Loading />
        ) : requests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <FaEnvelope className="mx-auto text-gray-200 mb-4" size={48} />
            <h3 className="text-lg font-bold text-gray-800 mb-2">No Contact Requests</h3>
            <p className="text-gray-500 text-sm">Contact requests will appear here when users make payments.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    {["Requester", "Biodata ID", "Amount Paid", "Status", "Requested On", "Action"].map((h) => (
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
                      <td className="px-5 py-4 text-sm text-gray-700">{req.requesterEmail}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">#{req.biodataId}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-emerald-600">
                        ${req.amountPaid ?? 5}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4">
                        {req.status === "pending" ? (
                          <button
                            onClick={() => handleApprove(req)}
                            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                          >
                            <FaCheckCircle size={12} /> Approve
                          </button>
                        ) : (
                          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                            <FaCheckCircle size={12} /> Approved
                          </span>
                        )}
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

export default ApprovedContactReq;