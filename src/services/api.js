import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
}

// Campaign endpoints
export const campaignAPI = {
  getAll: (params) => api.get('/campaigns', { params }),
  getById: (id) => api.get(`/campaigns/${id}`),
  create: (data) => api.post('/campaigns', data),
  update: (id, data) => api.put(`/campaigns/${id}`, data),
  delete: (id) => api.delete(`/campaigns/${id}`),
}

// Donation endpoints
export const donationAPI = {
  create: (data) => api.post('/donations', data),
  getByUser: () => api.get('/donations/user'),
  getByCampaign: (campaignId) => api.get(`/donations/campaign/${campaignId}`),
}

// Event endpoints
export const eventAPI = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  join: (id) => api.post(`/events/${id}/join`),
}

// NGO endpoints
export const ngoAPI = {
  getAll: () => api.get('/ngos'),
  getById: (id) => api.get(`/ngos/${id}`),
  apply: (data) => api.post('/ngos/apply', data),
  verify: (id) => api.post(`/ngos/${id}/verify`),
}

// Report endpoints
export const reportAPI = {
  create: (data) => api.post('/reports', data),
  getAll: () => api.get('/reports'),
}

export default api
