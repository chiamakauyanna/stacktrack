import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Layers,
  ListTodo,
  User,
  AlertCircle,
} from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    document.title = "Project Details | StackTrack";

    // Mock data (replace with API fetch later)
    setProject({
      id,
      title: "Health Tracker App",
      description:
        "A cross-platform app to monitor user health metrics, daily steps, and nutrition intake.",
      slug: "health-tracker-app",
      owner: "Chammy",
      status: "active",
      progress: 70,
      task_statistics: {
        todo: 4,
        in_progress: 3,
        done: 8,
      },
      stages: [
        {
          id: "1",
          title: "Design Phase",
          order: 1,
          progress: 100,
          tasks: [
            {
              id: "1",
              title: "Create wireframes",
              description: "Sketch low-fidelity wireframes for core screens.",
              status: "done",
              priority: "medium",
              due_date: "2025-10-25",
              assigned_to: {
                username: "alex",
                email: "alex@example.com",
                profile: {
                  bio: "UI/UX Designer",
                  avatar: "",
                  role: "Designer",
                },
              },
            },
          ],
        },
        {
          id: "2",
          title: "Development Phase",
          order: 2,
          progress: 50,
          tasks: [
            {
              id: "2",
              title: "Set up API routes",
              description: "Implement REST endpoints for health metrics.",
              status: "in_progress",
              priority: "high",
              due_date: "2025-11-01",
              assigned_to: {
                username: "chammy",
                email: "chammy@example.com",
                profile: {
                  bio: "Full-stack Developer",
                  avatar: "",
                  role: "Developer",
                },
              },
            },
          ],
        },
      ],
      created_at: "2025-10-01T10:12:23.231Z",
      updated_at: "2025-10-20T14:35:00.231Z",
    });
  }, [id]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  if (!project) return null;

  return (
    <DashboardLayout pageTitle={project.title}>
      <div className="p-6 md:p-10 space-y-10">
        {/* Back Button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 text-[var(--color-app-text-muted)]"
        >
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm hover:text-[var(--color-app-primary)] transition"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <h1 className="text-2xl font-bold text-[var(--color-landing-navy)]">
              {project.title}
            </h1>
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                project.status === "active"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {project.status}
            </span>
          </div>
          <p className="text-[var(--color-app-text-muted)] leading-relaxed">
            {project.description}
          </p>

          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <motion.div
              className="h-2 bg-[var(--color-landing-primary)] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>

          <p className="text-sm text-gray-500">
            Progress: {project.progress}% complete
          </p>
        </motion.div>

        {/* Task Statistics */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="grid sm:grid-cols-3 gap-4"
        >
          {[
            {
              label: "To Do",
              value: project.task_statistics.todo,
              icon: <ListTodo className="text-gray-500" />,
              color: "bg-gray-50",
            },
            {
              label: "In Progress",
              value: project.task_statistics.in_progress,
              icon: <Clock className="text-[var(--color-landing-primary)]" />,
              color: "bg-blue-50",
            },
            {
              label: "Completed",
              value: project.task_statistics.done,
              icon: <CheckCircle className="text-green-500" />,
              color: "bg-green-50",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 3}
              className={`rounded-2xl p-4 flex items-center justify-between ${stat.color}`}
            >
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-semibold">{stat.value}</h3>
              </div>
              {stat.icon}
            </motion.div>
          ))}
        </motion.div>

        {/* Stages and Tasks */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="space-y-8"
        >
          {project.stages.map((stage, i) => (
            <motion.div
              key={stage.id}
              variants={fadeUp}
              custom={i + 5}
              className="bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-2xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[var(--color-landing-navy)] flex items-center gap-2">
                  <Layers size={18} /> {stage.title}
                </h2>
                <span className="text-sm text-gray-500">
                  Progress: {stage.progress}%
                </span>
              </div>

              <div className="space-y-3">
                {stage.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition"
                  >
                    <div>
                      <h3 className="font-medium text-[var(--color-landing-navy)]">
                        {task.title}
                      </h3>
                      <p className="text-sm text-[var(--color-app-text-muted)]">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <User size={12} />
                        {task.assigned_to.username} • Due{" "}
                        {new Date(task.due_date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-0 flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          task.status === "done"
                            ? "bg-green-100 text-green-600"
                            : task.status === "in_progress"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;
