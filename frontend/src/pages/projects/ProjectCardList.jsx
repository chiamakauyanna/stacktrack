// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const ProjectCardList = ({ projects, fadeUp, setSelectedProject }) => (
  <div className="space-y-4">
    {projects.map((project, i) => (
      <motion.div
        key={project.id}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={i}
        onClick={() => setSelectedProject(project)}
        className="rounded-2xl bg-white/80 shadow-sm hover:shadow-md transition-all p-4 cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg">{project.title}</h3>
          <ChevronRight className="text-primary" size={18} />
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {project.description}
        </p>

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
      </motion.div>
    ))}
  </div>
);

export default ProjectCardList;
