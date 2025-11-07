// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const RecentProjects = ({ analytics, fadeUp }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    animate="visible"
    custom={8}
    className="bg-surface rounded-2xl p-5 shadow"
  >
    <h2 className="text-lg font-semibold text-navy mb-4">Recently Updated</h2>

    {analytics?.projects?.length ? (
      <ul className="divide-y divide-gray-100">
        {analytics.projects.slice(0, 5).map((proj) => (
          <li
            key={proj.id}
            className="flex justify-between py-2 text-sm text-gray-700"
          >
            <span className="font-medium">{proj.title}</span>
            <span className="text-gray-500">{proj.last_updated}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-sm">No recent updates</p>
    )}
  </motion.div>
);

export default RecentProjects;
