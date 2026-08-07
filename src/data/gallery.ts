export interface GalleryItem {
  id: string
  category: 'Bridal' | 'Hairstyle' | 'Mehendi' | 'Nail Art' | 'Certificate'
  gradient: string
}

const gradients = [
  'from-gold-light via-gold to-gold-dark',
  'from-ivory via-gold-light to-gold',
  'from-charcoal via-gold-dark to-gold',
  'from-gold via-ivory to-gold-light',
]

export const gallery: GalleryItem[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `g${i + 1}`,
  category: (['Bridal', 'Hairstyle', 'Mehendi', 'Nail Art'] as const)[i % 4],
  gradient: gradients[i % gradients.length],
}))
