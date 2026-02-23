import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001/api'

// Create axios instance
const httpRequest: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
httpRequest.interceptors.request.use(
  (config) => {
    // Check for admin_auth in localStorage
    const auth = localStorage.getItem('admin_auth')
    if (auth) {
      config.headers.Authorization = `Basic ${auth}`
    }
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
httpRequest.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.config?.url)
    console.error('Error details:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default httpRequest
