import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, ArrowUp } from 'lucide-react'
import { whatsappLink, PHONE_HREF } from '../lib/whatsapp'

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed z-50 bottom-6 right-6 flex flex-col items-center gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="w-11 h-11 rounded-full bg-charcoal text-white flex items-center justify-center shadow-luxe"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={PHONE_HREF}
        aria-label="Call Now"
        className="w-14 h-14 rounded-full bg-charcoal text-white flex items-center justify-center shadow-luxe hover:scale-105 transition-transform"
      >
        <Phone size={22} />
      </a>

      <motion.a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Now"
        className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-luxe"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <MessageCircle size={26} />
      </motion.a>
    </div>
  )
}
