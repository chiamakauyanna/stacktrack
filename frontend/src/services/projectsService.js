//  Import the configured Axios instance
import api from "./api";

//  Universal error handler — logs context + returns consistent error object
const handleError = (context, error) => {
  console.error(`${context} failed`, error.response?.data || error.message);
  return { error: true, data: error.response?.data || error.message };
};

/* -------------------------------------------------------------------------- */
/*  PROJECT CREATION                                                        */
/* -------------------------------------------------------------------------- */
/**
 * POST /api/projects/
 * Create a new project.
 * 
 * @param {Object} projectDetails - { title, description }
 * @returns {Object} Newly created project data or error object
 */
export const createProject = async (projectDetails) => {
  try {
    const response = await api.post("/projects/", projectDetails);
    return response.data;
  } catch (error) {
    return handleError("Create project", error);
  }
};

/* -------------------------------------------------------------------------- */
/*  GET USER PROJECTS                                                      */
/* -------------------------------------------------------------------------- */
/**
 * GET /api/projects/my-projects/
 * Retrieve all projects owned or assigned to the current authenticated user.
 * 
 * @returns {Array} List of user’s projects or error object
 */
export const getMyProjects = async () => {
  try {
    const response = await api.get("/projects/my-projects/");
    return response.data;
  } catch (error) {
    return handleError("Retrieve projects", error);
  }
};

/**
 * GET /api/projects/my-projects/?status=&search=&page=
 * Retrieve user’s projects with optional query params (search, filter, pagination).
 * 
 * @param {Object} params - Optional filters (e.g. { search, status, page })
 * @returns {Array} Filtered list of projects or error object
 */
export const getProjects = async (params = {}) => {
  try {
    const response = await api.get("/projects/my-projects/", { params });
    return response.data;
  } catch (error) {
    return handleError("Retrieve projects", error);
  }
};

/* -------------------------------------------------------------------------- */
/*  SINGLE PROJECT OPERATIONS                                              */
/* -------------------------------------------------------------------------- */
/**
 * GET /api/projects/{id}/
 * Retrieve detailed information about a single project by UUID.
 * 
 * @param {string} id - Project UUID
 * @returns {Object} Project details or error object
 */
export const getProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/${id}/`);
    return response.data;
  } catch (error) {
    return handleError("Retrieve project", error);
  }
};

/**
 * PUT /api/projects/{id}/
 * Update an entire project (replace title/description).
 * 
 * @param {string} id - Project UUID
 * @param {Object} projectDetails - Updated project fields
 * @returns {Object} Updated project data or error object
 */
export const updateProject = async (id, projectDetails) => {
  try {
    const response = await api.put(`/projects/${id}/`, projectDetails);
    return response.data;
  } catch (error) {
    return handleError("Update project", error);
  }
};

/**
 * PATCH /api/projects/{id}/
 * Partially update a project (e.g. change only status or title).
 * 
 * @param {string} id - Project UUID
 * @param {Object} updates - Partial updates
 * @returns {Object} Updated project data or error object
 */
export const patchProject = async (id, updates) => {
  try {
    const response = await api.patch(`/projects/${id}/`, updates);
    return response.data;
  } catch (error) {
    return handleError("Update project", error);
  }
};

/**
 * DELETE /api/projects/{id}/
 * Delete a project by its ID.
 * 
 * @param {string} id - Project UUID
 * @returns {Object|undefined} API response or error object
 */
export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/projects/${id}/`);
    return response.data;
  } catch (error) {
    return handleError("Delete project", error);
  }
};

/* -------------------------------------------------------------------------- */
/*  PROJECT PROGRESS & STATISTICS                                          */
/* -------------------------------------------------------------------------- */
/**
 * GET /api/projects/{id}/progress/
 * Retrieve project progress details — used for dashboards or Kanban summaries.
 * 
 * @param {string} id - Project UUID
 * @returns {Object} Progress info or error object
 */
export const getProgress = async (id) => {
  try {
    const response = await api.get(`/projects/${id}/progress/`);
    return response.data;
  } catch (error) {
    return handleError("Retrieve progress", error);
  }
};

/**
 * GET /api/projects/{id}/stats/
 * Retrieve analytics and statistics for a project (e.g. task counts, completion %).
 * 
 * @param {string} id - Project UUID
 * @returns {Object} Stats info or error object
 */
export const getStats = async (id) => {
  try {
    const response = await api.get(`/projects/${id}/stats/`);
    return response.data;
  } catch (error) {
    return handleError("Retrieve stats", error);
  }
};
