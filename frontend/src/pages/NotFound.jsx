import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
        <AlertCircle size={72} className="text-primary mb-4" />
        <h1 className="text-3xl font-bold text-navy mb-3">
          404 — Page Not Found
        </h1>
        <p className="text-gray-500 mb-6 max-w-md">
          The page you’re looking for doesn’t exist, has been moved,
          or may be temporarily unavailable.
        </p>
        <Link
          to="/dashboard"
          className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default NotFound;
