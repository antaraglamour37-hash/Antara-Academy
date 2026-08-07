import { motion } from 'framer-motion'
import { Star, Quote, Facebook } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import StitchDivider from './StitchDivider'

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-ivory py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <p className="text-xs eyebrow uppercase text-gold-dark font-semibold mb-2">Student Voices</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-charcoal">Testimonials</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-7 shadow-glass flex flex-col justify-between"
            >
              <div>
                <Quote className="text-gold/40 mb-3" size={28} />
                <p className="text-charcoal/80 mb-6 text-sm leading-relaxed">{t.review}</p>
              </div>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gold/10">
                <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-white text-sm font-semibold shrink-0 animate-pulse-slow">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-charcoal text-sm truncate">{t.name}</p>
                    {t.facebookUrl && (
                      <a
                        href={t.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1877F2] hover:opacity-80 transition-opacity inline-flex items-center shrink-0"
                        title="View Facebook Review"
                      >
                        <Facebook size={14} className="fill-[#1877F2] text-white" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-charcoal/50 truncate">{t.occupation}</p>
                </div>
                <div className="flex gap-0.5 shrink-0 ml-1">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="pt-14"><StitchDivider /></div>
    </section>
  )
}
