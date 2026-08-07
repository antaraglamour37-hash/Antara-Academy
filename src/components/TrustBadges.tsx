import { motion } from 'framer-motion'
import { ShieldCheck, Award, BadgeCheck, HandHeart, UserCheck, CheckCircle2 } from 'lucide-react'

const badges = [
  { icon: ShieldCheck, label: 'ISO Certified' },
  { icon: Award, label: 'Government Registered' },
  { icon: BadgeCheck, label: 'Professional Certificate' },
  { icon: HandHeart, label: 'Hands-on Practical Training' },
  { icon: UserCheck, label: 'Expert Trainer' },
  { icon: CheckCircle2, label: '100% Practical Classes' },
]

export default function TrustBadges() {
  return (
    <section className="bg-white py-12 border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col items-center text-center gap-2 px-2"
          >
            <div className="w-12 h-12 rounded-full bg-ivory flex items-center justify-center text-gold-dark">
              <b.icon size={20} />
            </div>
            <span className="text-xs font-semibold text-charcoal/80">{b.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
