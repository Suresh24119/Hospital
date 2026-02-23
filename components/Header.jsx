import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Logo, Icon } from './UI'

const NAV_LINKS = [
  { label: 'Home', page: 'home', icon: 'home' },
  { 
    label: 'Services', 
    page: 'services',
    icon: 'medical_services',
    dropdown: [
      { label: 'All Services', page: 'services', icon: 'grid_view' },
      { label: 'Cardiology', page: 'cardiology', icon: 'favorite' },
      { label: 'Neurology', page: 'neurology', icon: 'psychology' },
      { label: 'Pediatrics', page: 'pediatrics', icon: 'child_care' },
      { label: 'Orthopedics', page: 'orthopedics', icon: 'accessibility_new' },
      { label: 'Oncology', page: 'oncology', icon: 'science' },
      { label: 'Radiology', page: 'radiology', icon: 'biotech' },
    ]
  },
  { label: 'Doctors', page: 'doctors', icon: 'medical_information' },
  { label: 'Departments', page: 'departments', icon: 'business' },
  { label: 'Gallery', page: 'gallery', icon: 'photo_library' },
  { label: 'About Us', page: 'about', icon: 'info' },
  { label: 'Contact', page: 'contact', icon: 'call' },
]

export default function Header({ currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Framer Motion scroll detection
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    
    // Set scrolled state for styling
    setScrolled(current > 20)
    
    // Hide header when scrolling down, show when scrolling up
    if (current > previous && current > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  const isServicePage = ['services', 'cardiology', 'neurology', 'pediatrics', 'orthopedics', 'oncology', 'radiology', 'service-detail'].includes(currentPage)

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xl shadow-slate-200/50' 
          : 'bg-white/98 backdrop-blur-xl border-b border-slate-200/80 shadow-lg shadow-slate-200/50'
      }`}
      animate={{
        y: hidden ? -100 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <div className="transform hover:scale-105 transition-transform duration-200">
          <Logo onClick={() => { onNavigate('home'); setMobileOpen(false) }} />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const isActive = link.page === currentPage || (link.page === 'services' && isServicePage)
            
            if (link.dropdown) {
              return (
                <div 
                  key={link.page} 
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(link.page)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => onNavigate(link.page)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-blue-700 text-white shadow-md shadow-primary/30'
                        : 'text-slate-700 hover:text-primary hover:bg-primary-light/50'
                    }`}
                  >
                    {link.label}
                    <Icon name="expand_more" className={`text-sm transition-transform duration-200 ${openDropdown === link.page ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {openDropdown === link.page && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/80 py-2 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl">
                      {link.dropdown.map(item => (
                        <button
                          key={item.page}
                          onClick={() => { onNavigate(item.page); setOpenDropdown(null) }}
                          className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold transition-all duration-150 ${
                            currentPage === item.page
                              ? 'bg-gradient-to-r from-primary/10 to-blue-700/10 text-primary border-l-4 border-primary'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-primary hover:translate-x-1'
                          }`}
                        >
                          <Icon name={item.icon} className="text-lg" />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            
            return (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`relative px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-blue-700 text-white shadow-md shadow-primary/30'
                    : 'text-slate-700 hover:text-primary hover:bg-primary-light/50'
                }`}
              >
                {link.label}
                {!isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-3/4 transition-all duration-300"></span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Emergency Contact - Desktop Only */}
          <a 
            href="tel:911"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all duration-200 group"
          >
            <Icon name="emergency" className="text-lg group-hover:animate-pulse" />
            <span className="hidden xl:inline">Emergency</span>
          </a>
          
          <button
            onClick={() => onNavigate('book')}
            className="hidden sm:flex items-center gap-2 rounded-xl h-11 px-6 bg-gradient-to-r from-primary via-blue-700 to-blue-800 text-white text-sm font-black hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all duration-200 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-800 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <Icon name="calendar_month" className="text-base relative z-10" />
            <span className="relative z-10">Book Appointment</span>
            <span className="absolute -top-1 -right-1 size-3 bg-green-400 rounded-full animate-pulse"></span>
          </button>
          <button
            className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-all duration-200 hover:scale-110"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} className="text-slate-700 text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-gradient-to-b from-white to-slate-50 px-4 py-4 flex flex-col gap-1 shadow-2xl max-h-[calc(100vh-72px)] overflow-y-auto animate-in slide-in-from-top duration-300">
          {NAV_LINKS.map(link => {
            const isActive = link.page === currentPage || (link.page === 'services' && isServicePage)
            
            if (link.dropdown) {
              return (
                <div key={link.page}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.page ? null : link.page)}
                    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-bold text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg shadow-primary/30'
                        : 'text-slate-700 hover:bg-primary-light/50 hover:text-primary'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon name={link.icon} className="text-lg" />
                      {link.label}
                    </span>
                    <Icon 
                      name={openDropdown === link.page ? 'expand_less' : 'expand_more'} 
                      className={`text-base transition-transform duration-200 ${openDropdown === link.page ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {/* Mobile Dropdown */}
                  {openDropdown === link.page && (
                    <div className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
                      {link.dropdown.map(item => (
                        <button
                          key={item.page}
                          onClick={() => { onNavigate(item.page); setMobileOpen(false); setOpenDropdown(null) }}
                          className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                            currentPage === item.page
                              ? 'bg-primary-light text-primary border-l-4 border-primary'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-primary hover:translate-x-1'
                          }`}
                        >
                          <Icon name={item.icon} className="text-base" />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            
            return (
              <button
                key={link.page}
                onClick={() => { onNavigate(link.page); setMobileOpen(false) }}
                className={`flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-bold text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg shadow-primary/30'
                    : 'text-slate-700 hover:bg-primary-light/50 hover:text-primary'
                }`}
              >
                <Icon name={link.icon} className="text-lg" />
                {link.label}
              </button>
            )
          })}
          <button
            onClick={() => { onNavigate('book'); setMobileOpen(false) }}
            className="mt-3 flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-r from-primary via-blue-700 to-blue-800 text-white font-black text-sm shadow-xl shadow-primary/40 hover:scale-105 transition-all duration-200"
          >
            <Icon name="calendar_month" className="text-base" />
            Book Appointment
          </button>
        </div>
      )}
    </motion.header>
  )
}
