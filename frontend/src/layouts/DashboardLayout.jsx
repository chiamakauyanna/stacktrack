// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Sidebar from "../components/common/SideBar";
import AppHeader from "../components/common/AppHeader";
import useDashboardLayout from "../hooks/useDashboardLayout";

const DashboardLayout = ({ children }) => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    location,
    sidebarVariants,
    transition,
    loading,
    error,
  } = useDashboardLayout();

  // === Global Loading Screen ===
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-app-primary border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // === Global Error Screen ===
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 font-medium mb-4">
          Something went wrong: {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-app-primary text-white px-4 py-2 rounded-lg hover:bg-app-primary/90 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // === Normal Dashboard Layout ===
  return (
    <div className="flex min-h-screen text-app-text">
      {/* Desktop Sidebar */}
      <Sidebar activePath={location.pathname} />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key="mobile-sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-app-primary text-app-text-muted p-6 md:hidden flex flex-col justify-between"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-app-text-muted hover:text-gray-200"
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

      {/* Main Layout */}
      <div className="flex flex-col flex-1 bg-app-primary/10">
        <AppHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="rounded-2xl shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
