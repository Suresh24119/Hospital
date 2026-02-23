import { useState, useCallback, useEffect } from 'react'
import { AsyncState } from '../types'

interface UseAsyncOptions {
  immediate?: boolean
}

interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: (...args: any[]) => Promise<T | null>
  reset: () => void
}

export const useAsync = <T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions = {}
): UseAsyncReturn<T> => {
  const { immediate = false } = options

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState({ data: null, loading: true, error: null })

      try {
        const data = await asyncFunction(...args)
        setState({ data, loading: false, error: null })
        return data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred'
        setState({ data: null, loading: false, error: errorMessage })
        return null
      }
    },
    [asyncFunction]
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate, execute])

  return {
    ...state,
    execute,
    reset,
  }
}
