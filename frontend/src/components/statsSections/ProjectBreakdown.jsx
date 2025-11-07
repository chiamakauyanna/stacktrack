// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProjectBreakdown = ({ projects }) => (
  <section>
    <h2 className="text-lg font-semibold text-navy mb-3">
      Per Project Breakdown
    </h2>
    {projects.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border-l-4 border-primary rounded-2xl shadow-sm hover:shadow-md transition-all p-5"
          >
            <h3 className="text-base font-semibold text-navy mb-1">{p.title}</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Status:</span> {p.status}
            </p>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
              <div
                className="h-2 bg-primary rounded-full transition-all"
                style={{ width: `${p.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {p.completed_tasks}/{p.total_tasks} tasks completed
            </p>
          </motion.div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-center mt-10 text-sm">
        No projects available yet.
      </p>
    )}
  </section>
);

export default ProjectBreakdown;
