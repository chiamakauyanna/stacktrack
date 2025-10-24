import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../../store/useProjectStore";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ChevronDown, ChevronUp, ClipboardList, Clock } from "lucide-react";

const Projects = () => {
  const navigate = useNavigate();
  const { projects, loadProjects, loading, error } = useProjectStore();
  const [expandedProject, setExpandedProject] = useState(null);
  const [expandedStage, setExpandedStage] = useState(null);

  useEffect(() => {
    loadProjects();
    document.title = "Projects | StackTrack";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleProject = (id, e) => {
    e.stopPropagation(); 
    setExpandedProject(expandedProject === id ? null : id);
    setExpandedStage(null);
  };

  const toggleStage = (id) => {
    setExpandedStage(expandedStage === id ? null : id);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" },
    }),
  };

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
      default:
        return "bg-green-100 text-green-700";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 40) return "bg-yellow-400";
    return "bg-red-500";
  };

  if (loading)
    return <DashboardLayout pageTitle="Projects">Loading...</DashboardLayout>;
  if (error)
    return <DashboardLayout pageTitle="Projects">{error}</DashboardLayout>;

  return (
    <DashboardLayout pageTitle="Projects">
      <div className="min-h-screen p-6 space-y-6">
        {projects.length === 0 && (
          <p className="text-center text-gray-500">
            No projects found. Create one to get started!
          </p>
        )}

        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i}
            className="bg-white/80 border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Project Header */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex justify-between items-center">
                {/* Clickable area (navigate to project) */}
                <div
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="flex-1 cursor-pointer hover:text-[var(--color-landing-primary)] transition-colors"
                >
                  <h2 className="text-lg font-semibold">{project.title}</h2>
                  <p className="text-sm text-gray-500">{project.description}</p>
                </div>

                {/* Chevron toggle */}
                <button
                  onClick={(e) => toggleProject(project.id, e)}
                  className="ml-3 p-1 rounded-md hover:bg-gray-100 transition"
                  title="Expand/Collapse"
                >
                  {expandedProject === project.id ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-gray-200 mt-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full ${getProgressColor(
                    Number(project.progress)
                  )}`}
                  style={{ width: `${project.progress || 0}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {project.progress || 0}% Complete
              </p>
            </div>

            {/* Expanded Project Content */}
            {expandedProject === project.id && (
              <div className="p-4 space-y-4 bg-gray-50">
                {project.stages.length === 0 ? (
                  <p className="text-sm text-gray-400">No stages added.</p>
                ) : (
                  project.stages.map((stage) => (
                    <div
                      key={stage.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                      <button
                        onClick={() => toggleStage(stage.id)}
                        className="w-full flex justify-between items-center p-3 cursor-pointer hover:bg-gray-100 transition"
                      >
                        <div className="flex items-center gap-2">
                          <ClipboardList size={16} />
                          <h3 className="font-medium">{stage.title}</h3>
                        </div>
                        <span>
                          {expandedStage === stage.id ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </span>
                      </button>

                      {/* Tasks */}
                      {expandedStage === stage.id && (
                        <div className="p-3 space-y-2">
                          {stage.tasks.length === 0 ? (
                            <p className="text-sm text-gray-400">
                              No tasks in this stage.
                            </p>
                          ) : (
                            stage.tasks.map((task) => (
                              <div
                                key={task.id}
                                className="p-2 rounded-md border border-gray-200 bg-white flex justify-between items-center"
                              >
                                <div>
                                  <h4 className="text-sm font-medium">
                                    {task.title}
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    {task.description}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <Clock size={12} />
                                    <span>{task.due_date}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
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
                                  <span
                                    className={`px-2 py-1 text-xs rounded-full font-semibold ${getPriorityClasses(
                                      task.priority
                                    )}`}
                                  >
                                    {task.priority}
                                  </span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Projects;
