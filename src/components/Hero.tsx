import { motion } from 'framer-motion'
import { MessageCircle, Phone, Sparkles } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { buildPhoneHref, buildWhatsappLink } from '../lib/whatsapp'

export default function Hero() {
  const { settings } = useSiteContent()

  return (
    <section id="home" className="relative overflow-hidden bg-ivory pt-32 pb-24 md:pt-44 md:pb-32">
      <div aria-hidden className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gold/15 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 -left-20 w-[320px] h-[320px] rounded-full bg-gold-dark/10 blur-3xl" />

      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-gold/70"
          style={{ left: `${8 + i * 9}%`, top: `${15 + (i % 5) * 15}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 text-gold-dark text-xs eyebrow uppercase font-semibold mb-6">
            <Sparkles size={14} /> {settings.heroBadge}
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.08] text-charcoal">
            Become a <span className="text-gold-dark italic">{settings.heroAccent}</span> Makeup Artist
          </h1>
          <p className="mt-6 text-base md:text-lg text-charcoal/70 font-body max-w-xl">{settings.heroDescription}</p>
          <p className="mt-4 font-display italic text-lg text-gold-dark">"{settings.heroQuote}"</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={buildWhatsappLink(settings.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gold-gradient text-white px-7 py-3.5 rounded-full font-semibold shadow-luxe hover:brightness-105 hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle size={18} /> {settings.primaryCtaLabel}
            </a>
            <a
              href={buildPhoneHref(settings.phoneNumber)}
              className="flex items-center gap-2 border border-charcoal/20 text-charcoal px-7 py-3.5 rounded-full font-semibold hover:border-gold transition-all"
            >
              <Phone size={18} /> {settings.secondaryCtaLabel}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxe glass bg-ivory">
            {settings.trainerImageUrl ? (
              <img
                src={settings.trainerImageUrl}
                alt={settings.trainerName}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl px-5 py-4">
              <p className="text-xs eyebrow uppercase text-gold-dark font-semibold">Trainer</p>
              <p className="font-display text-xl text-charcoal">{settings.trainerName}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
