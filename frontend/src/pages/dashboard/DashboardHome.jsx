import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layers, CheckCircle2, PlusCircle, TrendingUp } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardHome = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "StackTrack API", stages: 4, progress: 85 },
    { id: 2, name: "Portfolio Revamp", stages: 3, progress: 60 },
    { id: 3, name: "Health Tracker App", stages: 5, progress: 35 },
  ]);

  useEffect(() => {
    document.title = "Dashboard | StackTrack";
  }, []);

  const totalProjects = projects.length;
  const avgCompletion = Math.round(
    projects.reduce((a, p) => a + p.progress, 0) / totalProjects
  );
  const totalStages = projects.reduce((a, p) => a + p.stages, 0);

  const barData = {
    labels: projects.map((p) => p.name),
    datasets: [
      {
        label: "Completion (%)",
        data: projects.map((p) => p.progress),
        backgroundColor: "rgba(0, 120, 183, 0.8)",
        borderRadius: 12,
      },
    ],
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="min-h-screen bg-[var(--color-landing-bg)] p-6 md:p-10 space-y-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-[var(--color-landing-navy)]">
            Your Project Overview
          </h1>
          <p className="text-[var(--color-app-text-muted)]">
            Track progress, monitor stages, and stay on top of your work.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              icon: (
                <Layers
                  className="text-[var(--color-landing-primary)]"
                  size={26}
                />
              ),
              label: "Total Projects",
              value: totalProjects,
              bg: "from-[var(--color-app-gradient-start)] to-[var(--color-app-gradient-end)]",
            },
            {
              icon: (
                <CheckCircle2
                  className="text-[var(--color-app-primary)]"
                  size={26}
                />
              ),
              label: "Average Completion",
              value: `${avgCompletion}%`,
              bg: "from-[var(--color-landing-primary)] to-[var(--color-landing-secondary)]",
            },
            {
              icon: (
                <TrendingUp
                  className="text-[var(--color-app-accent)]"
                  size={26}
                />
              ),
              label: "Active Stages",
              value: totalStages,
              bg: "from-[var(--color-app-gradient-end)] to-[var(--color-app-gradient-start)]",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 3}
              className={`p-5 rounded-2xl text-white shadow-md bg-gradient-to-br ${stat.bg} flex items-center justify-between`}
            >
              <div>
                <p className="text-sm opacity-90">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              {stat.icon}
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Overview */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[var(--color-landing-navy)]">
              Active Projects
            </h2>
            <Link
              to="/dashboard/projects/create"
              className="flex items-center gap-2 text-sm bg-[var(--color-landing-primary)] hover:bg-[var(--color-landing-secondary)] text-white px-4 py-2 rounded-full shadow-sm transition"
            >
              <PlusCircle size={16} /> New Project
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 5}
                className="bg-[var(--color-app-surface)] rounded-2xl p-5 border border-[var(--color-app-border)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition space-y-3"
              >
                <h3 className="text-lg font-semibold text-[var(--color-app-text)]">
                  {project.name}
                </h3>
                <p className="text-sm text-[var(--color-app-text-muted)]">
                  {project.stages} Stages • {project.progress}% Complete
                </p>
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <motion.div
                    className="h-2 bg-[var(--color-landing-primary)] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${project.progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="text-[var(--color-landing-primary)] text-sm font-medium hover:underline"
                >
                  View Details →
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Simple Analytics */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
          className="mt-10"
        >
          <h2 className="text-xl font-semibold mb-4 text-[var(--color-landing-navy)]">
            Project Completion Overview
          </h2>

          <div className="bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-2xl p-6 shadow-[var(--shadow-soft)]">
            <div className="h-64">
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: "rgba(15, 23, 42, 0.8)",
                      titleColor: "#fff",
                      bodyColor: "#fff",
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: "#6b7280" },
                      grid: { color: "#f0f0f0" },
                    },
                    x: {
                      ticks: { color: "#6b7280" },
                      grid: { display: false },
                    },
                  },
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
