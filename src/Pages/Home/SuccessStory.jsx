import { useQuery } from "@tanstack/react-query";
import { FaStar, FaHeart } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading";

const SuccessStory = () => {
  const axiosPublic = useAxiosPublic();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["success-stories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/success-stories");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (!stories.length) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500">No success stories yet. Be the first!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaHeart className="text-rose-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-500">
              Success Stories
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Happy Couples</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Read heartwarming stories from couples who found each other through
            BandhanBD and built beautiful lives together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={story.coupleImage || "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=250&fit=crop"}
                alt="Couple"
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-500">
                    {new Date(story.marriageDate).toLocaleDateString("en-BD", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={13}
                        className={i < story.reviewStar ? "text-yellow-400" : "text-gray-200"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                  {story.successStory}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStory;