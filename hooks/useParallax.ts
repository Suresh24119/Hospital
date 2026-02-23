import { useState, useEffect, useRef } from 'react'

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      
      // Calculate parallax offset
      const parallaxOffset = scrollPercent * 100 * speed
      setOffset(parallaxOffset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return { ref, offset }
}

export function useScrollZoom(minScale = 1, maxScale = 1.2) {
  const [scale, setScale] = useState(minScale)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 2
      
      // Calculate distance from viewport center
      const distance = Math.abs(elementCenter - viewportCenter)
      const maxDistance = window.innerHeight
      
      // Calculate scale based on distance (closer = larger)
      const scaleRange = maxScale - minScale
      const scaleValue = maxScale - (distance / maxDistance) * scaleRange
      const clampedScale = Math.max(minScale, Math.min(maxScale, scaleValue))
      
      setScale(clampedScale)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [minScale, maxScale])

  return { ref, scale }
}
