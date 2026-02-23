// Map service/department names and icon strings to Material Icons
export const getServiceIcon = (serviceName: string, iconFromAPI?: string): string => {
  // First, try to map the API icon if it exists
  const apiIconMap: Record<string, string> = {
    'HEART': 'favorite',
    'BRAIN': 'psychology',
    'RIBBON': 'science',
    'BONE': 'accessibility_new',
    'BABY': 'child_care',
    'SCAN': 'biotech',
    'favorite': 'favorite',
    'psychology': 'psychology',
    'child_care': 'child_care',
    'accessibility_new': 'accessibility_new',
    'science': 'science',
    'biotech': 'biotech'
  }

  // If API provides an icon, try to map it
  if (iconFromAPI && apiIconMap[iconFromAPI]) {
    return apiIconMap[iconFromAPI]
  }

  // Otherwise, map by service name
  const serviceNameMap: Record<string, string> = {
    'Cardiology': 'favorite',
    'Neurology': 'psychology',
    'Pediatrics': 'child_care',
    'Orthopedics': 'accessibility_new',
    'Oncology': 'science',
    'Radiology': 'biotech',
    'Emergency': 'emergency',
    'Surgery': 'medical_services',
    'Dermatology': 'face',
    'Ophthalmology': 'visibility',
    'ENT': 'hearing',
    'Psychiatry': 'psychology',
    'Gynecology': 'pregnant_woman',
    'Urology': 'water_drop',
    'Gastroenterology': 'restaurant'
  }

  const normalizedName = serviceName?.trim()
  if (normalizedName && serviceNameMap[normalizedName]) {
    return serviceNameMap[normalizedName]
  }

  // Default fallback
  return 'medical_services'
}
