import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ViewBioData = () => {
  const [biodataList, setBiodataList] = useState([]);
  const [selectedBiodata, setSelectedBiodata] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const response = await axiosSecure.get("/biodata");
        setBiodataList(response.data);
      } catch (error) {
        console.error("Error fetching biodata:", error);
      }
    };

    fetchBiodata();
  }, [axiosSecure]);

  const handleMakePremium = (biodata) => {
    setSelectedBiodata(biodata);
  };

  const confirmPremium = async () => {
    try {
      const response = await axiosSecure.post(`/biodata/premium`, {
        biodataId: selectedBiodata.biodataId,
      });
      if (response.status === 200) {
        Swal.fire("Success", "Your biodata is sent for premium approval!", "success");
      }
      setSelectedBiodata(null);
    } catch (error) {
      Swal.fire("Error", "Failed to send for premium approval.", "error");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Your Biodata</h1>
      <div className="space-y-6">
        {biodataList.map((biodata) => (
          <div key={biodata.biodataId} className="p-4 border rounded-md shadow-sm">
            <div className="flex items-center space-x-4">
              <img
                src={biodata.profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-bold">{biodata.name}</h2>
                <p>{biodata.occupation}</p>
                <p>{biodata.mobileNumber}</p>
              </div>
            </div>
            <button
              onClick={() => handleMakePremium(biodata)}
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
            >
              Make Premium
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBiodata && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Make Premium</h2>
            <p>Are you sure you want to make this biodata premium?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedBiodata(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmPremium}
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
              >
                Yes, Make Premium
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBioData;
