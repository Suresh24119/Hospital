import { useState, useEffect } from 'react'
import { Icon, Breadcrumb, DoctorCard, SectionHeading } from '../components/UI'
import { getDoctors } from '../api/doctors'

export default function DoctorsPage({ onNavigate }) {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All')
  const [avail, setAvail] = useState('Any')
  const [sort, setSort] = useState('Default')

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        const res = await getDoctors()
        // API returns { success: true, data: [...] }
        setDoctors(res.data.data || res.data)
      } catch (err) {
        console.error('Failed to fetch doctors:', err)
        setError('Failed to load doctors. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchDoctors()
  }, [])

  const filtered = doctors
    .filter(d => {
      const matchDept = dept === 'All' || d.dept === dept
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase())
      return matchDept && matchSearch
    })
    .sort((a, b) => {
      if (sort === 'Rating') return b.rating - a.rating
      if (sort === 'Experience') return b.exp - a.exp
      return 0
    })

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-slate-500">Retrieving our medical specialists...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-red-50 border border-red-100 rounded-3xl p-10 max-w-lg text-center shadow-xl shadow-red-100/50">
        <div className="size-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="error" className="text-red-500 text-4xl" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Something went wrong</h2>
        <p className="text-slate-500 mb-8">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 flex items-center gap-2 mx-auto">
          <Icon name="refresh" /> Try Again
        </button>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Our Doctors</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            {/* Search */}
            <div className="lg:col-span-5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Search</label>
              <div className="relative">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="Search by name or specialty..."
                />
              </div>
            </div>

            {/* Department */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Department</label>
              <select
                value={dept}
                onChange={e => setDept(e.target.value)}
                className="w-full py-2.5 px-3 border border-slate-200 rounded-xl bg-slate-50 text-sm outline-none focus:border-primary appearance-none"
              >
                {['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'].map(d => (
                  <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sort By</label>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="w-full py-2.5 px-3 border border-slate-200 rounded-xl bg-slate-50 text-sm outline-none focus:border-primary appearance-none"
              >
                <option value="rating">Top Rated</option>
                <option value="exp">Most Experience</option>
              </select>
            </div>

            {/* Reset */}
            <div className="lg:col-span-1">
              <button
                onClick={() => { setSearch(''); setDept('All'); setAvail('Any'); setSort('rating') }}
                className="w-full flex items-center justify-center gap-1 py-2.5 px-3 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors text-sm font-medium"
              >
                <Icon name="refresh" className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-slate-500 text-sm">
            Showing <span className="font-bold text-slate-900">{filtered.length}</span> doctors
            {dept !== 'All' && <> in <span className="font-bold text-primary">{dept}</span></>}
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(doc => (
              <DoctorCard
                key={doc.id}
                doctor={doc}
                onBook={() => onNavigate('book')}
                onProfile={d => onNavigate('doctor-profile', d)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
            <Icon name="search_off" className="text-6xl text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-600 mb-2">No doctors found</h3>
            <p className="text-slate-400 mb-5">Try adjusting your search or filters.</p>
            <button onClick={() => { setSearch(''); setDept('All') }} className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-dark transition-colors">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
