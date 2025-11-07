import { useEffect, useState } from "react";
import { PlusCircle, Trash2, ChevronDown, ChevronUp } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import TaskForm from "./TaskForm";

const StageForm = ({
  stage,
  si,
  handleStageChangeForm,
  handleRemoveStageForm,
  handleAddTaskForm,
  handleTaskChangeForm,
  handleRemoveTaskForm,
  allExpanded,
}) => {
  const [isOpen, setIsOpen] = useState(allExpanded);

  useEffect(() => {
    setIsOpen(allExpanded);
  }, [allExpanded]);

  return (
    <motion.div
      key={stage.id}
      className="p-5 bg-surface rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Stage Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 w-full">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-700 transition"
            title={isOpen ? "Collapse Stage" : "Expand Stage"}
          >
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          <input
            type="text"
            placeholder={`Stage ${si + 1} title`}
            value={stage.title}
            onChange={(e) => handleStageChangeForm(si, e.target.value)}
            className="w-full p-2 border-b border-gray-200 focus:outline-none focus:border-primary bg-transparent font-medium text-sm"
          />
        </div>

        <button
          type="button"
          onClick={() => handleRemoveStageForm(si)}
          className="text-red-500 hover:text-red-700 transition"
          title="Delete Stage"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Collapsible Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="space-y-4 mt-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Tasks */}
            {stage.tasks.length === 0 ? (
              <p className="text-gray-400 text-sm italic ml-1">
                No tasks added yet.
              </p>
            ) : (
              <div className="space-y-3">
                {stage.tasks.map((task, ti) => (
                  <TaskForm
                    key={task.id}
                    si={si}
                    ti={ti}
                    task={task}
                    handleTaskChangeForm={handleTaskChangeForm}
                    handleRemoveTaskForm={handleRemoveTaskForm}
                  />
                ))}
              </div>
            )}

            {/* Add Task Button */}
            <button
              type="button"
              onClick={() => handleAddTaskForm(si)}
              className="text-accent text-sm flex items-center gap-1 mt-2 hover:underline"
            >
              <PlusCircle size={14} /> Add Task
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StageForm;
