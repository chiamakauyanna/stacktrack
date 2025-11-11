import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActiveProjects = ({ displayedProjects, fadeUp }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/projects/`);
  };

  return (
    <section
      className="bg-surface p-6 rounded-2xl shadow-sm overflow-hidden"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <h2 className="font-semibold mb-4 text-gray-800">Active Projects</h2>

      {displayedProjects?.length ? (
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2 px-3">Title</th>
                <th className="py-2 px-3 hidden md:table-cell">Description</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedProjects.map((project) => (
                <tr
                  key={project.id}
                  className="relative bg-white hover:bg-gray-50 transition rounded-xl cursor-pointer"
                  onClick={() => handleView(project.id)}
                >
                  <td className="py-3 px-3 font-medium text-gray-800 truncate max-w-[150px]">
                    {project.title}
                  </td>
                  <td className="py-3 px-3 hidden md:table-cell text-gray-600 truncate max-w-[300px]">
                    {project.description || "—"}
                  </td>
                  <td className="py-3 px-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : project.status === "active"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right relative">
                    {/* Subtle background icon */}
                    <div className="absolute inset-0 flex items-center justify-end pr-4 pointer-events-none opacity-10">
                      <Eye size={36} />
                    </div>
                    {/* Clickable view button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent row click double trigger
                        handleView();
                      }}
                      className="relative z-10 text-primary hover:text-blue-700 transition"
                      title="View Project"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-sm text-center py-6">
          No Active Project
        </p>
      )}
    </section>
  );
};

export default ActiveProjects;
