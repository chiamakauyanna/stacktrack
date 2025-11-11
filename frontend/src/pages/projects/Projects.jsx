import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import useDashboardLayout from "../../hooks/useDashboardLayout";
import useProjects from "../../hooks/useProjects";
import ProjectTable from "../../components/projectSection/ProjectTable";
import ProjectCardList from "../../components/projectSection/ProjectCardList";
import ProjectDrawer from "../../components/projectDrawer/ProjectDrawer";

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

  const { handleDeleteProject } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [selectedProject]);

  if (loading.projects)
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
        <h1 className="text-xl md:text-2xl mb-6">Project Overview</h1>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-20">
            <p className="mb-4">
              No projects found. Create one to get started!
            </p>
            <button
              onClick={() => navigate("/projects/create")}
              className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            >
              Create Project
            </button>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <ProjectTable
                projects={projects}
                fadeUp={fadeUp}
                getProgressColor={getProgressColor}
                setSelectedProject={setSelectedProject}
                selectedProject={selectedProject}
              />
            </div>

            <div className="md:hidden">
              <ProjectCardList
                projects={projects}
                fadeUp={fadeUp}
                setSelectedProject={setSelectedProject}
              />
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDrawer
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            getProgressColor={getProgressColor}
            getPriorityClasses={getPriorityClasses}
            handleDeleteProject={handleDeleteProject}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default Projects;
