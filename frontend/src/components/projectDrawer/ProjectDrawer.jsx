// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import DrawerHeader from "./DrawerHeader";
import ProjectOverview from "./ProjectOverview";
import ProjectStageList from "./ProjectStageList";

const drawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
};

const ProjectDrawer = ({
  selectedProject,
  setSelectedProject,
  getProgressColor,
  getPriorityClasses,
  handleDeleteProject,
}) => {
  if (!selectedProject) return null;

  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={() => setSelectedProject(null)}
      />

      <motion.aside
        key="drawer"
        variants={drawerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 md:inset-auto md:top-0 md:right-0 h-screen w-screen md:w-[480px] xl:w-[520px] bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col rounded-none overflow-hidden"
      >
        <DrawerHeader
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          handleDeleteProject={handleDeleteProject}
        />

        <div className="flex-1 p-4 md:p-5 space-y-6 overflow-y-auto">
          <ProjectOverview
            selectedProject={selectedProject}
            getProgressColor={getProgressColor}
          />
          <ProjectStageList
            selectedProject={selectedProject}
            getPriorityClasses={getPriorityClasses}
          />
        </div>
      </motion.aside>
    </>
  );
};

export default ProjectDrawer;
