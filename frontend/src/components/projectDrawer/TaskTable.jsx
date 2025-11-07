import { Clock } from "lucide-react";

const TaskTable = ({ tasks, getPriorityClasses }) => (
  <table className="w-full min-w-[700px] table-auto text-left border-collapse">
    <thead className="bg-accent text-navy text-xs md:text-sm uppercase">
      <tr>
        <th className="p-3 md:p-4 font-medium">Title & Description</th>
        <th className="p-3 md:p-4 font-medium">Priority</th>
        <th className="p-3 md:p-4 font-medium">Status</th>
        <th className="p-3 md:p-4 font-medium">Due Date</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {tasks.map((task) => (
        <tr key={task.id} className="hover:bg-gray-50 transition">
          <td className="p-3 md:p-4">
            <p className="font-medium text-gray-800 text-sm">{task.title}</p>
            <p className="text-xs text-gray-500">{task.description}</p>
          </td>
          <td className="p-3 md:p-4">
            <span
              className={`px-2 py-1 text-xs rounded-full font-semibold ${getPriorityClasses(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </td>
          <td className="p-3 md:p-4">
            <span
              className={`px-2 py-1 text-xs rounded-full font-semibold ${
                task.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : task.status === "in-progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {task.status}
            </span>
          </td>
          <td className="p-3 md:p-4 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <Clock size={12} /> {task.due_date}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TaskTable;
