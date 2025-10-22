import { useState } from "react";
import {
  getStages,
  createStage,
  getStageById,
  updateStage,
  patchStage,
  deleteStage,
} from "../services/stageService";

/**
 * Custom React hook for managing stages of a project
 */
export const useStages = (projectId) => {
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /** Fetch all stages for a project */
  const fetchStages = async (params = {}) => {
    if (!projectId) return;
    setLoading(true);
    try {
      const data = await getStages(projectId, params);
      if (data?.error) throw new Error(data.data);
      setStages(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /** Fetch a single stage by ID */
  const fetchStageById = async (stageId) => {
    setLoading(true);
    try {
      const data = await getStageById(projectId, stageId);
      if (data?.error) throw new Error(data.data);
      setSelectedStage(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /** Create a new stage */
  const createNewStage = async (stageData) => {
    setLoading(true);
    try {
      const data = await createStage(projectId, stageData);
      if (data?.error) throw new Error(data.data);
      setStages((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /** Update or patch a stage */
  const updateExistingStage = async (stageId, updates) => {
    setLoading(true);
    try {
      const data = await patchStage(projectId, stageId, updates);
      if (data?.error) throw new Error(data.data);
      setStages((prev) =>
        prev.map((s) => (s.id === stageId ? { ...s, ...data } : s))
      );
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /** Delete a stage */
  const removeStage = async (stageId) => {
    setLoading(true);
    try {
      const data = await deleteStage(projectId, stageId);
      if (data?.error) throw new Error(data.data);
      setStages((prev) => prev.filter((s) => s.id !== stageId));
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    stages,
    selectedStage,
    loading,
    error,
    fetchStages,
    fetchStageById,
    createNewStage,
    updateExistingStage,
    removeStage,
  };
};
