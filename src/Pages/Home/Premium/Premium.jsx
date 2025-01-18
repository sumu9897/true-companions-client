import React, { useState, useEffect } from 'react';

const Premium = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Fetch premium member data
    fetch('/api/premium-profiles') // Replace with actual API route
      .then(res => res.json())
      .then(data => setProfiles(data));
  }, []);

  return (
    <div className="premium-section">
      <h2 className="text-2xl font-bold text-center">Premium Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {profiles.map(profile => (
          <div key={profile.id} className="card">
            <img src={profile.image} alt={profile.name} className="rounded-md" />
            <div className="card-body">
              <h3>{profile.name}</h3>
              <p>Division: {profile.division}</p>
              <p>Age: {profile.age}</p>
              <button className="btn">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
