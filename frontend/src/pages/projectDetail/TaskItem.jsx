// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle, Pencil, Trash2 } from "lucide-react";

const TaskItem = ({
  task,
  toggleTaskStatusHandler,
  openModal,
  removeTask,
  stageId,
}) => (
  <motion.li
    key={task.id}
    className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex flex-col gap-2"
    whileHover={{ scale: 1.02, boxShadow: "0 8px 15px rgba(0,0,0,0.08)" }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex justify-between items-center text-sm">
      <h3
        className={`font-medium ${
          task.status === "completed" ? "line-through text-gray-400" : ""
        }`}
      >
        {task.title}
      </h3>
    </div>
    <div className="flex justify-between items-center">
      {task.due_date && (
        <p className="text-xs text-gray-500">
          Due: {new Date(task.due_date).toLocaleDateString()}
        </p>
      )}
      <div className="flex flex-col gap-2 items-center">
        <button
          onClick={() => toggleTaskStatusHandler(task)}
          className="text-green-600 hover:text-green-800 transition-transform hover:scale-110"
          title="Mark as Completed"
        >
          <CheckCircle size={16} />
        </button>

        <button
          onClick={() => openModal("task", stageId, task)}
          className="text-blue-500 hover:text-blue-700 transition-transform hover:scale-110"
          title="Edit Task"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => removeTask(task.id)}
          className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
          title="Delete Task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </motion.li>
);

export default TaskItem;
