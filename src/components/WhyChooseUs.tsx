import { motion } from 'framer-motion'
import { ShieldCheck, Award, HandHeart, BadgeCheck, Wallet, UserCheck, Users2, HeartHandshake, LifeBuoy } from 'lucide-react'

const items = [
  { icon: ShieldCheck, label: 'ISO Certified' },
  { icon: Award, label: 'Government Registered' },
  { icon: HandHeart, label: 'Hands-on Practice' },
  { icon: BadgeCheck, label: 'Professional Certificate' },
  { icon: Wallet, label: 'Affordable Fees' },
  { icon: UserCheck, label: 'Experienced Trainer' },
  { icon: Users2, label: 'Small Batch Size' },
  { icon: HeartHandshake, label: 'Personal Attention' },
  { icon: LifeBuoy, label: 'Career Support' },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-ivory py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <p className="text-xs eyebrow uppercase text-gold-dark font-semibold mb-2">The Difference</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-charcoal">Why Choose Us</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 flex items-center gap-4 shadow-glass hover:shadow-luxe transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gold-dark shrink-0">
                <it.icon size={20} />
              </div>
              <span className="font-semibold text-charcoal">{it.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
