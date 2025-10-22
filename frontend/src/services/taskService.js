import api from "./api";

// Centralized error handler
const handleError = (context, error) => {
  console.error(`${context} failed`, error.response?.data || error.message);
  return { error: true, data: error.response?.data || error.message };
};

/* -------------------------------------------------------------------------- */
/* TASKS: LIST & CREATE                                                      */
/* -------------------------------------------------------------------------- */
/**
 * GET /api/projects/{project_pk}/stages/{stage_pk}/tasks/
 * Retrieve all tasks belonging to a specific stage within a project.
 *
 * @param {string} projectId - UUID of the project
 * @param {number|string} stageId - ID of the stage
 * @param {Object} params - Optional query parameters (search, status, priority, assigned_to, ordering, pagination)
 * @returns {Object} Paginated list of tasks or error object
 */
export const getTasks = async (projectId, stageId, params = {}) => {
  try {
    const response = await api.get(`/projects/${projectId}/stages/${stageId}/tasks/`, { params });
    return response.data;
  } catch (error) {
    return handleError("Retrieve tasks", error);
  }
};

/**
 * POST /api/projects/{project_pk}/stages/{stage_pk}/tasks/
 * Create a new task within a stage.
 *
 * @param {string} projectId - UUID of the project
 * @param {number|string} stageId - ID of the stage
 * @param {Object} taskDetails - { title, description, status, priority, due_date, assigned_to_id }
 * @returns {Object} Newly created task or error object
 */
export const createTask = async (projectId, stageId, taskDetails) => {
  try {
    const response = await api.post(`/projects/${projectId}/stages/${stageId}/tasks/`, taskDetails);
    return response.data;
  } catch (error) {
    return handleError("Create task", error);
  }
};

/* -------------------------------------------------------------------------- */
/* SINGLE TASK OPERATIONS                                                    */
/* -------------------------------------------------------------------------- */
/**
 * GET /api/projects/{project_pk}/stages/{stage_pk}/tasks/{id}/
 * Retrieve detailed information for a specific task.
 *
 * @param {string} projectId - UUID of the project
 * @param {number|string} stageId - ID of the stage
 * @param {string} taskId - UUID of the task
 * @returns {Object} Task details or error object
 */
export const getTaskById = async (projectId, stageId, taskId) => {
  try {
    const response = await api.get(`/projects/${projectId}/stages/${stageId}/tasks/${taskId}/`);
    return response.data;
  } catch (error) {
    return handleError("Retrieve task", error);
  }
};

/**
 * PUT /api/projects/{project_pk}/stages/{stage_pk}/tasks/{id}/
 * Update an entire task record (replace all fields).
 *
 * @param {string} projectId - UUID of the project
 * @param {number|string} stageId - ID of the stage
 * @param {string} taskId - UUID of the task
 * @param {Object} taskDetails - Complete task data to update
 * @returns {Object} Updated task or error object
 */
export const updateTask = async (projectId, stageId, taskId, taskDetails) => {
  try {
    const response = await api.put(`/projects/${projectId}/stages/${stageId}/tasks/${taskId}/`, taskDetails);
    return response.data;
  } catch (error) {
    return handleError("Update task", error);
  }
};

/**
 * PATCH /api/projects/{project_pk}/stages/{stage_pk}/tasks/{id}/
 * Partially update a task (for example, mark as done or change priority).
 *
 * @param {string} projectId - UUID of the project
 * @param {number|string} stageId - ID of the stage
 * @param {string} taskId - UUID of the task
 * @param {Object} updates - Partial task fields to update
 * @returns {Object} Updated task or error object
 */
export const patchTask = async (projectId, stageId, taskId, updates) => {
  try {
    const response = await api.patch(`/projects/${projectId}/stages/${stageId}/tasks/${taskId}/`, updates);
    return response.data;
  } catch (error) {
    return handleError("Update task", error);
  }
};

/**
 * DELETE /api/projects/{project_pk}/stages/{stage_pk}/tasks/{id}/
 * Delete a task by its ID.
 *
 * @param {string} projectId - UUID of the project
 * @param {number|string} stageId - ID of the stage
 * @param {string} taskId - UUID of the task
 * @returns {Object|undefined} API response or error object
 */
export const deleteTask = async (projectId, stageId, taskId) => {
  try {
    const response = await api.delete(`/projects/${projectId}/stages/${stageId}/tasks/${taskId}/`);
    return response.data;
  } catch (error) {
    return handleError("Delete task", error);
  }
};
