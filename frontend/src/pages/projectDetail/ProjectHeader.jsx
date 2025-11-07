import { Plus, Pencil } from "lucide-react";

const ProjectHeader = ({ project, user, openModal }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-primary/25 p-6 rounded-2xl shadow-md">
    <div>
      <h1 className="text-1xl md:text-2xl font-bold text-gray-800">
        {project?.title}
      </h1>
      <p className="text-gray-600 mt-1">{project?.description}</p>
    </div>

    {user && (
      <div className="flex flex-col lg:flex-row gap-3 mt-4 md:mt-0">
        <button
          onClick={() => openModal("stage")}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2 py-2 rounded-lg shadow hover:scale-105 transition-transform duration-200 text-xs lg:text-sm whitespace-nowrap"
        >
          <Plus size={18} /> Add Stage
        </button>
        <button
          onClick={() => openModal("project")}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-2 py-2 rounded-lg shadow hover:scale-105 transition-transform duration-200 text-xs lg:text-sm whitespace-nowrap"
        >
          <Pencil size={18} /> Edit Project
        </button>
      </div>
    )}
  </div>
);

export default ProjectHeader;
