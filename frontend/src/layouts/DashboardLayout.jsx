// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Sidebar from "../components/common/SideBar";
import AppHeader from "../components/common/AppHeader";
import useDashboardLayout from "../hooks/useDashboardLayout";
import { useAuthStore } from "../store/useAuthStore";
import { useProjectStore } from "../store/useProjectStore";
import { useEffect } from "react";

const DashboardLayout = ({ children }) => {
  const { user } = useAuthStore();
  const loading = useProjectStore((state) => state.loading);
  const error = useProjectStore((state) => state.error);

  const {
    isSidebarOpen,
    setIsSidebarOpen,
    location,
    sidebarVariants,
    transition,
  } = useDashboardLayout();

  // Load data on first render (after ProtectedRoute ensures user exists)
  useEffect(() => {
    if (user) {
      useProjectStore.getState().loadProjects();
      useProjectStore.getState().loadAnalytics();
    }
  }, [user]);

  if (loading.projects || loading.analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-primary border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 font-medium mb-4">
          Something went wrong: {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-accent/10 text-text">
      <AppHeader onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 pt-4 md:ml-4">
        <Sidebar activePath={location.pathname} />

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              key="mobile-sidebar"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={transition}
              className="fixed inset-y-0 left-0 z-50 w-64 text-text-muted p-6 md:hidden flex flex-col justify-between"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-text-muted hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              <Sidebar
                isMobile
                onClose={() => setIsSidebarOpen(false)}
                activePath={location.pathname}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
