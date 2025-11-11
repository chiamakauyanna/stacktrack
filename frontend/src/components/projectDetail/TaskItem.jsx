// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle, Pencil, Trash2, MoreVertical } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const TaskItem = ({
  task,
  toggleTaskStatusHandler,
  openModal,
  removeTask,
  stageId,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.li
      key={task.id}
      className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex flex-col gap-2 relative"
      whileHover={{ scale: 1.02, boxShadow: "0 8px 15px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
    >
      {/* Top section: Title + Menu */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3
            className={`mb-1 font-medium ${
              task.status === "done"
                ? "line-through text-gray-400"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-sm ${
                task.status === "done"
                  ? "line-through text-gray-400"
                  : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}
        </div>

        {/* 3-dot Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            title="More Options"
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-6 bg-white border border-gray-100 shadow-md rounded-lg w-32 z-10">
              <button
                onClick={() => {
                  openModal("task", stageId, task);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 w-full"
              >
                <Pencil size={14} />
                Edit
              </button>
              <button
                onClick={() => {
                  removeTask(task.id);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom section: Due date + Mark done */}
      <div className="flex justify-between items-center mt-2">
        {task.due_date && (
          <p className="text-xs text-gray-500">
            Due: {new Date(task.due_date).toLocaleDateString()}
          </p>
        )}
        <button
          onClick={() => toggleTaskStatusHandler(task)}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-all ${
            task.status === "done"
              ? "bg-green-100 text-green-600 cursor-default"
              : "bg-green-50 text-green-700 hover:bg-green-100 hover:scale-105"
          }`}
          disabled={task.status === "done"}
        >
          <CheckCircle size={14} />{" "}
          {task.status === "done" ? "Completed" : "Mark Done"}
        </button>
      </div>
    </motion.li>
  );
};

export default TaskItem;
