import { Icon, Breadcrumb, DoctorCard } from '../components/UI'
import { SERVICES, DOCTORS } from '../data'

export default function PediatricsPage({ onNavigate }) {
    const svc = SERVICES.find(s => s.name === 'Pediatrics') || SERVICES[0]
    const relatedDoctors = DOCTORS.filter(d => d.dept === 'Pediatrics').slice(0, 3)

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-200 px-4 py-4">
                <div className="max-w-6xl mx-auto">
                    <Breadcrumb items={[
                        { label: 'Home', onClick: () => onNavigate('home') },
                        { label: 'Services', onClick: () => onNavigate('services') },
                        { label: 'Pediatrics' }
                    ]} />
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 p-8 text-white">
                                <div className="flex items-center gap-5">
                                    <div className="size-18 bg-white/20 rounded-2xl flex items-center justify-center">
                                        <Icon name="child_care" className="text-5xl" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-black">Pediatrics</h1>
                                        <p className="text-emerald-50 mt-1">Compassionate Care for Children</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-7">
                                <p className="text-slate-600 leading-relaxed text-base mb-4">{svc.desc}</p>
                                <p className="text-slate-600 leading-relaxed">Our Pediatrics department provides a warm, friendly environment for children from infancy through adolescence. We emphasize preventive care and patient education to ensure a healthy future for your little ones.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
                            <h2 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2">
                                <Icon name="medical_services" className="text-emerald-600" />
                                Pediatric Services
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {svc.treatments.map(t => (
                                    <div key={t} className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-600 hover:bg-emerald-50 transition-all group">
                                        <div className="size-7 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                                            <Icon name="check" className="text-emerald-600 text-sm" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-700 transition-colors">{t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
                            <h2 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2">
                                <Icon name="groups" className="text-emerald-600" />
                                Our Pediatricians
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {relatedDoctors.map(doc => (
                                    <DoctorCard
                                        key={doc.id}
                                        doctor={doc}
                                        onBook={() => onNavigate('book')}
                                        onProfile={d => onNavigate('doctor-profile', d)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="bg-emerald-600 rounded-2xl p-6 text-white text-center shadow-lg shadow-emerald-200">
                            <Icon name="calendar_month" className="text-4xl text-white/40 mb-3" />
                            <h3 className="font-black text-xl mb-2">Book Appointment</h3>
                            <p className="text-emerald-100 text-sm mb-5">Talk to a pediatrician today.</p>
                            <button
                                onClick={() => onNavigate('book')}
                                className="w-full bg-white text-emerald-600 font-black py-3 rounded-xl hover:shadow-xl transition-all"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
