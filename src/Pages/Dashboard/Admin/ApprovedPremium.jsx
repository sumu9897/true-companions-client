import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../../Components/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const ApprovedPremium = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchPendingRequests = async () => {
      setLoading(true);
      try {

        const res = await axiosSecure.get(`/admin/biodatas`);
        setUsers(res.data.biodatas);
      } catch (error) {
        console.error('Error fetching biodatas:', error);
        toast.error('Failed to fetch biodata requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleMakePremium = async (biodataId) => {
    console.log('Approving biodata with ID:', biodataId);

    try {
      const res = await axiosSecure.post(`/admin/biodatas/${biodataId}/approve`);
      if (res.data.success) {
        toast.success(`Biodata with ID ${biodataId} marked as premium!`);
        setUsers(users.filter((user) => user.biodataId !== biodataId));
      } else {
        toast.error('Failed to approve biodata.');
      }
    } catch (error) {
      console.error('Error making premium:', error);
      toast.error('Error marking biodata as premium.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Approve Premium Requests</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Biodata ID</th>
              <th className="border p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.biodataId} className="hover:bg-gray-50">
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.biodataId}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleMakePremium(user.biodataId)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No pending premium requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovedPremium;
