import { useState, useEffect, useRef } from 'react'

export function ParallaxImage({ src, alt, className = '', parallaxSpeed = 0.3, zoomEffect = true }) {
  const [transform, setTransform] = useState({ scale: 1, translateY: 0 })
  const ref = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = window.innerHeight / 2
      
      // Parallax effect (vertical movement)
      const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      const translateY = scrollPercent * 100 * parallaxSpeed
      
      // Enhanced zoom effect (scale based on distance from viewport center)
      let scale = 1
      if (zoomEffect) {
        const distance = Math.abs(elementCenter - viewportCenter)
        const maxDistance = window.innerHeight
        const scaleRange = 0.4 // Scale from 1.0 to 1.4 (increased from 0.2)
        scale = 1.4 - (distance / maxDistance) * scaleRange
        scale = Math.max(1, Math.min(1.4, scale))
      }
      
      setTransform({ scale, translateY })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [parallaxSpeed, zoomEffect])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${transform.scale}) translateY(${transform.translateY}px)`
        }}
      />
    </div>
  )
}
