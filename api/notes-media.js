/**
 * Redirects /api/notes-media?path=... to the notes CDN so /notes/* requests
 * (rewritten from the app) load images/videos from the Blob store in production.
 * Requires VITE_NOTES_CDN_BASE_URL (or NOTES_CDN_BASE_URL) to be set in Vercel.
 */
module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).setHeader('Allow', 'GET').end()
    return
  }

  const path = req.query.path
  const baseUrl = (process.env.VITE_NOTES_CDN_BASE_URL || process.env.NOTES_CDN_BASE_URL || '').trim().replace(/\/+$/, '')

  if (!path || typeof path !== 'string' || path.includes('..')) {
    res.status(400).end()
    return
  }
  if (!baseUrl) {
    res.status(503).setHeader('Content-Type', 'text/plain').end('Notes CDN base URL not configured')
    return
  }

  const target = `${baseUrl}/notes/${path}`
  res.status(302).setHeader('Location', target).end()
}
