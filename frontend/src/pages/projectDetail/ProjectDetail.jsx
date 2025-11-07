import DashboardLayout from "../../layouts/DashboardLayout";
import useProjects from "../../hooks/useProjects";
import ProjectHeader from "./ProjectHeader";
import StageCard from "./StageCard";
import EditModal from "./EditModal";
import ProjectDetailsAnalytics from "./ProjectDetailsAnalytics";

const ProjectDetail = () => {
  const {
    data,
    setData,
    project,
    user,
    stages,
    selectedStage,
    selectedTask,
    isModalOpen,
    setIsModalOpen,
    editingType,
    openModal,
    handleSave,
    toggleTaskStatusHandler,
    removeStage,
    removeTask,
  } = useProjects();

  const classifyTasks = (tasks) => {
    const overdue = [],
      dueSoon = [],
      inProgress = [],
      completed = [];
    const today = new Date();

    tasks.forEach((task) => {
      const status = task.status || "pending";
      const dueDate = task.due_date ? new Date(task.due_date) : null;
      if (status === "completed") completed.push(task);
      else if (!dueDate) inProgress.push(task);
      else if (dueDate < today) overdue.push(task);
      else if (dueDate <= new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000))
        dueSoon.push(task);
      else inProgress.push(task);
    });

    return { overdue, dueSoon, inProgress, completed };
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-surface px-6 md:px-12 py-8 space-y-6">
        <ProjectHeader project={project} user={user} openModal={openModal} />

        {/* Analytics */}
        <div>
          {stages?.length > 0 ? (
            <ProjectDetailsAnalytics
              stages={stages}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages?.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
              classifyTasks={classifyTasks}
              openModal={openModal}
              removeStage={removeStage}
              toggleTaskStatusHandler={toggleTaskStatusHandler}
              removeTask={removeTask}
            />
          ))}
        </div>
        {stages?.length === 0 && (
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

        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editingType={editingType}
          data={data}
          setData={setData}
          handleSave={handleSave}
          selectedTask={selectedTask}
          selectedStage={selectedStage}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;
