import axios from './httpRequest.js'

// Create appointment
export const createAppointment = (data: any) => {
  const url = `/appointments`
  return axios({ method: 'POST', url, data })
}

// Get appointment by ID
export const getAppointmentById = (id: string) => {
  const url = `/appointments/${id}`
  return axios({ method: 'GET', url })
}

// Cancel appointment
export const cancelAppointment = (id: string) => {
  const url = `/appointments/${id}/cancel`
  return axios({ method: 'POST', url })
}

// Get available time slots
export const getAvailableSlots = (doctorId: number, date: string) => {
  const url = `/appointments/slots/${doctorId}/${date}`
  return axios({ method: 'GET', url })
}

// Get all appointments (with optional filters)
export const getAppointments = (params?: any) => {
  const url = `/appointments`
  return axios({ method: 'GET', url, params })
}
