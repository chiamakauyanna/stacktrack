// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const StatsHeader = ({ averageProgress }) => (
  <motion.section
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 bg-white p-6 rounded-3xl shadow-sm"
  >
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">
        Project Analytics Overview
      </h1>
      <p className="text-gray-600 text-sm mt-2">
        Monitor project and task performance in real time
      </p>
    </div>

    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="text-gray-200"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-primary"
          strokeWidth="2"
          strokeDasharray={`${averageProgress}, 100`}
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-xl font-bold text-navy">{averageProgress}%</span>
        <p className="text-xs text-gray-500">Avg Progress</p>
      </div>
    </div>
  </motion.section>
);

export default StatsHeader;
