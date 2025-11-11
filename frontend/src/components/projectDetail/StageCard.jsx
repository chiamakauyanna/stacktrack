// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";
import TaskItem from "./TaskItem";

const StageCard = ({
  stage,
  openModal,
  removeStage,
  ...taskActions
}) => {
  const { overdue, dueSoon, inProgress, completed } = stage.tasksClassified;

  const renderSection = (title, color, tasks) =>
    tasks.length > 0 && (
      <div className="mb-3">
        <h4 className={`text-sm font-semibold ${color} mb-1`}>{title}</h4>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              stageId={stage.id}
              {...taskActions}
              openModal={openModal}
            />
          ))}
        </ul>
      </div>
    );

  return (
    <motion.div
      className="bg-white rounded-2xl p-5 shadow-md flex flex-col"
      whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{stage.title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => openModal("stage", stage)}
            className="text-blue-500 hover:text-blue-700"
            title="Edit Stage"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => removeStage(stage.id)}
            className="text-red-500 hover:text-red-700"
            title="Delete Stage"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {renderSection("Overdue", "text-red-700", overdue)}
      {renderSection("Due Soon", "text-yellow-700", dueSoon)}
      {renderSection("In Progress", "text-gray-700", inProgress)}
      {renderSection("Completed", "text-blue-700", completed)}

      {/* Empty state message */}
      {!stage.tasks || stage.tasks.length === 0 ? (
        <p className="text-sm text-gray-400 italic text-center py-3">
          No tasks added yet
        </p>
      ) : null}

      {/* Add Task Button */}
      <button
        onClick={() => openModal("task", stage.id)}
        className="mt-4 w-full flex items-center justify-center gap-2 text-sm bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition"
      >
        <Plus size={16} /> Add Task
      </button>
    </motion.div>
  );
};

export default StageCard;
