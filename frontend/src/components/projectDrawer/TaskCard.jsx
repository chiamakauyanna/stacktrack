import { Clock } from "lucide-react";

const TaskCard = ({ task, getPriorityClasses }) => (
  <div className="rounded-xl bg-white/90 shadow-sm p-3">
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-medium text-navy text-sm">{task.title}</h4>
      <span
        className={`px-2 py-1 text-xs rounded-full font-semibold ${getPriorityClasses(
          task.priority
        )}`}
      >
        {task.priority}
      </span>
    </div>
    <p className="text-xs text-gray-500 mb-2">{task.description}</p>
    <div className="flex justify-between items-center text-xs">
      <span
        className={`px-2 py-1 rounded-full font-semibold ${
          task.status === "completed"
            ? "bg-green-100 text-green-700"
            : task.status === "in-progress"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {task.status}
      </span>
      <span className="inline-flex items-center gap-1 text-gray-500">
        <Clock size={12} /> {task.due_date}
      </span>
    </div>
  </div>
);

export default TaskCard;
