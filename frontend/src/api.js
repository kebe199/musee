import axios from 'axios';

// Base URL : utilise la variable d'environnement ou localhost en local
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000'
});

// List all works
export const getWorks = () => API.get('/api/works');

// Get a single work by ID
export const getWork = (id) => API.get(`/api/works/${id}`);

// Like or unlike a work
export const likeWork = (id, email) => API.post(`/api/works/${id}/like`, { email });

// Admin CRUD operations
export const createWork = (data) => API.post('/api/works', data);
export const updateWork = (id, data) => API.put(`/api/works/${id}`, data);
export const deleteWork = (id) => API.delete(`/api/works/${id}`);
