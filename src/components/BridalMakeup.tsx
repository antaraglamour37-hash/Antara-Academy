import { motion } from 'framer-motion'
import { MessageCircle, Sparkles, Crown, ShieldCheck, Check, Gem, Droplets, Wind } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { buildWhatsappLink } from '../lib/whatsapp'
import StitchDivider from './StitchDivider'

const rupee = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const partyPackages = [
  { name: 'Party Makeup (Non-HD)', price: 1000 },
  { name: 'Party Makeup (HD)', price: 1500 },
  { name: 'Party Makeup (Ultra HD)', price: 2500 },
  { name: 'Party Makeup (Glass Finish)', price: 3000 },
  { name: 'Party Makeup (Waterproof)', price: 5000 },
]

const bridalPackages = [
  { name: 'Bridal Non-HD Makeup', price: 5000 },
  { name: 'Bridal HD Makeup', price: 8000 },
  { name: 'Bridal Ultra HD Makeup', price: 12000 },
  { name: 'Bridal Glass Finish Makeup', price: 16000 },
  { name: 'Bridal Waterproof Makeup', price: 22000 },
  { name: 'Bridal Air Brush Makeup', price: 35000 },
]

const standardIncludes = [
  'Haldi Look',
  'Bridal Makeover',
  'Reception Makeup',
  'Mehendi',
  'Nail Art',
  'Groom Makeup',
  'Special Gift for the Bride',
]

const premiumPackages = [
  {
    name: 'All Over Bridal HD Package',
    price: 30000,
    includes: standardIncludes,
    icon: Sparkles,
  },
  {
    name: 'All Over Bridal Glass Finish Package',
    price: 50000,
    includes: standardIncludes,
    icon: Gem,
    popular: true,
  },
  {
    name: 'All Over Bridal Waterproof Package',
    price: 60000,
    includes: standardIncludes,
    icon: Droplets,
    discounted: true,
  },
  {
    name: 'All Over Bridal Air Brush Package',
    price: 100000,
    includes: [
      'Haldi Makeup',
      'Bridal Makeover',
      'Reception Makeup',
      'Groom Makeup',
      'Mehendi',
      'Nail Art',
      'Special Gift for the Bride',
    ],
    icon: Wind,
  },
]

const bookingRules = [
  '50% advance payment is mandatory to confirm the booking.',
  'The remaining 50% must be paid on or before the event day.',
  'Advance payments are non-refundable once the booking is confirmed.',
  'Booking dates are confirmed only after the advance payment is received.',
  'Please book in advance to secure your preferred date.',
  'Prices may vary for outstation bookings or additional services.',
  'Any extra services requested on the event day will be charged separately.',
]

export default function BridalMakeup() {
  const { settings } = useSiteContent()

  const enquireLink = (label: string) =>
    buildWhatsappLink(settings.whatsappNumber, `Hello, I would like to book the ${label}.`)

  return (
    <section id="bridal-makeup" className="relative bg-gradient-to-b from-ivory via-white to-ivory py-24 overflow-hidden">
      <div aria-hidden className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-gold/15 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 -right-20 w-[320px] h-[320px] rounded-full bg-gold-dark/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs eyebrow uppercase text-gold-dark font-semibold mb-2 flex items-center justify-center gap-2">
            <Crown size={14} /> Bridal Studio
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-charcoal">Professional Bridal Makeup Services</h2>
          <p className="text-charcoal/65 max-w-2xl mx-auto mt-4">
            Book your bridal makeover with certified professionals using premium HD, Ultra HD, Waterproof, Glass
            Finish, and Air Brush makeup products for your special day.
          </p>
        </div>

        {/* Party Makeup */}
        <div className="mb-16">
          <h3 className="font-display text-2xl font-semibold text-charcoal mb-6 text-center md:text-left">
            Party Makeup Packages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {partyPackages.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-5 text-center shadow-glass hover:shadow-luxe transition-shadow border border-gold/10"
              >
                <p className="text-sm font-semibold text-charcoal mb-2 min-h-[2.5rem] flex items-center justify-center">
                  {p.name}
                </p>
                <p className="text-xl font-semibold text-gold-dark">{rupee.format(p.price)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bridal Makeup */}
        <div className="mb-16">
          <h3 className="font-display text-2xl font-semibold text-charcoal mb-6 text-center md:text-left">
            Bridal Makeup Packages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {bridalPackages.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-5 text-center shadow-glass hover:shadow-luxe transition-shadow border border-gold/10"
              >
                <p className="text-sm font-semibold text-charcoal mb-2 min-h-[2.5rem] flex items-center justify-center">
                  {p.name}
                </p>
                <p className="text-xl font-semibold text-gold-dark">{rupee.format(p.price)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Premium Bridal Packages */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <p className="text-xs eyebrow uppercase text-gold-dark font-semibold mb-2">All-Inclusive</p>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-charcoal">Premium Bridal Packages</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumPackages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col glass rounded-2xl p-7 shadow-glass hover:shadow-luxe transition-shadow border ${
                  pkg.popular ? 'border-gold/60' : 'border-gold/10'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 right-6 bg-gold-gradient text-white text-[10px] eyebrow uppercase font-semibold px-3 py-1 rounded-full shadow-luxe">
                    Most Popular
                  </span>
                )}
                {pkg.discounted && (
                  <span className="absolute -top-3 right-6 bg-charcoal text-white text-[10px] eyebrow uppercase font-semibold px-3 py-1 rounded-full shadow-luxe">
                    Discounted Price
                  </span>
                )}

                <div className="w-12 h-12 rounded-full bg-ivory flex items-center justify-center text-gold-dark mb-5">
                  <pkg.icon size={22} />
                </div>
                <h4 className="font-display text-xl font-semibold text-charcoal mb-2 min-h-[3.5rem]">{pkg.name}</h4>
                <p className="text-2xl font-semibold text-gold-dark mb-5">{rupee.format(pkg.price)}</p>

                <ul className="mb-6 space-y-2 flex-1">
                  {pkg.includes.map((inc) => (
                    <li key={inc} className="text-sm text-charcoal/70 flex items-start gap-2">
                      <Check size={14} className="mt-0.5 text-gold-dark shrink-0" /> {inc}
                    </li>
                  ))}
                </ul>

                <a
                  href={enquireLink(pkg.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gold-gradient text-white py-3 rounded-full text-sm font-semibold shadow-luxe hover:brightness-105 transition"
                >
                  <MessageCircle size={16} /> Enquire on WhatsApp
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Booking Rules & Terms */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-4xl mx-auto rounded-2xl p-8 md:p-10 bg-gold-gradient shadow-luxe"
        >
          <div className="rounded-xl bg-white/95 backdrop-blur p-7 md:p-9">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-full bg-ivory flex items-center justify-center text-gold-dark shrink-0">
                <ShieldCheck size={20} />
              </span>
              <h3 className="font-display text-2xl font-semibold text-charcoal">Booking Policy</h3>
            </div>
            <ul className="space-y-3">
              {bookingRules.map((rule) => (
                <li key={rule} className="text-sm md:text-base text-charcoal/75 flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" /> {rule}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <div className="mt-24">
        <StitchDivider />
      </div>

      {/* Full-width CTA */}
      <div className="relative bg-charcoal text-white py-16 mt-10">
        <div aria-hidden className="absolute inset-0 bg-gold-gradient opacity-10" />
        <div className="relative max-w-3xl mx-auto px-5 md:px-10 text-center">
          <h3 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Ready to Look Stunning on Your Special Day?
          </h3>
          <p className="text-white/70 mb-8">
            Reserve your date with our certified bridal makeup artists today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 bg-gold-gradient text-white px-8 py-3.5 rounded-full font-semibold shadow-luxe hover:brightness-105 transition w-full sm:w-auto"
            >
              <Crown size={18} /> Book Bridal Makeup
            </a>
            <a
              href={buildWhatsappLink(settings.whatsappNumber, 'Hello, I would like to book a bridal makeup appointment.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/25 px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition w-full sm:w-auto"
            >
              <MessageCircle size={18} /> WhatsApp Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
