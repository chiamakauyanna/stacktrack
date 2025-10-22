import { useState } from "react";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  patchTask,
  deleteTask,
} from "../services/taskService";

/**
 * Custom React hook for managing tasks inside a stage of a project.
 * Handles fetching, creation, update, patch, and deletion of tasks.
 */
export const useTasks = (projectId, stageId) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /** Fetch all tasks for a given stage */
  const fetchTasksByStage = async (params = {}) => {
    if (!projectId || !stageId) return;
    setLoading(true);
    try {
      const data = await getTasks(projectId, stageId, params);
      if (data?.error) throw new Error(data.data);
      setTasks(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /** Fetch details for a single task */
  const fetchTaskById = async (taskId) => {
    setLoading(true);
    try {
      const data = await getTaskById(projectId, stageId, taskId);
      if (data?.error) throw new Error(data.data);
      setSelectedTask(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /** Create a new task */
  const createNewTask = async (taskData) => {
    setLoading(true);
    try {
      const data = await createTask(projectId, stageId, taskData);
      if (data?.error) throw new Error(data.data);
      setTasks((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /** Update a task (PUT) */
  const updateExistingTask = async (taskId, taskData) => {
    setLoading(true);
    try {
      const data = await updateTask(projectId, stageId, taskId, taskData);
      if (data?.error) throw new Error(data.data);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? data : t)));
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /** Patch a task (PATCH) */
  const patchExistingTask = async (taskId, updates) => {
    setLoading(true);
    try {
      const data = await patchTask(projectId, stageId, taskId, updates);
      if (data?.error) throw new Error(data.data);
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, ...data } : t))
      );
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /** Delete a task */
  const removeTask = async (taskId) => {
    setLoading(true);
    try {
      const data = await deleteTask(projectId, stageId, taskId);
      if (data?.error) throw new Error(data.data);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    selectedTask,
    loading,
    error,
    fetchTasksByStage,
    fetchTaskById,
    createNewTask,
    updateExistingTask,
    patchExistingTask,
    removeTask,
  };
};
