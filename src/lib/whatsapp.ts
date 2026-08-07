export const DEFAULT_WHATSAPP_NUMBER = '917407324836'
export const DEFAULT_PHONE_NUMBER = '7407324836'

export function buildPhoneHref(phoneNumber?: string): string {
  const digits = (phoneNumber || DEFAULT_PHONE_NUMBER).replace(/\D/g, '')
  return `tel:+91${digits}`
}

export function buildWhatsappLink(phoneNumber?: string, message?: string): string {
  const digits = (phoneNumber || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, '')
  const defaultMsg = 'Hello, I want to know more about the Makeup Courses.'
  const text = encodeURIComponent(message || defaultMsg)
  return `https://wa.me/${digits}?text=${text}`
}

export const PHONE_HREF = buildPhoneHref()
export function whatsappLink(message?: string): string {
  return buildWhatsappLink(undefined, message)
}
