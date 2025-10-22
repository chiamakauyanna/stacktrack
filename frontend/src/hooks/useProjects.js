import { useState, useEffect } from "react";
import {
  getMyProjects,
  getProjectById,
  createProject,
  updateProject,
  patchProject,
  deleteProject,
  getProgress,
  getStats,
} from "../services/projectsService";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [progress, setProgress] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all projects belonging to the authenticated user
  const fetchMyProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyProjects();
      setProjects(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Retrieve a specific project by ID
  const fetchProjectById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjectById(id);
      setSelectedProject(data);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new project
  const createNewProject = async (projectData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createProject(projectData);
      setProjects((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Update an entire project (PUT)
  const updateExistingProject = async (id, projectData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateProject(id, projectData);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
      setSelectedProject(data);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Partially update a project (PATCH)
  const patchExistingProject = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const data = await patchProject(id, updates);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
      setSelectedProject(data);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a project
  const removeProject = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (selectedProject?.id === id) setSelectedProject(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Retrieve progress for a project
  const fetchProgress = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProgress(id);
      setProgress(data);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Retrieve statistics for a project
  const fetchStats = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStats(id);
      setStats(data);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh all data
  const refreshProjects = () => {
    fetchMyProjects();
  };

  // Auto-load projects on mount
  useEffect(() => {
    fetchMyProjects();
  }, []);

  return {
    projects,
    selectedProject,
    progress,
    stats,
    loading,
    error,
    fetchMyProjects,
    fetchProjectById,
    createNewProject,
    updateExistingProject,
    patchExistingProject,
    removeProject,
    fetchProgress,
    fetchStats,
    refreshProjects,
  };
};
