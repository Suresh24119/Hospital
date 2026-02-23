import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DoctorsPage from './pages/DoctorsPage'
import DoctorProfilePage from './pages/DoctorProfilePage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import DepartmentsPage from './pages/DepartmentsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BookingPage from './pages/BookingPage'
import GalleryPage from './pages/GalleryPage'
import CardiologyPage from './pages/CardiologyPage'
import NeurologyPage from './pages/NeurologyPage'
import PediatricsPage from './pages/PediatricsPage'
import OrthopedicsPage from './pages/OrthopedicsPage'
import OncologyPage from './pages/OncologyPage'
import RadiologyPage from './pages/RadiologyPage'

export default function App() {
  const [page, setPage] = useState('home')
  const [pageData, setPageData] = useState(null)

  const navigate = (newPage, data = null) => {
    setPage(newPage)
    setPageData(data)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const noFooterPages = ['book']
  const noHeaderPages = ['gallery']

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {!noHeaderPages.includes(page) && <Header currentPage={page} onNavigate={navigate} />}

      <div className="flex-1">
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'doctors' && <DoctorsPage onNavigate={navigate} />}
        {page === 'doctor-profile' && <DoctorProfilePage doc={pageData} onNavigate={navigate} />}
        {page === 'services' && <ServicesPage onNavigate={navigate} />}
        {page === 'service-detail' && <ServiceDetailPage service={pageData} onNavigate={navigate} />}
        {page === 'departments' && <DepartmentsPage onNavigate={navigate} />}
        {page === 'about' && <AboutPage onNavigate={navigate} />}
        {page === 'contact' && <ContactPage onNavigate={navigate} />}
        {page === 'book' && <BookingPage onNavigate={navigate} />}
        {page === 'gallery' && <GalleryPage onNavigate={navigate} />}
        {page === 'cardiology' && <CardiologyPage onNavigate={navigate} />}
        {page === 'neurology' && <NeurologyPage onNavigate={navigate} />}
        {page === 'pediatrics' && <PediatricsPage onNavigate={navigate} />}
        {page === 'orthopedics' && <OrthopedicsPage onNavigate={navigate} />}
        {page === 'oncology' && <OncologyPage onNavigate={navigate} />}
        {page === 'radiology' && <RadiologyPage onNavigate={navigate} />}
      </div>

      {!noFooterPages.includes(page) && !noHeaderPages.includes(page) && <Footer onNavigate={navigate} />}
    </div>
  )
}
