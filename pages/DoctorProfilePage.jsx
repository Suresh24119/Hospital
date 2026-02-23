import { useState, useEffect } from 'react'
import { Icon, Breadcrumb, Badge, StarRating } from '../components/UI'
import { getDoctorById, updateDoctor } from '../api/doctors'

const REVIEWS = [
  { name: 'Emily R.', rating: 5, text: 'Exceptional doctor! Very thorough and took time to explain everything clearly. I left the appointment feeling confident about my treatment plan.', date: 'Jan 2025' },
  { name: 'James K.', rating: 5, text: 'Best specialist I have ever seen. Highly recommend to anyone needing expert care. The entire experience was world-class.', date: 'Dec 2024' },
  { name: 'Maria L.', rating: 4, text: 'Very professional and knowledgeable. The wait time was a bit long but the quality of care more than made up for it.', date: 'Nov 2024' },
]

export default function DoctorProfilePage({ doc: initialDoc, onNavigate }) {
  const [doc, setDoc] = useState(initialDoc)
  const [loading, setLoading] = useState(!initialDoc?.bio)
  const [error, setError] = useState(null)

  // Edit State
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(initialDoc) // Initialize with initialDoc
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Check if user is admin
    setIsAdmin(!!localStorage.getItem('admin_auth'))

    const fetchFullDoc = async () => {
      try {
        if (!initialDoc?.id) return
        setLoading(true)
        const res = await getDoctorById(initialDoc.id)
        const data = res.data.data || res.data
        setDoc(data)
        setEditForm(data)
      } catch (err) {
        console.error('Failed to fetch doctor details:', err)
        setError('Failed to load doctor profile.')
      } finally {
        setLoading(false)
      }
    }
    fetchFullDoc()
  }, [initialDoc?.id])

  const handleSave = async () => {
    try {
      setSaving(true)
      await updateDoctor(doc.id, editForm)
      setDoc(editForm)
      setIsEditing(false)
      // Optional: Show success notification
    } catch (err) {
      console.error('Failed to update doctor:', err)
      alert('Failed to save changes. Please ensure you are logged in as admin.')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditForm(doc)
    setIsEditing(false)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-slate-500">Loading specialist profile...</p>
      </div>
    </div>
  )

  if (error || !doc) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-red-50 border border-red-100 rounded-3xl p-10 max-w-lg text-center shadow-xl shadow-red-100/50">
        <div className="size-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="error" className="text-red-500 text-4xl" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Profile Not Found</h2>
        <p className="text-slate-500 mb-8">{error || "The requested doctor's profile could not be located."}</p>
        <button onClick={() => onNavigate('doctors')} className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 flex items-center gap-2 mx-auto">
          <Icon name="arrow_back" /> Back to Doctors
        </button>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Breadcrumb items={[
            { label: 'Home', onClick: () => onNavigate('home') },
            { label: 'Doctors', onClick: () => onNavigate('doctors') },
            { label: doc.name }
          ]} />

          {isAdmin && (
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="px-5 py-2 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/30 flex items-center gap-2"
                  >
                    {saving ? <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Icon name="save" className="text-base" />}
                    Save Profile
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 rounded-xl text-sm font-bold bg-slate-900 text-white hover:bg-black transition-all flex items-center gap-2 shadow-lg shadow-black/10"
                >
                  <Icon name="edit" className="text-base" />
                  Edit Profile
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT SIDEBAR ── */}
          <div className="lg:col-span-1 space-y-5">

            {/* Profile Card */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm sticky top-44">
              <div className="relative h-80 bg-slate-100 group">
                <img src={(isEditing && editForm) ? editForm.img : doc.img} alt={doc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {isEditing && (
                  <div className="absolute inset-x-4 bottom-20">
                    <label className="block text-[10px] font-black text-white/70 uppercase tracking-widest mb-1 ml-1">Profile Photo URL</label>
                    <input
                      type="text"
                      value={editForm.img}
                      onChange={e => setEditForm({ ...editForm, img: e.target.value })}
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/40 focus:bg-white/20 outline-none transition-all"
                      placeholder="Paste image URL here..."
                    />
                  </div>
                )}

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-black text-white/70 uppercase tracking-widest mb-1 ml-1">Doctor Name</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2.5 text-lg font-bold text-white outline-none focus:bg-white/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-white/70 uppercase tracking-widest mb-1 ml-1">Specialization</label>
                        <input
                          type="text"
                          value={editForm.specialty}
                          onChange={e => setEditForm({ ...editForm, specialty: e.target.value })}
                          className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-sm text-blue-200 outline-none focus:bg-white/20"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-black leading-tight tracking-tight">{doc.name}</h1>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-8 h-0.5 bg-blue-400 rounded-full"></span>
                        <p className="text-blue-300 font-bold text-sm uppercase tracking-wider">{doc.specialty}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <StarRating rating={doc.rating} />
                  <span className="font-black text-slate-900">{doc.rating}</span>
                  <span className="text-slate-400 text-xs font-bold">({doc.reviews} REVIEWS)</span>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Experience */}
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                      <Icon name="workspace_premium" className="text-primary text-xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Experience</p>
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={editForm.exp}
                            onChange={e => setEditForm({ ...editForm, exp: parseInt(e.target.value) })}
                            className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-sm font-bold text-slate-700 outline-none focus:border-primary"
                          />
                          <span className="text-sm font-bold text-slate-700">Years</span>
                        </div>
                      ) : (
                        <p className="text-slate-900 font-black">{doc.exp} Years</p>
                      )}
                    </div>
                  </div>

                  {/* Department */}
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0 border border-indigo-100">
                      <Icon name="local_hospital" className="text-indigo-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</p>
                      {isEditing ? (
                        <select
                          value={editForm.dept}
                          onChange={e => setEditForm({ ...editForm, dept: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-sm font-bold text-slate-700 outline-none focus:border-primary"
                        >
                          <option value="Cardiology">Cardiology</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Orthopedics">Orthopedics</option>
                          <option value="Oncology">Oncology</option>
                          <option value="Radiology">Radiology</option>
                        </select>
                      ) : (
                        <p className="text-slate-900 font-black">{doc.dept}</p>
                      )}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
                      <Icon name="calendar_today" className="text-emerald-600 text-xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Availability</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.available}
                          onChange={e => setEditForm({ ...editForm, available: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-sm font-bold text-slate-700 outline-none focus:border-primary"
                          placeholder="e.g. Next: Wed, 10 AM"
                        />
                      ) : (
                        <p className="text-emerald-700 font-black">{doc.available}</p>
                      )}
                    </div>
                  </div>

                  {/* Hospital */}
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary-light rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                      <Icon name="location_on" className="text-primary text-xl" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hospital</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.hospital || 'Hari Urology and Kidney Hospital'}
                          onChange={e => setEditForm({ ...editForm, hospital: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-sm font-bold text-slate-700 outline-none focus:border-primary"
                        />
                      ) : (
                        <p className="text-slate-700 font-bold text-sm leading-tight">{doc.hospital || 'Hari Urology and Kidney Hospital - Main Block'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {!isEditing && (
                  <div className="space-y-3">
                    <button
                      onClick={() => onNavigate('book')}
                      className="w-full bg-primary text-white py-4 rounded-2xl font-black hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/30 active:scale-95"
                    >
                      <Icon name="calendar_month" />
                      Book Appointment
                    </button>
                    <button className="w-full border-2 border-slate-100 text-slate-700 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-2">
                      <Icon name="chat" className="text-primary" />
                      Patient Consultation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT MAIN ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Admin Info Header (Editing Only) */}
            {isEditing && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-2xl mb-6">
                <div className="flex items-center gap-3">
                  <Icon name="info" className="text-yellow-600" />
                  <p className="text-sm font-bold text-yellow-800">You are currently in Edit Mode. Changes will be saved globally.</p>
                </div>
              </div>
            )}

            {/* Contact Info (Visible in Edit or if details provided) */}
            {(isEditing || doc.phone || doc.email) && (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <div className="size-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Icon name="contact_page" className="text-primary" />
                  </div>
                  Professional Contacts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Work Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email || ''}
                          onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-primary"
                          placeholder="doctor@hospital.com"
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary/30 transition-all">
                          <Icon name="mail" className="text-primary" />
                          <span className="text-sm font-bold text-slate-700">{doc.email || 'Not disclosed'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Direct Line</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.phone || ''}
                          onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-primary"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      ) : (
                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary/30 transition-all">
                          <Icon name="phone" className="text-primary" />
                          <span className="text-sm font-bold text-slate-700">{doc.phone || 'Not disclosed'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* About */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm group">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="size-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Icon name="person" className="text-primary group-hover:scale-110 transition-transform" />
                </div>
                Professional Bio
              </h2>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={6}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 font-medium leading-relaxed outline-none focus:border-primary focus:bg-white transition-all ring-0 focus:ring-4 focus:ring-primary/5"
                  placeholder="Write a brief professional summary..."
                />
              ) : (
                <p className="text-slate-600 leading-relaxed text-lg font-medium italic">"{doc.bio}"</p>
              )}
            </div>

            {/* Education */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="size-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Icon name="school" className="text-primary" />
                </div>
                Education & Training
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(isEditing ? (editForm?.education || []) : (doc?.education || [])).map((edu, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:border-primary/20 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="size-8 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                        <Icon name="verified" className="text-primary text-sm" />
                      </div>
                      <div className="flex-1">
                        {isEditing ? (
                          <input
                            type="text"
                            value={edu}
                            onChange={e => {
                              const newEdu = [...editForm.education]
                              newEdu[i] = e.target.value
                              setEditForm({ ...editForm, education: newEdu })
                            }}
                            className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-900 focus:ring-0"
                          />
                        ) : (
                          <p className="font-bold text-slate-900 text-sm">{edu}</p>
                        )}
                      </div>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => {
                          const newEdu = editForm.education.filter((_, idx) => idx !== i)
                          setEditForm({ ...editForm, education: newEdu })
                        }}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Icon name="delete" className="text-sm" />
                      </button>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <button
                    onClick={() => setEditForm({ ...editForm, education: [...editForm.education, ''] })}
                    className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-primary hover:border-primary hover:bg-primary-light/10 transition-all font-bold text-sm"
                  >
                    <Icon name="add_circle" /> Add Qualification
                  </button>
                )}
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="size-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Icon name="verified" className="text-primary" />
                </div>
                Areas of Specialization
              </h2>
              <div className="flex flex-wrap gap-3">
                {(isEditing ? (editForm?.specialties || []) : (doc?.specialties || [])).map((tag, i) => (
                  <div key={i} className="group/tag relative">
                    <span className="px-5 py-2.5 bg-primary-light text-primary text-sm font-black rounded-2xl border border-primary/5 inline-flex items-center gap-2 hover:scale-105 transition-transform cursor-default">
                      {isEditing ? (
                        <input
                          type="text"
                          value={tag}
                          onChange={e => {
                            const newSpec = [...editForm.specialties]
                            newSpec[i] = e.target.value
                            setEditForm({ ...editForm, specialties: newSpec })
                          }}
                          className="bg-transparent border-none p-0 text-sm font-black text-primary focus:ring-0 w-max min-w-[50px]"
                          style={{ width: `${Math.max(tag.length * 8, 50)}px` }}
                        />
                      ) : tag}
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newSpec = editForm.specialties.filter((_, idx) => idx !== i)
                            setEditForm({ ...editForm, specialties: newSpec })
                          }}
                          className="hover:text-red-500 transition-colors"
                        >
                          <Icon name="close" className="text-xs" />
                        </button>
                      )}
                    </span>
                  </div>
                ))}

                {isEditing && (
                  <button
                    onClick={() => setEditForm({ ...editForm, specialties: [...(editForm.specialties || []), 'New Specialty'] })}
                    className="px-5 py-2.5 border-2 border-dashed border-slate-200 text-slate-400 text-sm font-bold rounded-2xl hover:text-primary hover:border-primary hover:bg-primary-light/10 transition-all flex items-center gap-2"
                  >
                    <Icon name="add_circle" className="text-base" />
                    Add Specialty
                  </button>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <div className="size-10 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Icon name="reviews" className="text-primary" />
                  </div>
                  Patient Reviews
                </h2>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                  <StarRating rating={doc.rating} />
                  <span className="font-black text-slate-900 text-lg">{doc.rating}</span>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">/ 5.0</span>
                </div>
              </div>

              <div className="space-y-6">
                {REVIEWS.map((r, i) => (
                  <div key={i} className={`p-6 rounded-2xl transition-all hover:bg-slate-50 border border-transparent hover:border-slate-100 ${i < REVIEWS.length - 1 ? 'mb-4' : ''}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-primary/20">
                          {r.name[0]}
                        </div>
                        <div>
                          <span className="font-black text-slate-900 block tracking-tight">{r.name}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{r.date}</span>
                        </div>
                      </div>
                      <StarRating rating={r.rating} />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium italic">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl p-10 text-white text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Icon name="calendar_month" className="text-9xl" />
              </div>
              <h3 className="text-3xl font-black mb-4 relative z-10">Ready to book with Dr. {doc.name.split(' ').pop()}?</h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto relative z-10 font-medium">Schedule your consultation today and experience world-class medical expertise at Hari Urology Hospital.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <button
                  onClick={() => onNavigate('book')}
                  className="w-full sm:w-auto bg-primary text-white font-black px-10 py-4 rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 active:scale-95"
                >
                  Book Appointment Now
                </button>
                <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white font-bold px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all">
                  View Other Doctors
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
