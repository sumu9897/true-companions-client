import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SuccessStory = () => {
  const axiosSecure = useAxiosSecure();
  const [successStories, setSuccessStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await axiosSecure.get("/successStory?sortBy=marriageDate");
        setSuccessStories(response.data);
      } catch (error) {
        console.error("Error fetching success stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuccessStories();
  }, [axiosSecure]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading success stories...</p>;
  }

  if (!successStories.length) {
    return <p className="text-center text-gray-500">No success stories yet.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Our Happy Couples
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {successStories.map((story) => (
          <div key={story._id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={story.coupleImage || "/default-couple.png"} // Fallback image
              alt="Couple"
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Marriage Date: {new Date(story.marriageDate).toLocaleDateString()}
              </h3>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < story.reviewStar ? "text-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-2">{story.successStory}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStory;
