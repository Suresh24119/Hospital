import axios from './httpRequest.js'

// Get all doctors
export const getDoctors = (params?: any) => {
  const url = `/doctors`
  return axios({ method: 'GET', url, params })
}

// Get doctor by ID
export const getDoctorById = (id: number) => {
  const url = `/doctors/${id}`
  return axios({ method: 'GET', url })
}

// Get doctors by department
export const getDoctorsByDepartment = (department: string) => {
  const url = `/doctors/department/${department}`
  return axios({ method: 'GET', url })
}

// Search doctors
export const searchDoctors = (query: string) => {
  const url = `/doctors/search/${query}`
  return axios({ method: 'GET', url })
}

// Update doctor (Admin only)
export const updateDoctor = (id: number, data: any) => {
  const url = `/admin/doctors/${id}`
  return axios({ method: 'PUT', url, data })
}
