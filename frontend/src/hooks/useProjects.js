import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProjectStore } from "../store/useProjectStore";
import { useAuthStore } from "../store/useAuthStore";
import useToast from "./useToast";

const useProjects = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const { user } = useAuthStore();

  // UI states
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(""); // "task" | "stage" | "project"
  const [data, setData] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  // Project creation form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stages: [],
  });

  // Store access
  const {
    project,
    stages,
    loadProject,
    addProject,
    editProject,
    removeProject,
    addStage,
    editStage,
    removeStage,
    addTask,
    editTask,
    removeTask,
    changeTaskStatus,
  } = useProjectStore();

  const loading = useProjectStore((state) => state.loading);
  const error = useProjectStore((state) => state.error);

  // Load project when ID changes (avoid reloading same project)
  useEffect(() => {
    if (id && (!project || project.id !== id)) {
      loadProject(id);
    }
  }, [id, project, loadProject]);

  useEffect(() => {
    if (project && project.stages?.length === 0) {
      toast.info("This project has no stages yet. Add one to begin tracking.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  // Project creation form handlers
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddStageForm = () =>
    setFormData((prev) => ({
      ...prev,
      stages: [
        ...prev.stages,
        { id: crypto.randomUUID(), title: "", tasks: [] },
      ],
    }));

  const handleRemoveStageForm = (index) =>
    setFormData((prev) => ({
      ...prev,
      stages: prev.stages.filter((_, i) => i !== index),
    }));

  const handleStageChangeForm = (index, value) => {
    const updated = [...formData.stages];
    updated[index].title = value;
    setFormData({ ...formData, stages: updated });
  };

  const handleAddTaskForm = (stageIndex) => {
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

  const handleTaskChangeForm = (stageIndex, taskIndex, field, value) => {
    const updated = [...formData.stages];
    updated[stageIndex].tasks[taskIndex][field] = value;
    setFormData({ ...formData, stages: updated });
  };

  const handleRemoveTaskForm = (stageIndex, taskIndex) => {
    const updated = [...formData.stages];
    updated[stageIndex].tasks.splice(taskIndex, 1);
    setFormData({ ...formData, stages: updated });
  };

  // Submit new project
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    if (formData.stages.length === 0) {
      toast.error("Add at least one stage");
      return;
    }

    const loadingToast = toast.loading("Creating project...");
    try {
      await addProject(formData);
      toast.success("Project created successfully!", { id: loadingToast });
      navigate("/projects");
    } catch (err) {
      toast.error("Failed to create project", { id: loadingToast });
      console.error(err);
    }
  };

  // Modal logic
  const openModal = (type, stage = null, task = null) => {
    setEditingType(type);
    setSelectedStage(stage?.id || null);
    setSelectedTask(task || null);

    if (type === "task") {
      setData(
        task
          ? { ...task }
          : {
              title: "",
              description: "",
              due_date: "",
              status: "pending",
              stage: stage?.id || null,
            }
      );
    } else if (type === "stage") {
      setData(
        stage
          ? { title: stage.title, project: stage.project || project?.id }
          : { title: "", project: project?.id }
      );
    } else if (type === "project") {
      setData(
        project
          ? {
              title: project?.title || "",
              description: project?.description || "",
            }
          : { title: "", description: "" }
      );
    }

    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const loadingToast = toast.loading("Saving...");

    try {
      if (editingType === "task") {
        selectedTask
          ? await editTask(selectedTask.id, data)
          : await addTask(selectedStage, data);
      } else if (editingType === "stage") {
        selectedStage
          ? await editStage(selectedStage, data)
          : await addStage(project.id, data);
      } else if (editingType === "project") {
        await editProject(project.id, data);
      }

      toast.success(`${editingType} saved successfully`, { id: loadingToast });
      setIsModalOpen(false);
      setData({ title: "", description: "", due_date: "" });
    } catch (err) {
      toast.error(`Failed to save ${editingType}`, { id: loadingToast });
      console.error(err);
    }
  };

  // Delete a project
  const handleDeleteProject = async (projectId) => {
    const loadingToast = toast.loading("Deleting project...");
    try {
      await removeProject(projectId);
      toast.success("Project deleted successfully", { id: loadingToast });
      navigate("/projects");
    } catch (err) {
      toast.error("Failed to delete project", { id: loadingToast });
      console.error(err);
    }
  };

  // Toggle task status
  const toggleTaskStatusHandler = async (task) => {
    const loadingToast = toast.loading("Updating task...");
    try {
      await changeTaskStatus(
        task.id,
        task.status === "completed" ? "pending" : "completed"
      );
      toast.success("Task status updated", { id: loadingToast });
    } catch (err) {
      toast.error("Failed to update task status", { id: loadingToast });
      console.error(err);
    }
  };

  return {
    // Create Project form
    formData,
    handleChange,
    handleSubmit,
    handleAddStageForm,
    handleAddTaskForm,
    handleRemoveStageForm,
    handleRemoveTaskForm,
    handleStageChangeForm,
    handleTaskChangeForm,

    // Modal logic
    data,
    setData,
    openModal,
    handleSave,
    isModalOpen,
    setIsModalOpen,
    selectedStage,
    selectedTask,
    editingType,

    // Project / stages / tasks
    project,
    stages,
    user,

    // Store actions
    removeStage,
    removeTask,
    handleDeleteProject,
    toggleTaskStatusHandler,

    // States
    loading,
    error,
    navigate,
  };
};

export default useProjects;
