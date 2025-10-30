// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  X,
  ClipboardList,
  Clock,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";
import useDashboardLayout from "../../hooks/useDashboardLayout";
import useProjects from "../../hooks/useProjects";

const drawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
};

const Projects = () => {
  const navigate = useNavigate();
  const {
    projects,
    loading,
    error,
    fadeUp,
    getPriorityClasses,
    getProgressColor,
  } = useDashboardLayout();
  const { handleDeleteProject } = useProjects()

  const [selectedProject, setSelectedProject] = useState(null);

  if (loading)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-gray-500">
          Loading...
        </div>
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-red-500">
          {error}
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div
        className={`min-h-screen transition-all duration-500 ${
          selectedProject ? "mr-[480px] xl:mr-[520px]" : ""
        } p-6`}
      >
        <h1 className="text-2xl font-bold text-landing-navy mb-6">
          Project Overview
        </h1>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500">
            No projects found. Create one to get started!
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white/80 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-app-primary/10 text-gray-700 text-sm uppercase">
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Progress</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Tasks</th>
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, i) => (
                  <motion.tr
                    key={project.id}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    className={`cursor-pointer border-b border-gray-100 hover:bg-app-primary/5 transition-colors ${
                      selectedProject?.id === project.id
                        ? "bg-app-primary/10"
                        : ""
                    }`}
                  >
                    <td
                      className="p-4"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div>
                        <p className="font-semibold text-landing-navy">
                          {project.title}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(
                              Number(project.progress)
                            )}`}
                            style={{ width: `${project.progress || 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {project.progress || 0}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          project.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : project.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      {project.completed_tasks}/{project.total_tasks}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-app-primary hover:scale-110 transition-transform"
                      >
                        <ChevronRight />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* === SIDE DRAWER PANEL === */}
      <AnimatePresence>
        {selectedProject && (
          <motion.aside
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 w-full md:w-[480px] xl:w-[520px] h-full bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-app-primary/10">
              <h2 className="text-lg font-semibold text-landing-navy">
                {selectedProject.title}
              </h2>

              <div className="flex items-center gap-2">
                {/* Edit Project button */}
                <button
                  onClick={() => navigate(`/projects/${selectedProject.id}`)}
                  title="Edit Project"
                  className="p-2 rounded hover:bg-blue-100 transition"
                >
                  <Pencil size={20} className="text-blue-500" />
                </button>

                {/* Delete Project icon */}
                <button
                  onClick={() => handleDeleteProject(selectedProject.id)}
                  title="Delete Project"
                  className="p-2 rounded hover:bg-red-100 transition"
                >
                  <Trash2 size={20} className="text-red-500" />
                </button>

                {/* Close drawer */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-landing-navy transition"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Project description */}
              <div>
                <p className="text-app-text-muted">
                  {selectedProject.description}
                </p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-1">Progress</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(
                        Number(selectedProject.progress)
                      )}`}
                      style={{ width: `${selectedProject.progress || 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedProject.progress || 0}% Complete
                  </p>
                </div>
              </div>

              {/* Stages */}
              <div>
                <h3 className="text-md md:text-lg font-semibold text-landing-navy mb-3">
                  Project Stages
                </h3>
                {selectedProject.stages.length === 0 ? (
                  <p className="text-sm text-gray-400">No stages added yet.</p>
                ) : (
                  <div className="space-y-6">
                    {selectedProject.stages.map((stage) => (
                      <div
                        key={stage.id}
                        className="border border-gray-100 rounded-xl bg-white/80 shadow-sm hover:shadow-md transition-all"
                      >
                        {/* Stage Header */}
                        <div className="p-3 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
                          <div className="flex items-center gap-2">
                            <ClipboardList
                              size={16}
                              className="text-app-primary"
                            />
                            <h4 className="font-medium text-sm md:text-base">
                              {stage.title}
                            </h4>
                          </div>
                          <span className="text-xs md:text-sm text-gray-400">
                            {stage.tasks.length} Tasks
                          </span>
                        </div>

                        {/* Tasks Table */}
                        {stage.tasks.length === 0 ? (
                          <p className="p-3 text-sm text-gray-400">
                            No tasks in this stage.
                          </p>
                        ) : (
                          <div className="overflow-x-auto p-3">
                            <table className="w-full min-w-[700px] table-auto text-left border-collapse">
                              <thead className="bg-app-primary/10 text-gray-700 text-xs md:text-sm uppercase">
                                <tr>
                                  <th className="p-4 font-medium">
                                    Title & Description
                                  </th>
                                  <th className="p-4 font-medium">Priority</th>
                                  <th className="p-4 font-medium">Status</th>
                                  <th className="p-4 font-medium">Due Date</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {stage.tasks.map((task) => (
                                  <tr
                                    key={task.id}
                                    className="hover:bg-gray-50 transition"
                                  >
                                    <td className="p-4">
                                      <p className="font-medium text-gray-800 text-sm md:text-base">
                                        {task.title}
                                      </p>
                                      <p className="text-xs md:text-sm text-gray-500">
                                        {task.description}
                                      </p>
                                    </td>
                                    <td className="p-4">
                                      <span
                                        className={`px-2 py-1 text-xs md:text-sm rounded-full font-semibold whitespace-nowrap ${getPriorityClasses(
                                          task.priority
                                        )}`}
                                      >
                                        {task.priority}
                                      </span>
                                    </td>
                                    <td className="p-4">
                                      <span
                                        className={`px-2 py-1 text-xs md:text-sm rounded-full font-semibold whitespace-nowrap ${
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
                                    <td className="p-4 text-xs md:text-sm text-gray-500 align-middle">
                                      <span className="inline-flex items-center gap-1 whitespace-nowrap">
                                        <Clock size={12} />
                                        {task.due_date}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default Projects;
