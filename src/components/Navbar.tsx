import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, MessageCircle, Phone, Instagram, Facebook } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { buildPhoneHref, buildWhatsappLink } from '../lib/whatsapp'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Trainer', href: '#trainer' },
  { label: 'Courses', href: '#courses' },
  { label: 'Bridal Makeup', href: '#bridal-makeup' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { settings } = useSiteContent()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/85 backdrop-blur-md shadow-glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          {settings.brandLogoUrl ? (
            <img src={settings.brandLogoUrl} alt={settings.brandName} className="h-11 w-11 rounded-full object-cover shadow-luxe" />
          ) : (
            <span className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center text-white font-display text-lg font-semibold shadow-luxe">
              {settings.brandMark}
            </span>
          )}
          <span className="hidden sm:block leading-tight">
            <span className="block font-display text-lg font-semibold text-charcoal">{settings.brandName}</span>
            <span className="block text-[10px] eyebrow uppercase text-gold-dark">{settings.brandTagline}</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-charcoal/80 hover:text-gold-dark transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 mr-2">
            <a href="https://www.instagram.com/anta.ra1006/" target="_blank" rel="noopener noreferrer" className="text-charcoal/80 hover:text-gold-dark transition-colors p-1" aria-label="Instagram anta.ra1006">
              <Instagram size={18} />
            </a>
            <a href="https://www.instagram.com/antaramakeover/" target="_blank" rel="noopener noreferrer" className="text-charcoal/80 hover:text-gold-dark transition-colors p-1" aria-label="Instagram antaramakeover">
              <Instagram size={18} />
            </a>
            <a href="https://www.facebook.com/share/1EJJgNh7kg/" target="_blank" rel="noopener noreferrer" className="text-charcoal/80 hover:text-gold-dark transition-colors p-1" aria-label="Facebook Page 1">
              <Facebook size={18} />
            </a>
            <a href="https://www.facebook.com/share/18qF2VAHvo/" target="_blank" rel="noopener noreferrer" className="text-charcoal/80 hover:text-gold-dark transition-colors p-1" aria-label="Facebook Page 2">
              <Facebook size={18} />
            </a>
          </div>
          <a
            href={buildPhoneHref(settings.phoneNumber)}
            className="flex items-center gap-2 text-sm font-semibold text-charcoal border border-charcoal/15 px-4 py-2 rounded-full hover:border-gold transition-colors"
          >
            <Phone size={16} /> Call Now
          </a>
          <a
            href={buildWhatsappLink(settings.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-white bg-gold-gradient px-5 py-2 rounded-full shadow-luxe hover:brightness-105 transition"
          >
            <MessageCircle size={16} /> WhatsApp Now
          </a>
        </div>

        <button aria-label="Toggle menu" className="lg:hidden text-charcoal" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="lg:hidden bg-white/95 backdrop-blur-md mt-3 px-5 pb-5 flex flex-col gap-4 shadow-glass"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-charcoal">
              {l.label}
            </a>
          ))}
          <div className="flex justify-center gap-4 pt-2 pb-2">
            <a href="https://www.instagram.com/anta.ra1006/" target="_blank" rel="noopener noreferrer" className="text-charcoal/80 hover:text-gold-dark p-2">
              <Instagram size={22} />
            </a>
            <a href="https://www.instagram.com/antaramakeover/" target="_blank" rel="noopener noreferrer" className="text-charcoal/80 hover:text-gold-dark p-2">
              <Instagram size={22} />
            </a>
            <a href="https://www.facebook.com/share/1EJJgNh7kg/" target="_blank" rel="noopener noreferrer" className="text-charcoal/80 hover:text-gold-dark p-2">
              <Facebook size={22} />
            </a>
            <a href="https://www.facebook.com/share/18qF2VAHvo/" target="_blank" rel="noopener noreferrer" className="text-charcoal/80 hover:text-gold-dark p-2">
              <Facebook size={22} />
            </a>
          </div>
          <div className="flex gap-3 pt-2 border-t border-charcoal/10">
            <a href={buildPhoneHref(settings.phoneNumber)} className="flex-1 text-center border border-charcoal/15 rounded-full py-2 text-sm font-semibold">Call Now</a>
            <a href={buildWhatsappLink(settings.whatsappNumber)} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-gold-gradient text-white rounded-full py-2 text-sm font-semibold">WhatsApp</a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

