import { Instagram, Facebook, Youtube } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const { settings } = useSiteContent()

  return (
    <footer className="bg-charcoal text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-white font-display font-semibold">{settings.brandMark}</span>
            <span className="font-display text-lg text-white">{settings.brandName}</span>
          </div>
          <p className="text-sm max-w-xs">{settings.footerTagline}</p>
        </div>

        <div>
          <p className="text-white font-semibold mb-4 text-sm eyebrow uppercase">Quick Links</p>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="hover:text-gold transition-colors">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-4 text-sm eyebrow uppercase">Contact</p>
          <p className="text-sm mb-4">+91 {settings.phoneNumber}</p>
          <div className="flex gap-3">
            <a href={settings.trainerInstagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"><Instagram size={16} /></a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"><Facebook size={16} /></a>
            <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors"><Youtube size={16} /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 mt-12 pt-6 border-t border-white/10 text-xs text-white/40 text-center">
        &copy; {new Date().getFullYear()} {settings.brandName}. All rights reserved.
      </div>
    </footer>
  )
}
