import DashboardLayout from "../../layouts/DashboardLayout";
import useDashboardLayout from "../../hooks/useDashboardLayout";
import HeaderSection from "../../components/dashboardSections/HeaderSection";
import ActiveProjects from "../../components/dashboardSections/ActiveProjects";
import TaskOverviewChart from "../../components/dashboardSections/TaskOverviewChart";
import TrendChart from "../../components/dashboardSections/TrendChart";
import CompletionChart from "../../components/dashboardSections/CompletionChart";
import QuickStats from "../../components/dashboardSections/QuickStats";
import RecentProjects from "../../components/dashboardSections/RecentProjects";
import { Layers, CheckCircle2, TrendingUp } from "lucide-react";

const DashboardHome = () => {
  const { barData, fadeUp, analytics, displayedProjects } =
    useDashboardLayout();

  const summary = analytics.summary || {};
  const projectIcons = [
    <Layers size={28} className="text-navy" />,
    <CheckCircle2 size={28} className="text-navy" />,
    <TrendingUp size={28} className="text-navy" />,
  ];

  const taskData = {
    labels: ["Completed Tasks", "Pending Tasks"],
    datasets: [
      {
        data:
          summary.completed_tasks > 0 || summary.pending_tasks > 0
            ? [summary.completed_tasks, summary.pending_tasks]
            : [1], // placeholder so the doughnut is visible
        backgroundColor:
          summary.completed_tasks > 0 || summary.pending_tasks > 0
            ? ["#22c55e", "#facc15"]
            : ["#e5e7eb"], // gray placeholder color
        borderWidth: 0,
      },
    ],
  };

  return (
      <div className="min-h-screen p-3 space-y-4">
        {/*  HEADER  */}
        <HeaderSection fadeUp={fadeUp} />

        {/*  MAIN GRID  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/*  LEFT MAIN SECTION  */}
          <div className="md:col-span-2 space-y-4">
            {/* Quick Stats */}
            <QuickStats summary={summary} fadeUp={fadeUp} />

            {/* Task Overview + Completion Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TaskOverviewChart fadeUp={fadeUp} taskData={taskData} />
              <CompletionChart barData={barData} fadeUp={fadeUp} />
            </div>

            {/* Active Projects */}
            <ActiveProjects
              displayedProjects={displayedProjects}
              fadeUp={fadeUp}
              projectIcons={projectIcons}
            />
          </div>

          {/*  RIGHT ASIDE  */}
          <aside className="space-y-4 rounded-2xl md:grid md:grid-cols-2 gap-4 lg:block md:col-span-2 lg:col-span-1">
            <TrendChart analytics={analytics || {}} fadeUp={fadeUp} />
            <RecentProjects analytics={analytics || {}} fadeUp={fadeUp} />
          </aside>
        </div>
      </div>
  );
};

export default DashboardHome;
