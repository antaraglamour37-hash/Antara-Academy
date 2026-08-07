export interface Testimonial {
  id: string
  name: string
  occupation: string
  review: string
  rating: number
  facebookUrl?: string
}

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Priyanka Das', occupation: 'Bridal Makeup Artist', review: 'The hands-on bridal practice sessions gave me real confidence before my first booking. Antara ma’am’s guidance is unmatched.', rating: 5 },
  { id: 't2', name: 'Sohini Roy', occupation: 'Home Salon Owner', review: 'I joined the Beautician Course with zero experience and left with a full portfolio and my own client base.', rating: 5 },
  { id: 't3', name: 'Mousumi Ghosh', occupation: 'Freelance Artist', review: 'Small batch size meant personal attention every single class. The mehendi course completely changed my design work.', rating: 5 },
  {
    id: 't4',
    name: 'Ankita Sarkar',
    occupation: 'Bridal & Party Makeup Graduate',
    review: 'Best decision ever! Completed Bridal + Party Makeup + Hair course from this academy in Jalpaiguri. Ma’am is super patient and teaches every detail — from perfect base to trendy hairdos. Got lots of hands-on practice and now I’m confident taking bridal clients. Thank you for making me career-ready! 🙏💄',
    rating: 5,
    facebookUrl: 'https://www.facebook.com/share/1EJJgNh7kg/'
  },
  {
    id: 't5',
    name: 'Sudipa Roy',
    occupation: 'Bridal Makeup (Basic to Advanced) Graduate',
    review: 'Had an absolutely amazing learning experience with ma\'am! As a student I was a bit nervous but they broke down every technique so easily from perfect base blending to eye makeup details. They were incredibly patient, shared great product knowledge, and cleared all doubts. After practicing, I am now confident in my makeup skills. Highly recommended for anyone looking to learn from the best. 👍 Thank you so much ma\'am for making my career ready in your academy in Jalpaiguri. 💐🙏🥰',
    rating: 5,
    facebookUrl: 'https://www.facebook.com/share/18qF2VAHvo/'
  }
]
