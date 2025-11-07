const ProjectOverview = ({ selectedProject, getProgressColor }) => (
  <div>
    <p className="text-gray-700 text-sm md:text-base break-words">
      {selectedProject.description}
    </p>

    <div className="mt-4">
      <p className="text-xs md:text-sm text-gray-500 mb-1">Progress</p>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full ${getProgressColor(
            Number(selectedProject.progress)
          )}`}
          style={{ width: `${selectedProject.progress || 0}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {selectedProject.progress || 0}% Complete
      </p>
    </div>
  </div>
);

export default ProjectOverview;
