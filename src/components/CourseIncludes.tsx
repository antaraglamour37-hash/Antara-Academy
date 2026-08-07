import { motion } from 'framer-motion'
import { Briefcase, HandHeart, Users, FileCheck, Compass, GraduationCap, ClipboardList, Image } from 'lucide-react'
import StitchDivider from './StitchDivider'

const items = [
  { icon: Briefcase, label: 'Professional Kit Guidance' },
  { icon: HandHeart, label: 'Hands-on Practice' },
  { icon: Users, label: 'Live Bridal Practice' },
  { icon: FileCheck, label: 'Certificate' },
  { icon: Compass, label: 'Career Guidance' },
  { icon: GraduationCap, label: 'Expert Faculty' },
  { icon: ClipboardList, label: 'Practical Sessions' },
  { icon: Image, label: 'Portfolio Guidance' },
]

export default function CourseIncludes() {
  return (
    <section className="bg-white py-20">
      <StitchDivider />
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-10">
        <h3 className="text-center text-2xl font-semibold text-charcoal mb-10">Every Course Includes</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl hover:bg-ivory transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center text-white">
                <it.icon size={18} />
              </div>
              <span className="text-sm font-medium text-charcoal/80">{it.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
