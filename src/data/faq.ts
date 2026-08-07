export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  { id: 'f1', question: 'How long are the courses?', answer: 'Course duration ranges from 3 weeks to 4 months depending on the program, from Nail Art to the Bridal Master Course.' },
  { id: 'f2', question: 'What are the course fees?', answer: 'Fees range from \u20b93,999 for Nail Art to \u20b918,000 for the full Beautician Course. Message us on WhatsApp for current offers.' },
  { id: 'f3', question: 'Do I get a certificate?', answer: 'Yes, every course includes a professional certificate on completion, along with career guidance.' },
  { id: 'f4', question: 'Is placement support available?', answer: 'Yes, students receive career guidance and support connecting with bridal and salon opportunities after course completion.' },
  { id: 'f5', question: 'Is the training practical?', answer: 'All classes are 100% hands-on and practical, including live bridal practice sessions in small batches.' },
  { id: 'f6', question: 'What are the class timings?', answer: 'We offer flexible batch timings. Contact us on WhatsApp to find a batch that fits your schedule.' },
  { id: 'f7', question: 'Where is the academy located?', answer: 'Tap "Get Directions" in the Contact section below, or message us on WhatsApp for the exact address.' },
]
