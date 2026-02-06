/**
 * Redirects /api/notes-media?path=... to the notes CDN so /notes/* requests
 * (rewritten from the app) load images/videos from the Blob store in production.
 * Requires VITE_NOTES_CDN_BASE_URL (or NOTES_CDN_BASE_URL) to be set in Vercel.
 */
module.exports = function handler(req, res) {
  const path = req.query?.path
  const baseUrl = (process.env.VITE_NOTES_CDN_BASE_URL || process.env.NOTES_CDN_BASE_URL || '').trim().replace(/\/+$/, '')

  if (!path) {
    return res.status(400).send('Missing path')
  }
  if (!baseUrl) {
    return res.status(503).send('CDN not configured')
  }

  // Handle path as string or array
  const pathStr = Array.isArray(path) ? path.join('/') : String(path)
  
  if (pathStr.includes('..')) {
    return res.status(400).send('Invalid path')
  }

  const target = `${baseUrl}/notes/${pathStr}`
  res.setHeader('Location', target)
  res.status(302).end()
}
