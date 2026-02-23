import httpRequest from './httpRequest.js'

/**
 * Get all medical services
 */
export const getServices = () => {
    return httpRequest.get('/services')
}

/**
 * Get medical service by ID
 */
export const getServiceById = (id: string | number) => {
    return httpRequest.get(`/services/${id}`)
}
