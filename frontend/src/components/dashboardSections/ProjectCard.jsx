// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, icon, bgColor, fadeUp, index }) => (
  <motion.div
    key={project.id}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={index + 5}
    className={`rounded-2xl p-4 md:p-5 shadow-md hover:shadow-lg transition space-y-3 ${bgColor} flex-1`}
  >
    <div className="mt-10">{icon}</div>
    <h2 className="font-semibold">{project.title}</h2>
    <p className="text-sm opacity-90">
      {project.stages?.length || 0} Stages | {project.progress}%
    </p>
    <div className="h-2 rounded-full bg-gray-600/30 overflow-hidden">
      <motion.div
        className="h-2 rounded-full bg-navy"
        initial={{ width: 0 }}
        animate={{
          width: `${parseInt(project.progress) || 0}%`,
        }}
        transition={{ duration: 1 }}
      />
    </div>
    <Link
      to={`/projects/${project.id}`}
      className="text-sm hover:underline bg-navy rounded-2xl px-4 py-2 text-gray-100"
    >
      View
    </Link>
  </motion.div>
);

export default ProjectCard;
