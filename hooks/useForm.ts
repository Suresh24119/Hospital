import { useState, useCallback, ChangeEvent } from 'react'
import { FormErrors } from '../types'

interface UseFormOptions<T> {
  initialValues: T
  validate?: (values: T) => FormErrors
  onSubmit: (values: T) => void | Promise<void>
}

interface UseFormReturn<T> {
  values: T
  errors: FormErrors
  isSubmitting: boolean
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  setFieldValue: (field: keyof T, value: any) => void
  setFieldError: (field: string, error: string) => void
  resetForm: () => void
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setValues(prev => ({ ...prev, [name]: value }))
      
      // Clear error for this field
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [errors]
  )

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
    
    // Clear error for this field
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field as string]
        return newErrors
      })
    }
  }, [errors])

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      
      // Validate if validation function provided
      if (validate) {
        const validationErrors = validate(values)
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors)
          return
        }
      }

      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } catch (error) {
        console.error('Form submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validate, onSubmit]
  )

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitting(false)
  }, [initialValues])

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
  }
}
