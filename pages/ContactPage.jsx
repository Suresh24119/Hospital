import { useState } from 'react'
import { Icon } from '../components/UI'
import { createContactMessage } from '../api/contact'

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', services: [], message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (form.phone && !/^\d{10}$/.test(form.phone)) e.phone = 'Phone number must be exactly 10 digits'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    try {
      setLoading(true)
      // Combine first and last name for API
      await createContactMessage({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        dept: form.services.join(', ') || 'General Inquiry',
        message: form.message
      })
      setSent(true)
    } catch (err) {
      console.error('Failed to send message:', err)
      alert('Failed to send message. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header Section with Animated Background */}
      <div className="relative text-white py-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-blue-600 to-blue-700">
          {/* Animated circles */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

          {/* Floating shapes */}
          <div className="absolute top-10 right-20 w-20 h-20 border-2 border-white/20 rounded-lg rotate-12 animate-float"></div>
          <div className="absolute bottom-20 left-32 w-16 h-16 border-2 border-white/20 rounded-full animate-float" style={{ animationDelay: '0.7s' }}></div>
          <div className="absolute top-32 right-1/3 w-12 h-12 bg-white/10 rounded-lg rotate-45 animate-float" style={{ animationDelay: '1.2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-100 text-sm mb-4">
            <span>Home</span>
            <Icon name="chevron_right" className="text-xs" />
            <span className="text-white font-semibold">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Get In Touch</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            We're here to help. Reach out and we'll respond as quickly as possible.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── LEFT SIDE - FORM ── */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            {sent ? (
              <div className="text-center py-10">
                <div className="size-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon name="check_circle" className="text-emerald-500 text-5xl" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Message Sent!</h2>
                <p className="text-slate-500 mb-6">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ firstName: '', lastName: '', email: '', phone: '', services: [], message: '' }) }}
                  className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Send us a message</h2>
                <p className="text-slate-600 mb-6">
                  Fill out the form below and our team will get back to you shortly.
                </p>

                {/* Quick Contact Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 pb-8 border-b border-slate-200">
                  <button
                    onClick={() => window.open('https://wa.me/919829250376', '_blank')}
                    className="flex flex-col items-center gap-2 p-4 border-2 border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Icon name="chat" className="text-xl text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-900 text-xs">WhatsApp</p>
                      <p className="text-slate-500 text-xs">Online now</p>
                    </div>
                  </button>

                  <button
                    onClick={() => window.location.href = 'mailto:hariurologyandkidney1008@gmail.com'}
                    className="flex flex-col items-center gap-2 p-4 border-2 border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Icon name="mail" className="text-xl text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-900 text-xs">Email Us</p>
                      <p className="text-slate-500 text-xs">Quick reply</p>
                    </div>
                  </button>

                  <button
                    onClick={() => window.location.href = 'tel:+919829250376'}
                    className="flex flex-col items-center gap-2 p-4 border-2 border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Icon name="call" className="text-xl text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-900 text-xs">Call Us</p>
                      <p className="text-slate-500 text-xs">24/7 support</p>
                    </div>
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-5">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-firstname" className="block text-sm font-bold text-slate-700 mb-2">First name *</label>
                      <input
                        id="contact-firstname"
                        name="given-name"
                        type="text"
                        value={form.firstName}
                        onChange={e => { setForm({ ...form, firstName: e.target.value }); setErrors({ ...errors, firstName: '' }) }}
                        className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-all bg-white font-medium ${errors.firstName ? 'border-red-400 ring-4 ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50'}`}
                        placeholder="First name"
                        autoComplete="given-name"
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><Icon name="error" className="text-xs" />{errors.firstName}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-lastname" className="block text-sm font-bold text-slate-700 mb-2">Last name *</label>
                      <input
                        id="contact-lastname"
                        name="family-name"
                        type="text"
                        value={form.lastName}
                        onChange={e => { setForm({ ...form, lastName: e.target.value }); setErrors({ ...errors, lastName: '' }) }}
                        className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-all bg-white font-medium ${errors.lastName ? 'border-red-400 ring-4 ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50'}`}
                        placeholder="Last name"
                        autoComplete="family-name"
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><Icon name="error" className="text-xs" />{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-bold text-slate-700 mb-2">Email address *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }) }}
                      className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-all bg-white font-medium ${errors.email ? 'border-red-400 ring-4 ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50'}`}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><Icon name="error" className="text-xs" />{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-bold text-slate-700 mb-2">Phone number</label>
                    <div className="flex gap-2">
                      <select id="contact-country" name="country" className="border-2 border-slate-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 w-24 bg-white font-semibold hover:border-primary/50 transition-all cursor-pointer">
                        <option>IN</option>
                        <option>UK</option>
                        <option>CA</option>
                        <option>US</option>
                        <option>PK</option>
                        <option>SK</option>
                      </select>
                      <input
                        id="contact-phone"
                        name="tel"
                        type="text"
                        inputMode="numeric"
                        value={form.phone}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                          setForm({ ...form, phone: val })
                          setErrors({ ...errors, phone: '' })
                        }}
                        className={`flex-1 border-2 rounded-xl px-4 py-3 text-sm outline-none transition-all bg-white font-medium ${errors.phone ? 'border-red-400 ring-4 ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50'}`}
                        placeholder="10-digit phone number"
                        autoComplete="tel"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><Icon name="error" className="text-xs" />{errors.phone}</p>}
                  </div>

                  {/* Services */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Medical services</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Oncology', 'Other'].map(service => {
                        const sId = `service-${service.toLowerCase().replace(/\s+/g, '-')}`
                        return (
                          <label key={service} htmlFor={sId} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              id={sId}
                              type="checkbox"
                              checked={form.services.includes(service)}
                              onChange={e => {
                                if (e.target.checked) {
                                  setForm({ ...form, services: [...form.services, service] })
                                } else {
                                  setForm({ ...form, services: form.services.filter(s => s !== service) })
                                }
                              }}
                              className="size-4 rounded border-2 border-slate-300 text-primary focus:ring-primary cursor-pointer"
                            />
                            <span className="text-sm text-slate-700 font-medium group-hover:text-primary transition-colors">{service}</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-bold text-slate-700 mb-2">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }) }}
                      rows={4}
                      className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none bg-white font-medium ${errors.message ? 'border-red-400 ring-4 ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/50'}`}
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><Icon name="error" className="text-xs" />{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-blue-700 text-white font-bold py-4 rounded-xl hover:from-primary-dark hover:to-blue-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/30"
                  >
                    {loading ? (
                      <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Icon name="send" />
                        Send message
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ── RIGHT SIDE - MAP & INFO ── */}
          <div className="space-y-6">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon name="location_on" className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-slate-900 mb-1">Visit Us</h3>
                    <p className="text-slate-600 text-sm">
                      <strong className="text-primary text-base">Hari Urology and kidney hospital</strong><br />
                      Deesa, Gujarat
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.location.href = 'tel:+919829250376'}
                className="w-full text-left bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:border-primary transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="size-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors">
                    <Icon name="call" className="text-2xl text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-slate-900 mb-1">Call Us</h3>
                    <p className="text-slate-600 text-sm font-bold">+91 98292 50376</p>
                    <p className="text-slate-400 text-xs mt-1">Click to call now</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => window.location.href = 'mailto:hariurologyandkidney1008@gmail.com'}
                className="w-full text-left bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:border-primary transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="size-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <Icon name="mail" className="text-2xl text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-slate-900 mb-1">Email Us</h3>
                    <p className="text-slate-600 text-sm font-bold">hariurologyandkidney1008@gmail.com</p>
                    <p className="text-slate-400 text-xs mt-1">Click to send email</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden h-[400px] relative">
              <iframe
                src="https://maps.google.com/maps?q=Hari%20Urology%20and%20kidney%20hospital%20Deesa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Healthcare General Location"
              ></iframe>
              <button
                className="absolute bottom-4 right-4 flex items-center gap-2 bg-white text-primary font-bold px-4 py-2.5 rounded-xl shadow-lg hover:bg-primary hover:text-white transition-all border-2 border-primary"
                onClick={() => window.open('https://maps.google.com', '_blank')}
              >
                <Icon name="directions" className="text-base" />
                Get Directions
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
