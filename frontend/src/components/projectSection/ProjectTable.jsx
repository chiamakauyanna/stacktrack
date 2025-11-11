// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const ProjectTable = ({
  projects,
  fadeUp,
  getProgressColor,
  setSelectedProject,
  selectedProject,
}) => (
  <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-surface backdrop-blur-sm">
    <table className="min-w-full text-left border-collapse">
      <thead>
        <tr className="bg-primary text-surface text-sm uppercase">
          <th className="p-4 font-medium">Title</th>
          <th className="p-4 font-medium">Progress</th>
          <th className="p-4 font-medium">Status</th>
          <th className="p-4 font-medium text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, i) => (
          <motion.tr
            key={project.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i}
            className={`cursor-pointer border-b border-gray-100 hover:bg-primary/5 transition-colors ${
              selectedProject?.id === project.id ? "bg-primary/10" : ""
            }`}
          >
            <td className="p-4" onClick={() => setSelectedProject(project)}>
              <p className="font-semibold text-navy">{project.title}</p>
              <p className="text-xs text-gray-500 line-clamp-1 mt-2">
                {project.description}
              </p>
            </td>

            <td className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${getProgressColor(
                      Number(project.progress)
                    )}`}
                    style={{ width: `${project.progress || 0}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">
                  {project.progress || 0}%
                </span>
              </div>
            </td>

            <td className="p-4">
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                  project.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : project.status === "in-progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {project.status}
              </span>
            </td>

            <td className="p-4 text-right">
              <button
                onClick={() => setSelectedProject(project)}
                className="text-primary hover:scale-110 transition-transform"
              >
                <ChevronRight />
              </button>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProjectTable;
