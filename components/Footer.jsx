import { Icon } from './UI'

export default function Footer({ onNavigate }) {
  const handleNavigate = (page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4 group">
              <div className="text-primary group-hover:scale-110 transition-transform duration-200">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 48 48">
                  <path clipRule="evenodd" fillRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" />
                  <path clipRule="evenodd" fillRule="evenodd" d="M25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" />
                </svg>
              </div>
              <span className="text-base font-black">Hari Urology and kidney hospital</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">Providing world-class medical services since 1985. Committed to patient health and advanced research.</p>
            <div className="flex gap-2.5">
              {[
                {
                  label: 'Facebook',
                  icon: (
                    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z" />
                    </svg>
                  )
                },
                {
                  label: 'Instagram',
                  icon: (
                    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  )
                },
                {
                  label: 'YouTube',
                  icon: (
                    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )
                },
                {
                  label: 'Share',
                  onClick: () => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Hari Urology Hospital',
                        text: 'Check out world-class medical services at Hari Urology Hospital.',
                        url: window.location.href,
                      }).catch(console.error);
                    } else {
                      alert('Share not supported on this browser');
                    }
                  },
                  icon: (
                    <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                  )
                }
              ].map(item => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="size-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-200 group text-slate-300 hover:text-white"
                  aria-label={item.label}
                >
                  <div className="group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black mb-3 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                ['doctors', 'Find a Doctor', 'person_search'],
                ['departments', 'Departments', 'business'],
                ['services', 'Our Services', 'medical_services'],
                ['gallery', 'Gallery', 'photo_library'],
                ['about', 'About Us', 'info'],
                ['contact', 'Contact', 'call']
              ].map(([page, label, icon]) => (
                <li key={page}>
                  <button
                    onClick={() => handleNavigate(page)}
                    className="text-slate-400 text-xs hover:text-white transition-all duration-200 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <Icon name={icon} className="text-sm text-slate-600 group-hover:text-primary transition-colors" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-black mb-3 text-white">Our Services</h4>
            <ul className="space-y-2">
              {[
                ['Cardiology', 'favorite'],
                ['Neurology', 'psychology'],
                ['Pediatrics', 'child_care'],
                ['Orthopedics', 'accessibility_new'],
                ['Oncology', 'science'],
                ['Radiology', 'biotech']
              ].map(([service, icon]) => (
                <li key={service}>
                  <button
                    onClick={() => handleNavigate(service.toLowerCase())}
                    className="text-slate-400 text-xs hover:text-white transition-all duration-200 flex items-center gap-2 group hover:translate-x-1"
                  >
                    <Icon name={icon} className="text-sm text-slate-600 group-hover:text-primary transition-colors" />
                    <span>{service}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-black mb-3 text-white">Contact Us</h4>
            <ul className="space-y-3">
              {[
                { icon: 'location_on', text: 'Hari Urology and kidney hospital, Deesa, Gujarat', color: 'text-emerald-400' },
                { icon: 'call', text: '+91 98292 50376', link: 'tel:+919829250376', color: 'text-blue-400' },
                { icon: 'mail', text: 'hariurologyandkidney1008@gmail.com', link: 'mailto:hariurologyandkidney1008@gmail.com', color: 'text-amber-400' },
                { icon: 'schedule', text: 'Mon–Sat: 9AM–8PM | Emergency: 24/7', color: 'text-red-400' },
              ].map(c => (
                <li key={c.icon} className="flex items-start gap-2 group">
                  <Icon name={c.icon} className={`${c.color} text-sm shrink-0 mt-0.5 group-hover:scale-110 transition-transform`} />
                  {c.link ? (
                    <a href={c.link} className="text-slate-400 text-xs leading-relaxed hover:text-white transition-colors">
                      {c.text}
                    </a>
                  ) : c.icon === 'location_on' ? (
                    <a
                      href="https://www.google.com/maps/place/Hari+Urology+and+kidney+hospital+deesa/@24.2693996,72.182263,17z/data=!4m7!3m6!1s0x395cbd16fd2abfcd:0x905f8efd670e3358!8m2!3d24.2694543!4d72.182248!15sChZEZWVzYSBzaXIgaGFpIGhvc3BpdGFsWhgiFmRlZXNhIHNpciBoYWkgaG9zcGl0YWySAQhob3NwaXRhbJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOU2VqVjFhbk5uUlJBQuABAPoBBAgAEEY!16s%2Fg%2F11rq67hyx_?entry=ttu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 text-xs leading-relaxed hover:text-white transition-colors"
                    >
                      {c.text}
                    </a>
                  ) : (
                    <span className="text-slate-400 text-xs leading-relaxed">{c.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px]">
          <p className="flex items-center gap-2">
            <span>© 2025 Hari Urology and kidney hospital.</span>
            <span className="hidden sm:inline">All rights reserved.</span>
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
              <button key={t} className="hover:text-white transition-colors hover:underline">{t}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
