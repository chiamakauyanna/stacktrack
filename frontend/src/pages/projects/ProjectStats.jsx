// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useProjectStore } from "../../store/useProjectStore";

const ProjectStats = () => {
  const { analytics, loading, error } = useProjectStore();

  if (loading)
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
  const summary = analytics?.summary || {
    total_projects: 0,
    completed_projects: 0,
    active_projects: 0,
    draft_projects: 0,
    total_tasks: 0,
    completed_tasks: 0,
    pending_tasks: 0,
    average_project_progress: 0,
  };
  const trend = analytics?.trend || [];
  const projects = analytics?.projects || [];

  const summaryCards = [
    { label: "Total Projects", value: summary.total_projects },
    { label: "Completed Projects", value: summary.completed_projects },
    { label: "Active Projects", value: summary.active_projects },
    { label: "Draft Projects", value: summary.draft_projects },
    { label: "Total Tasks", value: summary.total_tasks },
    { label: "Completed Tasks", value: summary.completed_tasks },
    { label: "Pending Tasks", value: summary.pending_tasks },
    { label: "Avg Progress (%)", value: summary.average_project_progress },
  ];

  const averageProgress = summary.average_project_progress ?? 0;

  return (
    <DashboardLayout>
      <div className="p-6 md:p-10 bg-gray-50 min-h-screen space-y-10">
        {/* ===== Header ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-landing-navy">
            Project Analytics
          </h1>

          {/* Radial Progress Circle */}
          <div className="flex items-center justify-center">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-app-primary"
                  strokeWidth="3"
                  strokeDasharray={`${averageProgress}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-semibold text-landing-navy">
                  {averageProgress}%
                </span>
                <span className="text-xs text-gray-500 text-center">
                  Overall
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== Summary Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all"
            >
              <h3 className="text-sm text-gray-500">{card.label}</h3>
              <p className="text-2xl font-semibold text-landing-navy mt-2">
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ===== Trend Chart ===== */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-landing-navy">
            Weekly Task Completion Trend
          </h2>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            {trend.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week_start" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed_tasks" fill="#0E938D" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-10">
                No trend data available yet.
              </p>
            )}
          </div>
        </div>

        {/* ===== Per Project Breakdown ===== */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-landing-navy">
            Per Project Breakdown
          </h2>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-5"
                >
                  <h3 className="text-lg font-semibold text-landing-navy mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Status:</span> {p.status}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Progress:</span> {p.progress}%
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Tasks:</span>{" "}
                    {p.completed_tasks}/{p.total_tasks}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
                    <div
                      className="h-2 bg-app-primary rounded-full transition-all duration-500"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-400 mt-3">
                    Last updated: {p.last_updated}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">
              No projects available yet.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectStats;
