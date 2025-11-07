import { ClipboardList } from "lucide-react";
import TaskTable from "./TaskTable";
import TaskCard from "./TaskCard";

const StageItem = ({ stage, getPriorityClasses }) => (
  <div className="border border-gray-100 rounded-xl bg-white/80 shadow-sm hover:shadow-md transition-all">
    <div className="p-3 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div className="flex items-center gap-2">
        <ClipboardList size={16} className="text-primary" />
        <h4 className="font-medium text-sm md:text-base">{stage.title}</h4>
      </div>
      <span className="text-xs md:text-sm text-gray-400">
        {stage.tasks.length} Tasks
      </span>
    </div>

    <div className="p-3">
      {stage.tasks.length === 0 ? (
        <p className="text-sm text-gray-400">No tasks yet.</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <TaskTable tasks={stage.tasks} getPriorityClasses={getPriorityClasses} />
          </div>
          <div className="md:hidden space-y-3">
            {stage.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                getPriorityClasses={getPriorityClasses}
              />
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);

export default StageItem;
