import ProjectCard from "./ProjectCard";

const ActiveProjects = ({ displayedProjects, fadeUp, projectIcons }) => {
  const bgColors = ["bg-pink-200", "bg-purple-200", "bg-emerald-200"];

  return (
    <div className="space-y-4 bg-surface p-6 rounded-2xl shadow-sm">
      {/* Section Heading */}
      <h2 className="font-semibold">Active Projects</h2>

      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 scrollbar-hide">
        {displayedProjects?.length ? (
          displayedProjects.map((project, i) => (
            <div
              key={project.id}
              className="min-w-[80%] md:min-w-[0] flex-shrink-0 md:flex-shrink"
            >
              <ProjectCard
                project={project}
                icon={projectIcons[i % projectIcons.length]}
                bgColor={bgColors[i % bgColors.length]}
                fadeUp={fadeUp}
                index={i}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No Active Project</p>
        )}
      </div>
    </div>
  );
};

export default ActiveProjects;
