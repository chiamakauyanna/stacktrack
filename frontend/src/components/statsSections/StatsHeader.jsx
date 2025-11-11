// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const StatsHeader = () => (
  <motion.section
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className=""
  >
    <div>
      <h1 className="text-2xl font-bold text-navy mb-4">
        Project Analytics Overview
      </h1>
      <p className="text-gray-600 text-sm">
        Monitor project and task performance in real time
      </p>
    </div>
  </motion.section>
);

export default StatsHeader;
