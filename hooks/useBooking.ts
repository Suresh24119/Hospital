import { useState, useCallback } from 'react'
import { Booking, FormErrors, Doctor, Service } from '../types'
import { SERVICES } from '../data'

interface UseBookingReturn {
  booking: Booking
  errors: FormErrors
  step: number
  updateBooking: (updates: Partial<Booking>) => void
  setStep: (step: number) => void
  validateStep: (stepNumber: number) => boolean
  resetBooking: () => void
  setErrors: (errors: FormErrors) => void
}

const initialBooking: Booking = {
  service: SERVICES[0],
  doctor: null,
  date: '',
  time: '',
  name: '',
  email: '',
  phone: '',
  dob: '',
  insurance: '',
  notes: '',
}

export const useBooking = (): UseBookingReturn => {
  const [booking, setBooking] = useState<Booking>(initialBooking)
  const [errors, setErrors] = useState<FormErrors>({})
  const [step, setStep] = useState(1)

  const updateBooking = useCallback((updates: Partial<Booking>) => {
    setBooking(prev => ({ ...prev, ...updates }))
  }, [])

  const validateStep = useCallback((stepNumber: number): boolean => {
    const newErrors: FormErrors = {}

    switch (stepNumber) {
      case 1:
        if (!booking.doctor) {
          newErrors.doctor = 'Please select a doctor'
        }
        break

      case 2:
        if (!booking.date) {
          newErrors.date = 'Please select a date'
        }
        if (!booking.time) {
          newErrors.time = 'Please select a time'
        }
        break

      case 3:
        if (!booking.name.trim()) {
          newErrors.name = 'Full name is required'
        } else if (booking.name.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters'
        }

        if (!booking.email.trim()) {
          newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
          newErrors.email = 'Please enter a valid email address'
        }

        if (booking.phone && !/^[\d\s\-\+\(\)]+$/.test(booking.phone)) {
          newErrors.phone = 'Please enter a valid phone number'
        }

        if (booking.dob) {
          const dobDate = new Date(booking.dob)
          const today = new Date()
          if (dobDate > today) {
            newErrors.dob = 'Date of birth cannot be in the future'
          }
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [booking])

  const resetBooking = useCallback(() => {
    setBooking(initialBooking)
    setErrors({})
    setStep(1)
  }, [])

  return {
    booking,
    errors,
    step,
    updateBooking,
    setStep,
    validateStep,
    resetBooking,
    setErrors,
  }
}
