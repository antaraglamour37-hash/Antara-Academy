export interface Course {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
  popular?: boolean
  imageUrl?: string
  description?: string
}

export interface GalleryItem {
  id: string
  category: 'Bridal' | 'Hairstyle' | 'Mehendi' | 'Nail Art' | 'Certificate'
  imageUrl?: string
  title?: string
  note?: string
  gradient?: string
}

export interface SiteSettings {
  brandMark: string
  brandLogoUrl?: string
  brandName: string
  brandTagline: string
  heroBadge: string
  heroTitle: string
  heroAccent: string
  heroDescription: string
  heroQuote: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
  trainerEyebrow: string
  trainerName: string
  trainerRole: string
  trainerBio: string
  trainerImageUrl: string
  trainerInstagramUrl: string
  phoneNumber: string
  whatsappNumber: string
  address: string
  businessHours: string
  mapSearchUrl: string
  mapEmbedUrl: string
  footerTagline: string
}

export interface SiteContent {
  settings: SiteSettings
  courses: Course[]
  gallery: GalleryItem[]
  lastSavedAt?: string
}

export const siteContentStorageKey = 'mba-academy-site-content'

const galleryGradients = [
  'from-gold-light via-gold to-gold-dark',
  'from-ivory via-gold-light to-gold',
  'from-charcoal via-gold-dark to-gold',
  'from-gold via-ivory to-gold-light',
]

export const defaultSiteContent: SiteContent = {
  settings: {
    brandMark: 'MBA',
    brandLogoUrl: '',
    brandName: 'Antara Academy',
    brandTagline: 'Bridal Makeover',
    heroBadge: 'Professional courses Academy',
    heroTitle: 'Become a Professional courses and services',
    heroAccent: 'Professional',
    heroDescription:
      'Learn Bridal Makeup from Basic to Advanced with Practical Hands-on Training under Antara Chakrabarty.',
    heroQuote: 'Where Every Bride Shines & Every Artist Begins.',
    primaryCtaLabel: 'Book on WhatsApp',
    secondaryCtaLabel: 'Call Now',
    trainerEyebrow: 'Founder & Lead Trainer',
    trainerName: 'Antara Chakrabarty',
    trainerRole: 'Professional Makeup Artist',
    trainerBio:
      'Years of hands-on bridal and salon experience, distilled into a practical, small-batch training program built to take students from first brush stroke to confident, booking-ready artist.',
    trainerImageUrl: '/image1.jpeg',
    trainerInstagramUrl: 'https://www.instagram.com/anta.ra1006/',
    phoneNumber: '7407324836',
    whatsappNumber: '917407324836',
    address: 'Newtown para, near 4 no ghumti, Jalpaiguri - 735101',
    businessHours: 'Mon - Sat, 10:00 AM - 7:00 PM',
    mapSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Newtown+para+near+4+no+ghumti+Jalpaiguri+735101',
    mapEmbedUrl: 'https://www.google.com/maps?q=Newtown%20para%20near%204%20no%20ghumti%20Jalpaiguri%20735101&output=embed',
    footerTagline: 'Where Every Bride Shines & Every Artist Begins.',
  },
  courses: [
    {
      id: 'bridal-master',
      name: 'Basic to Advanced Bridal Master Course',
      price: 12000,
      duration: '3 Months',
      features: ['Bridal Kit Guidance', 'Live Bridal Practice', 'Certificate Included', 'Career Guidance'],
      popular: true,
      description: 'Advanced bridal training with hands-on practice and career guidance.',
    },
    {
      id: 'bridal-course',
      name: 'Basic to Advanced Bridal Course',
      price: 8000,
      duration: '2 Months',
      features: ['Hands-on Practice', 'Certificate Included', 'Expert Faculty'],
      description: 'A complete bridal makeup foundation for beginners and intermediates.',
    },
    {
      id: 'mehendi',
      name: 'Organic Basic to Advanced Mehendi Course',
      price: 6500,
      duration: '1.5 Months',
      features: ['Organic Cone Practice', 'Bridal Patterns', 'Certificate Included'],
      description: 'Learn bridal mehendi patterns and organic cone techniques.',
    },
    {
      id: 'nail-art',
      name: 'Nail Art Course',
      price: 3999,
      duration: '3 Weeks',
      features: ['Practical Sessions', 'Portfolio Guidance', 'Certificate Included'],
      description: 'A short-format nail art program for quick skill development.',
    },
    {
      id: 'beautician',
      name: 'Beautician Course',
      price: 18000,
      duration: '4 Months',
      features: ['Full Curriculum', 'Live Practice', 'Career Support', 'Certificate Included'],
      description: 'A broader beautician curriculum with professional support.',
    },
  ],
  gallery: Array.from({ length: 8 }).map((_, i) => ({
    id: `g${i + 1}`,
    category: (['Bridal', 'Hairstyle', 'Mehendi', 'Nail Art'] as const)[i % 4],
    title: '',
    note: '',
    imageUrl: '',
    gradient: galleryGradients[i % galleryGradients.length],
  })),
}

export function createEmptyCourse(): Course {
  const id = `course-${Date.now()}`
  return {
    id,
    name: '',
    price: 0,
    duration: '',
    features: [],
    popular: false,
    description: '',
    imageUrl: '',
  }
}

export function createEmptyGalleryItem(): GalleryItem {
  return {
    id: `gallery-${Date.now()}`,
    category: 'Bridal',
    imageUrl: '',
    title: '',
    note: '',
    gradient: galleryGradients[0],
  }
}

function mergeCourse(base: Course, override?: Partial<Course>): Course {
  return {
    ...base,
    ...override,
    features: Array.isArray(override?.features) && override.features.length > 0 ? override.features : base.features,
  }
}

function mergeGalleryItem(base: GalleryItem, override?: Partial<GalleryItem>): GalleryItem {
  return {
    ...base,
    ...override,
  }
}

export function normalizeSiteContent(raw: Partial<SiteContent> | null | undefined): SiteContent {
  const settings = {
    ...defaultSiteContent.settings,
    ...(raw?.settings ?? {}),
  }

  const storedCourses = Array.isArray(raw?.courses) ? raw.courses : []
  const courseById = new Map(storedCourses.filter(Boolean).map((course) => [course.id, course]))
  const mergedCourses = defaultSiteContent.courses.map((course) => mergeCourse(course, courseById.get(course.id)))
  const extraCourses = storedCourses
    .filter((course) => course && !defaultSiteContent.courses.some((base) => base.id === course.id))
    .map((course) => mergeCourse(createEmptyCourse(), course))

  const storedGallery = Array.isArray(raw?.gallery) ? raw.gallery : []
  const galleryById = new Map(storedGallery.filter(Boolean).map((item) => [item.id, item]))
  const mergedGallery = defaultSiteContent.gallery.map((item) => mergeGalleryItem(item, galleryById.get(item.id)))
  const extraGallery = storedGallery
    .filter((item) => item && !defaultSiteContent.gallery.some((base) => base.id === item.id))
    .map((item) => mergeGalleryItem(createEmptyGalleryItem(), item))

  return {
    settings,
    courses: [...mergedCourses, ...extraCourses],
    gallery: [...mergedGallery, ...extraGallery],
    lastSavedAt: raw?.lastSavedAt,
  }
}

export function loadSiteContent(): SiteContent {
  if (typeof window === 'undefined') {
    return defaultSiteContent
  }

  try {
    const raw = window.localStorage.getItem(siteContentStorageKey)
    if (!raw) return defaultSiteContent
    return normalizeSiteContent(JSON.parse(raw) as Partial<SiteContent>)
  } catch {
    return defaultSiteContent
  }
}

export function saveSiteContent(content: SiteContent): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(siteContentStorageKey, JSON.stringify(content))
}
