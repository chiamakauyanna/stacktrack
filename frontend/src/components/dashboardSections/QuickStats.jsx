// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle2, FolderOpen, TrendingUp } from "lucide-react";

const QuickStats = ({ summary, fadeUp }) => {
  const stats = [
    {
      label: "Active Projects",
      value: summary.active_projects || 0,
      icon: <FolderOpen size={24} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Completed Projects",
      value: summary.completed_projects || 0,
      icon: <CheckCircle2 size={24} />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      label: "Average Progress",
      value: `${summary.average_project_progress || 0}%`,
      icon: <TrendingUp size={24} />,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={4}
      className="rounded-2xl"
    >
      {/* Mobile: horizontal scroll | Desktop: grid */}
      <div className="flex gap-4 overflow-x-auto sm:overflow-x-visible sm:grid sm:grid-cols-3 scrollbar-hide">
        {stats?.length && stats.map((stat, i) => (
          <div
            key={i}
            className="min-w-[80%] md:min-w-0 flex-shrink-0 md:flex-shrink bg-gray-50 rounded-xl px-4 py-6 shadow-sm flex items-center justify-center gap-4 snap-start"
          >
            <div
              className={`p-3 rounded-xl flex items-center justify-center ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickStats;
