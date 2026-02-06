import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const notesMediaDir = path.resolve(__dirname, 'notes-media', 'notes')

// Serve note media from notes-media/notes at /notes in dev so images load without VITE_NOTES_CDN_BASE_URL
function notesMediaMiddleware(req, res, next) {
  if (!req.url.startsWith('/notes/') || req.method !== 'GET') return next()
  const segment = req.url.slice('/notes/'.length).split('?')[0]
  const filePath = path.resolve(notesMediaDir, segment)
  if (!filePath.startsWith(notesMediaDir) || !fs.existsSync(filePath)) return next()
  const stat = fs.statSync(filePath)
  if (!stat.isFile()) return next()
  res.setHeader('Content-Type', getMime(path.extname(filePath)))
  fs.createReadStream(filePath).pipe(res)
}

function getMime(ext) {
  const map = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg' }
  return map[ext] || 'application/octet-stream'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'notes-media',
      configureServer(server) {
        server.middlewares.use(notesMediaMiddleware)
      }
    }
  ],
  server: {
    port: 3000
  }
})

