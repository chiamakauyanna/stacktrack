import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProjectStore } from "../store/useProjectStore";
import { useAuthStore } from "../store/useAuthStore";
import useToast from "./useToast";

const useProjects = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthStore();
  const toast = useToast();

  // ----- Modal / Detail data -----
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(""); // "task" | "stage" | "project"
  const [data, setData] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  // ----- Form data for CreateProject -----
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stages: [],
  });

  const projectStore = useProjectStore();
  const {
    project,
    stages,
    loadProject,
    addProject,
    editProject,
    removeProject,
    loading,
    addStage,
    editStage,
    removeStage,
    addTask,
    editTask,
    removeTask,
    changeTaskStatus,
  } = projectStore;

  // ---------- Load project ----------
  useEffect(() => {
    if (id) loadProject(id);
  }, [id, loadProject]); 

  // ---------- CreateProject form handlers ----------
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

  // ---------- Modal Handlers ----------
  const openModal = (type, stage = null, task = null) => {
    setEditingType(type);
    setSelectedStage(stage?.id || null);
    setSelectedTask(task || null);

    if (type === "task") {
      setData(
        task ? { ...task } : { title: "", description: "", due_date: "" }
      );
    } else if (type === "stage") {
      setData(stage ? { title: stage.title } : { title: "" });
    } else if (type === "project") {
      setData(
        project
          ? { title: project.title, description: project.description }
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
        project ? await editProject(project.id, data) : await addProject(data);
      }

      toast.success(
        `${
          editingType.charAt(0).toUpperCase() + editingType.slice(1)
        } saved successfully`,
        { id: loadingToast }
      );
      setIsModalOpen(false);
      setData({ title: "", description: "", due_date: "" });
      setSelectedStage(null);
      setSelectedTask(null);
    } catch (err) {
      toast.error(`Failed to save ${editingType}`, { id: loadingToast });
      console.error(err);
    }
  };

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
    // FormData for CreateProject
    formData,
    handleChange,
    handleSubmit,
    handleAddStageForm,
    handleAddTaskForm,
    handleRemoveStageForm,
    handleRemoveTaskForm,
    handleStageChangeForm,
    handleTaskChangeForm,

    // Modal / Detail for ProjectDetail
    data,
    setData,
    openModal,
    handleSave,
    toggleTaskStatusHandler,

    // Project / stages / tasks
    project,
    stages,
    user,
    selectedStage,
    selectedTask,
    isModalOpen,
    setIsModalOpen,
    editingType,
    removeStage,
    removeTask,
    handleDeleteProject,
    loading,
    navigate,
  };
};

export default useProjects;
