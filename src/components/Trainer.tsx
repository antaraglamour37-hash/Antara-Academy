import { motion } from 'framer-motion'
import { Scissors, Sparkles, GraduationCap, Instagram } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import StitchDivider from './StitchDivider'

const roles = [
  { icon: Sparkles, label: 'Professional Makeup Artist' },
  { icon: Scissors, label: 'Hair Stylist' },
  { icon: GraduationCap, label: 'Certified Trainer' },
]

export default function Trainer() {
  const { settings } = useSiteContent()

  return (
    <section id="trainer" className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass rounded-[2rem] shadow-luxe p-8 md:p-12 grid md:grid-cols-[220px_1fr] gap-10 items-center"
        >
          <div className="mx-auto w-44 h-44 md:w-full md:h-56 rounded-2xl overflow-hidden shadow-luxe border border-gold/20 shrink-0 bg-ivory">
            {settings.trainerImageUrl ? (
              <img
                src={settings.trainerImageUrl}
                alt={settings.trainerName}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            ) : null}
          </div>
          <div>
            <p className="text-xs eyebrow uppercase text-gold-dark font-semibold mb-2">{settings.trainerEyebrow}</p>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-3xl font-semibold text-charcoal">{settings.trainerName}</h3>
              <a
                href={settings.trainerInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark hover:text-gold transition-colors inline-flex items-center"
                title="Follow on Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
            <div className="flex flex-wrap gap-3 mb-5">
              {roles.map((r) => (
                <span key={r.label} className="flex items-center gap-2 text-xs font-semibold bg-ivory text-gold-dark px-3 py-2 rounded-full">
                  <r.icon size={14} /> {r.label}
                </span>
              ))}
            </div>
            <p className="text-charcoal/70 max-w-lg">{settings.trainerBio}</p>
          </div>
        </motion.div>
      </div>
      <StitchDivider />
    </section>
  )
}
