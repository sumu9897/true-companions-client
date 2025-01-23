import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const BiodataDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [biodata, setBiodata] = useState(null);
  const [similarBiodatas, setSimilarBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchBiodataDetails = async () => {
      try {
        const res = await axiosSecure.get(`/biodata/${id}`);
        setBiodata(res.data);
    
        const similarRes = await axiosSecure.get("/biodatas", {
          params: { type: res.data.biodataType },
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
    
        console.log("Similar biodatas response:", similarRes.data);
    
        if (Array.isArray(similarRes.data.biodatas)) {
          setSimilarBiodatas(similarRes.data.biodatas.slice(0, 3));
        } else {
          console.error(
            "Unexpected response format for similar biodatas:",
            similarRes.data
          );
          setSimilarBiodatas([]);
        }
    
        const userRes = await axiosSecure.get("/user/me", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setIsPremium(userRes.data.isPremium || false);
      } catch (error) {
        console.error("Error fetching biodata details:", error.response || error.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchBiodataDetails();
  }, [id, axiosSecure]);

  const handleAddToFavorites = async () => {
    try {
      await axiosSecure.post(`/favorites`, { id });
      Swal.fire("Success!", "Biodata added to favorites.", "success");
      setIsFavorite(true); 
    } catch (error) {
      Swal.fire("Error", "Alreay you add to favorites.", "error");
    }
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (!biodata) {
    return (
      <div className="text-center text-lg text-red-500">Biodata not found.</div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Biodata Details</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img
            src={biodata.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{biodata.name}</h3>
          <p className="text-gray-600">
            <strong>Type:</strong> {biodata.biodataType}
          </p>
          <p className="text-gray-600">
            <strong>Age:</strong> {biodata.age}
          </p>
          <p className="text-gray-600">
            <strong>Occupation:</strong> {biodata.occupation}
          </p>
          {isPremium ? (
            <>
              <p className="text-gray-600">
                <strong>Email:</strong> {biodata.email}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {biodata.phone}
              </p>
            </>
          ) : (
            <button
              onClick={handleRequestContact}
              className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-lg"
            >
              Request Contact Information
            </button>
          )}
          <button
            onClick={handleAddToFavorites}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
            disabled={isFavorite}
          >
            {isFavorite ? "Added to Favorites" : "Add to Favorites"}{" "}
            {/* Change button text */}
          </button>
        </div>
      </div>

      <h3 className="text-2xl font-bold mt-12 mb-6">Similar Biodatas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarBiodatas.length > 0 ? (
          similarBiodatas.map((similar) => (
            <div
              key={similar._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <img
                src={similar.profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h4 className="text-lg font-semibold">{similar.name}</h4>
              <p className="text-gray-600">
                <strong>Age:</strong> {similar.age}
              </p>
              <p className="text-gray-600">
                <strong>Occupation:</strong> {similar.occupation}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No similar biodatas found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BiodataDetails;
