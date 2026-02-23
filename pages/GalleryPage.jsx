import { useRef, useEffect } from 'react'
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { Icon } from '../components/UI'
import Lenis from '@studio-freight/lenis'

const SECTION_HEIGHT = 1500

export default function GalleryPage({ onNavigate }) {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-slate-900">
      <GalleryNav onNavigate={onNavigate} />
      <HeroSection />
      <HorizontalScrollSection />
      <ServicesScrollSection />
    </div>
  )
}

const GalleryNav = ({ onNavigate }) => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 text-white">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-lg font-black mix-blend-difference hover:text-primary transition-colors"
      >
        <Icon name="local_hospital" className="text-2xl" />
        Hari Urology Hospital
      </button>
    </nav>
  )
}

const HeroSection = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-slate-900/0 to-slate-900" />
    </div>
  )
}

const CenterImage = () => {
  const { scrollY } = useScroll()

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0])
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100])

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["100%", "170%"]
  )
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  )

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2670)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Hospital Name in Center with Zoom Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          className="text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="mb-4"
          >
            <Icon name="local_hospital" className="text-7xl md:text-8xl text-primary drop-shadow-2xl" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 drop-shadow-2xl"
          >
            Hari Urology and kidney hospital
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="h-1.5 w-48 md:w-64 mx-auto bg-gradient-to-r from-primary via-cyan-400 to-primary rounded-full mb-6"
          />

          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-xl md:text-2xl lg:text-3xl text-white font-semibold drop-shadow-lg"
          >
            Advanced Urological & Kidney Care
          </motion.p>

          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="text-base md:text-lg text-slate-200 mt-4 max-w-2xl mx-auto"
          >
            State-of-the-art facilities • Expert urology specialists • Compassionate healthcare
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800"
        alt="Modern patient room"
        start={-200}
        end={200}
        className="w-1/3 rounded-2xl shadow-2xl"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800"
        alt="ICU ward with advanced equipment"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded-2xl shadow-2xl"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
        alt="Operating theater"
        start={-200}
        end={200}
        className="ml-auto w-1/3 rounded-2xl shadow-2xl"
      />
    </div>
  )
}

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  })

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85])

  const y = useTransform(scrollYProgress, [0, 1], [start, end])
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`relative ${className}`}
      ref={ref}
      style={{ transform, opacity }}
    />
  )
}

const ITEM_WIDTH = 400
const GAP = 30

const medicalImages = [
  { id: 1, color: "#0ea5e9", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" },
  { id: 2, color: "#06b6d4", image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=800" },
  { id: 3, color: "#14b8a6", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800" },
]

const HorizontalScrollSection = () => {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const totalDistance = (medicalImages.length - 1) * (ITEM_WIDTH + GAP)
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance])

  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="flex gap-[30px]" style={{ x }}>
          {medicalImages.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[400px] h-[500px] rounded-xl relative overflow-hidden"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 opacity-30" style={{ background: `linear-gradient(to bottom, transparent 60%, ${item.color})`, mixBlendMode: 'multiply' }} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

const ServicesScrollSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-48">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-6xl font-black text-white mb-4">Our Specialist Services</h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">Advanced urological care and kidney health with state-of-the-art facilities</p>
      </motion.div>

      <ServiceItem
        title="Urology Care"
        description="Comprehensive treatment for all urological conditions with advanced diagnostic and treatment facilities."
        image="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=1200"
        icon="favorite"
        delay={0.1}
      />
      <ServiceItem
        title="Kidney Health"
        description="Specialized care for kidney-related disorders. Our specialists use cutting-edge technology."
        image="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=1200"
        icon="psychology"
        delay={0.2}
        reverse
      />
    </section>
  )
}

const ServiceItem = ({ title, description, image, icon, delay, reverse }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3])

  return (
    <motion.div
      ref={ref}
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.8, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative mb-24 flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 group`}
    >
      <div className="w-full md:w-1/2 relative">
        <motion.div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl" style={{ scale: imageScale, opacity: imageOpacity }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
          <div className="absolute top-6 right-6 size-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl">
            <Icon name={icon} className="text-3xl text-white" />
          </div>
        </motion.div>
      </div>
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-5xl md:text-6xl font-black mb-2 text-white">{title}</h2>
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
