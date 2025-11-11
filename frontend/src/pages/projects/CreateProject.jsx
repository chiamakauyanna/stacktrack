import { useState } from "react";
import useProjects from "../../hooks/useProjects";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  Save,
  PlusCircle,
  ClipboardList,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import StageForm from "../../components/projectForms/StageForm";

const CreateProject = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleAddStageForm,
    handleAddTaskForm,
    handleRemoveStageForm,
    handleRemoveTaskForm,
    handleStageChangeForm,
    handleTaskChangeForm,
    loading,
  } = useProjects();

  const [allExpanded, setAllExpanded] = useState(true);
  const toggleAllStages = () => setAllExpanded((prev) => !prev);

  return (
    <DashboardLayout>
      <div className="min-h-screen py-4">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {/* Header */}
          <h1 className="md:text-xl">Create New Project</h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-surface rounded-xl shadow-sm p-4 md:p-8 space-y-8"
          >
            {/* Project Info */}
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400 text-sm"
              />

              <textarea
                name="description"
                placeholder="Project Description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-gray-400 resize-none text-sm"
              />
            </div>

            {/* Stages Header */}
            <div className="flex justify-between items-center shadow-sm p-6">
              <h2 className="font-medium flex items-center gap-2 text-gray-700">
                <ClipboardList size={18} /> Stages
              </h2>

              <div className="flex flex-col md:flex-row lg:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={toggleAllStages}
                  className="text-sm flex items-center gap-1 px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition"
                >
                  {allExpanded ? (
                    <>
                      <ChevronUp size={14} /> Collapse All
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} /> Expand All
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleAddStageForm}
                  className="flex items-center gap-2 text-sm px-4 py-3 rounded-md bg-primary text-white hover:bg-secondary transition"
                >
                  <PlusCircle size={16} /> Add Stage
                </button>
              </div>
            </div>

            {/* Stage List */}
            <div className="space-y-5">
              {formData.stages.length === 0 ? (
                <div className="text-center bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-500 text-sm mb-4">
                    Every project starts with at least one stage. Would you like
                    to begin with a{" "}
                    <span className="font-medium text-gray-700">
                      “Planning”
                    </span>{" "}
                    stage?
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handleAddStageForm({ title: "Planning", description: "" })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-secondary transition"
                  >
                    <PlusCircle size={14} /> Add Planning Stage
                  </button>
                </div>
              ) : (
                formData.stages.map((stage, si) => (
                  <StageForm
                    key={stage.id}
                    stage={stage}
                    si={si}
                    handleStageChangeForm={handleStageChangeForm}
                    handleRemoveStageForm={handleRemoveStageForm}
                    handleAddTaskForm={handleAddTaskForm}
                    handleTaskChangeForm={handleTaskChangeForm}
                    handleRemoveTaskForm={handleRemoveTaskForm}
                    allExpanded={allExpanded}
                  />
                ))
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-4 bg-green-500 text-white font-medium rounded-lg hover:bg-secondary transition disabled:opacity-60 text-sm"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateProject;
