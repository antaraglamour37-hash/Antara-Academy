import crypto from 'node:crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? 'antara-academy-default-secret-2024'
}

function getCookieToken(password: string): string {
  const secret = getSecret()
  if (!secret) return ''
  return crypto.createHmac('sha256', secret).update(password).digest('hex')
}

function parseCookies(cookieHeader = ''): Record<string, string> {
  return cookieHeader.split(';').reduce<Record<string, string>>((acc, pair) => {
    const index = pair.indexOf('=')
    if (index === -1) return acc
    const key = pair.slice(0, index).trim()
    const value = decodeURIComponent(pair.slice(index + 1).trim())
    acc[key] = value
    return acc
  }, {})
}

export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const secret = getSecret()
  const expected = process.env.ADMIN_PASSWORD ?? ''
  if (!expected) {
    res.status(200).json({ authenticated: false })
    return
  }

  const cookies = parseCookies(typeof req.headers.cookie === 'string' ? req.headers.cookie : '')
  const token = cookies['mba_admin'] ?? ''
  const expectedToken = getCookieToken(expected)
  const authenticated = Boolean(token && expectedToken && token === expectedToken)
  res.status(200).json({ authenticated })
}
