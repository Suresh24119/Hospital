import { useState, useEffect } from 'react'
import { Icon, Breadcrumb, DoctorCard } from '../components/UI'
import { getServiceById } from '../api/services'
import { getDoctors } from '../api/doctors'
import { jsPDF } from 'jspdf'

export default function ServiceDetailPage({ service: initialService, onNavigate }) {
  const [svc, setSvc] = useState(initialService)
  const [relatedDoctors, setRelatedDoctors] = useState([])
  const [loading, setLoading] = useState(!initialService)
  const [error, setError] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // 1. Fetch/Refresh Service Data
        let currentSvc = initialService
        if (!initialService?.id) {
          // Fallback or fetch default if needed, for now we expect a service
          setError('No service selected.')
          return
        }

        const serviceRes = await getServiceById(initialService.id)
        currentSvc = serviceRes.data.data || serviceRes.data
        setSvc(currentSvc)

        // 2. Fetch Related Doctors
        const doctorsRes = await getDoctors()
        const allDocs = doctorsRes.data.data || doctorsRes.data
        const related = allDocs.filter(d => d.dept === currentSvc.name).slice(0, 3)
        setRelatedDoctors(related)

      } catch (err) {
        console.error('Failed to load service detail:', err)
        setError('Failed to load service details.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [initialService?.id])

  const downloadServiceProfile = async () => {
    if (!svc) return
    setIsDownloading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const doc = new jsPDF()
    const primaryColor = [0, 86, 178] // #0056b2
    const darkColor = [30, 41, 59]    // #1e293b

    // ─── LOGO GENERATOR ────────────────────────────────
    const generateLogoPNG = () => {
      const canvas = document.createElement('canvas')
      const S = 360
      canvas.width = S; canvas.height = S
      const ctx = canvas.getContext('2d')
      const cx = S / 2, cy = S / 2
      const bCol = '#0056B2', wCol = '#ffffff', tCol = '#00A896'

      ctx.beginPath(); ctx.arc(cx, cy, S / 2 - 1, 0, Math.PI * 2); ctx.fillStyle = '#E8F0FF'; ctx.fill()
      ctx.beginPath(); ctx.arc(cx, cy, S / 2 - 1, 0, Math.PI * 2); ctx.strokeStyle = bCol; ctx.lineWidth = 14; ctx.stroke()
      ctx.beginPath(); ctx.arc(cx, cy, S / 2 - 16, 0, Math.PI * 2); ctx.strokeStyle = tCol; ctx.lineWidth = 5; ctx.stroke()

      const crossX = cx, crossY = cy - 40
      ctx.fillStyle = bCol
      ctx.beginPath(); ctx.roundRect(crossX - 10, crossY - 30, 20, 60, 5); ctx.fill()
      ctx.beginPath(); ctx.roundRect(crossX - 30, crossY - 10, 60, 20, 5); ctx.fill()

      const drawKidney = (x, y, rot) => {
        ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
        ctx.beginPath(); ctx.ellipse(0, 0, 28, 44, 0, 0, Math.PI * 2); ctx.fillStyle = bCol; ctx.fill()
        ctx.beginPath(); ctx.ellipse(0, 0, 13, 25, 0, 0, Math.PI * 2); ctx.fillStyle = wCol; ctx.fill()
        ctx.restore()
      }
      drawKidney(cx - 52, cy + 38, -0.18)
      drawKidney(cx + 52, cy + 38, 0.18)

      ctx.strokeStyle = tCol; ctx.lineWidth = 9; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(cx - 28, cy + 8); ctx.quadraticCurveTo(cx - 10, cy + 50, cx - 4, cy + 72); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx + 28, cy + 8); ctx.quadraticCurveTo(cx + 10, cy + 50, cx + 4, cy + 72); ctx.stroke()

      return canvas.toDataURL('image/png')
    }

    const logoData = generateLogoPNG()

    // ─── WATERMARK ──────────────────────────────────────
    doc.setGState(doc.GState({ opacity: 0.55 }))
    doc.addImage(logoData, 'PNG', 35, 80, 140, 140)
    doc.setGState(doc.GState({ opacity: 1.0 }))

    // Header with Medical Branding
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 40, 'F')
    doc.addImage(logoData, 'PNG', 168, 2, 36, 36)

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('HARI UROLOGY AND KIDNEY HOSPITAL', 16, 25)

    // Content Title
    doc.setTextColor(...darkColor)
    doc.setFontSize(16)
    doc.text(`Service Profile: ${svc.name}`, 20, 55)
    doc.setDrawColor(...primaryColor)
    doc.setLineWidth(1)
    doc.line(20, 58, 120, 58)

    // Description
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('About this Service', 20, 70)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(70, 70, 70)
    const descText = svc.description || "Comprehensive care provided by our specialized department."
    doc.text(doc.splitTextToSize(descText, 170), 20, 78)

    // Treatments
    if (svc.treatments && svc.treatments.length > 0) {
      doc.setTextColor(...darkColor)
      doc.setFont('helvetica', 'bold')
      doc.text('Key Treatments & Procedures', 20, 110)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(70, 70, 70)
      svc.treatments.forEach((t, i) => {
        doc.text(`• ${t}`, 25, 118 + (i * 7))
      })
    }

    // Contact Box
    const boxY = 220
    doc.setFillColor(245, 248, 255)
    doc.roundedRect(15, boxY, 180, 45, 3, 3, 'F')
    doc.setDrawColor(200, 215, 255)
    doc.roundedRect(15, boxY, 180, 45, 3, 3, 'S')

    doc.setTextColor(...primaryColor)
    doc.setFont('helvetica', 'bold')
    doc.text('Need to Consult a Specialist?', 25, boxY + 10)
    doc.setTextColor(70, 70, 70)
    doc.setFont('helvetica', 'normal')
    doc.text('Address: Hari Urology and kidney hospital, Deesa, Gujarat', 25, boxY + 20)
    doc.text('Phone: +91 98292 50376', 25, boxY + 28)
    doc.text('Email: hariurologyandkidney1008@gmail.com', 25, boxY + 36)

    // Footer
    doc.setFillColor(...primaryColor)
    doc.rect(0, 280, 210, 17, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.text('Compassionate Urological & Kidney Care Since Ever', 105, 290, { align: 'center' })

    doc.save(`Service_Profile_${svc.name.replace(/\s+/g, '_')}.pdf`)
    setIsDownloading(false)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4 italic font-serif">!</div>
          <h2 className="text-2xl font-black mb-4">{error}</h2>
          <button onClick={() => onNavigate('services')} className="text-primary font-bold underline">Back to Services</button>
        </div>
      ) : (
        <>
          {/* Top bar */}
          <div className="bg-white border-b border-slate-200 px-4 py-4">
            <div className="max-w-6xl mx-auto">
              <Breadcrumb items={[
                { label: 'Home', onClick: () => onNavigate('home') },
                { label: 'Services', onClick: () => onNavigate('services') },
                { label: svc.name }
              ]} />
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* ── MAIN CONTENT ── */}
              <div className="lg:col-span-2 space-y-6">

                {/* Hero Card */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-primary to-blue-800 p-8 text-white">
                    <div className="flex items-center gap-5">
                      <div className="size-18 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Icon name={svc.icon} className="text-5xl" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-black">{svc.name}</h1>
                        <p className="text-blue-200 mt-1">Department of {svc.name} Medicine</p>
                      </div>
                    </div>
                    {/* DOWNLOAD PROFILE BUTTON */}
                    <button
                      onClick={downloadServiceProfile}
                      disabled={isDownloading}
                      className={`mt-6 flex items-center justify-center gap-2 rounded-2xl h-12 px-6 border-2 font-bold transition-all w-full sm:w-auto ${isDownloading
                        ? 'bg-white/10 border-white/10 text-white/40 cursor-not-allowed'
                        : 'bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 shadow-lg'
                        }`}
                    >
                      {isDownloading ? (
                        <div className="size-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Icon name="picture_as_pdf" />
                      )}
                      {isDownloading ? 'Generating...' : 'Download Profile'}
                    </button>
                  </div>
                  <div className="p-7">
                    <p className="text-slate-600 leading-relaxed text-base mb-4">{svc.description}</p>
                    <p className="text-slate-600 leading-relaxed">Our {svc.name} department is staffed by internationally trained specialists who bring expertise, compassion, and the latest evidence-based practices to every patient interaction.</p>
                  </div>
                </div>

                {/* Treatments */}
                {svc.treatments && svc.treatments.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
                    <h2 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2">
                      <Icon name="medical_services" className="text-primary" />
                      Treatments & Procedures
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.treatments.map(t => (
                        <div key={t} className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary hover:bg-primary-light transition-all group">
                          <div className="size-7 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                            <Icon name="check" className="text-emerald-600 text-sm" />
                          </div>
                          <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats and Doctors sections - minimized for space */}
                <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
                  <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <Icon name="bar_chart" className="text-primary" />
                    Department at a Glance
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: 'medical_services', label: 'Specialists', value: '12+' },
                      { icon: 'bed', label: 'Beds', value: '40' },
                      { icon: 'schedule', label: 'Hours', value: '24/7' },
                      { icon: 'emoji_events', label: 'Awards', value: '5+' },
                    ].map(s => (
                      <div key={s.label} className="text-center p-4 bg-primary-light rounded-2xl">
                        <Icon name={s.icon} className="text-primary text-2xl mb-2" />
                        <div className="text-2xl font-black text-primary">{s.value}</div>
                        <div className="text-xs font-semibold text-slate-600 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {relatedDoctors.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
                    <h2 className="text-xl font-black text-slate-900 mb-5 flex items-center gap-2">
                      <Icon name="groups" className="text-primary" />
                      Our {svc.name} Specialists
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
                )}
              </div>

              {/* SIDEBAR handled similarly... */}
              <div className="space-y-5">
                <div className="bg-primary rounded-2xl p-6 text-white text-center">
                  <Icon name="calendar_month" className="text-4xl text-white/40 mb-3" />
                  <h3 className="font-black text-xl mb-2">Book Appointment</h3>
                  <p className="text-blue-100 text-sm mb-5">See a {svc.name} specialist within 24 hours.</p>
                  <button onClick={() => onNavigate('book')} className="w-full bg-white text-primary font-black py-3 rounded-xl hover:shadow-xl transition-all">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
