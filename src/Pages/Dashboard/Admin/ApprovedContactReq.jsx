import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApprovedContactReq = () => {
  const axiosSecure = useAxiosSecure(); 
  const [contactRequests, setContactRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the contact requests on component mount
  useEffect(() => {
    axiosSecure
      .get("/payments") 
      .then((response) => {
        setContactRequests(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch contact requests.");
        setLoading(false);
      });
  }, [axiosSecure]);

  const handleApprove = async (contactId) => {
    try {
      // Approve the contact request
      const response = await axiosSecure.post("/approve-contact", {
        contactId,
      });

      // If successful, show a success message
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Contact Request Approved",
          text: "The contact request has been approved successfully.",
          confirmButtonText: "OK",
        });

        // Update the state to reflect the approval
        setContactRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== contactId)
        );
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while approving the contact request.",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Approved Contact Requests</h2>

      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Biodata ID</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {contactRequests.map((request) => (
            <tr key={request._id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{request.name}</td>
              <td className="px-4 py-2 border">{request.email}</td>
              <td className="px-4 py-2 border">{request.biodataId}</td>
              <td className="px-4 py-2 border">
                <button
                  className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                  onClick={() => handleApprove(request._id)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedContactReq;
