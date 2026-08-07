import { motion } from 'framer-motion'
import StitchDivider from './StitchDivider'

const specialties = ['Bridal Makeup', 'Hairstyling', 'Professional Makeup Training', 'Mehendi', 'Nail Art', 'Beautician Courses']

export default function About() {
  return (
    <section id="about" className="bg-ivory py-24">
      <StitchDivider />
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-14 items-center pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-square rounded-[2rem] overflow-hidden shadow-luxe"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-charcoal via-gold-dark to-gold" />
          <div className="absolute inset-0 flex items-center justify-center text-white font-display text-2xl italic px-10 text-center">
            "Where Every Bride Shines &amp; Every Artist Begins."
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs eyebrow uppercase text-gold-dark font-semibold mb-3">About the Academy</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-charcoal mb-5">MBA Bridal Makeover Antara Academy</h2>
          <p className="text-charcoal/70 mb-8 max-w-xl">
            A premium academy specializing in bridal artistry and professional beauty education, built around
            real, hands-on practice rather than theory alone.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {specialties.map((s) => (
              <div key={s} className="glass rounded-xl px-4 py-3 text-sm font-medium text-charcoal">
                {s}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
