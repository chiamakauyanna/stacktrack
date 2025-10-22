import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, PlusCircle, Trash2, ClipboardList } from "lucide-react";

const CreateProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    progress: "0%",
    task_statistics: "",
    stages: [],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    document.title = "Create Project | StackTrack";
  }, []);

  // ===== Handlers =====
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleAddStage = () => {
    const newStage = {
      id: crypto.randomUUID(),
      title: "",
      order: formData.stages.length,
      progress: "0%",
      tasks: [],
    };
    setFormData({ ...formData, stages: [...formData.stages, newStage] });
  };

  const handleRemoveStage = (i) => {
    const updated = [...formData.stages];
    updated.splice(i, 1);
    setFormData({ ...formData, stages: updated });
  };

  const handleStageChange = (i, f, v) => {
    const updated = [...formData.stages];
    updated[i][f] = v;
    setFormData({ ...formData, stages: updated });
  };

  const handleAddTask = (i) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      priority: "low",
      due_date: "",
      assigned_to: {
        id: 1,
        username: "example_user",
        email: "user@example.com",
        profile: { bio: "", avatar: "", role: "member" },
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [...formData.stages];
    updated[i].tasks.push(newTask);
    setFormData({ ...formData, stages: updated });
  };

  const handleRemoveTask = (si, ti) => {
    const updated = [...formData.stages];
    updated[si].tasks.splice(ti, 1);
    setFormData({ ...formData, stages: updated });
  };

  const handleTaskChange = (si, ti, f, v) => {
    const updated = [...formData.stages];
    updated[si].tasks[ti][f] = v;
    setFormData({ ...formData, stages: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setError("Please fill out all required fields.");
      return;
    }
    if (formData.stages.length === 0) {
      setError("Please add at least one stage.");
      return;
    }
    console.log("Final project payload:", formData);
    setSuccess("Project created successfully!");
    setTimeout(() => navigate("/dashboard/projects"), 1500);
  };

  // ===== Render =====
  return (
    <DashboardLayout pageTitle="Create Project">
      <div className="min-h-screen bg-[var(--color-landing-bg)] py-10">
        <div className="max-w-4xl mx-auto space-y-8 px-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[var(--color-landing-primary)] hover:text-[var(--color-landing-secondary)] transition"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <h1 className="text-3xl font-heading font-bold text-[var(--color-landing-navy)]">
              Create New Project
            </h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[var(--color-app-surface)] rounded-2xl shadow-lg p-8 space-y-8 border border-gray-200 backdrop-blur-sm"
          >
            {/* Project Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--color-landing-text)] mb-2">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., StackTrack API"
                  className="w-full p-3 rounded-lg border border-gray-200 bg-white/70 focus:ring-2 focus:ring-[var(--color-landing-primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--color-landing-text)] mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Briefly describe your project..."
                  className="w-full p-3 rounded-lg border border-gray-200 bg-white/70 focus:ring-2 focus:ring-[var(--color-landing-primary)] focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Stages */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-[var(--color-landing-navy)]">
                  <ClipboardList size={18} /> Project Stages
                </h2>
                <button
                  type="button"
                  onClick={handleAddStage}
                  className="flex items-center gap-2 text-sm bg-[var(--color-landing-primary)] hover:bg-[var(--color-landing-secondary)] text-white px-4 py-2 rounded-full font-medium shadow-md transition"
                >
                  <PlusCircle size={16} /> Add Stage
                </button>
              </div>

              {formData.stages.map((stage, stageIndex) => (
                <div
                  key={stage.id}
                  className="p-5 bg-gradient-to-br from-[var(--color-app-gradient-start)]/20 to-[var(--color-app-gradient-end)]/20 rounded-xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-[var(--color-app-text)]">
                      Stage {stageIndex + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleRemoveStage(stageIndex)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Stage title"
                    value={stage.title}
                    onChange={(e) =>
                      handleStageChange(stageIndex, "title", e.target.value)
                    }
                    className="w-full p-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-[var(--color-landing-primary)] focus:outline-none"
                  />

                  {/* Tasks */}
                  <div className="space-y-3 mt-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-[var(--color-app-text-muted)]">
                        Tasks in this Stage
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleAddTask(stageIndex)}
                        className="text-[var(--color-landing-primary)] hover:text-[var(--color-landing-secondary)] text-sm flex items-center gap-1"
                      >
                        <PlusCircle size={14} /> Add Task
                      </button>
                    </div>

                    {stage.tasks.map((task, taskIndex) => (
                      <div
                        key={task.id}
                        className="p-4 border border-gray-100 rounded-lg bg-white/60 space-y-3 shadow-sm"
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-sm text-[var(--color-app-text)]">
                            Task {taskIndex + 1}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveTask(stageIndex, taskIndex)
                            }
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <input
                          type="text"
                          placeholder="Task title"
                          value={task.title}
                          onChange={(e) =>
                            handleTaskChange(
                              stageIndex,
                              taskIndex,
                              "title",
                              e.target.value
                            )
                          }
                          className="w-full p-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-[var(--color-landing-primary)] focus:outline-none"
                        />

                        <textarea
                          rows="2"
                          placeholder="Task description"
                          value={task.description}
                          onChange={(e) =>
                            handleTaskChange(
                              stageIndex,
                              taskIndex,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full p-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-[var(--color-landing-primary)] focus:outline-none resize-none"
                        />

                        <div className="grid sm:grid-cols-2 gap-2">
                          <select
                            value={task.priority}
                            onChange={(e) =>
                              handleTaskChange(
                                stageIndex,
                                taskIndex,
                                "priority",
                                e.target.value
                              )
                            }
                            className="p-2 border border-gray-200 rounded-md bg-white"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>

                          <input
                            type="date"
                            value={task.due_date}
                            onChange={(e) =>
                              handleTaskChange(
                                stageIndex,
                                taskIndex,
                                "due_date",
                                e.target.value
                              )
                            }
                            className="p-2 border border-gray-200 rounded-md bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-[var(--color-landing-primary)] to-[var(--color-landing-secondary)] hover:opacity-90 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-200"
              >
                <Save size={18} /> Save Project
              </button>
            </div>

            {/* Feedback */}
            {error && (
              <p className="text-red-500 text-sm font-medium text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm font-medium text-center">{success}</p>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateProject;
