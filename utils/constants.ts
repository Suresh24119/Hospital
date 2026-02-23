export const APPOINTMENT_TIMES = [
  '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
]

export const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Oncology',
  'Radiology',
  'General Medicine',
]

export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const ROUTES = {
  HOME: 'home',
  DOCTORS: 'doctors',
  DOCTOR_PROFILE: 'doctor-profile',
  SERVICES: 'services',
  SERVICE_DETAIL: 'service-detail',
  CARDIOLOGY: 'cardiology',
  NEUROLOGY: 'neurology',
  PEDIATRICS: 'pediatrics',
  ORTHOPEDICS: 'orthopedics',
  ONCOLOGY: 'oncology',
  RADIOLOGY: 'radiology',
  DEPARTMENTS: 'departments',
  ABOUT: 'about',
  CONTACT: 'contact',
  BOOK: 'book',
} as const

export const CONTACT_INFO = {
  phone: '+91 98292 50376',
  email: 'hariurologyandkidney1008@gmail.com',
  address: 'Hari Urology and kidney hospital, Deesa, Gujarat',
  hours: 'Mon–Sat: 9AM–8PM | Emergency: 24/7',
}
