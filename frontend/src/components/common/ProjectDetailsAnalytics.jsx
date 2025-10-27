import { ClipboardList, CheckCircle2, Clock, ListChecks, AlertCircle } from "lucide-react";
import dayjs from "dayjs"; // npm install dayjs

const ProjectDetailsAnalytics = ({ stages, onTaskSelect }) => {
  const allTasks = stages.flatMap((stage) =>
    stage.tasks.map((t) => ({ ...t, stageId: stage.id })) || []
  );
  const total = allTasks.length;
  const completed = allTasks.filter((t) => t.status === "completed").length;
  const inProgress = allTasks.filter((t) => t.status === "in-progress").length;
  const pending = allTasks.filter((t) => t.status === "pending").length;

  const progress = total ? Math.round((completed / total) * 100) : 0;

  const today = dayjs();
  const dueSoon = allTasks.filter((t) => {
    if (!t.due_date) return false;
    const dueDate = dayjs(t.due_date);
    return dueDate.isAfter(today) && dueDate.diff(today, "day") <= 3 && t.status !== "completed";
  });

  const overdue = allTasks.filter((t) => {
    if (!t.due_date) return false;
    return dayjs(t.due_date).isBefore(today) && t.status !== "completed";
  });

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: <ClipboardList size={20} />,
      color: "text-gray-700",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: <Clock size={20} />,
      color: "text-blue-600",
    },
    {
      label: "Completed",
      value: completed,
      icon: <CheckCircle2 size={20} />,
      color: "text-green-600",
    },
    {
      label: "Pending",
      value: pending,
      icon: <ListChecks size={20} />,
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="space-y-4">
      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center justify-center space-y-1"
          >
            <div className={`${stat.color}`}>{stat.icon}</div>
            <h3 className="text-lg font-semibold">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
        <div className="col-span-2 sm:col-span-4 mt-2">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-2 bg-[var(--color-landing-primary)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-center text-gray-500 mt-1">
            Overall Progress: {progress}%
          </p>
        </div>
      </div>

      {/* ===== Tasks Due Soon ===== */}
      <div className="bg-white border rounded-2xl p-4 shadow-sm">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <AlertCircle className="text-red-500" size={18} />
          Tasks Due Soon
        </h3>

        {dueSoon.length === 0 && overdue.length === 0 ? (
          <p className="text-sm text-gray-500">No tasks due soon. 🎉</p>
        ) : (
          <div className="space-y-2">
            {overdue.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-red-600 mb-1">
                  Overdue Tasks ({overdue.length})
                </p>
                {overdue.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => onTaskSelect(task.stageId, task.id)}
                    className="flex justify-between items-center w-full text-left p-2 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-red-700">{task.title}</h4>
                      <p className="text-xs text-gray-500">
                        Due: {dayjs(task.due_date).format("MMM D, YYYY")}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-red-600">Overdue</span>
                  </button>
                ))}
              </div>
            )}

            {dueSoon.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-yellow-600 mb-1">
                  Due Soon ({dueSoon.length})
                </p>
                {dueSoon.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => onTaskSelect(task.stageId, task.id)}
                    className="flex justify-between items-center w-full text-left p-2 border border-yellow-200 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">{task.title}</h4>
                      <p className="text-xs text-gray-500">
                        Due: {dayjs(task.due_date).format("MMM D, YYYY")}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-yellow-700">Due Soon</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsAnalytics;
