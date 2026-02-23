import { FormErrors } from '../types'

export const validators = {
  required: (value: string, fieldName: string): string | null => {
    return value.trim() ? null : `${fieldName} is required`
  },

  email: (value: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) ? null : 'Please enter a valid email address'
  },

  phone: (value: string): string | null => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    return phoneRegex.test(value) ? null : 'Please enter a valid phone number'
  },

  minLength: (value: string, min: number): string | null => {
    return value.length >= min ? null : `Must be at least ${min} characters`
  },

  maxLength: (value: string, max: number): string | null => {
    return value.length <= max ? null : `Must be no more than ${max} characters`
  },

  date: (value: string): string | null => {
    const date = new Date(value)
    return !isNaN(date.getTime()) ? null : 'Please enter a valid date'
  },

  futureDate: (value: string): string | null => {
    const date = new Date(value)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today ? null : 'Date cannot be in the past'
  },

  pastDate: (value: string): string | null => {
    const date = new Date(value)
    const today = new Date()
    return date <= today ? null : 'Date cannot be in the future'
  },
}

export const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length <= 3) return cleaned
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
}
