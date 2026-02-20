import { FaUserEdit, FaSearch, FaEnvelope, FaHeart } from "react-icons/fa";

const steps = [
  {
    icon: FaUserEdit,
    title: "Create Your Biodata",
    description:
      "Register and fill out your personal biodata with details about yourself, your family, and what you are looking for in a life partner.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: FaSearch,
    title: "Browse & Filter",
    description:
      "Search through thousands of verified biodata profiles using filters for age, division, and gender to find your ideal match.",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: FaEnvelope,
    title: "Request Contact Info",
    description:
      "When you find a promising match, request their contact information through our secure, admin-verified contact request system.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: FaHeart,
    title: "Begin Your Journey",
    description:
      "Connect with your chosen match through their verified contact details and take the first steps toward a lifelong companionship.",
    color: "bg-emerald-100 text-emerald-600",
  },
];

const Works = () => {
  return (
    <section className="py-16 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            How It Works
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Your Path to Finding the Right Partner
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Our simple four-step process is designed to help you find a
            meaningful connection with complete safety and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center"
            >
              <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <step.icon size={24} />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Step {index + 1}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/signup"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
          >
            Create Your Biodata Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Works;