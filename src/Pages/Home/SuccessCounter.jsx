import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Loading";

const SuccessCounter = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch statistics
  const { data: stats = {}, isLoading, isError } = useQuery({
    queryKey: ["success-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/success-stats", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center text-red-500">
        Failed to load statistics. Please try again later.
      </div>
    );

  return (
    <div className=" py-12">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-700">Our Achievements</h2>
          <p className="mt-4 text-lg text-gray-600">
            We’re proud of our growing community and the success we’ve achieved
            together. Here are some of our milestones:
          </p>
        </div>

        {/* Success Counters */}
        <div className="flex justify-center space-x-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-4xl font-bold text-indigo-600">
              {stats.totalBiodata || 0}+
            </h3>
            <p className="text-lg text-gray-700 mt-2">Total Biodata</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-4xl font-bold text-blue-600">
              {stats.maleBiodata || 0}+
            </h3>
            <p className="text-lg text-gray-700 mt-2">Male Biodata</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-4xl font-bold text-pink-600">
              {stats.femaleBiodata || 0}+
            </h3>
            <p className="text-lg text-gray-700 mt-2">Female Biodata</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-4xl font-bold text-green-600">
              {stats.marriagesCompleted || 0}+
            </h3>
            <p className="text-lg text-gray-700 mt-2">Marriages Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCounter;
