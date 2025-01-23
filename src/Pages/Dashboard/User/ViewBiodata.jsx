import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../Components/Loading';
import { toast } from 'react-toastify';

const ViewBiodata = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [biodata, setBiodata] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const res = await axiosSecure.get(`/biodatas/${user.email}`);
        setBiodata(res.data);
      } catch (error) {
        console.error('Error fetching biodata:', error);
        toast.error('Failed to fetch biodata. Please try again.');
      }
    };
    fetchBiodata();
  }, [user?.email, axiosSecure]);

  const handlePremiumRequest = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.post(`/biodatas/premium-request`, {
        email: user.email,
      });
      if (res.data.success) {
        toast.success('Premium request sent successfully!');
        // Update biodata status to "Pending"
        setBiodata((prev) => ({
          ...prev,
          premiumStatus: 'pending',
        }));
      } else {
        toast.error(res.data.message || 'Failed to send premium request.');
      }
    } catch (error) {
      console.error('Error sending premium request:', error);
      toast.error('Failed to send premium request.');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  if (!biodata) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Biodata</h1>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <img
            src={biodata.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="space-y-2 text-sm sm:text-base">
            <p>
              <strong>Name:</strong> {biodata.name}
            </p>
            <p>
              <strong>Email:</strong> {biodata.email}
            </p>
            <p>
              <strong></strong>
            </p>
            <p>
              <strong>Premium Status:</strong>{' '}
              <span
                className={`font-bold ${
                  biodata.premiumStatus === 'approved'
                    ? 'text-green-600'
                    : biodata.premiumStatus === 'pending'
                    ? 'text-yellow-600'
                    : 'text-gray-600'
                }`}
              >
                {biodata.premiumStatus || 'Not Premium'}
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          {biodata.premiumStatus === 'approved' ? (
            <button
              disabled
              className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md"
            >
              Premium Approved
            </button>
          ) : biodata.premiumStatus === 'pending' ? (
            <button
              disabled
              className="bg-yellow-500 text-white px-6 py-2 rounded-md shadow-md"
            >
              Request Pending
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-indigo-700 transition"
            >
              Request Premium
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Make Biodata Premium</h2>
            <p>Are you sure you want to request to make your biodata premium?</p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePremiumRequest}
                disabled={loading}
                className={`px-4 py-2 text-white rounded-md transition ${
                  loading
                    ? 'bg-indigo-400'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {loading ? 'Sending...' : 'Yes, Request Premium'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBiodata;
