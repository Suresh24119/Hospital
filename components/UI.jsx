// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

export function Icon({ name, className = '' }) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
    >
      {name}
    </span>
  )
}

export function IconFill({ name, className = '' }) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
    >
      {name}
    </span>
  )
}

export function Logo({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 hover:opacity-90 transition-opacity" aria-label="Go to homepage">
      {/* Kidney + Hands Hospital Logo Icon */}
      <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Left Kidney */}
        <ellipse cx="34" cy="38" rx="14" ry="20" fill="#0056b2" transform="rotate(-10 34 38)" />
        <ellipse cx="34" cy="38" rx="7" ry="12" fill="white" transform="rotate(-10 34 38)" />
        {/* Right Kidney */}
        <ellipse cx="66" cy="38" rx="14" ry="20" fill="#0056b2" transform="rotate(10 66 38)" />
        <ellipse cx="66" cy="38" rx="7" ry="12" fill="white" transform="rotate(10 66 38)" />
        {/* Left Hand */}
        <path d="M20 78 Q20 58 34 58 Q38 58 38 65 L38 78" stroke="#0056b2" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Right Hand */}
        <path d="M80 78 Q80 58 66 58 Q62 58 62 65 L62 78" stroke="#0056b2" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Palm / base */}
        <path d="M20 78 Q34 88 50 88 Q66 88 80 78" stroke="#0056b2" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Stem between kidneys */}
        <line x1="50" y1="55" x2="50" y2="62" stroke="#0056b2" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <div className="leading-tight">
        <div className="text-base font-black text-slate-900 tracking-tight leading-none">Hari Urology</div>
        <div className="text-sm font-bold text-primary tracking-tight leading-tight">& Kidney Hospital</div>
      </div>
    </button>
  )
}

export function StarRating({ rating, size = 'sm' }) {
  const sz = size === 'sm' ? 'text-sm' : 'text-base'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={`material-symbols-outlined ${sz} ${i <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`}
          style={{ fontVariationSettings: `'FILL' ${i <= Math.round(rating) ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24` }}
        >star</span>
      ))}
    </div>
  )
}

export function Badge({ children, color = 'blue' }) {
  const colors = {
    green: 'bg-emerald-100 text-emerald-700',
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${colors[color]}`}>
      {children}
    </span>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {eyebrow && <p className="text-primary font-bold tracking-widest uppercase text-xs mb-2">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{title}</h2>
      {subtitle && <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-lg leading-relaxed">{subtitle}</p>}
      <div className={`h-1.5 w-16 bg-primary rounded-full mt-4 ${center ? 'mx-auto' : ''}`} />
    </div>
  )
}

export function DoctorCard({ doctor, onBook, onProfile }) {
  const handleProfileClick = () => onProfile && onProfile(doctor)

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Clickable Image Area */}
      <div
        onClick={handleProfileClick}
        className="relative h-64 overflow-hidden bg-slate-100 cursor-pointer"
      >
        <img
          src={doctor.img}
          alt={`Portrait of ${doctor.name}, ${doctor.specialty}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {doctor.badge && (
          <div className="absolute top-3 right-3">
            <Badge color={doctor.badgeColor || 'blue'}>{doctor.badge}</Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-5">
        {/* Clickable Header Area */}
        <div onClick={handleProfileClick} className="cursor-pointer group/title">
          <h3 className="font-bold text-lg text-slate-900 mb-0.5 group-hover/title:text-primary transition-colors">{doctor.name}</h3>
          <p className="text-primary text-sm font-semibold mb-3">{doctor.specialty}</p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1.5">
            <StarRating rating={doctor.rating} />
            <span className="font-bold text-slate-700">{doctor.rating}</span>
            <span>({doctor.reviews})</span>
          </div>
          <span className="w-px h-3 bg-slate-200" />
          <div className="flex items-center gap-1">
            <Icon name="workspace_premium" className="text-sm text-slate-400" />
            <span>{doctor.exp} yrs</span>
          </div>
        </div>
        <div className="text-xs text-emerald-600 flex items-center gap-1 mb-4 font-medium">
          <Icon name="calendar_today" className="text-sm" />
          <span>Next: {doctor.available}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onBook && onBook(doctor)}
            className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors shadow-sm active:scale-95"
          >
            Book Now
          </button>
          <button
            onClick={handleProfileClick}
            className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors active:scale-95"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-8">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <Icon name="chevron_right" className="text-xs text-slate-400" />}
          {item.onClick ? (
            <button onClick={item.onClick} className="hover:text-primary transition-colors">{item.label}</button>
          ) : (
            <span className="text-slate-900 font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  }
  return (
    <div className={`inline-block animate-spin rounded-full border-slate-200 border-t-primary ${sizes[size]} ${className}`} />
  )
}

export function LoadingPage({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-slate-600 mt-4 font-medium">{message}</p>
      </div>
    </div>
  )
}



export function EmptyState({ icon = 'inbox', title, message, action }) {
  return (
    <div className="text-center py-16 px-4">
      <Icon name={icon} className="text-7xl text-slate-300 mb-4" />
      <h3 className="text-2xl font-bold text-slate-600 mb-2">{title}</h3>
      {message && <p className="text-slate-500 mb-6 max-w-md mx-auto">{message}</p>}
      {action && action}
    </div>
  )
}

export function Card({ children, className = '', hover = false }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${hover ? 'card-hover' : ''} ${className}`}>
      {children}
    </div>
  )
}


