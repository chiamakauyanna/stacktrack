import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useProjectStore } from "../store/useProjectStore";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

const useDashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const [greeting, setGreeting] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { projects, analytics, loadAnalytics, loadProjects, loading, error } =
    useProjectStore();
  const [expandedProject, setExpandedProject] = useState(null);
  const [expandedStage, setExpandedStage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  useEffect(() => {
  if (user && (!analytics || !projects.length)) {
    Promise.allSettled([
      !analytics && loadAnalytics(),
      !projects.length && loadProjects(),
    ]);
  }
}, [user]);


  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const initials = user?.username?.charAt(0)?.toUpperCase() || "?";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setShowUserMenu(false);
  };

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

  // Dynamic bar colors based on progress
  const barColors = projects.map((p) => {
    const progress = parseInt(p.progress) || 0;
    if (progress >= 80) return "rgba(34, 197, 94, 0.8)"; // Green
    if (progress >= 50) return "rgba(253, 224, 71, 0.8)"; // Yellow
    return "rgba(239, 68, 68, 0.8)"; // Red
  });

  const barData = {
    labels: projects.map((p) => p.title),
    datasets: [
      {
        label: "Completion (%)",
        data: projects.map((p) => parseInt(p.progress) || 0),
        backgroundColor: barColors,
        borderRadius: 8,
      },
    ],
  };

  // Limit to show max 3 projects
  const displayedProjects = projects.slice(0, 3);

  // Flex width control for projects section
  const getProjectContainerWidth = () => {
    switch (displayedProjects.length) {
      case 1:
        return "w-1/2";
      case 2:
        return "w-2/3";
      case 3:
        return "w-3/4";
      default:
        return "w-full";
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  const toggleProject = (id, e) => {
    e.stopPropagation();
    setExpandedProject(expandedProject === id ? null : id);
    setExpandedStage(null);
  };

  const toggleStage = (id) => {
    setExpandedStage(expandedStage === id ? null : id);
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

  return {
    loading,
    error,
    user,
    greeting,
    showUserMenu,
    setShowUserMenu,
    isSidebarOpen,
    setIsSidebarOpen,
    location,
    initials,
    handleLogout,
    sidebarVariants,
    transition,
    // DashboardHome
    barData,
    fadeUp,
    projects,
    getProjectContainerWidth,
    displayedProjects,

    // Analytics
    analytics,
    loadAnalytics,
    // Projects
    expandedProject,
    expandedStage,
    toggleProject,
    toggleStage,
    getPriorityClasses,
    getProgressColor,
  };
};

export default useDashboardLayout;
