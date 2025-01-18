import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ViewBioData = () => {
  const { id } = useParams(); // Assume `id` comes from the route
  const [bioData, setBioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBioData = async () => {
      try {
        const { data } = await axiosSecure.get(`/biodata/${id}`);
        setBioData(data);
      } catch (err) {
        setError("Failed to load biodata.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBioData();
  }, [id, axiosSecure]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!bioData) {
    return <p>No biodata found!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Biodata Details</h1>
      <div className="space-y-4">
        <div>
          <strong>Biodata Type:</strong> {bioData.biodataType}
        </div>
        <div>
          <strong>Name:</strong> {bioData.name}
        </div>
        <div>
          <strong>Date of Birth:</strong> {bioData.dob}
        </div>
        <div>
          <strong>Age:</strong> {bioData.age}
        </div>
        <div>
          <strong>Height:</strong> {bioData.height}
        </div>
        <div>
          <strong>Weight:</strong> {bioData.weight}
        </div>
        <div>
          <strong>Occupation:</strong> {bioData.occupation}
        </div>
        <div>
          <strong>Race:</strong> {bioData.race}
        </div>
        <div>
          <strong>Father's Name:</strong> {bioData.fatherName}
        </div>
        <div>
          <strong>Mother's Name:</strong> {bioData.motherName}
        </div>
        <div>
          <strong>Permanent Division:</strong> {bioData.permanentDivision}
        </div>
        <div>
          <strong>Present Division:</strong> {bioData.presentDivision}
        </div>
        <div>
          <strong>Expected Partner Age:</strong> {bioData.expectedPartnerAge}
        </div>
        <div>
          <strong>Expected Partner Height:</strong> {bioData.expectedPartnerHeight}
        </div>
        <div>
          <strong>Expected Partner Weight:</strong> {bioData.expectedPartnerWeight}
        </div>
        <div>
          <strong>Mobile Number:</strong> {bioData.mobileNumber}
        </div>
        <div>
          <strong>Profile Image:</strong>
          <img
            src={bioData.profileImage}
            alt="Profile"
            className="mt-2 w-32 h-32 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewBioData;
