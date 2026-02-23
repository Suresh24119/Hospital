import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  start?: number
  decimals?: number
  suffix?: string
}

export function useCountUp({ 
  end, 
  duration = 2000, 
  start = 0,
  decimals = 0,
  suffix = ''
}: UseCountUpOptions) {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const range = end - start

    const timer = setInterval(() => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = start + range * easeOutQuart

      setCount(currentCount)

      if (progress === 1) {
        clearInterval(timer)
        setCount(end)
      }
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }, [isVisible, start, end, duration])

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toString()

  return { 
    ref, 
    value: displayValue + suffix 
  }
}
