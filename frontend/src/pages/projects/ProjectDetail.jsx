import DashboardLayout from "../../layouts/DashboardLayout";
import useProjects from "../../hooks/useProjects";
import ProjectHeader from "../../components/projectDetail/ProjectHeader";
import StageCard from "../../components/projectDetail/StageCard";
import EditModal from "../../components/projectDetail/EditModal";
import ProjectDetailsAnalytics from "../../components/projectDetail/ProjectDetailsAnalytics";

const ProjectDetail = () => {
  const {
    project,
    stages,
    user,
    classifiedStages,
    classifiedAllTasks,
    openModal,
    isModalOpen,
    setIsModalOpen,
    editingType,
    data,
    setData,
    handleSave,
    toggleTaskStatusHandler,
    removeStage,
    removeTask,
  } = useProjects();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-surface mx-4 px-6 md:px-12 py-8 space-y-6">
        {/* Header */}
        <ProjectHeader project={project} user={user} openModal={openModal} />

        {/* Analytics */}
        <div>
          {stages?.length > 0 ? (
            <ProjectDetailsAnalytics
              stages={classifiedStages}
              classifiedAllTasks={classifiedAllTasks}
              onTaskSelect={(stageId, taskId) => {
                const stage = stages.find((s) => s.id === stageId);
                const task = stage?.tasks.find((t) => t.id === taskId);
                if (task) openModal("task", stageId, task);
              }}
            />
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center text-gray-500">
              <p className="font-medium mb-2">No analytics yet</p>
              <p className="text-sm">
                Add your first stage to start tracking project progress.
              </p>
            </div>
          )}
        </div>

        {/* Stages */}
        {stages?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classifiedStages.map((stage) => (
              <StageCard
                key={stage.id}
                stage={stage}
                openModal={openModal}
                removeStage={removeStage}
                toggleTaskStatusHandler={toggleTaskStatusHandler}
                removeTask={removeTask}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-10 border border-dashed border-gray-300 rounded-2xl bg-gray-50 text-center">
            <h2 className="text-gray-600 font-medium mb-2">
              No stages added yet
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Start by adding a stage to begin organizing your project.
            </p>
            <button
              onClick={() => openModal("stage")}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
            >
              Add First Stage
            </button>
          </div>
        )}

        {/* Edit Modal */}
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editingType={editingType}
          data={data}
          setData={setData}
          handleSave={handleSave}
          selectedStage={classifiedStages.find((s) => s.id === data.stageId) || null}
          selectedTask={data.taskId ? stages.flatMap((s) => s.tasks).find((t) => t.id === data.taskId) : null}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;
