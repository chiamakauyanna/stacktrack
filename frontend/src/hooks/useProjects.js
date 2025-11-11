import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useProjectStore } from "../store/useProjectStore";
import { useAuthStore } from "../store/useAuthStore";
import useToast from "./useToast";

const useProjects = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const { user } = useAuthStore();

  // --- UI states ---
  const [selectedStage, setSelectedStage] = useState(null); // stage ID
  const [selectedTask, setSelectedTask] = useState(null); // task object
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(""); // "task" | "stage" | "project"

  const [data, setData] = useState({}); // modal form data

  // Project creation form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stages: [],
  });

  // --- Store access ---
  const {
    project,
    stages,
    loadProject,
    loadProjects,
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

  const loading = useProjectStore((state) => state.loading?.projects ?? false);
  const error = useProjectStore((state) => state.error);

  // --- Load project when ID changes ---
  useEffect(() => {
    if (id && (!project || project.id !== id)) loadProject(id);
  }, [id, project, loadProject]);

  useEffect(() => {
    if (project && project.stages?.length === 0) {
      toast.info("This project has no stages yet. Add one to begin tracking.");
    }
  }, [project, toast]);

  // --- Project creation form handlers ---
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
    updated[index] = { ...updated[index], title: value };
    setFormData({ ...formData, stages: updated });
  };

  const handleAddTaskForm = (stageIndex) => {
    const updated = [...formData.stages];
    updated[stageIndex] = {
      ...updated[stageIndex],
      tasks: [
        ...updated[stageIndex].tasks,
        {
          id: crypto.randomUUID(),
          title: "",
          description: "",
          priority: "low",
          due_date: "",
          assigned_to_id: null,
        },
      ],
    };
    setFormData({ ...formData, stages: updated });
  };

  const handleTaskChangeForm = (stageIndex, taskIndex, field, value) => {
    const updated = [...formData.stages];
    updated[stageIndex] = {
      ...updated[stageIndex],
      tasks: updated[stageIndex].tasks.map((t, i) =>
        i === taskIndex ? { ...t, [field]: value } : t
      ),
    };
    setFormData({ ...formData, stages: updated });
  };

  const handleRemoveTaskForm = (stageIndex, taskIndex) => {
    const updated = [...formData.stages];
    updated[stageIndex] = {
      ...updated[stageIndex],
      tasks: updated[stageIndex].tasks.filter((_, i) => i !== taskIndex),
    };
    setFormData({ ...formData, stages: updated });
  };

  // --- Submit new project ---
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
      await loadProjects();
      toast.success("Project created successfully!", { id: loadingToast });
      navigate("/projects");
    } catch (err) {
      toast.error("Failed to create project", { id: loadingToast });
      console.error(err);
    }
  };

  // --- Modal Logic ---
  const openModal = (type, stage = null, task = null) => {
    setEditingType(type);
    setSelectedStage(stage?.id ?? stage);
    setSelectedTask(task || null);

    switch (type) {
      case "task":
        setData(
          task ?? {
            title: "",
            description: "",
            priority: "low",
            due_date: "",
            assigned_to_id: null,
          }
        );
        break;
      case "stage":
        setData(stage ?? { title: "", project: project?.id });
        break;
      case "project":
        setData(project ?? { title: "", description: "" });
        break;
      default:
        setData({});
    }

    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const loadingToast = toast.loading("Saving...");

    try {
      if (editingType === "task") {
        if (!selectedStage) throw new Error("No stage selected for this task");

        const payload = {
          title: data.title,
          description: data.description,
          priority: data.priority || "low",
          due_date: data.due_date || null,
          assigned_to_id: data.assigned_to_id || null,
          status: data.status || "todo",
        };

        selectedTask
          ? await editTask(selectedTask.id, payload)
          : await addTask(selectedStage, payload);
      } else if (editingType === "stage") {
        selectedStage
          ? await editStage(selectedStage, data)
          : await addStage(project.id, data);
      } else if (editingType === "project") {
        await editProject(project.id, data);
      }

      toast.success(`${editingType} saved successfully`, { id: loadingToast });
      setIsModalOpen(false);
      await loadProject(project.id);

      // Reset modal data based on type
      setData(
        editingType === "task"
          ? {
              title: "",
              description: "",
              priority: "low",
              due_date: "",
              assigned_to_id: null,
            }
          : editingType === "stage"
          ? { title: "", project: project?.id }
          : editingType === "project"
          ? { title: "", description: "" }
          : {}
      );
    } catch (err) {
      toast.error(`Failed to save ${editingType}`, { id: loadingToast });
      console.error(err);
    }
  };

  // --- Delete a project ---
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

  // --- classify tasks
  const classifyTasks = (tasks) => {
    const overdue = [],
      dueSoon = [],
      inProgress = [],
      completed = [];
    const today = new Date();
    const threeDaysLater = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

    tasks.forEach((task) => {
      const status = task.status;
      const dueDate = task.due_date ? new Date(task.due_date) : null;

      if (status === "done") completed.push(task);
      else if (!dueDate) inProgress.push(task);
      else if (dueDate < today) overdue.push(task);
      else if (dueDate <= threeDaysLater) dueSoon.push(task);
      else inProgress.push(task);
    });

    return { overdue, dueSoon, inProgress, completed };
  };

  const classifiedStages = useMemo(
    () =>
      stages.map((stage) => ({
        ...stage,
        tasksClassified: classifyTasks(stage.tasks || []),
      })),
    [stages]
  );

  const classifiedAllTasks = classifyTasks(
    stages.flatMap((s) => s.tasks || [])
  );

  // --- Toggle task status ---
  const toggleTaskStatusHandler = async (task) => {
    const loadingToast = toast.loading("Updating task...");
    try {
      let newStatus;
      switch (task.status) {
        case "todo":
          newStatus = "in_progress";
          break;
        case "in_progress":
          newStatus = "done";
          break;
        case "done":
          newStatus = "todo";
          break;
        default:
          newStatus = "todo";
      }

      await changeTaskStatus(task.id, newStatus);
      await loadProject(project.id);

      toast.success("Task status updated", { id: loadingToast });
    } catch (err) {
      toast.error("Failed to update task status", { id: loadingToast });
      console.error(err);
    }
  };

  return {
    // Form
    formData,
    handleChange,
    handleSubmit,
    handleAddStageForm,
    handleAddTaskForm,
    handleRemoveStageForm,
    handleRemoveTaskForm,
    handleStageChangeForm,
    handleTaskChangeForm,

    // Modal
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
    classifiedStages,
    classifiedAllTasks,

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
