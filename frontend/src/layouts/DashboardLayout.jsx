import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "../components/common/SideBar";
import AppHeader from "../components/common/AppHeader";
import { X } from "lucide-react";

const DashboardLayout = ({ children, pageTitle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Sidebar activePath={location.pathname} />

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-landing-primary to-landing-navy text-white p-6 flex flex-col justify-between z-50 shadow-xl md:hidden"
          >
            <div className="flex justify-end items-center z-100">
              <button
                className="text-white hover:text-gray-200"
                onClick={() => setIsSidebarOpen(false)}
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

      <div className="flex-1 flex flex-col">
        <AppHeader onMenuClick={() => setIsSidebarOpen(true)} pageTitle={pageTitle}/>
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
