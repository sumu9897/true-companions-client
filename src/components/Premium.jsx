import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const [profiles, setProfiles] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch premium profiles where premiumStatus is 'approved'
    fetch(`/premium-profiles?order=${sortOrder}`)
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((err) => console.error("Error fetching profiles:", err));
  }, [sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleViewProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="premium-section px-4 py-8">
      <h2 className="text-2xl font-bold text-center">Premium Members</h2>

      {/* Dropdown for sorting */}
      <div className="flex justify-end mt-4">
        <label htmlFor="sortOrder" className="mr-2">
          Sort by Age:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
          className="border p-2 rounded-md"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            className="card border p-4 rounded-md shadow-lg"
          >
            <img
              src={profile.profileImage || "https://via.placeholder.com/150"}
              alt={`Profile of ${profile.biodataId}`}
              className="rounded-md w-full h-40 object-cover"
            />
            <div className="card-body mt-4">
              <h3 className="text-lg font-bold">{`Biodata ID: ${profile.biodataId}`}</h3>
              <p>Biodata Type: {profile.biodataType}</p>
              <p>Division: {profile.permanentDivision}</p>
              <p>Age: {profile.age}</p>
              <p>Occupation: {profile.occupation}</p>
              <button
                className="btn bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
                onClick={() => handleViewProfile(profile._id)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
