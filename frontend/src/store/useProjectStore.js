import { create } from "zustand";
import {
  fetchProjects,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject,
  createStage,
  updateStage,
  deleteStage,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../services/appService";
import { useAuthStore } from "./useAuthStore";

export const useProjectStore = create((set, get) => ({
  projects: JSON.parse(localStorage.getItem("projects")) || [],
  project: null,
  stages: [],
  tasks: [],
  loading: false,
  error: null,

  // ====================
  // LOAD PROJECTS
  // ====================
  loadProjects: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    set({ loading: true, error: null });
    try {
      const data = await fetchProjects();
      set({ projects: data.results, loading: false });
      localStorage.setItem("projects", JSON.stringify(data.results));
    } catch (err) {
      console.error("Error loading projects:", err);
      set({ error: "Failed to load projects", loading: false });
    }
  },

  loadProject: async (projectId) => {
    if (!projectId) return;
    set({ loading: true, error: null });
    try {
      const data = await fetchProjectById(projectId);
      set({
        project: data,
        stages: data.stages || [],
        tasks: data.stages?.flatMap((s) => s.tasks || []) || [],
        loading: false,
      });
    } catch (err) {
      console.error("Error loading project:", err);
      set({ error: "Failed to load project", loading: false });
    }
  },

  // ====================
  // PROJECT ACTIONS
  // ====================
  addProject: async (payload) => {
    try {
      const newProject = await createProject(payload);
      set((state) => {
        const updated = [...state.projects, newProject];
        localStorage.setItem("projects", JSON.stringify(updated));
        return { projects: updated };
      });
      return newProject;
    } catch (err) {
      console.error("Error creating project:", err);
      throw err;
    }
  },

  editProject: async (id, payload) => {
    try {
      const updatedProject = await updateProject(id, payload);
      set((state) => {
        const updated = state.projects.map((p) =>
          p.id === id ? updatedProject : p
        );
        localStorage.setItem("projects", JSON.stringify(updated));
        return {
          projects: updated,
          project: state.project?.id === id ? updatedProject : state.project,
        };
      });
      return updatedProject;
    } catch (err) {
      console.error("Error updating project:", err);
      throw err;
    }
  },

  removeProject: async (id) => {
    try {
      await deleteProject(id);
      set((state) => {
        const updated = state.projects.filter((p) => p.id !== id);
        localStorage.setItem("projects", JSON.stringify(updated));
        return {
          projects: updated,
          project: state.project?.id === id ? null : state.project,
        };
      });
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  },

  // ====================
  // STAGE ACTIONS
  // ====================
  addStage: async (projectId, payload) => {
    try {
      const newStage = await createStage(projectId, payload);
      set((state) => {
        const updatedStages = [...state.stages, newStage];
        const updatedProject = {
          ...state.project,
          stages: [...(state.project?.stages || []), newStage],
        };
        const updatedProjects = state.projects.map((p) =>
          p.id === projectId ? updatedProject : p
        );
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        return {
          stages: updatedStages,
          project: updatedProject,
          projects: updatedProjects,
        };
      });
      return newStage;
    } catch (err) {
      console.error("Error creating stage:", err);
      throw err;
    }
  },

  editStage: async (stageId, payload) => {
    try {
      const updatedStage = await updateStage(stageId, payload);
      set((state) => {
        const updatedStages = state.stages.map((s) =>
          s.id === stageId ? updatedStage : s
        );
        const updatedProject = {
          ...state.project,
          stages: state.project.stages.map((s) =>
            s.id === stageId ? updatedStage : s
          ),
        };
        return { stages: updatedStages, project: updatedProject };
      });
      return updatedStage;
    } catch (err) {
      console.error("Error updating stage:", err);
      throw err;
    }
  },

  removeStage: async (stageId) => {
    try {
      await deleteStage(stageId);
      set((state) => {
        const updatedStages = state.stages.filter((s) => s.id !== stageId);
        const updatedProject = {
          ...state.project,
          stages: state.project.stages.filter((s) => s.id !== stageId),
        };
        return { stages: updatedStages, project: updatedProject };
      });
    } catch (err) {
      console.error("Error deleting stage:", err);
    }
  },

  // ====================
  // TASK ACTIONS
  // ====================
  addTask: async (stageId, payload) => {
    try {
      const newTask = await createTask(stageId, payload);
      set((state) => {
        const updatedTasks = [...state.tasks, newTask];
        const updatedStages = state.stages.map((s) =>
          s.id === stageId
            ? { ...s, tasks: [...(s.tasks || []), newTask] }
            : s
        );
        const updatedProject = {
          ...state.project,
          stages: state.project.stages.map((s) =>
            s.id === stageId
              ? { ...s, tasks: [...(s.tasks || []), newTask] }
              : s
          ),
        };
        return { tasks: updatedTasks, stages: updatedStages, project: updatedProject };
      });
      return newTask;
    } catch (err) {
      console.error("Error creating task:", err);
      throw err;
    }
  },

  editTask: async (taskId, payload) => {
    try {
      const updatedTask = await updateTask(taskId, payload);
      set((state) => {
        const updatedTasks = state.tasks.map((t) =>
          t.id === taskId ? updatedTask : t
        );
        const updatedStages = state.stages.map((s) => ({
          ...s,
          tasks: s.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
        }));
        const updatedProject = {
          ...state.project,
          stages: state.project.stages.map((s) => ({
            ...s,
            tasks: s.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
          })),
        };
        return { tasks: updatedTasks, stages: updatedStages, project: updatedProject };
      });
      return updatedTask;
    } catch (err) {
      console.error("Error updating task:", err);
      throw err;
    }
  },

  removeTask: async (taskId) => {
    try {
      await deleteTask(taskId);
      set((state) => {
        const updatedTasks = state.tasks.filter((t) => t.id !== taskId);
        const updatedStages = state.stages.map((s) => ({
          ...s,
          tasks: s.tasks.filter((t) => t.id !== taskId),
        }));
        const updatedProject = {
          ...state.project,
          stages: state.project.stages.map((s) => ({
            ...s,
            tasks: s.tasks.filter((t) => t.id !== taskId),
          })),
        };
        return { tasks: updatedTasks, stages: updatedStages, project: updatedProject };
      });
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  },

  changeTaskStatus: async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus);
      set((state) => {
        const updatedTasks = state.tasks.map((t) =>
          t.id === taskId ? updatedTask : t
        );
        const updatedStages = state.stages.map((s) => ({
          ...s,
          tasks: s.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
        }));
        const updatedProject = {
          ...state.project,
          stages: state.project.stages.map((s) => ({
            ...s,
            tasks: s.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
          })),
        };
        return { tasks: updatedTasks, stages: updatedStages, project: updatedProject };
      });
      return updatedTask;
    } catch (err) {
      console.error("Error updating task status:", err);
      throw err;
    }
  },

  clearAll: () => {
    localStorage.removeItem("projects");
    set({ projects: [], project: null, stages: [], tasks: [] });
  },
}));

// Auto-load projects on login
useAuthStore.subscribe(
  (state) => state.user,
  (user) => {
    if (user) useProjectStore.getState().loadProjects();
    else useProjectStore.setState({ projects: [], project: null, stages: [], tasks: [] });
  }
);
