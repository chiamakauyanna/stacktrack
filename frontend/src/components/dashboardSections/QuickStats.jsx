// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const QuickStats = ({ summary, fadeUp }) => {
  const stats = [
    { label: "Active", value: summary.active_projects || 0 },
    { label: "Completed", value: summary.completed_projects || 0 },
    { label: "Drafts", value: summary.draft_projects || 0 },
    { label: "Avg Progress", value: `${summary.average_project_progress || 0}%` },
  ];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={4}
      className="bg-app-surface rounded-2xl p-5 shadow"
    >
      <h2 className="text-lg font-semibold text-landing-navy mb-4">
        Quick Stats
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-gray-50 text-center shadow-sm"
          >
            <h3 className="text-xl font-bold text-landing-navy">{stat.value}</h3>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickStats;
