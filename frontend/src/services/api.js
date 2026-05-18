import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
};

// User APIs
export const userAPI = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.put('/users/profile', data),
  getEntrepreneurs: (category) => apiClient.get('/users/entrepreneurs', { params: { category } }),
  searchEntrepreneurs: (query) => apiClient.get('/users/entrepreneurs/search', { params: query }),
  getEntrepreneurProfile: (id) => apiClient.get(`/users/entrepreneurs/${id}`),
  becomeEntrepreneur: (data) => apiClient.put('/users/become-entrepreneur', data),
};

// Product APIs
export const productAPI = {
  getAll: () => apiClient.get('/products'),
  getById: (id) => apiClient.get(`/products/${id}`),
  search: (query) => apiClient.get('/products/search', { params: query }),
  create: (data) => apiClient.post('/products', data),
  update: (id, data) => apiClient.put(`/products/${id}`, data),
  delete: (id) => apiClient.delete(`/products/${id}`),
  getByEntrepreneur: (entrepreneurId) => apiClient.get(`/products/entrepreneur/${entrepreneurId}`),
};

// Service APIs
export const serviceAPI = {
  getAll: () => apiClient.get('/services'),
  getById: (id) => apiClient.get(`/services/${id}`),
  search: (query) => apiClient.get('/services/search', { params: query }),
  create: (data) => apiClient.post('/services', data),
  update: (id, data) => apiClient.put(`/services/${id}`, data),
  delete: (id) => apiClient.delete(`/services/${id}`),
  getByEntrepreneur: (entrepreneurId) => apiClient.get(`/services/entrepreneur/${entrepreneurId}`),
  createRequest: (data) => apiClient.post('/services/request/create', data),
  getRequests: () => apiClient.get('/services/requests/entrepreneur'),
  updateRequestStatus: (id, data) => apiClient.put(`/services/requests/${id}/status`, data),
};

// Order APIs
export const orderAPI = {
  create: (data) => apiClient.post('/orders', data),
  getCustomerOrders: () => apiClient.get('/orders'),
  getEntrepreneurOrders: () => apiClient.get('/orders/entrepreneur/orders'),
  getAnalytics: () => apiClient.get('/orders/entrepreneur/analytics'),
  getById: (id) => apiClient.get(`/orders/${id}`),
  updateStatus: (id, data) => apiClient.put(`/orders/${id}/status`, data),
  cancel: (id) => apiClient.put(`/orders/${id}/cancel`),
};

export default apiClient;
