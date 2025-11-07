import { AlertCircle } from "lucide-react";
import dayjs from "dayjs";
import { stats } from "../../services/data";

const ProjectDetailsAnalytics = ({ stages, onTaskSelect }) => {
  const allTasks = stages.flatMap(
    (stage) => stage?.tasks?.map((t) => ({ ...t, stageId: stage.id })) || []
  );

  const total = allTasks.length;
  const completed = allTasks.filter((t) => t.status === "completed").length;
  const inProgress = allTasks.filter((t) => t.status === "in-progress").length;
  const pending = allTasks.filter((t) => t.status === "pending").length;

  const progress = total ? Math.round((completed / total) * 100) : 0;

  const taskStats = stats(total, inProgress, completed, pending);

  const today = dayjs();
  const dueSoon = allTasks.filter((t) => {
    if (!t.due_date) return false;
    const dueDate = dayjs(t.due_date);
    return (
      dueDate.isAfter(today) &&
      dueDate.diff(today, "day") <= 3 &&
      t.status !== "completed"
    );
  });

  const overdue = allTasks.filter((t) => {
    if (!t.due_date) return false;
    return dayjs(t.due_date).isBefore(today) && t.status !== "completed";
  });

  if (!stages || stages.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
      <p className="text-gray-600 font-medium mb-2">No stages yet</p>
      <p className="text-sm text-gray-500 mb-4">
        Add a stage to begin tracking project analytics.
      </p>
    </div>
  );
}


  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {taskStats.map((stat) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-md ${stat.bg} hover:shadow-xl hover:-translate-y-1 transition-transform`}
          >
            <div className={`${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <h3 className="text-lg font-semibold mt-1">{stat.value}</h3>
            <p className="text-sm text-gray-500 whitespace-nowrap">
              {stat.label}
            </p>
          </div>
        ))}

        {/* Overall Progress Bar */}
        <div className="col-span-2 sm:col-span-4 mt-2">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-center text-gray-500 mt-1 font-medium">
            Overall Progress: {progress}%
          </p>
        </div>
      </div>

      {/* == Tasks Due Soon / Overdue == */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {overdue.length > 0 && (
          <div className="bg-red-50 p-4 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1">
            <h3 className="flex items-center gap-2 text-red-600 font-semibold mb-3">
              <AlertCircle size={18} /> Overdue Tasks ({overdue.length})
            </h3>
            <div className="space-y-2">
              {overdue.map((task) => (
                <button
                  key={task.id}
                  onClick={() => onTaskSelect(task.stageId, task.id)}
                  className="flex justify-between items-center w-full p-3 rounded-xl border border-red-200 bg-red-100 hover:bg-red-200 transition"
                >
                  <div>
                    <h4 className="text-sm font-medium text-red-700">
                      {task.title || "Untitled Task"}
                    </h4>
                    {task.due_date && (
                      <p className="text-xs text-gray-600">
                        Due: {dayjs(task.due_date).format("MMM D, YYYY")}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-red-800">
                    Overdue
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {dueSoon.length > 0 && (
          <div className="bg-yellow-50 p-4 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1">
            <h3 className="flex items-center gap-2 text-yellow-600 font-semibold mb-3">
              <Clock size={18} /> Due Soon ({dueSoon.length})
            </h3>
            <div className="space-y-2">
              {dueSoon.map((task) => (
                <button
                  key={task.id}
                  onClick={() => onTaskSelect(task.stageId, task.id)}
                  className="flex justify-between items-center w-full p-3 rounded-xl border border-yellow-200 bg-yellow-100 hover:bg-yellow-200 transition"
                >
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">
                      {task.title || "Untitled Task"}
                    </h4>
                    {task.due_date && (
                      <p className="text-xs text-gray-600">
                        Due: {dayjs(task.due_date).format("MMM D, YYYY")}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-yellow-800">
                    Due Soon
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {overdue.length === 0 && dueSoon.length === 0 && (
          <div className="col-span-full bg-green-50 p-4 rounded-2xl shadow-md text-center text-green-700 font-medium">
            No tasks due soon or overdue.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsAnalytics;
