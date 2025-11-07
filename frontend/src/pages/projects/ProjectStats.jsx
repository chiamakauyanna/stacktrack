import DashboardLayout from "../../layouts/DashboardLayout";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useProjectStore } from "../../store/useProjectStore";
import StatsHeader from "../../components/statsSections/StatsHeader";
import SummaryCards from "../../components/statsSections/SummaryCards";
import ProjectBreakdown from "../../components/statsSections/ProjectBreakdown";
import TrendChart from "../../components/statsSections/TrendChart";
import { summaryCards } from "../../services/data";

const ProjectStats = () => {
  const { analytics, loading, error } = useProjectStore();

  if (loading.analytics)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen text-gray-500">
          Loading analytics...
        </div>
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen text-red-500">
          {error}
        </div>
      </DashboardLayout>
    );

  if (!analytics)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen text-gray-500">
          No analytics data found.
        </div>
      </DashboardLayout>
    );

  const summary = analytics.summary || {};
  const trend = analytics.trend || [];
  const projects = analytics.projects || [];

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 space-y-6">
        <StatsHeader averageProgress={summary.average_project_progress ?? 0} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SummaryCards cards={summaryCards(summary)} />
            <ProjectBreakdown projects={projects} />
          </div>

          <TrendChart trend={trend} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectStats;
