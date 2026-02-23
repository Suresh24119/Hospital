import { useState, useEffect } from 'react'
import { Icon, SectionHeading, Breadcrumb } from '../components/UI'
import { getServices } from '../api/services'
import { getServiceIcon } from '../utils/iconMapper'

export default function ServicesPage({ onNavigate }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const res = await getServices()
        setServices(res.data.data || res.data)
      } catch (err) {
        console.error('Failed to fetch services:', err)
        setError('Failed to load services. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Our Services</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-white rounded-2xl border border-slate-200 animate-pulse" />
            ))
          ) : error ? (
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex items-center justify-center size-20 bg-red-50 text-red-500 rounded-full mb-4 text-3xl italic font-serif">!</div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{error}</h3>
              <p className="text-slate-500">Our team is working to restore this view. Please call us directly.</p>
            </div>
          ) : (
            services.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  const slugs = ['cardiology', 'neurology', 'pediatrics', 'orthopedics', 'oncology', 'radiology']
                  const slug = s.name.toLowerCase()
                  if (slugs.includes(slug)) {
                    onNavigate(slug)
                  } else {
                    onNavigate('service-detail', s)
                  }
                }}
                className="group bg-white rounded-2xl border border-slate-200 p-8 text-left hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {s.tag && (
                  <span className="absolute top-5 right-5 bg-amber-100 text-amber-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {s.tag}
                  </span>
                )}
                <div className="size-16 bg-primary-light rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all group-hover:scale-110">
                  <Icon name={getServiceIcon(s.name, s.icon)} className="text-3xl" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{s.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">{s.description}</p>
                <div className="flex items-center gap-1 text-primary font-bold text-sm group-hover:gap-2 transition-all">
                  Explore Service <Icon name="arrow_forward" className="text-sm" />
                </div>
                <div className="absolute bottom-0 right-0 size-24 bg-primary/3 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))
          )}
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 mb-12">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="World-Class Care, Every Time"
            subtitle="Our commitment to excellence means you get the best medical care available, supported by the latest technology."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'verified_user', title: 'JCI Accredited', desc: 'Internationally accredited for quality and safety standards.' },
              { icon: 'biotech', title: 'Advanced Technology', desc: 'State-of-the-art equipment and diagnostic tools.' },
              { icon: 'groups', title: 'Expert Team', desc: '120+ specialists across all major medical disciplines.' },
              { icon: 'schedule', title: '24/7 Emergency', desc: 'Level I Trauma Center available around the clock.' },
            ].map(f => (
              <div key={f.title} className="text-center p-5">
                <div className="size-14 bg-primary-light rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                  <Icon name={f.icon} className="text-2xl" />
                </div>
                <h4 className="font-black text-slate-900 mb-2">{f.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-black mb-3">Not Sure Which Service You Need?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">Our General Medicine team can help you find the right specialist. Book a consultation today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('book')} className="flex items-center justify-center gap-2 bg-white text-primary font-black px-8 py-3.5 rounded-xl hover:shadow-xl transition-all">
              <Icon name="calendar_month" />
              Book Appointment
            </button>
            <button onClick={() => onNavigate('contact')} className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all">
              <Icon name="call" />
              Call Us
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
