import { Trash2 } from "lucide-react";

const TaskForm = ({
  si,
  ti,
  task,
  handleTaskChangeForm,
  handleRemoveTaskForm,
}) => {
  return (
    <div className="p-3 border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all space-y-2 text-sm">
      <input
        type="text"
        placeholder="Task title"
        value={task.title}
        onChange={(e) => handleTaskChangeForm(si, ti, "title", e.target.value)}
        className="w-full p-2 border-b border-gray-200 focus:outline-none focus:border-primary bg-transparent"
      />
      <textarea
        rows={2}
        placeholder="Task description"
        value={task.description}
        onChange={(e) =>
          handleTaskChangeForm(si, ti, "description", e.target.value)
        }
        className="w-full p-2 border-b border-gray-200 focus:outline-none focus:border-primary bg-transparent resize-none text-sm"
      />
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={task.priority}
          onChange={(e) =>
            handleTaskChangeForm(si, ti, "priority", e.target.value)
          }
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={task.due_date}
          onChange={(e) =>
            handleTaskChangeForm(si, ti, "due_date", e.target.value)
          }
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-sm"
        />
        <button
          type="button"
          onClick={() => handleRemoveTaskForm(si, ti)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
