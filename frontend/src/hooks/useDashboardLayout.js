import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useProjectStore } from "../store/useProjectStore";
import useToast from "./useToast";

const useDashboardLayout = () => {
  const { user, logout } = useAuthStore();

  // Zustand state selectors
  const projects = useProjectStore((state) => state.projects);
  const analytics = useProjectStore((state) => state.analytics);
  const loading = useProjectStore((state) => state.loading);
  const error = useProjectStore((state) => state.error);

  // UI state
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  const [expandedStage, setExpandedStage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  // Initials
  const initials = user?.username?.charAt(0)?.toUpperCase() || "?";

  // Logout
  const handleLogout = async () => {
    const loadingToast = toast.loading("Logging out...");
    try {
      await logout();
      toast.success("Logged out successfully!", { id: loadingToast });
      navigate("/login");
      setShowUserMenu(false);
    } catch (err) {
      toast.error("Logout failed. Try again.", { id: loadingToast });
      console.error(err);
    }
  };

  // Sidebar motion
  const sidebarVariants = useMemo(
    () => ({
      hidden: { x: "-100%" },
      visible: { x: 0 },
      exit: { x: "-100%" },
    }),
    []
  );

  const transition = useMemo(
    () => ({
      type: "spring",
      stiffness: 110,
      damping: 20,
    }),
    []
  );

  // Bar chart data
  const barColors = projects.map((p) => {
    const progress = parseInt(p.progress) || 0;
    if (progress >= 80) return "rgba(34, 197, 94, 0.8)";
    if (progress >= 50) return "rgba(253, 224, 71, 0.8)";
    return "rgba(239, 68, 68, 0.8)";
  });

  const barData = useMemo(
    () => ({
      labels: projects.map((p) => p.title),
      datasets: [
        {
          label: "Completion (%)",
          data: projects.map((p) => parseInt(p.progress) || 0),
          backgroundColor: barColors,
          borderRadius: 8,
        },
      ],
    }),
    [projects]
  );

  const displayedProjects = projects.slice(0, 3);

  // Expand/collapse logic
  const toggleProject = (id, e) => {
    e.stopPropagation();
    setExpandedProject(expandedProject === id ? null : id);
    setExpandedStage(null);
  };

  const toggleStage = (id) => {
    setExpandedStage(expandedStage === id ? null : id);
  };

  // Helpers
  const getPriorityClasses = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 40) return "bg-yellow-400";
    return "bg-red-500";
  };

  return {
    loading,
    error,
    user,
    showUserMenu,
    setShowUserMenu,
    isSidebarOpen,
    setIsSidebarOpen,
    location,
    initials,
    handleLogout,
    sidebarVariants,
    transition,
    barData,
    projects,
    displayedProjects,
    analytics,
    expandedProject,
    expandedStage,
    toggleProject,
    toggleStage,
    getPriorityClasses,
    getProgressColor,
  };
};

export default useDashboardLayout;
