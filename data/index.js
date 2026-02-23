export const IMAGES = {
    hero: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2670',
    doctorPatient: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    hospitalExterior: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2670',
};

export const DEPARTMENTS = [
    {
        id: 1,
        name: 'Cardiology',
        icon: 'favorite',
        color: 'red',
        doctors: 12,
        beds: 50,
        desc: 'Advanced cardiac care with state-of-the-art diagnostic and treatment facilities.'
    },
    {
        id: 2,
        name: 'Neurology',
        icon: 'psychology',
        color: 'purple',
        doctors: 8,
        beds: 30,
        desc: 'Expert neurological care for stroke, epilepsy, and complex brain disorders.'
    },
    {
        id: 3,
        name: 'Pediatrics',
        icon: 'child_care',
        color: 'teal',
        doctors: 15,
        beds: 40,
        desc: 'Compassionate healthcare for children from newborns to adolescents.'
    },
    {
        id: 4,
        name: 'Orthopedics',
        icon: 'accessibility_new',
        color: 'orange',
        doctors: 10,
        beds: 45,
        desc: 'Specialized treatment for bone, joint, and sports-related injuries.'
    },
    {
        id: 5,
        name: 'Oncology',
        icon: 'science',
        color: 'yellow',
        doctors: 9,
        beds: 35,
        desc: 'Comprehensive cancer treatment using the latest therapeutic technologies.'
    },
    {
        id: 6,
        name: 'Radiology',
        icon: 'biotech',
        color: 'teal',
        doctors: 6,
        beds: 0,
        desc: 'High-precision diagnostic imaging services including MRI and CT scans.'
    }
];

export const SERVICES = [
    {
        id: 1,
        name: 'Cardiology',
        icon: 'favorite',
        tag: 'Top Service',
        description: 'Comprehensive cardiac care — diagnostics, interventional procedures, and long-term management.',
        treatments: ['Echocardiography', 'Cardiac Catheterization', 'Coronary Angioplasty', 'Pacemaker Implantation']
    },
    {
        id: 2,
        name: 'Neurology',
        icon: 'psychology',
        description: 'Expert diagnosis and treatment for stroke, epilepsy, Parkinson\'s, and complex neurological conditions.',
        treatments: ['Brain MRI & CT Scans', 'EEG Testing', 'Stroke Treatment', 'Epilepsy Management']
    },
    {
        id: 3,
        name: 'Pediatrics',
        icon: 'child_care',
        description: 'Compassionate healthcare for every child, from newborns to adolescents.',
        treatments: ['Well-Child Visits', 'Vaccinations', 'Developmental Screening', 'Childhood Illness Treatment']
    },
    {
        id: 4,
        name: 'Orthopedics',
        icon: 'accessibility_new',
        description: 'Surgical and non-surgical treatment for bone, joint, and sports injuries.',
        treatments: ['Joint Replacement', 'Sports Medicine', 'Fracture Care', 'Spine Surgery']
    },
    {
        id: 5,
        name: 'Oncology',
        icon: 'science',
        description: 'Advanced cancer screening, treatment, and support with a multidisciplinary team.',
        treatments: ['Chemotherapy', 'Radiation Therapy', 'Immunotherapy', 'Targeted Therapy']
    },
    {
        id: 6,
        name: 'Radiology',
        icon: 'biotech',
        description: 'High-resolution MRI, CT scans, and interventional radiology for accurate diagnoses.',
        treatments: ['MRI Imaging', 'CT Scanning', 'X-Ray Services', 'Ultrasound']
    }
];

export const DOCTORS = [
    {
        id: 1,
        name: 'Dr. Michael Chen',
        specialty: 'Senior Cardiologist',
        dept: 'Cardiology',
        rating: 4.9,
        reviews: 128,
        exp: 15,
        available: 'Today, 2:30 PM',
        badge: 'Available Today',
        badge_color: 'green',
        img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
        bio: 'Dr. Chen is a leading interventional cardiologist with 15 years of expertise.',
        education: ['MD, Harvard Medical School', 'Residency – Johns Hopkins Hospital']
    },
    {
        id: 2,
        name: 'Dr. Sarah Johnson',
        specialty: 'Pediatric Specialist',
        dept: 'Pediatrics',
        rating: 4.8,
        reviews: 95,
        exp: 10,
        available: 'Tomorrow',
        badge: 'New Patients',
        badge_color: 'blue',
        img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
        bio: 'Dr. Johnson specializes in pediatric medicine with a focus on developmental pediatrics.',
        education: ['MD, Stanford University', 'Residency – UCSF']
    },
    {
        id: 3,
        name: 'Dr. Elena Rodriguez',
        specialty: 'Neurology Lead',
        dept: 'Neurology',
        rating: 5.0,
        reviews: 210,
        exp: 22,
        available: 'Today, 4:00 PM',
        img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400',
        bio: 'Dr. Rodriguez is an internationally recognized neurologist.',
        education: ['MD, Columbia University', 'Residency – MGH']
    },
    {
        id: 4,
        name: 'Dr. Marcus Thorne',
        specialty: 'Orthopedic Surgeon',
        dept: 'Orthopedics',
        rating: 4.7,
        reviews: 94,
        exp: 18,
        available: 'Wednesday',
        img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
        bio: 'Dr. Thorne is a specialist in minimally invasive orthopedic procedures.',
        education: ['MD, Johns Hopkins', 'Residency – UCSF']
    }
];
