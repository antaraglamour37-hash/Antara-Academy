import { motion } from 'framer-motion'
import { MessageCircle, Phone, MapPin, Clock } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { buildPhoneHref, buildWhatsappLink } from '../lib/whatsapp'
import StitchDivider from './StitchDivider'

export default function Contact() {
  const { settings } = useSiteContent()

  return (
    <section id="contact" className="bg-charcoal text-white py-24">
      <StitchDivider />
      <div className="max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-12 pt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs eyebrow uppercase text-gold font-semibold mb-3">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">Book Your Seat Today</h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-gold"><Phone size={18} /></span>
              <div>
                <p className="text-sm text-white/60">Phone / WhatsApp</p>
                <p className="font-semibold">+91 {settings.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-gold"><MapPin size={18} /></span>
              <div>
                <p className="text-sm text-white/60">Address</p>
                <p className="font-semibold">{settings.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-gold"><Clock size={18} /></span>
              <div>
                <p className="text-sm text-white/60">Business Hours</p>
                <p className="font-semibold">{settings.businessHours}</p>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href={buildWhatsappLink(settings.whatsappNumber)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gold-gradient text-charcoal px-6 py-3 rounded-full font-semibold shadow-luxe">
              <MessageCircle size={18} /> Book on WhatsApp
            </a>
            <a href={buildPhoneHref(settings.phoneNumber)} className="flex items-center gap-2 border border-white/25 px-6 py-3 rounded-full font-semibold">
              <Phone size={18} /> Call Now
            </a>
            <a
              href={settings.mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/25 px-6 py-3 rounded-full font-semibold"
            >
              <MapPin size={18} /> Get Directions
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-full min-h-[280px]"
        >
          <iframe
            title="Academy Location"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={settings.mapEmbedUrl}
          />
        </motion.div>
      </div>
    </section>
  )
}

