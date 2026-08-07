import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ImageOff } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import StitchDivider from './StitchDivider'

export default function Gallery() {
  const { gallery } = useSiteContent()
  const [activeId, setActiveId] = useState<string | null>(null)

  const activeItem = gallery.find((item) => item.id === activeId) ?? null

  return (
    <section id="gallery" className="bg-white py-24">
      <StitchDivider />
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-10">
        <div className="text-center mb-14">
          <p className="text-xs eyebrow uppercase text-gold-dark font-semibold mb-2">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-charcoal">Student Gallery</h2>
        </div>

        <div className="columns-2 md:columns-4 gap-4 [column-fill:_balance]">
          {gallery.map((item, i) => {
            const hasImage = Boolean(item.imageUrl)
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className={`mb-4 w-full rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient || 'from-gold-light via-gold to-gold-dark'} block relative ${
                  i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'
                }`}
              >
                {hasImage ? (
                  <img src={item.imageUrl} alt={item.title || item.category} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/75 px-4 text-center">
                    <ImageOff size={22} className="mb-2" />
                    <span className="text-xs uppercase tracking-[0.28em] font-semibold">{item.category}</span>
                    {item.title ? <span className="mt-2 text-sm font-medium">{item.title}</span> : null}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
                <span className="sr-only">{item.category} photo</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal/90 flex items-center justify-center p-6"
            onClick={() => setActiveId(null)}
          >
            <button className="absolute top-6 right-6 text-white" onClick={() => setActiveId(null)} aria-label="Close">
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-full max-w-xl aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${activeItem.gradient || 'from-gold-light via-gold to-gold-dark'}`}
            >
              {activeItem.imageUrl ? (
                <img src={activeItem.imageUrl} alt={activeItem.title || activeItem.category} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/80 text-sm uppercase tracking-[0.3em]">
                  {activeItem.category}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
