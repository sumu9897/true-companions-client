import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.ibb.co/G7RsbBQ/bgImage.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-indigo-900/60" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-4 sm:px-8 max-w-4xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block bg-indigo-600/80 text-indigo-100 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
        >
          Bangladesh's Most Trusted Matrimony Platform
        </motion.span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
          Find Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
            Life Partner
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          Connect with thousands of verified biodata profiles across all divisions
          of Bangladesh. Your journey to a meaningful life begins here.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              Get Started Free
            </motion.button>
          </Link>
          <Link to="/biodatapage">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-colors"
            >
              Browse Biodatas
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;