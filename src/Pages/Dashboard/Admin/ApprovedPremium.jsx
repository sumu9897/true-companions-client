import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaCheckCircle, FaCrown } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const ApprovedPremium = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["premium-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/premium-requests");
      return res.data;
    },
  });

  const handleApprove = async (biodata) => {
    const result = await Swal.fire({
      title: `Approve Premium for ${biodata.name}?`,
      text: "This user's biodata will be marked as Premium.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      confirmButtonText: "Yes, approve",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/admin/biodatas/${biodata._id}/approve-premium`);
        queryClient.invalidateQueries(["premium-requests"]);
        Swal.fire({
          icon: "success",
          title: "Premium Approved!",
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

  return (
    <>
      <Helmet>
        <title>Approve Premium Requests — BandhanBD Admin</title>
      </Helmet>

      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Premium Requests</h1>
          <p className="text-gray-500 text-sm mt-1">
            Review and approve users requesting premium biodata status.
          </p>
        </div>

        {isLoading ? (
          <Loading />
        ) : requests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <FaCrown className="mx-auto text-gray-200 mb-4" size={48} />
            <h3 className="text-lg font-bold text-gray-800 mb-2">No Pending Requests</h3>
            <p className="text-gray-500 text-sm">All premium requests have been processed.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    {["Profile", "Biodata ID", "Email", "Requested On", "Action"].map((h) => (
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
                  {requests.map((biodata) => (
                    <tr key={biodata._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={biodata.profileImage || `https://ui-avatars.com/api/?name=${biodata.name}&size=36&background=fef3c7&color=d97706`}
                            alt={biodata.name}
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                          <span className="font-semibold text-gray-900 text-sm">{biodata.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">#{biodata.biodataId}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{biodata.email}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {biodata.premiumRequestDate
                          ? new Date(biodata.premiumRequestDate).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleApprove(biodata)}
                          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                        >
                          <FaCheckCircle size={12} /> Approve Premium
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

export default ApprovedPremium;