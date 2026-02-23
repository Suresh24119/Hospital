// ─── CORE TYPES ──────────────────────────────────────────────────────────────

export interface Doctor {
  id: number
  name: string
  specialty: string
  dept: string
  rating: number
  reviews: number
  exp: number
  available: string
  badge?: string
  badgeColor?: 'green' | 'blue' | 'amber' | 'red'
  img: string
  bio: string
  education: string[]
}

export interface Service {
  id: number
  name: string
  icon: string
  tag?: string
  desc: string
  treatments: string[]
}

export interface Department {
  id: number
  name: string
  icon: string
  desc: string
  doctors: number
  beds: number
  color: 'red' | 'yellow' | 'purple' | 'orange' | 'teal'
}

export interface Booking {
  service: Service | null
  doctor: Doctor | null
  date: string
  time: string
  name: string
  email: string
  phone: string
  dob: string
  insurance: string
  notes: string
}

export interface Review {
  id: number
  doctorId: number
  patientName: string
  rating: number
  text: string
  date: string
}

export interface Appointment {
  id: string
  patientName: string
  patientEmail: string
  patientPhone: string
  doctorId: number
  doctorName: string
  serviceId: number
  serviceName: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  createdAt: string
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  dept: string
  message: string
}

// ─── NAVIGATION TYPES ────────────────────────────────────────────────────────

export type PageType = 
  | 'home'
  | 'doctors'
  | 'doctor-profile'
  | 'services'
  | 'service-detail'
  | 'cardiology'
  | 'neurology'
  | 'pediatrics'
  | 'orthopedics'
  | 'oncology'
  | 'radiology'
  | 'departments'
  | 'about'
  | 'contact'
  | 'book'

export interface NavLink {
  label: string
  page: PageType
  icon?: string
  dropdown?: NavLink[]
}

// ─── API TYPES ───────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

// ─── FORM VALIDATION TYPES ───────────────────────────────────────────────────

export interface ValidationError {
  field: string
  message: string
}

export interface FormErrors {
  [key: string]: string
}

// ─── FILTER & SEARCH TYPES ───────────────────────────────────────────────────

export interface DoctorFilters {
  search: string
  department: string
  availability: string
  sortBy: 'rating' | 'experience' | 'name'
}

export interface ServiceFilters {
  category: string
  search: string
}

// ─── STATISTICS TYPES ────────────────────────────────────────────────────────

export interface DepartmentStats {
  totalDoctors: number
  totalBeds: number
  patientsPerYear: number
  successRate: number
}

export interface HospitalStats {
  yearsExperience: number
  totalDoctors: number
  happyPatients: number
  globalAwards: number
}

// ─── UTILITY TYPES ───────────────────────────────────────────────────────────

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}
