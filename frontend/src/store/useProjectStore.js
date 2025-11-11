import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
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
  getAnalytics,
} from "../services/appService";

// Main Store
export const useProjectStore = create(
  persist(
    immer((set, get) => ({
      projects: [],
      project: null,
      stages: [],
      tasks: [],
      analytics: null,

      loading: {
        projects: false,
        project: false,
        analytics: false,
      },
      error: null,

      // Helpers
      setLoading: (key, value) =>
        set((state) => {
          state.loading[key] = value;
        }),
      resetError: () => set({ error: null }),

      // Nested updates
      updateNestedStages: (updateFn) =>
        set((state) => {
          state.stages = updateFn(state.stages);
          if (state.project)
            state.project.stages = updateFn(state.project.stages);
        }),
      updateNestedTasks: (updateFn) =>
        set((state) => {
          state.tasks = updateFn(state.tasks);
          state.stages.forEach((s) => {
            s.tasks = updateFn(s.tasks);
          });
          if (state.project)
            state.project.stages.forEach((s) => {
              s.tasks = updateFn(s.tasks);
            });
        }),

      // Projects
      loadProjects: async () => {
        set((state) => {
          state.loading.projects = true;
          state.error = null;
        });
        try {
          const data = await fetchProjects();
          set({ projects: Array.isArray(data?.data?.projects) ? data.data.projects : [] });
        } catch (err) {
          console.error("Error loading projects:", err);
          set({ error: "Failed to load projects" });
        } finally {
          set((state) => {
            state.loading.projects = false;
          });
        }
      },

      loadProject: async (projectId) => {
        set((state) => {
          state.loading.projects = true;
          state.error = null;
        });
        try {
          const data = await fetchProjectById(projectId);
          set({
            project: data,
            stages: data?.stages || [],
            tasks: data?.stages?.flatMap((s) => s.tasks || []) || [],
          });
        } catch (err) {
          console.error("Error loading project:", err);
          set({ error: "Failed to load project" });
        } finally {
          set((state) => {
            state.loading.projects = false;
          });
        }
      },

      addProject: async (payload) => {
        try {
          const newProject = await createProject(payload);
          set((state) => {
            state.projects.unshift(newProject);
          });
          await get().loadProjects();
          return newProject;
        } catch (err) {
          console.error("Error creating project:", err);
          throw err;
        }
      },

      editProject: async (id, payload) => {
        const updated = await updateProject(id, payload);
        set((state) => {
          state.projects = state.projects.map((p) =>
            p.id === id ? updated : p
          );
          if (state.project?.id === id) state.project = updated;
        });
        return updated;
      },

      removeProject: async (id) => {
        await deleteProject(id);
        set((state) => {
          state.projects = state.projects.filter((p) => p.id !== id);
        });
      },

      // Stages
      addStage: async (projectId, payload) => {
        const newStage = await createStage(projectId, payload);
        set((state) => {
          state.stages.push(newStage);
          if (state.project) state.project.stages.push(newStage);
        });
        await get().loadProject(projectId);
        return newStage;
      },

      editStage: async (stageId, payload) => {
        const updatedStage = await updateStage(stageId, payload);
        set((state) => {
          state.stages = state.stages.map((s) =>
            s.id === stageId ? updatedStage : s
          );
          if (state.project)
            state.project.stages = state.project.stages.map((s) =>
              s.id === stageId ? updatedStage : s
            );
        });
        return updatedStage;
      },

      removeStage: async (stageId) => {
        await deleteStage(stageId);
        get().updateNestedStages((stages) =>
          stages.filter((s) => s.id !== stageId)
        );
      },

      // Tasks
      addTask: async (stageId, payload) => {
        const newTask = await createTask(stageId, payload);
        set((state) => {
          state.tasks.push(newTask);
          state.stages.forEach((s) => {
            if (s.id === stageId) s.tasks.push(newTask);
          });
          if (state.project)
            state.project.stages.forEach((s) => {
              if (s.id === stageId) s.tasks.push(newTask);
            });
        });
        await get().loadProject(get().project?.id);
        return newTask;
      },

      editTask: async (taskId, payload) => {
        const updatedTask = await updateTask(taskId, payload);
        set((state) => {
          state.tasks = state.tasks.map((t) =>
            t.id === taskId ? updatedTask : t
          );
          state.stages.forEach((s) => {
            s.tasks = s.tasks.map((t) => (t.id === taskId ? updatedTask : t));
          });
          if (state.project)
            state.project.stages.forEach((s) => {
              s.tasks = s.tasks.map((t) => (t.id === taskId ? updatedTask : t));
            });
        });
        return updatedTask;
      },

      removeTask: async (taskId) => {
        await deleteTask(taskId);
        get().updateNestedTasks((tasks) =>
          tasks.filter((t) => t.id !== taskId)
        );
      },

      changeTaskStatus: async (taskId, newStatus) => {
        const updatedTask = await updateTaskStatus(taskId, newStatus);
        set((state) => {
          state.tasks = state.tasks.map((t) =>
            t.id === taskId ? updatedTask : t
          );
          state.stages.forEach((s) => {
            s.tasks = s.tasks.map((t) => (t.id === taskId ? updatedTask : t));
          });
          if (state.project)
            state.project.stages.forEach((s) => {
              s.tasks = s.tasks.map((t) => (t.id === taskId ? updatedTask : t));
            });
        });
        return updatedTask;
      },

      // Analytics
      loadAnalytics: async () => {
        set((state) => {
          state.loading.analytics = true;
          state.error = null;
        });
        try {
          const data = await getAnalytics();
          set({ analytics: data });
        } catch (err) {
          console.error(err);
          set({ error: "Failed to load analytics" });
        } finally {
          set((state) => {
            state.loading.analytics = false;
          });
        }
      },

      // Clear
      clearAll: () => {
        set({ projects: [], analytics: null });
        localStorage.removeItem("project-storage");
      },
    })),
    {
      name: "project-storage",
      partialize: (state) => ({
        projects: state.projects,
        analytics: state.analytics,
      }),
    }
  )
);
