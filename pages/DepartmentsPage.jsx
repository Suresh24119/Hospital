import { Icon, Breadcrumb, SectionHeading } from '../components/UI'
import { DEPARTMENTS, SERVICES } from '../data'

const COLOR_MAP = {
  red: 'bg-red-50 text-red-500 group-hover:bg-red-500',
  yellow: 'bg-yellow-50 text-yellow-500 group-hover:bg-yellow-500',
  purple: 'bg-purple-50 text-purple-500 group-hover:bg-purple-500',
  orange: 'bg-orange-50 text-orange-500 group-hover:bg-orange-500',
  teal: 'bg-teal-50 text-teal-500 group-hover:bg-teal-500',
}

export default function DepartmentsPage({ onNavigate }) {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Departments</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { icon: 'business', label: 'Departments', value: '15+' },
            { icon: 'medical_services', label: 'Specialists', value: '120+' },
            { icon: 'bed', label: 'Total Beds', value: '500+' },
            { icon: 'emergency', label: 'Emergency', value: '24/7' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-sm">
              <Icon name={s.icon} className="text-primary text-3xl mb-2" />
              <div className="text-2xl font-black text-slate-900">{s.value}</div>
              <div className="text-sm text-slate-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Departments Grid */}
        <SectionHeading
          eyebrow="Our Facilities"
          title="All Departments"
          subtitle="Each department is equipped with cutting-edge technology and led by expert medical professionals."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {DEPARTMENTS.map(d => (
            <button
              key={d.id}
              onClick={() => onNavigate(d.name.toLowerCase())}
              className="group bg-white rounded-2xl border border-slate-200 p-7 hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`size-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${COLOR_MAP[d.color] || 'bg-primary-light text-primary group-hover:bg-primary'} group-hover:text-white`}>
                  <Icon name={d.icon} className="text-3xl" />
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Icon name="person" className="text-xs" />
                  {d.doctors} Doctors
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2">{d.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{d.desc}</p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  {d.beds > 0 && (
                    <span className="flex items-center gap-1">
                      <Icon name="bed" className="text-sm text-slate-400" /> {d.beds} Beds
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Icon name="schedule" className="text-sm text-slate-400" /> 24/7
                  </span>
                </div>
                <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  View <Icon name="arrow_forward" className="text-sm" />
                </span>
              </div>

              <div className="absolute bottom-0 right-0 size-20 bg-primary/3 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        {/* Floor Map CTA */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="size-20 bg-primary-light rounded-2xl flex items-center justify-center shrink-0">
            <Icon name="map" className="text-primary text-4xl" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Need Help Finding a Department?</h3>
            <p className="text-slate-500">Our staff at the front desk are available 24/7 to guide you to the right department. You can also call our main line.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button onClick={() => onNavigate('contact')} className="flex items-center justify-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-all">
              <Icon name="call" /> Call Us
            </button>
            <button onClick={() => onNavigate('book')} className="flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold px-6 py-3 rounded-xl hover:bg-primary-light transition-all">
              <Icon name="calendar_month" /> Book Visit
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
