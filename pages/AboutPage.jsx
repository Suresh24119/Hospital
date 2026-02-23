import { Icon } from '../components/UI'
import { CountUpStat } from '../components/CountUpStat'

const TIMELINE = [
  { icon: 'storefront', year: '1985', title: 'Humble Beginnings', desc: 'Dr. Bharat G. Vora established a small urology clinic in Deesa, driven by a vision to provide specialized kidney care to the North Gujarat region.' },
  { icon: 'medical_services', year: '2000', title: 'Facility Expansion', desc: 'The clinic evolved into a dedicated urology hospital, introducing advanced diagnostic tools and a specialized team of kidney experts.' },
  { icon: 'science', year: '2012', title: 'Technological Leap', desc: 'Introduction of laser urology surgeries and advanced dialysis units, setting a new benchmark for medical technology in the city.' },
  { icon: 'emoji_events', year: '2018', title: 'Regional Leadership', desc: 'Recognized as the premier kidney CARE center in Deesa, serving patients from across Gujarat and neighboring Rajasthan.' },
  { icon: 'verified_user', year: 'Today', title: 'Modern Excellence', desc: 'A state-of-the-art multi-specialty urology center led by Dr. Bharat G. Vora, committed to compassionate and advanced surgical care.' },
]

const VALUES = [
  { icon: 'volunteer_activism', name: 'Compassion', desc: 'Every patient is treated with dignity, empathy, and genuine care as if they were our own family.', color: 'bg-rose-50 text-rose-500' },
  { icon: 'science', name: 'Innovation', desc: 'We continuously invest in the latest technology and research to deliver the best possible outcomes.', color: 'bg-sky-50 text-sky-500' },
  { icon: 'verified_user', name: 'Integrity', desc: 'We believe in transparent, honest communication at every step of the care journey.', color: 'bg-emerald-50 text-emerald-500' },
  { icon: 'groups', name: 'Excellence', desc: 'Our team of specialists are committed to delivering world-class results in every procedure and consultation.', color: 'bg-amber-50 text-amber-500' },
  { icon: 'accessibility', name: 'Accessibility', desc: 'We work to make high-quality healthcare accessible and affordable for every member of our community.', color: 'bg-purple-50 text-purple-500' },
  { icon: 'handshake', name: 'Partnership', desc: 'We collaborate with global medical institutions to bring the latest treatments to our patients.', color: 'bg-teal-50 text-teal-500' },
]

export default function AboutPage({ onNavigate }) {
  return (
    <main>

      {/* Hero with High-Quality Image Background */}
      <section className="relative min-h-[600px] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          {/* YouTube Background Video */}
          <iframe
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-110"
            src="https://www.youtube.com/embed/1Jc7NU8j4Ls?autoplay=1&mute=1&loop=1&playlist=1Jc7NU8j4Ls&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1"
            allow="autoplay; encrypted-media"
            title="Hospital Background Video"
          />
          {/* Light overlay for text legibility without hiding the video completely */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/20 to-slate-900/40 z-10" />
        </div>

        {/* Removed secondary dark overlay to keep the video visible */}

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-cyan-500/20 animate-pulse" />

        {/* Center Content - Hospital Name & Doctor */}
        <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest rounded-full mb-6 shadow-lg border border-white/40">
            <Icon name="verified_user" className="text-sm" />
            Est. 1985
          </span>

          {/* Hospital Name */}
          <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight max-w-4xl mb-6 drop-shadow-2xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            Hari Urology & Kidney Hospital
          </h1>

          <h2 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight max-w-4xl mb-6 drop-shadow-2xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            Healing with Heart,<br />
            <span className="text-cyan-100">Leading with Science</span>
          </h2>

          {/* Doctor Name */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="person" className="text-2xl text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-white text-lg">Dr. Bharat G. Vora</p>
              <p className="text-sm text-cyan-100 italic">MS - Urology, Senior Surgeon</p>
            </div>
          </div>

          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-lg" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            Our mission is to provide compassionate, patient-centered care through medical excellence and innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('doctors')}
              className="group relative h-14 px-8 bg-white text-sky-600 font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Icon name="groups" />
                Meet Our Team
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-50 to-cyan-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="h-14 px-8 bg-white/10 backdrop-blur-md text-white border-2 border-white/40 font-bold rounded-2xl hover:bg-white/20 hover:border-white/60 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <span className="flex items-center gap-2">
                <Icon name="medical_services" />
                Our Services
              </span>
            </button>
          </div>
        </div>

        {/* Floating elements for depth */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-300/10 rounded-full blur-2xl animate-pulse delay-75" />
      </section>

      {/* ── TIMELINE with 3D Effects ── */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-sky-100 text-sky-600 text-xs font-black uppercase tracking-widest rounded-full mb-4">
            Our Story
          </span>
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Our Journey Through Time
            </h2>
            {/* Animated line under heading */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full animate-slide-right"></div>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mt-6">
            From a small community clinic to a regional center of excellence — four decades of growth driven by purpose.
          </p>
        </div>

        <div className="relative">
          {/* Animated timeline line with gradient */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-200 via-cyan-300 to-teal-400 rounded-full" />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className="flex gap-6 md:gap-8 relative group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* 3D Icon with glow effect */}
                <div className={`shrink-0 size-14 md:size-16 rounded-2xl flex items-center justify-center z-10 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${i === TIMELINE.length - 1
                  ? 'bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-sky-500/50'
                  : 'bg-white border-2 border-sky-200 text-sky-600 group-hover:border-sky-400'
                  }`}>
                  <Icon name={item.icon} className="text-2xl" />
                </div>

                {/* Card with 3D effect */}
                <div className={`flex-1 bg-white rounded-3xl border-2 p-6 md:p-8 shadow-lg transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl ${i === TIMELINE.length - 1
                  ? 'border-sky-300 bg-gradient-to-br from-white to-sky-50'
                  : 'border-slate-200 hover:border-sky-200'
                  }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-sm font-black px-4 py-2 rounded-full shadow-md">
                      <Icon name="schedule" className="text-base" />
                      {item.year}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>

                  {/* Progress indicator for current */}
                  {i === TIMELINE.length - 1 && (
                    <div className="mt-4 flex items-center gap-2 text-sky-600 font-bold text-sm">
                      <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
                      Current
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES with 3D Cards ── */}
      <section className="relative bg-gradient-to-br from-slate-50 via-sky-50 to-cyan-50 py-20 border-y border-sky-100 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #0ea5e9 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sky-600 font-bold tracking-widest uppercase text-xs mb-2">What We Believe</p>
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">Our Core Values</h2>
              {/* Animated line under heading */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full animate-slide-right"></div>
            </div>
            <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">The principles that guide every decision, every interaction, and every treatment within our walls.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <div
                key={v.name}
                className="group relative bg-white rounded-3xl border-2 border-slate-100 p-8 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-sky-200"
                style={{
                  animationDelay: `${i * 100}ms`,
                  perspective: '1000px'
                }}
              >
                {/* 3D Icon container */}
                <div className={`relative size-16 rounded-2xl flex items-center justify-center mb-6 ${v.color} transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg group-hover:shadow-2xl`}>
                  <Icon name={v.icon} className="text-3xl relative z-10" />
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" style={{ background: 'currentColor' }} />
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">{v.name}</h3>
                <p className="text-slate-600 leading-relaxed">{v.desc}</p>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="arrow_forward" className="text-sky-500" />
                </div>

                {/* 3D depth effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-500/0 to-cyan-500/0 group-hover:from-sky-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS with 3D Effect ── */}
      <section className="relative bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-75" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <CountUpStat end={500} suffix="+" label="Hospital Beds" icon="hotel" duration={2500} />
          <CountUpStat end={120} suffix="+" label="Expert Doctors" icon="medical_services" duration={2500} />
          <CountUpStat end={15} suffix="+" label="Departments" icon="apartment" duration={2000} />
          <CountUpStat end={50} suffix="k+" label="Happy Patients" icon="favorite" duration={2500} />
        </div>
      </section>

    </main>
  )
}
