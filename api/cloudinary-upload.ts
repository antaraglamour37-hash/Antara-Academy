import crypto from 'node:crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'

interface CloudinaryUploadResponse {
  secure_url?: string
  public_id?: string
  error?: { message?: string }
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]
  return typeof value === 'string' ? value.trim() : ''
}

function buildSignature(params: Record<string, string>, secret: string): string {
  const signedPairs = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&')

  return crypto.createHash('sha1').update(`${signedPairs}${secret}`).digest('hex')
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const cloudName = getRequiredEnv('CLOUDINARY_CLOUD_NAME')
  const apiKey = getRequiredEnv('CLOUDINARY_API_KEY')
  const apiSecret = getRequiredEnv('CLOUDINARY_API_SECRET')

  if (!cloudName || !apiKey || !apiSecret) {
    res.status(500).json({ error: 'Cloudinary environment variables are not configured.' })
    return
  }

  const file = typeof req.body?.file === 'string' ? (req.body.file as string).trim() : ''
  const folder = typeof req.body?.folder === 'string' ? (req.body.folder as string).trim() : ''

  if (!file) {
    res.status(400).json({ error: 'Missing image data.' })
    return
  }

  const timestamp = String(Math.floor(Date.now() / 1000))
  const params: Record<string, string> = { timestamp }
  if (folder) {
    params.folder = folder
  }

  const signature = buildSignature(params, apiSecret)
  const body = new URLSearchParams()
  body.set('file', file)
  body.set('api_key', apiKey)
  body.set('timestamp', timestamp)
  body.set('signature', signature)
  if (folder) {
    body.set('folder', folder)
  }

  const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  const payload = await uploadResponse.json().catch(() => null) as CloudinaryUploadResponse | null

  if (!uploadResponse.ok) {
    const errorMessage = payload?.error?.message ?? 'Cloudinary upload failed.'
    res.status(uploadResponse.status).json({ error: errorMessage })
    return
  }

  res.status(200).json({
    secure_url: payload?.secure_url,
    public_id: payload?.public_id,
  })
}
