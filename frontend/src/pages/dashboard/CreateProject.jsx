import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ArrowLeft, Save, PlusCircle, Trash2, ClipboardList } from "lucide-react";
import { useProjectStore } from "../../store/useProjectStore";

const CreateProject = () => {
  const navigate = useNavigate();
  const { addProject, loading, error: storeError } = useProjectStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stages: [],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    document.title = "Create Project | StackTrack";
  }, []);

  // ---------- Form Handlers ----------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleAddStage = () => {
    setFormData((prev) => ({
      ...prev,
      stages: [...prev.stages, { id: crypto.randomUUID(), title: "", tasks: [] }],
    }));
  };

  const handleRemoveStage = (index) => {
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.filter((_, i) => i !== index),
    }));
  };

  const handleStageChange = (index, value) => {
    const updated = [...formData.stages];
    updated[index].title = value;
    setFormData({ ...formData, stages: updated });
  };

  const handleAddTask = (stageIndex) => {
    const updated = [...formData.stages];
    updated[stageIndex].tasks.push({
      id: crypto.randomUUID(),
      title: "",
      description: "",
      priority: "low",
      due_date: "",
    });
    setFormData({ ...formData, stages: updated });
  };

  const handleTaskChange = (stageIndex, taskIndex, field, value) => {
    const updated = [...formData.stages];
    updated[stageIndex].tasks[taskIndex][field] = value;
    setFormData({ ...formData, stages: updated });
  };

  const handleRemoveTask = (stageIndex, taskIndex) => {
    const updated = [...formData.stages];
    updated[stageIndex].tasks.splice(taskIndex, 1);
    setFormData({ ...formData, stages: updated });
  };

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Title and description are required.");
      return;
    }

    if (formData.stages.length === 0) {
      setError("Add at least one stage.");
      return;
    }

    try {
      await addProject(formData);
      setSuccess("Project created successfully!");
      setTimeout(() => navigate("/projects"), 1200);
    } catch (err) {
      console.error(err);
      setError("Failed to create project.");
    }
  };

  return (
    <DashboardLayout pageTitle="Create Project">
      <div className="min-h-screen bg-[var(--color-landing-bg)] py-10">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
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
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-landing-primary)]"
            />
            <textarea
              name="description"
              placeholder="Project Description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-landing-primary)] resize-none"
            />

            {/* Stages */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <ClipboardList size={18} /> Stages
                </h2>
                <button
                  type="button"
                  onClick={handleAddStage}
                  className="flex items-center gap-2 text-sm bg-[var(--color-landing-primary)] hover:bg-[var(--color-landing-secondary)] text-white px-4 py-2 rounded-full"
                >
                  <PlusCircle size={16} /> Add Stage
                </button>
              </div>

              {formData.stages.map((stage, si) => (
                <div key={stage.id} className="p-4 bg-white rounded-xl border shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      placeholder={`Stage ${si + 1} title`}
                      value={stage.title}
                      onChange={(e) => handleStageChange(si, e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveStage(si)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Tasks */}
                  {stage.tasks.map((task, ti) => (
                    <div key={task.id} className="p-3 border rounded-md bg-gray-50 space-y-2">
                      <input
                        type="text"
                        placeholder="Task title"
                        value={task.title}
                        onChange={(e) => handleTaskChange(si, ti, "title", e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                      <textarea
                        rows={2}
                        placeholder="Task description"
                        value={task.description}
                        onChange={(e) => handleTaskChange(si, ti, "description", e.target.value)}
                        className="w-full p-2 border rounded-md resize-none"
                      />
                      <div className="flex gap-2">
                        <select
                          value={task.priority}
                          onChange={(e) => handleTaskChange(si, ti, "priority", e.target.value)}
                          className="p-2 border rounded-md"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                        <input
                          type="date"
                          value={task.due_date}
                          onChange={(e) => handleTaskChange(si, ti, "due_date", e.target.value)}
                          className="p-2 border rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveTask(si, ti)}
                          className="text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => handleAddTask(si)}
                    className="text-[var(--color-landing-primary)] text-sm flex items-center gap-1 mt-2"
                  >
                    <PlusCircle size={14} /> Add Task
                  </button>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-[var(--color-landing-primary)] to-[var(--color-landing-secondary)] text-white px-6 py-3 rounded-full shadow-md disabled:opacity-60"
              >
                <Save size={18} /> {loading ? "Saving..." : "Save Project"}
              </button>
            </div>

            {/* Feedback */}
            {(error || storeError) && <p className="text-red-500 text-center">{error || storeError}</p>}
            {success && <p className="text-green-600 text-center">{success}</p>}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateProject;
