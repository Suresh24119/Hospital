import { useState, useEffect } from 'react'
import { Icon, IconFill, SectionHeading, DoctorCard, StarRating } from '../components/UI'
import { CountUpStat } from '../components/CountUpStat'
import { ParallaxImage } from '../components/ParallaxImage'
import { IMAGES } from '../data'
import { getDoctors } from '../api/doctors'
import { getServices } from '../api/services'
import { getServiceIcon } from '../utils/iconMapper'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { jsPDF } from 'jspdf'

export default function HomePage({ onNavigate }) {
  const [doctors, setDoctors] = useState([])
  const [docsLoading, setDocsLoading] = useState(true)
  const [docsError, setDocsError] = useState(null)

  const [services, setServices] = useState([])
  const [servicesLoading, setServicesLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)

  // Add smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  // Scroll animations for each section
  const specialtiesAnim = useScrollAnimation({ threshold: 0.2 })
  const whyChooseAnim = useScrollAnimation({ threshold: 0.2 })
  const doctorsAnim = useScrollAnimation({ threshold: 0.2 })
  const facilitiesAnim = useScrollAnimation({ threshold: 0.2 })
  const insuranceAnim = useScrollAnimation({ threshold: 0.2 })
  const testimonialAnim = useScrollAnimation({ threshold: 0.2 })
  const healthTipsAnim = useScrollAnimation({ threshold: 0.2 })
  const ctaAnim = useScrollAnimation({ threshold: 0.2 })

  const fetchDoctors = async () => {
    try {
      setDocsLoading(true)
      setDocsError(null)
      const res = await getDoctors()
      setDoctors(res.data.data || res.data)
    } catch (err) {
      console.error('Failed to fetch doctors for home:', err)
      const errorMessage = err.response?.data?.error || err.message || 'Failed to load doctors'
      setDocsError(errorMessage)
    } finally {
      setDocsLoading(false)
    }
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true)
        const res = await getServices()
        setServices(res.data.data || res.data)
      } catch (err) {
        console.error('Failed to fetch services for homepage:', err)
      } finally {
        setServicesLoading(false)
      }
    }
    fetchServices()
  }, [])

  const downloadBrochure = async () => {
    setIsDownloading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const doc = new jsPDF()
    const primaryColor = [0, 86, 178] // #0056b2
    const darkColor = [30, 41, 59] // #1e293b

    // Header
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 40, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('HARI UROLOGY AND KIDNEY HOSPITAL', 105, 25, { align: 'center' })

    // Content
    doc.setTextColor(...darkColor)
    doc.setFontSize(16)
    doc.text('Hospital Profile & Information', 20, 55)

    doc.setDrawColor(...primaryColor)
    doc.setLineWidth(1)
    doc.line(20, 58, 100, 58)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('About Us', 20, 70)
    doc.setFont('helvetica', 'normal')
    const aboutText = "Hari Urology and kidney hospital is a premier medical institution dedicated to excellence in urological and renal care. Located in Deesa, Gujarat, we combine state-of-the-art technology with compassionate clinical expertise."
    doc.text(doc.splitTextToSize(aboutText, 170), 20, 78)

    doc.setFont('helvetica', 'bold')
    doc.text('Our Services', 20, 105)
    doc.setFont('helvetica', 'normal')
    const servicesText = [
      "• Advanced Urology Care",
      "• Kidney Health & Dialysis",
      "• Specialized Urological Surgery",
      "• Diagnostic Imaging & Laboratory",
      "• 24/7 Emergency Services"
    ]
    servicesText.forEach((s, i) => doc.text(s, 25, 113 + (i * 7)))

    doc.setFont('helvetica', 'bold')
    doc.text('Contact Information', 20, 160)
    doc.setFont('helvetica', 'normal')
    doc.text('Address: Hari Urology and kidney hospital, Deesa, Gujarat', 20, 168)
    doc.text('Phone: +91 98292 50376', 20, 175)
    doc.text('Email: hariurologyandkidney1008@gmail.com', 20, 182)
    doc.text('Emergency: 24/7 Available', 20, 189)

    // Footer
    doc.setFillColor(...primaryColor)
    doc.rect(0, 280, 210, 17, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.text('Compassionate Care | Advanced Science', 105, 290, { align: 'center' })

    doc.save('Hari-Urology-Hospital-Profile.pdf')
    setIsDownloading(false)
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  return (
    <main className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative overflow-hidden rounded-3xl min-h-[560px] flex flex-col justify-center px-8 md:px-16 py-14">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10 z-10" />
              <div className="absolute inset-0 animate-ken-burns">
                <ParallaxImage
                  src={IMAGES.hero}
                  alt="Modern hospital corridor"
                  className="absolute inset-0 w-full h-full"
                  parallaxSpeed={0.8}
                  zoomEffect={true}
                />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-20 max-w-2xl text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-xs font-bold tracking-widest uppercase rounded-full mb-5">
                <IconFill name="verified" className="text-xs" />
                World Class Excellence
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6">
                Hari Urology<br />
                And{' '}
                <span className="text-blue-400">Kidney </span>{' '}
                Hospital
              </h1>

              <p className="text-slate-200 text-lg leading-relaxed mb-8 max-w-xl">
                Dedicated to providing world-class medical services with a team of expert doctors and state-of-the-art technology. Your health is our priority.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate('book')}
                  className="flex items-center justify-center gap-2 rounded-2xl h-14 px-8 bg-primary text-white text-base font-bold shadow-xl shadow-primary/40 hover:bg-primary-dark transition-all"
                >
                  <Icon name="calendar_month" />
                  Book Appointment
                </button>
                <button
                  onClick={downloadBrochure}
                  disabled={isDownloading}
                  className={`flex items-center justify-center gap-2 rounded-2xl h-14 px-8 border-2 font-bold transition-all ${isDownloading
                      ? 'bg-slate-100/10 border-white/10 text-white/40 cursor-not-allowed'
                      : 'bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20'
                    }`}
                >
                  {isDownloading ? (
                    <div className="size-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Icon name="picture_as_pdf" />
                  )}
                  {isDownloading ? 'Downloading...' : 'Download Profile'}
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mt-8">
                {[['verified_user', 'JCI Accredited'], ['workspace_premium', '25+ Years'], ['groups', '50k+ Patients']].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-1.5 text-white/80 text-xs font-semibold">
                    <Icon name={icon} className="text-blue-400 text-sm" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES ── */}
      <section ref={specialtiesAnim.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-hidden ${specialtiesAnim.isVisible ? 'animate-slide-up-bounce' : ''}`}>
        <SectionHeading
          eyebrow="Medical Excellence"
          title="Our Specialties"
          subtitle="World-leading specialists across every major medical field, equipped with cutting-edge technology."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {servicesLoading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-40 bg-white rounded-2xl border border-slate-100 animate-pulse" />
            ))
          ) : (
            services.slice(0, 6).map((s, idx) => {
              const iconName = getServiceIcon(s.name, s.icon)

              return (
                <button
                  key={s.id}
                  onClick={() => onNavigate(s.name.toLowerCase())}
                  className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className={`size-14 mx-auto rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${idx % 3 === 0 ? 'bg-blue-50 text-blue-600' : idx % 3 === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                    <Icon name={iconName} className="text-2xl" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{s.name}</h3>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-black opacity-0 group-hover:opacity-100 transition-opacity">View Dept</p>
                </button>
              )
            })
          )}
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section ref={whyChooseAnim.ref} className={`bg-gradient-to-br from-slate-50 to-blue-50 py-20 scroll-hidden ${whyChooseAnim.isVisible ? 'animate-fade-in-left' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Excellence in Healthcare"
            subtitle="Committed to providing the highest quality medical care with compassion and innovation."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'verified_user',
                title: 'JCI Accredited',
                desc: 'Internationally recognized for quality and patient safety standards.',
                color: 'bg-blue-50 text-blue-600'
              },
              {
                icon: 'medical_services',
                title: 'Expert Doctors',
                desc: '120+ highly qualified specialists with years of experience.',
                color: 'bg-emerald-50 text-emerald-600'
              },
              {
                icon: 'science',
                title: 'Advanced Technology',
                desc: 'State-of-the-art medical equipment and diagnostic tools.',
                color: 'bg-purple-50 text-purple-600'
              },
              {
                icon: 'favorite',
                title: 'Patient-Centered',
                desc: 'Compassionate care tailored to each patient\'s unique needs.',
                color: 'bg-rose-50 text-rose-600'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`size-14 rounded-2xl flex items-center justify-center mb-4 ${item.color}`}>
                  <Icon name={item.icon} className="text-2xl" />
                </div>
                <h3 className="font-black text-lg text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-primary py-16 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <CountUpStat end={25} suffix="+" label="Years Experience" icon="history_edu" />
            <CountUpStat end={120} suffix="+" label="Expert Doctors" icon="medical_services" />
            <CountUpStat end={50} suffix="k+" label="Happy Patients" icon="groups" />
            <CountUpStat end={15} suffix="+" label="Global Awards" icon="emoji_events" />
          </div>
        </div>
      </section>

      {/* ── FEATURED DOCTORS ── */}
      <section ref={doctorsAnim.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-hidden ${doctorsAnim.isVisible ? 'animate-fade-in-right' : ''}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <SectionHeading
            eyebrow="Meet The Team"
            title="Our Featured Doctors"
            center={false}
          />
          <button
            onClick={() => onNavigate('doctors')}
            className="shrink-0 flex items-center gap-2 border-2 border-primary text-primary font-bold px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all"
          >
            View All <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
        {docsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-slate-100 rounded-2xl"></div>
            ))}
          </div>
        ) : docsError ? (
          <div className="text-center py-12 bg-red-50 border border-red-100 rounded-2xl">
            <div className="inline-flex items-center justify-center size-16 bg-red-100 text-red-500 rounded-full mb-4">
              <Icon name="error" className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Unable to Load Doctors</h3>
            <p className="text-slate-600 mb-4">{docsError}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={fetchDoctors}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-md"
              >
                <Icon name="refresh" />
                Try Again
              </button>
              <button
                onClick={() => onNavigate('doctors')}
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-primary-light transition-all"
              >
                View All Doctors
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Make sure the backend server is running on port 3000
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map(doc => (
              <DoctorCard
                key={doc.id}
                doctor={doc}
                onBook={() => onNavigate('book')}
                onProfile={() => onNavigate('doctor-profile', doc)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── FACILITIES & TECHNOLOGY ── */}
      <section ref={facilitiesAnim.ref} className={`bg-slate-900 py-20 text-white scroll-hidden ${facilitiesAnim.isVisible ? 'animate-scale-in' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-3">State-of-the-Art</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">World-Class Facilities</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Equipped with the latest medical technology to provide accurate diagnosis and effective treatment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'biotech',
                title: 'Advanced Imaging',
                desc: 'MRI, CT, PET scans with 3D reconstruction capabilities',
                features: ['3T MRI Scanner', 'Digital X-Ray', '4D Ultrasound']
              },
              {
                icon: 'science',
                title: 'Modern Labs',
                desc: 'Fully automated laboratory with rapid test results',
                features: ['24/7 Lab Services', 'Molecular Testing', 'Blood Bank']
              },
              {
                icon: 'local_hospital',
                title: 'ICU & Operation Theaters',
                desc: 'Critical care units with advanced life support systems',
                features: ['50 ICU Beds', '12 OT Suites', 'NICU & PICU']
              }
            ].map((facility, idx) => (
              <div key={idx} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500 transition-all">
                <div className="size-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
                  <Icon name={facility.icon} className="text-3xl text-blue-400" />
                </div>
                <h3 className="font-black text-xl mb-2">{facility.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{facility.desc}</p>
                <ul className="space-y-2">
                  {facility.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <Icon name="check_circle" className="text-green-400 text-base" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSURANCE & PAYMENT ── */}
      <section ref={insuranceAnim.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-hidden ${insuranceAnim.isVisible ? 'animate-fade-in-left' : ''}`}>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12 border border-blue-100">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-bold text-sm">
                <Icon name="credit_card" />
                Flexible Payment Options
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                We Accept All Major Insurance Plans
              </h2>
              <p className="text-slate-600 text-lg mb-6">
                We work with most insurance providers to make quality healthcare accessible and affordable for everyone.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  'Medicare & Medicaid',
                  'Private Insurance',
                  'International Insurance',
                  'Self-Pay Options'
                ].map((option, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700">
                    <Icon name="check_circle" className="text-green-500" />
                    <span className="font-semibold text-sm">{option}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-all"
              >
                <Icon name="info" />
                Learn More About Coverage
              </button>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 max-w-sm">
                <h3 className="font-black text-lg text-slate-900 mb-4">Payment Methods</h3>
                <div className="space-y-3">
                  {[
                    { icon: 'credit_card', text: 'Credit/Debit Cards' },
                    { icon: 'account_balance', text: 'Bank Transfer' },
                    { icon: 'payments', text: 'Insurance Claims' },
                    { icon: 'receipt_long', text: 'Installment Plans' }
                  ].map((method, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon name={method.icon} className="text-blue-600" />
                      </div>
                      <span className="font-semibold text-slate-700 text-sm">{method.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section ref={testimonialAnim.ref} className={`bg-slate-50 py-20 scroll-hidden ${testimonialAnim.isVisible ? 'animate-fade-in-right' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-5/12 relative">
            <div className="absolute -top-6 -left-6 size-32 bg-primary/5 rounded-3xl animate-pulse" />
            <div className="relative z-10 rounded-3xl shadow-2xl overflow-hidden aspect-[4/3]">
              <ParallaxImage
                src={IMAGES.doctorPatient}
                alt="Doctor and patient consultation"
                className="w-full h-full"
                parallaxSpeed={0.6}
                zoomEffect={true}
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-5 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 z-20 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Icon name="thumb_up" className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-black text-xl text-slate-900">98%</p>
                  <p className="text-xs text-slate-500 font-medium">Patient Satisfaction</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-7/12">
            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Patient Stories</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
              Trusted by thousands<br />of families
            </h2>

            <div className="space-y-5">
              {[
                { name: 'Jane Cooper', role: 'Cardiology Patient', text: '"The care I received at Hari Urology and Kidney Hospital was exceptional. From the front desk to the surgical team, everyone was professional and genuinely caring. I felt in safe hands every step of the way."', rating: 5 },
                { name: 'Robert Mills', role: 'Orthopedics Patient', text: '"After my knee replacement surgery, the rehabilitation team was incredibly supportive. I was back on my feet faster than expected. Truly world-class care."', rating: 5 },
              ].map(t => (
                <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <StarRating rating={t.rating} />
                  <p className="text-slate-600 italic leading-relaxed mt-3 mb-4">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-primary-light flex items-center justify-center font-black text-primary text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HEALTH TIPS & BLOG ── */}
      <section ref={healthTipsAnim.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-hidden ${healthTipsAnim.isVisible ? 'animate-slide-up-bounce' : ''}`}>
        <SectionHeading
          eyebrow="Health & Wellness"
          title="Latest Health Tips"
          subtitle="Stay informed with expert advice and health insights from our medical professionals."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              category: 'Cardiology',
              title: '10 Heart-Healthy Habits for a Longer Life',
              desc: 'Learn simple lifestyle changes that can significantly improve your cardiovascular health.',
              icon: 'favorite',
              color: 'bg-red-50 text-red-600',
              bgImage: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800',
              link: 'cardiology'
            },
            {
              category: 'Nutrition',
              title: 'Balanced Diet: Your Path to Wellness',
              desc: 'Discover the essential nutrients your body needs and how to incorporate them into your daily meals.',
              icon: 'restaurant',
              color: 'bg-green-50 text-green-600',
              bgImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
              link: 'services'
            },
            {
              category: 'Mental Health',
              title: 'Managing Stress in Modern Life',
              desc: 'Effective techniques to reduce stress and improve your mental well-being.',
              icon: 'psychology',
              color: 'bg-purple-50 text-purple-600',
              bgImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
              link: 'neurology'
            }
          ].map((article, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate(article.link)}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                {/* Background Image */}
                <img
                  src={article.bgImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`size-20 rounded-2xl flex items-center justify-center ${article.color} backdrop-blur-sm bg-opacity-90 group-hover:scale-110 transition-transform shadow-xl`}>
                    <Icon name={article.icon} className="text-4xl" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-3">
                  {article.category}
                </span>
                <h3 className="font-black text-lg text-slate-900 mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {article.desc}
                </p>
                <button className="flex items-center gap-1 text-primary font-bold text-sm group-hover:gap-2 transition-all">
                  Read More
                  <Icon name="arrow_forward" className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section ref={ctaAnim.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-hidden ${ctaAnim.isVisible ? 'animate-scale-in' : ''}`}>
        <div className="bg-gradient-to-r from-primary to-blue-800 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 size-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="relative z-10">
            <Icon name="calendar_month" className="text-5xl text-white/30 mb-4" />
            <h2 className="text-3xl md:text-4xl font-black mb-3">Ready to Get Started?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Book your appointment today and experience world-class medical care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('book')}
                className="flex items-center justify-center gap-2 bg-white text-primary font-black px-8 py-4 rounded-2xl hover:shadow-xl transition-all text-base"
              >
                <Icon name="calendar_month" />
                Book an Appointment
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all text-base"
              >
                <Icon name="call" />
                Call Us Now
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
