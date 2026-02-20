import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import {
  FaUsers, FaMars, FaVenus, FaCrown, FaDollarSign,
} from "react-icons/fa";

const KPICard = ({ icon: Icon, label, value, color, bg }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
    <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
      <Icon className={color} size={22} />
    </div>
    <div>
      <p className="text-2xl font-extrabold text-gray-900">{value?.toLocaleString() ?? "—"}</p>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
    </div>
  </div>
);

const COLORS = ["#4f46e5", "#ec4899", "#f59e0b"];

const DashboardPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const pieData = [
    { name: "Male", value: stats.maleCount || 0 },
    { name: "Female", value: stats.femaleCount || 0 },
    { name: "Premium", value: stats.premiumCount || 0 },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — BandhanBD</title>
      </Helmet>

      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Platform overview and key metrics.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
          <KPICard icon={FaUsers} label="Total Biodata" value={stats.biodataCount} color="text-indigo-600" bg="bg-indigo-100" />
          <KPICard icon={FaMars} label="Male Profiles" value={stats.maleCount} color="text-blue-600" bg="bg-blue-100" />
          <KPICard icon={FaVenus} label="Female Profiles" value={stats.femaleCount} color="text-pink-600" bg="bg-pink-100" />
          <KPICard icon={FaCrown} label="Premium Profiles" value={stats.premiumCount} color="text-amber-600" bg="bg-amber-100" />
          <KPICard icon={FaDollarSign} label="Total Revenue" value={`$${stats.revenue ?? 0}`} color="text-emerald-600" bg="bg-emerald-100" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-5">Biodata Distribution</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={55}
                  paddingAngle={4}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-5">Platform Summary</h2>
            <div className="space-y-3">
              {[
                { label: "Total Biodata", value: stats.biodataCount, bar: stats.biodataCount, max: stats.biodataCount, color: "bg-indigo-500" },
                { label: "Male Profiles", value: stats.maleCount, bar: stats.maleCount, max: stats.biodataCount, color: "bg-blue-500" },
                { label: "Female Profiles", value: stats.femaleCount, bar: stats.femaleCount, max: stats.biodataCount, color: "bg-pink-500" },
                { label: "Premium Profiles", value: stats.premiumCount, bar: stats.premiumCount, max: stats.biodataCount, color: "bg-amber-500" },
              ].map(({ label, value, bar, max, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-semibold text-gray-900">{value ?? 0}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-700`}
                      style={{ width: max ? `${Math.round((bar / max) * 100)}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">Total Revenue</span>
              <span className="text-2xl font-extrabold text-emerald-600">
                ${stats.revenue ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;