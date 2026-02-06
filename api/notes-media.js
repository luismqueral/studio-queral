/**
 * Redirects /api/notes-media?path=... to the notes CDN so /notes/* requests
 * (rewritten from the app) load images/videos from the Blob store in production.
 * Requires VITE_NOTES_CDN_BASE_URL (or NOTES_CDN_BASE_URL) to be set in Vercel.
 */
export default function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).setHeader('Allow', 'GET').end()
    }

    const path = req.query.path
    const baseUrl = (process.env.VITE_NOTES_CDN_BASE_URL || process.env.NOTES_CDN_BASE_URL || '').trim().replace(/\/+$/, '')

    if (!path || typeof path !== 'string' || path.includes('..')) {
      return res.status(400).json({ error: 'Invalid path' })
    }
    if (!baseUrl) {
      return res.status(503).json({ error: 'Notes CDN base URL not configured' })
    }

    const target = `${baseUrl}/notes/${path}`
    return res.redirect(302, target)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
