import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const StatCard = ({ value, label, color }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-md transition-shadow">
    <p className={`text-5xl font-extrabold ${color} mb-2`}>
      <CountUp end={value} duration={2.5} separator="," />+
    </p>
    <p className="text-gray-600 font-medium">{label}</p>
  </div>
);

const SuccessCounter = () => {
  const axiosPublic = useAxiosPublic();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["biodatas-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/biodatas/stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-36 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Our Impact
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Trusted by Thousands
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Real numbers that reflect the journeys of real people who found their
            life partners through BandhanBD.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard value={stats.totalBiodata || 0} label="Total Biodata" color="text-indigo-600" />
          <StatCard value={stats.maleBiodata || 0} label="Male Profiles" color="text-blue-600" />
          <StatCard value={stats.femaleBiodata || 0} label="Female Profiles" color="text-pink-600" />
          <StatCard value={stats.marriagesCompleted || 0} label="Marriages Completed" color="text-emerald-600" />
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;