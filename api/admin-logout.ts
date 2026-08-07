import type { VercelRequest, VercelResponse } from '@vercel/node'

function clearSessionCookie(res: VercelResponse): void {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  res.setHeader('Set-Cookie', `mba_admin=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`)
}

export default function handler(req: VercelRequest, res: VercelResponse): void {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  clearSessionCookie(res)
  res.status(200).json({ authenticated: false })
}
