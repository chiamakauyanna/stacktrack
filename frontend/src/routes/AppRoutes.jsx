import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Profile from "../pages/dashboard/Profile";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/resetPassword";
import Projects from "../pages/projects/Projects";
import CreateProject from "../pages/dashboard/CreateProject";
import ProjectStats from "../pages/projects/ProjectStats";
import ProjectDetail from "../pages/projectDetail/ProjectDetail";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/create" element={<CreateProject />} />
      <Route path="projects/:id" element={<ProjectDetail />} />
      <Route path="/dashboard/profile" element={<Profile />} />

      <Route path="/projects/analytics" element={<ProjectStats />} />
    </Routes>
  );
};

export default AppRoutes;
