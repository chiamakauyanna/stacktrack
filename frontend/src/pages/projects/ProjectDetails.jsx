import Modal from "../../components/common/Modal";
import { Plus, Pencil, Trash2, CheckCircle } from "lucide-react";
import useProjects from "../../hooks/useProjects";
import DashboardLayout from "../../layouts/DashboardLayout";
import ProjectDetailsAnalytics from "../../components/common/ProjectDetailsAnalytics";

const ProjectDetail = () => {
  const { data,
    setData,
    project,
    user,
    selectedStage,
    selectedTask,
    isModalOpen,
    setIsModalOpen,
    editingType,
    toggleTaskStatus,
    stages,
    removeStage,
    removeTask,
    openTaskModal,
    openStageModal,
    handleSave, } = useProjects();

  return (
    <DashboardLayout>
      {/* ===== Project Header ===== */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">{project?.title}</h1>
          <p className="text-gray-500">{project?.description}</p>
        </div>

        {user && (
          <button
            onClick={() => openStageModal()}
            className="flex items-center gap-2 bg-[var(--color-landing-primary)] text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            <Plus size={18} /> Add Stage
          </button>
        )}
      </div>

      {/* ===== Analytics Section ===== */}
      {stages?.length > 0 && (
        <ProjectDetailsAnalytics
          stages={stages}
          onTaskSelect={(stageId, taskId) => {
            const stage = stages.find((s) => s.id === stageId);
            const task = stage?.tasks.find((t) => t.id === taskId);
            if (task) openTaskModal(stageId, task);
          }}
        />
      )}

      {/* ===== Stages + Tasks ===== */}
      <div className="space-y-6">
        {stages?.map((stage) => (
          <div
            key={stage.id}
            className="bg-white rounded-xl border p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">{stage.title}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => openStageModal(stage)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => removeStage(stage.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => openTaskModal(stage.id)}
                  className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                >
                  <Plus size={14} /> Add Task
                </button>
              </div>
            </div>

            {/* ===== Tasks ===== */}
            <ul className="space-y-2">
              {stage.tasks?.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <h3
                      className={`font-medium ${
                        task.status === "completed"
                          ? "line-through text-gray-400"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.due_date && (
                      <p className="text-xs text-gray-500">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => toggleTaskStatus(task)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button
                      onClick={() => openTaskModal(stage.id, task)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}

              {stage.tasks?.length === 0 && (
                <p className="text-sm text-gray-500">
                  No tasks in this stage yet.
                </p>
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* ===== Modal ===== */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          editingType === "task"
            ? selectedTask
              ? "Edit Task"
              : "Add Task"
            : selectedStage
            ? "Edit Stage"
            : "Add Stage"
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-3"
        >
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) =>
                setData({ ...data, title: e.target.value })
              }
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {editingType === "task" && (
            <>
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  value={data.due_date}
                  onChange={(e) =>
                    setData({ ...data, due_date: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-[var(--color-landing-primary)] text-white py-2 rounded-lg hover:opacity-90"
          >
            Save
          </button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default ProjectDetail;
