import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyContactRequest = () => {
    const [contactRequests, setContactRequests] = useState([]);
    const axiosSecure = useAxiosSecure();
  
    // Fetch contact requests from the server
    useEffect(() => {
      const fetchContactRequests = async () => {
        try {
          const { data } = await axiosSecure.get("/contact-requests");
          setContactRequests(data);
        } catch (error) {
          console.error("Error fetching contact requests:", error);
        }
      };
  
      fetchContactRequests();
    }, [axiosSecure]);
  
    // Handle delete request
    const handleDelete = async (id) => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        });
  
        if (result.isConfirmed) {
          const response = await axiosSecure.delete(`/contact-requests/${id}`);
          if (response.status === 200) {
            setContactRequests((prevRequests) =>
              prevRequests.filter((request) => request._id !== id)
            );
            Swal.fire("Deleted!", "The contact request has been deleted.", "success");
          }
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the contact request.", "error");
      }
    };
  
    return (
      <div className="max-w-6xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Contact Requests</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Biodata ID</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Mobile No</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {contactRequests.length > 0 ? (
                contactRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="border border-gray-300 px-4 py-2">{request.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{request.biodataId}</td>
                    <td
                      className={`border border-gray-300 px-4 py-2 ${
                        request.status === "Approved" ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {request.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.status === "Approved" ? request.mobileNumber : "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {request.status === "Approved" ? request.email : "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(request._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                  >
                    No contact requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

export default MyContactRequest
