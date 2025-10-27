// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { MdOutlineArrowOutward } from "react-icons/md";

const ActiveProjects = ({
  displayedProjects,
  getProjectContainerWidth,
  fadeUp,
  projectIcons,
  totalProjects,
}) => {
  const bgColors = ["bg-app-accent", "bg-app-secondary", "bg-amber-400"];

  return (
    <div className="lg:col-span-2 space-y-4 bg-app-surface p-6 rounded-2xl shadow-sm">
      {/* Section Heading */}
      <h1 className="md:text-xl font-heading font-semibold text-landing-navy">
        Active Projects
      </h1>

      {/* Navy Box */}
      <div className="bg-landing-navy py-6 px-3 md:px-6 rounded-2xl flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="md:w-1/3 space-y-10">
          <p className="text-app-surface text-lg md:text-2xl font-heading font-bold leading-relaxed">
            You have {totalProjects} total project{totalProjects !== 1 && "s"}
          </p>
          <Link
            to="/projects"
            className="text-sm text-app-surface hover:underline flex items-center gap-1"
          >
            See More <MdOutlineArrowOutward size={16} />
          </Link>
        </div>

        <div
          className={`flex md:flex-wrap gap-4 md:gap-6 md:${getProjectContainerWidth()} justify-start`}
        >
          {displayedProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              icon={projectIcons[i % projectIcons.length]}
              bgColor={bgColors[i % bgColors.length]}
              fadeUp={fadeUp}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveProjects;

