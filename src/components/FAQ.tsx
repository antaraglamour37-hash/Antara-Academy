import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/faq'

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  return (
    <section id="faq" className="bg-white py-24">
      <div className="max-w-3xl mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <p className="text-xs eyebrow uppercase text-gold-dark font-semibold mb-2">Questions</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-charcoal">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => {
            const isOpen = openId === f.id
            return (
              <div key={f.id} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenId(isOpen ? null : f.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-charcoal">{f.question}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-gold-dark shrink-0">
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-5 text-charcoal/70 text-sm">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
