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
      <div className="min-h-screen bg-app-surface px-6 md:px-12 py-8 space-y-6">
        <ProjectHeader project={project} user={user} openModal={openModal} />

        {stages?.length > 0 && (
          <ProjectDetailsAnalytics
            stages={stages}
            onTaskSelect={(stageId, taskId) => {
              const stage = stages.find((s) => s.id === stageId);
              const task = stage?.tasks.find((t) => t.id === taskId);
              if (task) openModal("task", stageId, task);
            }}
          />
        )}

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
