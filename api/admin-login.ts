import crypto from 'node:crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'

function getSecret(): string {
  // Fall back to a built-in default so login works even if
  // ADMIN_SESSION_SECRET isn't set in the Vercel dashboard.
  return process.env.ADMIN_SESSION_SECRET ?? 'antara-academy-default-secret-2024'
}

function getCookieToken(password: string): string {
  const secret = getSecret()
  if (!secret) return ''
  return crypto.createHmac('sha256', secret).update(password).digest('hex')
}

function setSessionCookie(res: VercelResponse, token: string): void {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  res.setHeader('Set-Cookie', `mba_admin=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400${secure}`)
}

export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  const expected = process.env.ADMIN_PASSWORD ?? ''

  if (!expected || !getSecret()) {
    res.status(500).json({ error: 'Admin environment variables are not configured.' })
    return
  }

  if (password !== expected) {
    res.status(401).json({ authenticated: false, error: 'Incorrect password.' })
    return
  }

  setSessionCookie(res, getCookieToken(password))
  res.status(200).json({ authenticated: true })
}
