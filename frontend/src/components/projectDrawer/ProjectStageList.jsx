import StageItem from "./StageItem";

const ProjectStageList = ({ selectedProject, getPriorityClasses }) => (
  <div>
    <h3 className="text-md md:text-lg font-semibold text-navy mb-3">
      Project Stages
    </h3>

    {selectedProject.stages.length === 0 ? (
      <p className="text-sm text-gray-400">No stages added yet.</p>
    ) : (
      <div className="space-y-6">
        {selectedProject.stages.map((stage) => (
          <StageItem
            key={stage.id}
            stage={stage}
            getPriorityClasses={getPriorityClasses}
          />
        ))}
      </div>
    )}
  </div>
);

export default ProjectStageList;
