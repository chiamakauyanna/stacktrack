import { useState } from "react";
import useProjects from "../../hooks/useProjects";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  ArrowLeft,
  Save,
  PlusCircle,
  ClipboardList,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import StageForm from "../../components/projectSection/forms/StageForm";

const CreateProject = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    navigate,
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
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3 mx-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-app-primary transition"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <h1 className="md:text-xl font-semibold text-landing-navy">
              Create New Project
            </h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-app-surface rounded-xl shadow-sm p-4 md:p-8 space-y-8"
          >
            {/* Project Info */}
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-app-primary focus:outline-none placeholder:text-gray-400 text-sm"
              />

              <textarea
                name="description"
                placeholder="Project Description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-app-primary focus:outline-none placeholder:text-gray-400 resize-none text-sm"
              />
            </div>

            {/* Stages Header */}
            <div className="flex justify-between items-center border-t pt-6">
              <h2 className="font-medium flex items-center gap-2 text-gray-700">
                <ClipboardList size={18} /> Stages
              </h2>

              <div className="flex flex-col md:flex-row lg:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={toggleAllStages}
                  className="text-sm flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-300 text-gray-600 hover:border-app-primary hover:text-app-primary transition"
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
                  className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-app-primary text-white hover:bg-app-secondary transition"
                >
                  <PlusCircle size={16} /> Add Stage
                </button>
              </div>
            </div>

            {/* Stage List */}
            <div className="space-y-5">
              {formData.stages.length === 0 ? (
                <p className="text-gray-400 text-sm italic">
                  No stages added yet.
                </p>
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
            <div className="flex justify-end border-t pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-app-primary text-white font-medium rounded-lg hover:bg-app-secondary transition disabled:opacity-60 text-sm"
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
