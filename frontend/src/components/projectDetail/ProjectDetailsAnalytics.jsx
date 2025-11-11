import { AlertCircle, Clock } from "lucide-react";
import dayjs from "dayjs";
import { stats } from "../../services/data";

const ProjectDetailsAnalytics = ({ classifiedAllTasks, onTaskSelect }) => {
  const { overdue, dueSoon, inProgress, completed } = classifiedAllTasks;

  const total = overdue.length + dueSoon.length + inProgress.length + completed.length;
  const progress = total ? Math.round((completed.length / total) * 100) : 0;
  const taskStats = stats(total, inProgress.length, completed.length, overdue.length + dueSoon.length);

  if (!total) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
        <p className="text-gray-600 font-medium mb-2">No tasks yet</p>
        <p className="text-sm text-gray-500 mb-4">
          Add tasks to begin tracking project analytics.
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
            <p className="text-sm text-gray-500 whitespace-nowrap">{stat.label}</p>
          </div>
        ))}

        {/* Overall Progress Bar */}
        <div className="col-span-2 sm:col-span-4 mt-2">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-4">
            <div
              className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-center text-gray-500 mt-2 font-medium">
            Overall Progress: {progress}%
          </p>
        </div>
      </div>

      {/* Tasks Due Soon / Overdue */}
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
                  <span className="text-xs font-semibold text-red-800">Overdue</span>
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
                  <span className="text-xs font-semibold text-yellow-800">Due Soon</span>
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
