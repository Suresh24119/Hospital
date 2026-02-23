import { useState, useEffect, useRef } from 'react'
import { Icon } from './UI'

export function CountUpStat({ end, label, icon, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
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
    if (!isVisible) {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
      return
    }

    const runAnimation = () => {
      const startTime = Date.now()
      const range = end

      const timer = setInterval(() => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = range * easeOutQuart

        setCount(currentCount)

        if (progress === 1) {
          clearInterval(timer)
          setCount(end)
        }
      }, 16) // ~60fps

      return timer
    }

    // Run initial animation
    const initialTimer = runAnimation()

    // Set up looping every 10 seconds
    const loopInterval = setInterval(() => {
      setCount(0) // Reset to 0
      setTimeout(() => {
        runAnimation()
      }, 100) // Small delay before restarting
    }, 10000) // Loop every 10 seconds

    animationRef.current = loopInterval

    return () => {
      clearInterval(initialTimer)
      clearInterval(loopInterval)
    }
  }, [isVisible, end, duration])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 transform hover:scale-105 transition-transform duration-300">
      <div className="size-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-2 animate-pulse">
        <Icon name={icon} className="text-white text-4xl" />
      </div>
      <div className="text-5xl font-black drop-shadow-lg">
        {Math.floor(count)}{suffix}
      </div>
      <div className="text-blue-100 font-medium text-sm">{label}</div>
    </div>
  )
}
