// Import the configured Axios instance
import api from "./api";

// Universal error handler for consistency across services
const handleError = (context, error) => {
  console.error(`${context} failed`, error.response?.data || error.message);
  return { error: true, data: error.response?.data || error.message };
};

/* -------------------------------------------------------------------------- */
/* STAGES: LIST & CREATE                                                  */
/* -------------------------------------------------------------------------- */
/**
 * GET /api/projects/{project_pk}/stages/
 * Retrieve all stages belonging to a specific project.
 *
 * @param {string} projectId - UUID of the project
 * @param {Object} params - Optional query parameters (ordering, page, page_size)
 * @returns {Object} Paginated list of stages or error object
 */
export const getStages = async (projectId, params = {}) => {
  try {
    const response = await api.get(`/projects/${projectId}/stages/`, { params });
    return response.data;
  } catch (error) {
    return handleError("Retrieve stages", error);
  }
};

/**
 * POST /api/projects/{project_pk}/stages/
 * Create a new stage in a specific project.
 *
 * @param {string} projectId - UUID of the project
 * @param {Object} stageDetails - { title: string }
 * @returns {Object} Newly created stage or error object
 */
export const createStage = async (projectId, stageDetails) => {
  try {
    const response = await api.post(`/projects/${projectId}/stages/`, stageDetails);
    return response.data;
  } catch (error) {
    return handleError("Create stage", error);
  }
};

/* -------------------------------------------------------------------------- */
/* SINGLE STAGE OPERATIONS                                                */
/* -------------------------------------------------------------------------- */
/**
 * GET /api/projects/{project_pk}/stages/{id}/
 * Retrieve a single stage by ID.
 *
 * @param {string} projectId - UUID of the project
 * @param {number|string} stageId - Unique integer ID of the stage
 * @returns {Object} Stage details or error object
 */
export const getStageById = async (projectId, stageId) => {
  try {
    const response = await api.get(`/projects/${projectId}/stages/${stageId}/`);
    return response.data;
  } catch (error) {
    return handleError("Retrieve stage", error);
  }
};

/**
 * PUT /api/projects/{project_pk}/stages/{id}/
 * Update an entire stage (replaces all fields).
 *
 * @param {string} projectId - UUID of the project
 * @param {number|string} stageId - Stage ID
 * @param {Object} stageDetails - Updated stage data (e.g. { title: string })
 * @returns {Object} Updated stage or error object
 */
export const updateStage = async (projectId, stageId, stageDetails) => {
  try {
    const response = await api.put(`/projects/${projectId}/stages/${stageId}/`, stageDetails);
    return response.data;
  } catch (error) {
    return handleError("Update stage", error);
  }
};

/**
 * PATCH /api/projects/{project_pk}/stages/{id}/
 * Partially update a stage (e.g., just change the title or order).
 *
 * @param {string} projectId - UUID of the project
 * @param {number|string} stageId - Stage ID
 * @param {Object} updates - Partial update fields
 * @returns {Object} Updated stage or error object
 */
export const patchStage = async (projectId, stageId, updates) => {
  try {
    const response = await api.patch(`/projects/${projectId}/stages/${stageId}/`, updates);
    return response.data;
  } catch (error) {
    return handleError("Update stage", error);
  }
};

/**
 * DELETE /api/projects/{project_pk}/stages/{id}/
 * Delete a stage by ID.
 *
 * @param {string} projectId - UUID of the project
 * @param {number|string} stageId - Stage ID
 * @returns {Object|undefined} API response or error object
 */
export const deleteStage = async (projectId, stageId) => {
  try {
    const response = await api.delete(`/projects/${projectId}/stages/${stageId}/`);
    return response.data;
  } catch (error) {
    return handleError("Delete stage", error);
  }
};
