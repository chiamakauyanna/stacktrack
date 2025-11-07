import api from "./api";

// Fetch all users projects
export const fetchProjects = async () => {
  const { data } = await api.get("/projects/my-projects/");
  return data;
};

// Fetch a single project by ID
export const fetchProjectById = async (projectId) => {
  const { data } = await api.get(`/projects/${projectId}/`);
  return data;
};

// Create a new project 
export const createProject = async (payload) => {
  const { data } = await api.post("/projects/", payload);
  return data;
};

// Update a project and its nested data (stages/tasks)
export const updateProject = async (projectId, payload) => {
  const { data } = await api.put(`/projects/${projectId}/`, payload);
  return data;
};

// Delete a project
export const deleteProject = async (projectId) => {
  const { data } = await api.delete(`/projects/${projectId}/`);
  return data;
};

// Stage Services (linked to project)

// Create a new stage for a project
export const createStage = async (projectId, payload) => {
  const { data } = await api.post(`/stages/`, {
    project: projectId,
    ...payload,
  });
  return data;
};

// Update an existing stage
export const updateStage = async (stageId, payload) => {
  const { data } = await api.patch(`/stages/${stageId}/`, payload);
  return data;
};

// Delete a stage
export const deleteStage = async (stageId) => {
  const { data } = await api.delete(`/stages/${stageId}/`);
  return data;
};

// Task Services

// Create a task under a specific stage
export const createTask = async (stageId, payload) => {
  const { data } = await api.post(`/tasks/`, { stage: stageId, ...payload });
  return data;
};

// Update a task (title, priority, etc.)
export const updateTask = async (taskId, payload) => {
  const { data } = await api.patch(`/tasks/${taskId}/`, payload);
  return data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  const { data } = await api.delete(`/tasks/${taskId}/`);
  return data;
};

// Update a task’s status (custom endpoint)
export const updateTaskStatus = async (taskId, newStatus) => {
  const { data } = await api.patch(`/tasks/${taskId}/update-status/`, {
    status: newStatus,
  });
  return data;
};

// Projects Analytics

// Create a new stage for a project
export const getAnalytics = async () => {
  const { data } = await api.get(`/projects/analytics/`);
  return data.data;
};
