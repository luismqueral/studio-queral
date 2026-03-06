/**
 * generate-og-pages.mjs
 *
 * Post-build script that generates per-note HTML files with Open Graph meta tags.
 *
 * Problem: this is a client-side SPA, so every URL serves the same index.html.
 * Social crawlers (Slack, iMessage, Twitter, etc.) don't run JS — they just read
 * the raw HTML. Without per-route OG tags, shared links show no preview.
 *
 * Solution: after Vite builds to dist/, this script reads the notes metadata,
 * then for each note creates dist/notes/{slug}/index.html with the correct
 * OG tags injected. Vercel serves static files before falling through to
 * rewrites, so crawlers get the right tags while users still get the SPA.
 *
 * Usage: runs automatically as part of `npm run build`
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')
const DIST_DIR = path.join(PROJECT_ROOT, 'dist')
const NOTES_INDEX = path.join(PROJECT_ROOT, 'src', 'notes', 'index.js')
const NOTES_CONTENT_DIR = path.join(PROJECT_ROOT, 'src', 'notes', 'content')

const SITE_URL = 'https://queral.studio'
const SITE_NAME = 'Studio Queral'
const CDN_BASE = 'https://nfhon28yqctvdy9h.public.blob.vercel-storage.com'

// Extract notes metadata from the source file without importing it
// (can't import directly because it uses import.meta.glob)
const extractNotesMetadata = () => {
  const source = readFileSync(NOTES_INDEX, 'utf-8')

  // Pull out the notesMetadata object literal
  const startMarker = 'const notesMetadata = {'
  const startIdx = source.indexOf(startMarker)
  if (startIdx === -1) throw new Error('Could not find notesMetadata in index.js')

  // Find the matching closing brace by counting depth
  let depth = 0
  let objStart = source.indexOf('{', startIdx)
  let i = objStart

  for (; i < source.length; i++) {
    if (source[i] === '{') depth++
    if (source[i] === '}') depth--
    if (depth === 0) break
  }

  const objSource = source.slice(objStart, i + 1)

  // Evaluate with Function() — the object only contains string literals and arrays
  const metadata = new Function(`return (${objSource})`)()
  return metadata
}

const escapeHtml = (str) =>
  str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Find the first image in a note's markdown content.
// Checks HTML <img src="..."> and markdown ![...](url) patterns.
const findFirstImage = (slug) => {
  const mdPath = path.join(NOTES_CONTENT_DIR, `${slug}.md`)
  try {
    const content = readFileSync(mdPath, 'utf-8')
    // HTML img tag
    const htmlMatch = content.match(/src=["']([^"']+\.(?:jpg|jpeg|png|gif|webp))[^"']*["']/i)
    if (htmlMatch) return htmlMatch[1]
    // Markdown image
    const mdMatch = content.match(/!\[.*?\]\(([^)]+\.(?:jpg|jpeg|png|gif|webp))\)/i)
    if (mdMatch) return mdMatch[1]
  } catch {}
  return null
}

// Resolve an image path to a full CDN URL
const resolveImageUrl = (imgPath) => {
  if (!imgPath) return null
  if (imgPath.startsWith('http')) return imgPath
  if (imgPath.startsWith('/notes/')) return `${CDN_BASE}${imgPath}`
  return null
}

const run = () => {
  const indexHtml = readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8')
  const metadata = extractNotesMetadata()

  let generated = 0
  let withImages = 0

  for (const [slug, note] of Object.entries(metadata)) {
    const subtitle = note.subtitle
      ? escapeHtml(note.subtitle)
      : note.headerSection?.description?.[0]
        ? escapeHtml(note.headerSection.description[0])
        : ''
    const noteUrl = `${SITE_URL}/notes/${slug}`
    const pageTitle = `${note.title} — ${SITE_NAME}`

    // Image priority: explicit ogImage > first image in markdown
    const imageUrl = resolveImageUrl(note.ogImage) || resolveImageUrl(findFirstImage(slug))
    if (imageUrl) withImages++

    const twitterCardType = imageUrl ? 'summary_large_image' : 'summary'

    const ogTags = [
      `<meta property="og:type" content="article" />`,
      `<meta property="og:site_name" content="${SITE_NAME}" />`,
      `<meta property="og:title" content="${escapeHtml(pageTitle)}" />`,
      subtitle ? `<meta property="og:description" content="${subtitle}" />` : '',
      `<meta property="og:url" content="${escapeHtml(noteUrl)}" />`,
      imageUrl ? `<meta property="og:image" content="${escapeHtml(imageUrl)}" />` : '',
      `<meta name="twitter:card" content="${twitterCardType}" />`,
      `<meta name="twitter:title" content="${escapeHtml(pageTitle)}" />`,
      subtitle ? `<meta name="twitter:description" content="${subtitle}" />` : '',
      imageUrl ? `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />` : '',
    ].filter(Boolean).join('\n    ')

    let noteHtml = indexHtml
      .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(pageTitle)}</title>`)
      .replace(
        /<!-- Open Graph \/ social previews -->[\s\S]*?<meta name="twitter:card"[^>]*\/>/,
        `<!-- Open Graph / social previews -->\n    ${ogTags}`
      )

    const outDir = path.join(DIST_DIR, 'notes', slug)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(path.join(outDir, 'index.html'), noteHtml)
    generated++
  }

  console.log(`Generated ${generated} OG-tagged HTML files (${withImages} with images) in dist/notes/`)
}

run()
