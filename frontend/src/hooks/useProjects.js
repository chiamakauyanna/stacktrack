import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../store/useProjectStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const useProjects = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useAuthStore();
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(""); // "task" | "stage"

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stages: [],
  });

  const [data, setData] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const {
    project,
    stages,
    loadProject,
    addProject,
    loading,
    addStage,
    addTask,
    editTask,
    removeTask,
    editStage,
    removeStage,
    changeTaskStatus,
  } = useProjectStore();

  // ---------- Form Handlers ----------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleAddStage = () => {
    setFormData((prev) => ({
      ...prev,
      stages: [
        ...prev.stages,
        { id: crypto.randomUUID(), title: "", tasks: [] },
      ],
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

  // Load project details

  useEffect(() => {
    if (id) loadProject(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Open modal handlers

  const openTaskModal = (stageId, task = null) => {
    setEditingType("task");
    setSelectedStage(stageId);
    setSelectedTask(task);
    setFormData(
      task
        ? {
            title: task.title,
            description: task.description || "",
            due_date: task.due_date || "",
          }
        : { title: "", description: "", due_date: "" }
    );
    setIsModalOpen(true);
  };

  const openStageModal = (stage = null) => {
    setEditingType("stage");
    setSelectedStage(stage?.id || null);
    setFormData(stage ? { title: stage.title } : { title: "" });
    setIsModalOpen(true);
  };

  // Handle create/update

  const handleSave = async () => {
    if (editingType === "task") {
      if (selectedTask) {
        await editTask(selectedTask.id, formData);
      } else {
        await addTask(selectedStage, formData);
      }
    } else if (editingType === "stage") {
      if (selectedStage) {
        await editStage(selectedStage, formData);
      } else {
        await addStage(project.id, formData);
      }
    }

    setIsModalOpen(false);
    setFormData({ title: "", description: "", due_date: "" });
    setSelectedTask(null);
  };

  // Handle task status toggle

  const toggleTaskStatus = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    await changeTaskStatus(task.id, newStatus);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    navigate,
    handleAddStage,
    handleAddTask,
    handleRemoveStage,
    handleRemoveTask,
    handleStageChange,
    handleTaskChange,
    loading,
    error,
    success,

    // Project Details
    data,
    setData,
    project,
    user,
    selectedStage,
    selectedTask,
    isModalOpen,
    setIsModalOpen,
    editingType,
    stages,
    removeStage,
    removeTask,
    openTaskModal,
    openStageModal,
    handleSave,
    toggleTaskStatus,
  };
};

export default useProjects;
