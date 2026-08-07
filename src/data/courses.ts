export interface Course {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
  popular?: boolean
}

export const courses: Course[] = [
  {
    id: 'bridal-master',
    name: 'Basic to Advanced Bridal Master Course',
    price: 12000,
    duration: '3 Months',
    features: ['Bridal Kit Guidance', 'Live Bridal Practice', 'Certificate Included', 'Career Guidance'],
    popular: true,
  },
  {
    id: 'bridal-course',
    name: 'Basic to Advanced Bridal Course',
    price: 8000,
    duration: '2 Months',
    features: ['Hands-on Practice', 'Certificate Included', 'Expert Faculty'],
  },
  {
    id: 'mehendi',
    name: 'Organic Basic to Advanced Mehendi Course',
    price: 6500,
    duration: '1.5 Months',
    features: ['Organic Cone Practice', 'Bridal Patterns', 'Certificate Included'],
  },
  {
    id: 'nail-art',
    name: 'Nail Art Course',
    price: 3999,
    duration: '3 Weeks',
    features: ['Practical Sessions', 'Portfolio Guidance', 'Certificate Included'],
  },
  {
    id: 'beautician',
    name: 'Beautician Course',
    price: 18000,
    duration: '4 Months',
    features: ['Full Curriculum', 'Live Practice', 'Career Support', 'Certificate Included'],
  },
]
