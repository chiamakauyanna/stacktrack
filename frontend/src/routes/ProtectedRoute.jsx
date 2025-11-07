import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = () => {
  const { user, loading } = useAuthStore();

  // Only show loader during auth check
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-navy">
        Loading user data... 
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
