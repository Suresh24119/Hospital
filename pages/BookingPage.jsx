import { useState, useEffect } from 'react'
import { Icon } from '../components/UI'
import { createAppointment } from '../api/appointments'
import { getDoctors } from '../api/doctors'
import { getServices } from '../api/services'
import { jsPDF } from 'jspdf'
import { getServiceIcon } from '../utils/iconMapper'

const TIMES = ['8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM']

const STEP_LABELS = ['Service & Doctor', 'Date & Time', 'Your Details', 'Confirm']

function Stepper({ step }) {
  return (
    <div className="relative flex items-center justify-between max-w-lg mx-auto mb-12">
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 -z-10" />
      <div className="absolute top-5 left-0 h-0.5 bg-primary -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }} />
      {STEP_LABELS.map((label, i) => {
        const s = i + 1
        const done = step > s
        const active = step === s
        return (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className={`size-10 rounded-full flex items-center justify-center font-black text-sm ring-4 ring-white transition-all ${done ? 'bg-emerald-500 text-white shadow-md' : active ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
              {done ? <Icon name="check" className="text-sm" /> : s}
            </div>
            <span className={`text-xs font-bold hidden sm:block ${active ? 'text-primary' : done ? 'text-emerald-600' : 'text-slate-400'}`}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function BookingPage({ onNavigate }) {
  const [step, setStep] = useState(1)
  const [doctors, setDoctors] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState(null)
  const [booking, setBooking] = useState({
    service: null,
    doctor: null,
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    dob: '',
    insurance: '',
    notes: '',
  })
  const [isDownloading, setIsDownloading] = useState(false)
  const [confirmedId, setConfirmedId] = useState(null)
  const [errors, setErrors] = useState({})

  const fetchData = async () => {
    try {
      setLoading(true)
      setLoadError(null)
      const [docsRes, servicesRes] = await Promise.all([
        getDoctors(),
        getServices()
      ])
      const doctorsData = docsRes.data.data || docsRes.data || []
      const servicesData = servicesRes.data.data || servicesRes.data || []

      console.log('Fetched doctors:', doctorsData.length)
      console.log('Fetched services:', servicesData.length)

      setDoctors(doctorsData)
      setServices(servicesData)

      // Set first service as default
      if (servicesData.length > 0) {
        setBooking(prev => ({ ...prev, service: servicesData[0] }))
      }
    } catch (err) {
      console.error('Failed to fetch data for booking:', err)
      setLoadError(err.message || 'Failed to load doctors and services. Please check if the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleConfirm = async () => {
    try {
      setSubmitting(true)
      setSubmissionError(null)
      const response = await createAppointment({
        doctorId: booking.doctor?.id,
        doctorName: booking.doctor?.name,
        patientName: booking.name,
        patientEmail: booking.email,
        patientPhone: booking.phone,
        serviceId: booking.service?.id,
        serviceName: booking.service?.name,
        date: booking.date,
        time: booking.time,
        notes: booking.notes
      })

      const newId = response.data?.id || response.data?.data?.id
      if (newId) {
        setConfirmedId(newId)
        setStep(4)
      } else {
        throw new Error('No confirmed ID received from server')
      }
    } catch (err) {
      console.error('Booking failed:', err)
      setSubmissionError('Failed to confirm booking. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── STEP 1 ──────────────────────────────────────────────────────────
  const Step1 = () => {
    // Filter doctors based on selected service
    const filteredDoctors = booking.service
      ? doctors.filter(d => {
        // Match doctor's department with service name (exact match)
        const serviceName = booking.service.name.toLowerCase().trim()
        const doctorDept = (d.dept || '').toLowerCase().trim()

        // Exact match on department
        return doctorDept === serviceName
      })
      : []

    return (
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-1">Select Service & Doctor</h2>
        <p className="text-slate-500 mb-8 text-sm">Choose the medical service you need, then select a specialist.</p>

        {/* Error Message */}
        {loadError && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Icon name="error" className="text-red-500 text-2xl shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-red-900 mb-2">Unable to Load Data</h3>
                <p className="text-red-700 text-sm mb-4">{loadError}</p>
                <button
                  onClick={fetchData}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-700 transition-all text-sm"
                >
                  <Icon name="refresh" />
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-primary">
                <Icon name="medical_services" className="text-base" /> Select Service
              </h3>
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse"></div>
                  ))}
                </div>
              ) : services.length === 0 ? (
                <div className="text-center py-6">
                  <Icon name="medical_services" className="text-4xl text-slate-300 mb-2" />
                  <p className="text-slate-500 text-sm">No services available</p>
                </div>
              ) : (
                services.map(s => (
                  <label key={s.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 mb-2 cursor-pointer transition-all ${booking.service?.id === s.id ? 'border-primary bg-primary-light' : 'border-transparent hover:bg-slate-50'}`}>
                    <input
                      type="radio"
                      name="service"
                      className="accent-primary"
                      checked={booking.service?.id === s.id}
                      onChange={() => setBooking({ ...booking, service: s, doctor: null })}
                    />
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Icon name={getServiceIcon(s.name, s.icon)} className={`text-base ${booking.service?.id === s.id ? 'text-primary' : 'text-slate-400'}`} />
                      <span className={`text-sm font-semibold truncate ${booking.service?.id === s.id ? 'font-black text-primary' : 'text-slate-700'}`}>{s.name}</span>
                    </div>
                  </label>
                ))
              )}
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex gap-2">
                <Icon name="info" className="text-primary shrink-0" />
                <p className="text-xs text-slate-600 leading-relaxed">Select a service to see available specialists for that department.</p>
              </div>
            </div>
          </div>

          {/* Doctor Selection */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-slate-900">Available Specialists</h3>
              <span className="text-xs text-slate-500">
                {booking.service ? `${filteredDoctors.length} specialist${filteredDoctors.length !== 1 ? 's' : ''}` : 'Select a service'}
              </span>
            </div>

            {!booking.service ? (
              <div className="py-12 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <Icon name="medical_services" className="text-6xl text-slate-300 mb-3" />
                <p className="text-slate-600 font-bold mb-2">Select a Service First</p>
                <p className="text-slate-500 text-sm">Choose a medical service to see available doctors</p>
              </div>
            ) : loading ? (
              <div className="py-12 flex flex-col items-center justify-center">
                <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm text-slate-500 font-bold">Finding specialists...</p>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <Icon name="person_search" className="text-6xl text-slate-300 mb-3" />
                <p className="text-slate-600 font-bold mb-2">No Specialists Available</p>
                <p className="text-slate-500 text-sm mb-4">No doctors found for {booking.service.name}</p>
                <button
                  onClick={fetchData}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-bold hover:bg-primary-dark transition-all text-sm"
                >
                  <Icon name="refresh" />
                  Retry Loading
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredDoctors.map(d => {
                  const selected = booking.doctor?.id === d.id
                  return (
                    <button
                      key={d.id}
                      onClick={() => setBooking({ ...booking, doctor: d })}
                      className={`text-left bg-white border-2 rounded-2xl p-4 transition-all ${selected ? 'border-primary shadow-lg shadow-primary/10' : 'border-slate-200 hover:border-primary/40'}`}
                    >
                      <div className="flex gap-3 items-start">
                        <img src={d.img} className="w-14 h-14 rounded-xl object-cover shrink-0" alt={d.name} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className="font-bold text-slate-900 text-sm leading-tight">{d.name}</h4>
                            {selected && (
                              <div className="size-5 bg-primary rounded-full flex items-center justify-center shrink-0 ml-1">
                                <Icon name="check" className="text-white text-xs" />
                              </div>
                            )}
                          </div>
                          <p className="text-primary text-xs font-bold uppercase tracking-wide mt-0.5">{d.specialty}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-amber-400 text-xs">★</span>
                            <span className="text-xs font-bold text-slate-700">{d.rating}</span>
                            <span className="text-xs text-slate-400">({d.reviews || 0})</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-emerald-600 font-medium flex items-center gap-0.5">
                          <Icon name="schedule" className="text-xs" /> {d.available}
                        </span>
                        <span className={`font-bold px-2 py-0.5 rounded-lg text-xs ${selected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {selected ? 'Selected ✓' : 'Select'}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            {booking.doctor ? (
              <span>Selected: <strong className="text-slate-900">{booking.doctor.name}</strong> · {booking.service?.name}</span>
            ) : booking.service ? (
              <span className="text-amber-600 flex items-center gap-1"><Icon name="info" className="text-sm" /> Please select a doctor</span>
            ) : (
              <span className="text-amber-600 flex items-center gap-1"><Icon name="info" className="text-sm" /> Please select a service first</span>
            )}
          </div>
          <button
            onClick={() => booking.doctor && setStep(2)}
            disabled={!booking.doctor}
            className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-black hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Next Step <Icon name="arrow_forward" />
          </button>
        </div>
      </div>
    )
  }


  const Step2 = () => (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-1">Choose Date & Time</h2>
      <p className="text-slate-500 mb-8 text-sm">Pick a date and time that works best for you.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">

          {/* Doctor Summary */}
          <div className="bg-primary-light border border-primary/20 rounded-2xl p-4 flex items-center gap-4">
            <img src={booking.doctor?.img} className="w-12 h-12 rounded-xl object-cover" alt={booking.doctor?.name} />
            <div>
              <p className="font-bold text-slate-900 text-sm">{booking.doctor?.name}</p>
              <p className="text-primary text-xs font-semibold">{booking.service?.name}</p>
            </div>
          </div>

          {/* Date Picker */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Icon name="calendar_month" className="text-primary" /> Select Date
            </h3>
            <input
              type="date"
              value={booking.date}
              onChange={e => setBooking({ ...booking, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white hover:border-primary/50 transition-all cursor-pointer font-semibold text-slate-700"
            />
            {!booking.date && <p className="text-amber-600 text-xs mt-2 flex items-center gap-1"><Icon name="info" className="text-xs" />Please select a date</p>}
          </div>

          {/* Time Slots */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Icon name="schedule" className="text-primary" /> Available Time Slots
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {TIMES.map(t => (
                <button
                  key={t}
                  onClick={() => setBooking({ ...booking, time: t })}
                  className={`py-3 px-2 rounded-xl text-sm font-bold border-2 transition-all ${booking.time === t ? 'border-primary bg-primary text-white shadow-md' : 'border-slate-200 text-slate-700 hover:border-primary hover:text-primary'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            {!booking.time && <p className="text-amber-600 text-xs mt-3 flex items-center gap-1"><Icon name="info" className="text-xs" />Please select a time slot</p>}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm h-fit sticky top-24">
          <h3 className="font-black text-slate-900 mb-4 border-b pb-3">Booking Summary</h3>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Service', value: booking.service?.name },
              { label: 'Doctor', value: booking.doctor?.name },
              { label: 'Date', value: booking.date || 'Not selected' },
              { label: 'Time', value: booking.time || 'Not selected' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-slate-500">{label}</span>
                <span className={`font-bold ${value === 'Not selected' ? 'text-slate-300' : 'text-slate-900'}`}>{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 bg-emerald-50 rounded-xl p-3">
            <p className="text-emerald-700 text-xs font-semibold flex items-center gap-1">
              <Icon name="check_circle" className="text-sm" /> Free cancellation up to 24hrs before
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between">
        <button onClick={() => setStep(1)} className="flex items-center gap-2 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors">
          <Icon name="arrow_back" /> Back
        </button>
        <button
          onClick={() => (booking.date && booking.time) && setStep(3)}
          disabled={!booking.date || !booking.time}
          className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-black disabled:opacity-40 hover:bg-primary-dark transition-all"
        >
          Next Step <Icon name="arrow_forward" />
        </button>
      </div>
    </div>
  )

  // ── STEP 3 ──────────────────────────────────────────────────────────
  const Step3 = () => {
    const val = () => {
      const e = {}
      if (!booking.name.trim()) e.name = 'Required'

      // Email validation
      if (!booking.email.trim()) {
        e.email = 'Required'
      } else if (!/\S+@\S+\.\S+/.test(booking.email)) {
        e.email = 'Invalid email format'
      }

      // Phone validation
      if (!booking.phone.trim()) {
        e.phone = 'Required'
      } else if (!/^\d{10}$/.test(booking.phone)) {
        e.phone = 'Phone number must be exactly 10 digits'
      }

      // DOB validation
      if (!booking.dob) {
        e.dob = 'Required'
      } else {
        const selectedDate = new Date(booking.dob)
        const today = new Date()
        if (selectedDate > today) {
          e.dob = 'Cannot be in future'
        }
      }

      setErrors(e)
      return Object.keys(e).length === 0
    }
    return (
      <div>
        <h2 className="text-2xl font-black text-slate-900 mb-1">Patient Details</h2>
        <p className="text-slate-500 mb-8 text-sm">Fill in your details to complete the booking. * = required</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-5">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="booking-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Icon name="person" className="text-sm text-primary" />
                    Full Name *
                  </label>
                  <input
                    id="booking-name"
                    name="name"
                    value={booking.name}
                    onChange={e => { setBooking({ ...booking, name: e.target.value }); setErrors({ ...errors, name: '' }) }}
                    className={`w-full border-2 rounded-xl px-4 py-3.5 text-sm outline-none bg-white transition-all font-medium placeholder:text-slate-400 ${errors.name ? 'border-red-400 ring-4 ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50'}`}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><Icon name="error" className="text-xs" />{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="booking-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Icon name="email" className="text-sm text-primary" />
                    Email Address *
                  </label>
                  <input
                    id="booking-email"
                    name="email"
                    type="email"
                    value={booking.email}
                    onChange={e => { setBooking({ ...booking, email: e.target.value }); setErrors({ ...errors, email: '' }) }}
                    onBlur={() => {
                      if (booking.email && !/\S+@\S+\.\S+/.test(booking.email)) {
                        setErrors(prev => ({ ...prev, email: 'Invalid email format' }))
                      }
                    }}
                    className={`w-full border-2 rounded-xl px-4 py-3.5 text-sm outline-none bg-white transition-all font-medium placeholder:text-slate-400 ${errors.email ? 'border-red-400 ring-4 ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50'}`}
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><Icon name="error" className="text-xs" />{errors.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Icon name="phone" className="text-sm text-primary" />
                    Phone Number *
                  </label>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="text"
                    inputMode="numeric"
                    value={booking.phone}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                      setBooking({ ...booking, phone: val })
                      setErrors({ ...errors, phone: '' })
                    }}
                    className={`w-full border-2 rounded-xl px-4 py-3.5 text-sm outline-none bg-white transition-all font-medium placeholder:text-slate-400 ${errors.phone ? 'border-red-400 ring-4 ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50'}`}
                    placeholder="10-digit phone number"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><Icon name="error" className="text-xs" />{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="booking-dob" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Icon name="cake" className="text-sm text-primary" />
                    Date of Birth *
                  </label>
                  <input
                    id="booking-dob"
                    name="dob"
                    type="date"
                    value={booking.dob}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={e => { setBooking({ ...booking, dob: e.target.value }); setErrors({ ...errors, dob: '' }) }}
                    className={`w-full border-2 rounded-xl px-4 py-3.5 text-sm outline-none bg-white transition-all font-semibold text-slate-700 cursor-pointer ${errors.dob ? 'border-red-400 ring-4 ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50'}`}
                    autoComplete="bday"
                  />
                  {errors.dob && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><Icon name="error" className="text-xs" />{errors.dob}</p>}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="booking-insurance" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Icon name="health_and_safety" className="text-sm text-primary" />
                  Insurance Provider
                </label>
                <input
                  id="booking-insurance"
                  name="insurance"
                  value={booking.insurance}
                  onChange={e => setBooking({ ...booking, insurance: e.target.value })}
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50 transition-all font-medium placeholder:text-slate-400"
                  placeholder="e.g. Blue Cross Blue Shield"
                />
              </div>
              <div>
                <label htmlFor="booking-notes" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Icon name="description" className="text-sm text-primary" />
                  Reason / Notes
                </label>
                <textarea
                  id="booking-notes"
                  name="notes"
                  value={booking.notes}
                  onChange={e => setBooking({ ...booking, notes: e.target.value })}
                  rows={4}
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50 transition-all resize-none font-medium placeholder:text-slate-400"
                  placeholder="Describe your symptoms or reason for the visit..."
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm h-fit sticky top-24">
            <h3 className="font-black text-slate-900 mb-4 border-b pb-3">Appointment Summary</h3>
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
              <img src={booking.doctor?.img} className="w-11 h-11 rounded-xl object-cover" alt={booking.doctor?.name} />
              <div>
                <p className="font-bold text-sm">{booking.doctor?.name}</p>
                <p className="text-primary text-xs font-semibold">{booking.service?.name}</p>
              </div>
            </div>
            <div className="space-y-2.5 text-sm">
              {[
                { k: 'Date', v: booking.date },
                { k: 'Time', v: booking.time },
                { k: 'Location', v: 'Hari Urology and kidney hospital, Deesa' },
                { k: 'Patient', v: booking.name || '-' },
                { k: 'DOB', v: booking.dob || '-' },
                { k: 'Email', v: booking.email || '-' },
                { k: 'Phone', v: booking.phone || '-' },
              ].map(({ k, v }) => (
                <div key={k} className="flex justify-between">
                  <span className="text-slate-500">{k}</span>
                  <span className="font-bold text-slate-900 text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700 font-medium">
              <Icon name="info" className="text-sm inline mr-1" />
              Arrival 15 minutes early is recommended.
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between">
          <button onClick={() => setStep(2)} className="flex items-center gap-2 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors">
            <Icon name="arrow_back" /> Back
          </button>

          <div className="flex flex-col items-end gap-2">
            {submissionError && <p className="text-red-500 text-xs font-bold">{submissionError}</p>}
            <button
              onClick={() => val() && handleConfirm()}
              disabled={submitting}
              className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-black hover:bg-primary-dark transition-all shadow-md shadow-primary/30 disabled:opacity-50"
            >
              {submitting ? (
                <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Icon name="check_circle" />
              )}
              {submitting ? 'Confirming...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── CONFIRMATION ─────────────────────────────────────────────────────
  const Confirmation = () => {
    const downloadTicket = async () => {
      setIsDownloading(true)
      await new Promise(resolve => setTimeout(resolve, 1500))

      const doc = new jsPDF()
      const W = 210

      // ── COLOR PALETTE ──────────────────────────────
      const navy = [10, 40, 90]    // deep navy header
      const blue = [0, 86, 178]   // primary blue
      const teal = [0, 168, 150]   // teal accent
      const slate = [15, 23, 42]    // near-black text
      const gray = [80, 100, 130]   // muted label text
      const white = [255, 255, 255]
      const offWhite = [248, 250, 253]   // row bg 1 (very light blue-white)
      const softBlue = [224, 237, 255]   // row bg 2 (soft cornflower)
      const cardBg = [235, 245, 255]   // card background
      const green = [22, 163, 74]    // confirmation green
      const amber = [180, 120, 0]     // reminder accent

      // ─── LOGO: Generate PNG via Canvas ────────────────────────────────
      const generateLogoPNG = () => {
        const canvas = document.createElement('canvas')
        const S = 360
        canvas.width = S
        canvas.height = S
        const ctx = canvas.getContext('2d')
        const cx = S / 2, cy = S / 2
        const bCol = '#0056B2', wCol = '#ffffff', tCol = '#00A896'

        ctx.beginPath()
        ctx.arc(cx, cy, S / 2 - 1, 0, Math.PI * 2)
        ctx.fillStyle = '#E8F0FF'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(cx, cy, S / 2 - 1, 0, Math.PI * 2)
        ctx.strokeStyle = bCol
        ctx.lineWidth = 14
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(cx, cy, S / 2 - 16, 0, Math.PI * 2)
        ctx.strokeStyle = tCol
        ctx.lineWidth = 5
        ctx.stroke()

        const crossX = cx, crossY = cy - 40
        ctx.fillStyle = bCol
        ctx.beginPath(); ctx.roundRect(crossX - 10, crossY - 30, 20, 60, 5); ctx.fill()
        ctx.beginPath(); ctx.roundRect(crossX - 30, crossY - 10, 60, 20, 5); ctx.fill()

        ctx.save()
        ctx.translate(cx - 52, cy + 38)
        ctx.rotate(-0.18)
        ctx.beginPath(); ctx.ellipse(0, 0, 28, 44, 0, 0, Math.PI * 2)
        ctx.fillStyle = bCol; ctx.fill()
        ctx.beginPath(); ctx.ellipse(0, 0, 13, 25, 0, 0, Math.PI * 2)
        ctx.fillStyle = wCol; ctx.fill()
        ctx.restore()

        ctx.save()
        ctx.translate(cx + 52, cy + 38)
        ctx.rotate(0.18)
        ctx.beginPath(); ctx.ellipse(0, 0, 28, 44, 0, 0, Math.PI * 2)
        ctx.fillStyle = bCol; ctx.fill()
        ctx.beginPath(); ctx.ellipse(0, 0, 13, 25, 0, 0, Math.PI * 2)
        ctx.fillStyle = wCol; ctx.fill()
        ctx.restore()

        ctx.strokeStyle = tCol
        ctx.lineWidth = 9
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(cx - 28, cy + 8)
        ctx.quadraticCurveTo(cx - 10, cy + 50, cx - 4, cy + 72)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx + 28, cy + 8)
        ctx.quadraticCurveTo(cx + 10, cy + 50, cx + 4, cy + 72)
        ctx.stroke()

        return canvas.toDataURL('image/png')
      }

      const logoData = generateLogoPNG()

      // ─── WATERMARK ────────────────────────────────────────────────────
      doc.setGState(doc.GState({ opacity: 0.55 }))
      doc.addImage(logoData, 'PNG', 35, 82, 140, 140)
      doc.setGState(doc.GState({ opacity: 1.0 }))

      // ── HEADER ──────────────
      doc.setFillColor(...navy)
      doc.rect(0, 0, W, 50, 'F')
      doc.setFillColor(...teal)
      doc.rect(0, 46, W, 4, 'F')

      doc.addImage(logoData, 'PNG', 165, 4, 38, 38)

      doc.setTextColor(...white)
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('HARI UROLOGY AND KIDNEY HOSPITAL', 14, 18)

      doc.setFontSize(8.5)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(180, 210, 255)
      doc.text('Deesa, Gujarat  |  +91 98292 50376  |  hariurologyandkidney1008@gmail.com', 14, 28)

      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(...teal)
      doc.text('Compassionate Urological & Kidney Care Since Ever', 14, 37)

      // ── CONFIRMED BADGE ──────────────────────────
      doc.setFillColor(...green)
      doc.roundedRect(14, 52, 65, 9, 2.5, 2.5, 'F')
      doc.setTextColor(...white)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'bold')
      doc.text('APPOINTMENT CONFIRMED', 46.5, 58, { align: 'center' })

      doc.setTextColor(...gray)
      doc.setFontSize(7.5)
      doc.setFont('helvetica', 'normal')
      doc.text(`Issued: ${new Date().toLocaleString('en-IN')}`, W - 14, 58, { align: 'right' })

      // ── CONFIRMATION NUMBER ──────────────────────
      doc.setFillColor(...cardBg)
      doc.roundedRect(14, 66, W - 28, 14, 3, 3, 'F')
      doc.setDrawColor(...blue)
      doc.setLineWidth(0.6)
      doc.roundedRect(14, 66, W - 28, 14, 3, 3, 'S')

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8.5)
      doc.setTextColor(...gray)
      doc.text('Confirmation Number:', 22, 75)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(13)
      doc.setTextColor(...blue)
      doc.text(confirmedId || 'HCG-XXXXX', 78, 75)

      // Divider dot
      doc.setFillColor(...teal)
      doc.circle(73, 73.5, 1.2, 'F')

      let y = 88

      const sectionTitle = (title, yy) => {
        doc.setFillColor(...teal)
        doc.roundedRect(14, yy, 4, 9, 1.5, 1.5, 'F')
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.setTextColor(...navy)
        doc.text(title, 21, yy + 6.5)
        doc.setDrawColor(220, 235, 245)
        doc.setLineWidth(0.4)
        doc.line(14, yy + 11, W - 14, yy + 11)
      }

      const rowItem = (label, value, yy) => {

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.setTextColor(...gray)
        doc.text(label, 20, yy + 6)

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9)
        doc.setTextColor(...navy)
        doc.text(value || 'N/A', W - 20, yy + 6, { align: 'right' })
      }

      sectionTitle('PATIENT INFORMATION', y)
      y += 15
      rowItem('Full Name', booking.name, y); y += 10
      rowItem('Email Address', booking.email, y); y += 10
      rowItem('Phone Number', booking.phone || 'N/A', y); y += 10
      rowItem('Date of Birth', booking.dob || 'N/A', y); y += 10
      rowItem('Insurance Provider', booking.insurance || 'N/A', y); y += 16

      sectionTitle('APPOINTMENT DETAILS', y)
      y += 15
      rowItem('Doctor', booking.doctor?.name || 'N/A', y); y += 10
      rowItem('Specialty/Service', booking.service?.name || 'N/A', y); y += 10
      rowItem('Appointment Date', booking.date, y); y += 10
      rowItem('Appointment Time', booking.time, y); y += 10
      rowItem('Location', 'Hari Urology & Kidney Hospital, Deesa', y); y += 16

      if (booking.notes) {
        sectionTitle('PATIENT NOTES', y)
        y += 15
        doc.setFillColor(250, 252, 255)
        doc.roundedRect(14, y, W - 28, 20, 2, 2, 'F')
        doc.setDrawColor(...teal)
        doc.setLineWidth(0.3)
        doc.roundedRect(14, y, W - 28, 20, 2, 2, 'S')

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.5)
        doc.setTextColor(...slate)
        const noteLines = doc.splitTextToSize(booking.notes, W - 40)
        doc.text(noteLines, 20, y + 7)
        y += 25
      }


      doc.setFillColor(...teal)
      doc.rect(0, 279, W, 2, 'F')
      doc.setFillColor(...navy)
      doc.rect(0, 281, W, 16, 'F')

      doc.setTextColor(...white)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text('HARI UROLOGY AND KIDNEY HOSPITAL', W / 2, 288, { align: 'center' })
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.setTextColor(180, 210, 255)
      doc.text('Deesa, Gujarat  |  Open 24/7 for Emergencies  |  hariurologyandkidney1008@gmail.com', W / 2, 294, { align: 'center' })

      const patientSlug = booking.name.trim().replace(/\s+/g, '_') || 'Patient'
      doc.save(`HariUrologyHospital_${patientSlug}_${confirmedId}.pdf`)
      setIsDownloading(false)
    }

    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <div className="size-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-100 animate-bounce">
          <Icon name="check_circle" className="text-emerald-500 text-6xl" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Booking Confirmed! 🎉</h1>
        <p className="text-slate-500 mb-8">Your appointment has been booked successfully. A confirmation email has been sent to <strong>{booking.email}</strong>.</p>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-left mb-6">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b">
            <img src={booking.doctor?.img} className="w-14 h-14 rounded-2xl object-cover" alt={booking.doctor?.name} />
            <div>
              <p className="font-black text-slate-900">{booking.doctor?.name}</p>
              <p className="text-primary text-sm font-semibold">{booking.service?.name}</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            {[
              { k: 'Patient', v: booking.name },
              { k: 'Date', v: booking.date },
              { k: 'Time', v: booking.time },
              { k: 'Location', v: 'Hari Urology and kidney hospital, Deesa' },
              { k: 'Confirmation #', v: confirmedId },
            ].map(({ k, v }) => (
              <div key={k} className="flex justify-between py-1.5 border-b border-slate-50 last:border-0">
                <span className="text-slate-500 font-medium">{k}</span>
                <span className={`font-bold ${k === 'Confirmation #' ? 'text-primary' : 'text-slate-900'}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Download PDF Ticket Button */}
        <button
          onClick={downloadTicket}
          disabled={isDownloading}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-black transition-all shadow-lg mb-4 ${isDownloading
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/30'
            }`}
        >
          {isDownloading ? (
            <>
              <div className="size-5 border-3 border-slate-300 border-t-emerald-500 rounded-full animate-spin" />
              Generating Ticket...
            </>
          ) : (
            <>
              <Icon name="picture_as_pdf" className="text-xl" />
              Download PDF Ticket
            </>
          )}
        </button>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => onNavigate('home')} className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-colors">
            <Icon name="home" /> Home
          </button>
          <button onClick={() => { setStep(1); setBooking({ service: services[0] || null, doctor: null, date: '', time: '', name: '', email: '', phone: '', dob: '', insurance: '', notes: '' }) }}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-dark transition-colors">
            <Icon name="add" /> New Booking
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-primary to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-black text-center mb-1">Book an Appointment</h1>
          <p className="text-blue-100 text-center mb-8">Easy online booking in just a few steps</p>
          {step < 4 && <Stepper step={step} />}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className={`bg-white rounded-3xl border border-slate-200 shadow-sm ${step < 4 ? 'p-8' : 'p-8'}`}>
          {step === 1 && Step1()}
          {step === 2 && Step2()}
          {step === 3 && Step3()}
          {step === 4 && Confirmation()}
        </div>
      </div>
    </main>
  )
}

