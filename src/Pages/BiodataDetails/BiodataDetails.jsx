import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BiodataDetails = () => {
  const { id } = useParams(); // Extract id from the URL
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [biodata, setBiodata] = useState(null);
  const [similarBiodatas, setSimilarBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false); // Check user premium status

  useEffect(() => {
    // Fetch biodata details
    const fetchBiodataDetails = async () => {
      try {
        const res = await axiosSecure.get(`/biodatas/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setBiodata(res.data);

        // Fetch similar biodatas
        const similarRes = await axiosSecure.get("/biodatas", {
          params: { type: res.data.biodataType },
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setSimilarBiodatas(similarRes.data.slice(0, 3));

        // Check user premium status
        const userRes = await axiosSecure.get("/user/me", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setIsPremium(userRes.data.isPremium || false);
      } catch (error) {
        console.error("Error fetching biodata details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBiodataDetails();
  }, [id, axiosSecure]);

  const handleAddToFavorites = async () => {
    try {
      await axiosSecure.post(
        `/favorites`,
        { biodataId: id },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      alert("Biodata added to favorites.");
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!biodata) {
    return <div>Biodata not found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Biodata Details</h2>
      <div className="border p-4 rounded shadow-md">
        <img
          src={biodata.profileImage || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <p><strong>Biodata ID:</strong> {biodata.biodataId}</p>
        <p><strong>Type:</strong> {biodata.biodataType}</p>
        <p><strong>Division:</strong> {biodata.permanentDivision}</p>
        <p><strong>Age:</strong> {biodata.age}</p>
        <p><strong>Occupation:</strong> {biodata.occupation}</p>
        {isPremium ? (
          <>
            <p><strong>Email:</strong> {biodata.email}</p>
            <p><strong>Phone:</strong> {biodata.phone}</p>
          </>
        ) : (
          <button
            onClick={handleRequestContact}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600"
          >
            Request Contact Information
          </button>
        )}
        <button
          onClick={handleAddToFavorites}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Add to Favorites
        </button>
      </div>

      <h3 className="text-lg font-bold mt-6 mb-4">Similar Biodatas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarBiodatas.map((similar) => (
          <div
            key={similar._id}
            className="border p-4 rounded shadow-md flex flex-col items-center"
          >
            <img
              src={similar.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <p><strong>Type:</strong> {similar.biodataType}</p>
            <p><strong>Division:</strong> {similar.permanentDivision}</p>
            <p><strong>Age:</strong> {similar.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiodataDetails;
