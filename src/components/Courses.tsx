import { motion } from 'framer-motion'
import { MessageCircle, Sparkles, Droplet, Palette, Brush, GraduationCap, ImageOff } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { buildWhatsappLink } from '../lib/whatsapp'

const icons = [Sparkles, Brush, Droplet, Palette, GraduationCap]

const rupee = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export default function Courses() {
  const { courses, settings } = useSiteContent()

  return (
    <section id="courses" className="bg-ivory py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <p className="text-xs eyebrow uppercase text-gold-dark font-semibold mb-2">Our Programs</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-charcoal">Courses</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {courses.map((c, i) => {
            const Icon = icons[i % icons.length]
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className={`relative glass rounded-2xl p-0 overflow-hidden shadow-glass hover:shadow-luxe transition-shadow border ${
                  c.popular ? 'border-gold/60' : 'border-gold/10'
                }`}
              >
                {c.popular && (
                  <span className="absolute top-4 right-4 z-20 bg-gold-gradient text-white text-[10px] eyebrow uppercase font-semibold px-3 py-1 rounded-full shadow-luxe">
                    Featured
                  </span>
                )}

                <div className="relative aspect-[4/3] bg-gradient-to-br from-ivory via-white to-gold/10 overflow-hidden">
                  {c.imageUrl ? (
                    <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gold-dark/70">
                      <div className="text-center">
                        <Icon size={34} className="mx-auto mb-2" />
                        <ImageOff size={18} className="mx-auto opacity-60" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />
                </div>

                <div className="p-7">
                  <div className="w-12 h-12 rounded-full bg-ivory flex items-center justify-center text-gold-dark mb-5">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-2 min-h-[3.5rem]">{c.name}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-semibold text-gold-dark">{rupee.format(c.price)}</span>
                    <span className="text-xs text-charcoal/50">/ {c.duration}</span>
                  </div>
                  {c.description ? <p className="text-sm text-charcoal/65 mt-3">{c.description}</p> : null}
                  <ul className="mt-4 mb-6 space-y-2">
                    {c.features.map((f) => (
                      <li key={f} className="text-sm text-charcoal/70 flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={buildWhatsappLink(settings.whatsappNumber, `Hello, I want to know more about the ${c.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-gold-gradient text-white py-3 rounded-full text-sm font-semibold shadow-luxe hover:brightness-105 transition"
                  >
                    <MessageCircle size={16} /> Enquire on WhatsApp
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



