import axios from "axios"
import { API_URL } from "../../Shared/api"

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor for authentication
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error),
// )

// Business API
export const businessApi = {
  getAll: (params) => api.get("/businesses", { params }),
  getById: (id) => api.get(`/businesses/${id}`),
  create: (data) => api.post("/businesses", data),
  update: (id, data) => api.put(`/businesses/${id}`, data),
  delete: (id) => api.delete(`/businesses/${id}`),
  search: (params) => api.get(`/businesses/search`, { params }),
  getDetails: (id) => api.get(`/businesses/${id}/details`),
  getFeatured: (params) => api.get("/businesses/featured", { params }),
  getServices: (id) => api.get(`/businesses/services/business/${id}`),
  getReviews: (id, params) => api.get(`/businesses/reviews/business/${id}`, { params }),
  getByOwner: (ownerId, params) => api.get(`/businesses/owner/${ownerId}`, { params }),
}

// Business Service API
export const serviceApi = {
  create: (data) => api.post("/business-services", data),
  getById: (id) => api.get(`/business-services/${id}`),
  update: (id, data) => api.put(`/business-services/${id}`, data),
  delete: (id) => api.delete(`/business-services/${id}`),
  getByBusiness: (businessId, params) => api.get(`/business-services/business/${businessId}`, { params }),
}

// Review API
export const reviewApi = {
  create: (data) => api.post("/reviews", data),
  createWithImages: (formData) => 
    api.post("/businesses/reviews", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  getById: (id) => api.get(`/reviews/${id}`),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
  getByBusiness: (businessId, params) => api.get(`/reviews/business/${businessId}`, { params }),
  getByUser: (userId, params) => api.get(`/reviews/user/${userId}`, { params }),
}

// Location API
export const locationApi = {
  getAll: (params) => api.get("/locations", { params }),
  getById: (id) => api.get(`/locations/${id}`),
  create: (data) => api.post("/locations", data),
  update: (id, data) => api.put(`/locations/${id}`, data),
  delete: (id) => api.delete(`/locations/${id}`),
  getNearby: (params) => api.get("/locations/nearby", { params }),
}

// Enquiry API
export const enquiryApi = {
  create: (data) => api.post("/enquiries", data),
  getById: (id) => api.get(`/enquiries/${id}`),
  updateStatus: (id, status) => api.put(`/enquiries/${id}/status?status=${status}`),
  getByBusiness: (businessId, params) => api.get(`/enquiries/business/${businessId}`, { params }),
  getByUser: (userId, params) => api.get(`/enquiries/user/${userId}`, { params }),
}

// Business Claim API
export const claimApi = {
  create: (data) => api.post("/claims", data),
  getById: (id) => api.get(`/claims/${id}`),
  updateStatus: (id, status) => api.put(`/claims/${id}/status?status=${status}`),
  getByBusiness: (businessId) => api.get(`/claims/business/${businessId}`),
  getByUser: (userId, params) => api.get(`/claims/user/${userId}`, { params }),
}

// Promotion API
export const promotionApi = {
  create: (data) => api.post("/promotions", data),
  getById: (id) => api.get(`/promotions/${id}`),
  update: (id, data) => api.put(`/promotions/${id}`, data),
  delete: (id) => api.delete(`/promotions/${id}`),
  getByBusiness: (businessId, params) => api.get(`/promotions/business/${businessId}`, { params }),
  getActive: (params) => api.get("/promotions/active", { params }),
}

// Search Log API (admin only)
export const searchLogApi = {
  getById: (id) => api.get(`/search-logs/${id}`),
  getAll: (params) => api.get("/search-logs", { params }),
  getByUser: (userId, params) => api.get(`/search-logs/user/${userId}`, { params }),
  getAnalytics: (params) => api.get("/search-logs/analytics", { params }),
}

// Order API
export const orderApi = {
  create: (data) => api.post("/orders", data),
  getById: (id) => api.get(`/orders/${id}`),
  getByBusiness: (businessId, params) => api.get(`/orders/business/${businessId}`, { params }),
  getByUser: (userId, params) => api.get(`/orders/user/${userId}`, { params }),
}

export default api

