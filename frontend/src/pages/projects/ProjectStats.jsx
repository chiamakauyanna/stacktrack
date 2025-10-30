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
  const {
    barData,
    fadeUp,
    analytics,
    getProjectContainerWidth,
    displayedProjects,
  } = useDashboardLayout();

  const summary = analytics?.summary || {};
  const projectIcons = [
    <Layers size={28} className="text-landing-navy" />,
    <CheckCircle2 size={28} className="text-landing-navy" />,
    <TrendingUp size={28} className="text-landing-navy" />,
  ];

  const taskData = {
    labels: ["Completed Tasks", "Pending Tasks"],
    datasets: [
      {
        data: [summary.completed_tasks || 0, summary.pending_tasks || 0],
        backgroundColor: ["#22c55e", "#facc15"],
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen md:p-6 space-y-8">

        {/* === HEADER SECTION === */}
        <section className="bg-[#f1f5f9] p-6 rounded-2xl shadow-sm border-l-4 border-l-[#0ea5e9]">
          <HeaderSection fadeUp={fadeUp} />
        </section>

        {/* === ACTIVE PROJECTS + TASK OVERVIEW === */}
        <section className="bg-[#e0f2fe] p-6 rounded-2xl shadow-sm border-l-4 border-l-[#14b8a6]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ActiveProjects
              displayedProjects={displayedProjects}
              getProjectContainerWidth={getProjectContainerWidth}
              fadeUp={fadeUp}
              projectIcons={projectIcons}
              totalProjects={summary.total_projects || 0}
            />
            <TaskOverviewChart fadeUp={fadeUp} taskData={taskData} />
          </div>
        </section>

        {/* === CHARTS + STATS === */}
        <section className="bg-[#fff7ed] p-6 rounded-2xl shadow-sm border-l-4 border-l-[#fb7185]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <TrendChart analytics={analytics} fadeUp={fadeUp} />
              <CompletionChart barData={barData} fadeUp={fadeUp} />
            </div>

            <div className="space-y-8">
              <QuickStats summary={summary} fadeUp={fadeUp} />
              <RecentProjects analytics={analytics} fadeUp={fadeUp} />
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
