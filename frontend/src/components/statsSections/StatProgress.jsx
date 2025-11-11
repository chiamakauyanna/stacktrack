// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const StatsProgress = ({ averageProgress }) => (
  <motion.section
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-surface flex rounded-2xl items-center justify-center"
  >
    <div className="relative w-48 h-48 flex items-center justify-center mt-12 mb-2">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="text-gray-200"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-[#22c55e]"
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

export default StatsProgress;
