/**
 * sync-music.mjs
 *
 * Syncs a Google Drive music folder into a static collection.json + cover art on Vercel Blob.
 *
 * How it works:
 *   1. Authenticates with Google Drive via a service account
 *   2. Lists all subfolders in the configured music folder (each = one album)
 *   3. For each album folder:
 *      - Lists audio files (to build the track listing from filenames)
 *      - Downloads ONE representative track to extract embedded metadata + cover art
 *      - Uploads cover art to Vercel Blob
 *   4. Writes src/music/collection.json with all album data
 *
 * Environment variables (loaded from .env.local via --env-file):
 *   GOOGLE_SERVICE_ACCOUNT_KEY  - base64-encoded service account JSON key
 *   GOOGLE_DRIVE_MUSIC_FOLDER_ID - the Drive folder ID containing album subfolders
 *   BLOB_READ_WRITE_TOKEN (or STUDIO_QUERAL_READ_WRITE_TOKEN) - Vercel Blob token
 *
 * Usage:
 *   npm run sync:music
 *   npm run sync:music -- --dry-run
 *   npm run sync:music -- --force
 */

import { google } from 'googleapis'
import { parseBuffer } from 'music-metadata'
import { put, list } from '@vercel/blob'
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ---------- Constants ----------

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')
const COLLECTION_OUTPUT = path.join(PROJECT_ROOT, 'src', 'music', 'collection.json')

// Audio file extensions we care about
const AUDIO_EXTENSIONS = new Set([
  '.mp3', '.flac', '.m4a', '.aac', '.ogg', '.opus', '.wav', '.aiff', '.wma', '.alac',
])

// ---------- CLI args ----------

const parseArgs = (argv) => {
  const args = { dryRun: false, force: false }
  for (const token of argv) {
    if (token === '--dry-run') args.dryRun = true
    if (token === '--force') args.force = true
  }
  return args
}

// ---------- Google Drive helpers ----------

/**
 * Build an authenticated Google Drive client from the base64-encoded service account key.
 * The key is stored as an env var to avoid file-path headaches across machines.
 */
const getDriveClient = () => {
  const keyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!keyBase64) {
    console.error('Missing GOOGLE_SERVICE_ACCOUNT_KEY in environment.')
    console.error('Set it to the base64-encoded service account JSON key in .env.local')
    process.exit(1)
  }

  const keyJson = JSON.parse(Buffer.from(keyBase64, 'base64').toString('utf-8'))

  const auth = new google.auth.GoogleAuth({
    credentials: keyJson,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  })

  return google.drive({ version: 'v3', auth })
}

const getFolderId = () => {
  const id = process.env.GOOGLE_DRIVE_MUSIC_FOLDER_ID
  if (!id) {
    console.error('Missing GOOGLE_DRIVE_MUSIC_FOLDER_ID in environment.')
    console.error('Set it to the Google Drive folder ID in .env.local')
    process.exit(1)
  }
  return id
}

/**
 * List all subfolders inside a Drive folder (one level deep).
 * Each subfolder represents one album.
 */
const listAlbumFolders = async (drive, parentFolderId) => {
  const folders = []
  let pageToken = undefined

  do {
    const res = await drive.files.list({
      q: `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'nextPageToken, files(id, name)',
      pageSize: 200,
      pageToken,
    })
    folders.push(...res.data.files)
    pageToken = res.data.nextPageToken
  } while (pageToken)

  return folders.sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * List all audio files inside a Drive folder.
 * Returns file objects with id, name, size, mimeType.
 */
const listAudioFiles = async (drive, folderId) => {
  const files = []
  let pageToken = undefined

  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, size, mimeType)',
      pageSize: 500,
      pageToken,
    })
    files.push(...res.data.files)
    pageToken = res.data.nextPageToken
  } while (pageToken)

  // Filter to audio files only, based on extension
  const audioFiles = files.filter((f) => {
    const ext = path.extname(f.name).toLowerCase()
    return AUDIO_EXTENSIONS.has(ext)
  })

  // Sort by filename so track ordering is correct (assumes 01, 02, ... prefix)
  return audioFiles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
}

/**
 * Download a file from Google Drive into a Buffer.
 */
const downloadFileToBuffer = async (drive, fileId) => {
  const res = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'arraybuffer' },
  )
  return Buffer.from(res.data)
}

// ---------- Metadata helpers ----------

/**
 * Parse a track filename into a track number and title.
 *
 * Handles common patterns:
 *   "01 Track Name.flac"      → { number: 1, title: "Track Name" }
 *   "01. Track Name.mp3"      → { number: 1, title: "Track Name" }
 *   "01 - Track Name.m4a"     → { number: 1, title: "Track Name" }
 *   "Track Name.mp3"          → { number: null, title: "Track Name" }
 */
const parseTrackFilename = (filename) => {
  // Strip extension
  const name = filename.replace(/\.[^.]+$/, '')

  // Try to match a leading track number
  const match = name.match(/^(\d{1,3})\s*[.\-–—)]*\s*(.+)$/)
  if (match) {
    return {
      number: parseInt(match[1], 10),
      title: match[2].trim(),
    }
  }

  return { number: null, title: name.trim() }
}

/**
 * Turn a string into a URL-safe slug.
 * "Madvillainy (Deluxe)" → "madvillainy-deluxe"
 */
const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/['']/g, '')           // remove curly/straight apostrophes
    .replace(/[^a-z0-9]+/g, '-')   // non-alphanumeric → dash
    .replace(/^-+|-+$/g, '')       // trim leading/trailing dashes

// ---------- Vercel Blob helpers ----------

const getBlobToken = () => {
  return (
    process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.STUDIO_QUERAL_READ_WRITE_TOKEN ||
    null
  )
}

/**
 * List all existing blobs so we can skip unchanged cover art.
 */
const listExistingBlobs = async (token) => {
  const existing = new Map()
  let cursor = undefined

  do {
    const result = await list({ token, cursor, limit: 1000 })
    for (const blob of result.blobs) {
      existing.set(blob.pathname, blob.size)
    }
    cursor = result.cursor
  } while (cursor)

  return existing
}

// ---------- Main ----------

const main = async () => {
  const { dryRun, force } = parseArgs(process.argv.slice(2))

  console.log('=== sync-music ===')
  if (dryRun) console.log('Dry run enabled — no uploads or file writes.')
  if (force) console.log('Force mode — will re-upload all cover art.')
  console.log('')

  // Auth + config
  const drive = getDriveClient()
  const musicFolderId = getFolderId()
  const blobToken = getBlobToken()

  if (!blobToken) {
    console.error('Missing Blob read/write token.')
    console.error('Expected BLOB_READ_WRITE_TOKEN or STUDIO_QUERAL_READ_WRITE_TOKEN in .env.local')
    process.exit(1)
  }

  // Fetch existing blobs to skip unchanged cover art
  let existingBlobs = new Map()
  if (!force) {
    console.log('Checking existing blobs...')
    existingBlobs = await listExistingBlobs(blobToken)
    console.log(`Found ${existingBlobs.size} existing blob(s).`)
    console.log('')
  }

  // List album folders
  console.log('Listing album folders from Google Drive...')
  const albumFolders = await listAlbumFolders(drive, musicFolderId)
  console.log(`Found ${albumFolders.length} album folder(s).`)
  console.log('')

  const collection = []
  let coversUploaded = 0
  let coversSkipped = 0
  let detectedOrigin = null

  for (const folder of albumFolders) {
    console.log(`--- ${folder.name} ---`)

    // List audio files in this album folder
    const audioFiles = await listAudioFiles(drive, folder.id)
    if (audioFiles.length === 0) {
      console.log('  No audio files found, skipping.')
      continue
    }
    console.log(`  ${audioFiles.length} track(s)`)

    // Build track listing from filenames
    const tracks = audioFiles.map((f) => {
      const parsed = parseTrackFilename(f.name)
      return {
        number: parsed.number,
        title: parsed.title,
        filename: f.name,
      }
    })

    // Download the first track to extract album-level metadata + cover art
    const representativeFile = audioFiles[0]
    console.log(`  Downloading "${representativeFile.name}" for metadata...`)
    const buffer = await downloadFileToBuffer(drive, representativeFile.id)

    let metadata = {}
    let coverArtBuffer = null
    let coverArtMimeType = null

    try {
      const parsed = await parseBuffer(buffer, { mimeType: representativeFile.mimeType })
      const { common } = parsed

      metadata = {
        album: common.album || folder.name,
        artist: common.artist || common.albumartist || 'Unknown Artist',
        year: common.year || null,
        genre: common.genre?.[0] || null,
      }

      // Extract embedded cover art if present
      if (common.picture && common.picture.length > 0) {
        const pic = common.picture[0]
        coverArtBuffer = Buffer.from(pic.data)
        coverArtMimeType = pic.format // e.g. "image/jpeg"
      }
    } catch (err) {
      // Metadata extraction failed — fall back to folder name
      console.log(`  Warning: could not parse metadata (${err.message}). Using folder name.`)
      metadata = {
        album: folder.name,
        artist: 'Unknown Artist',
        year: null,
        genre: null,
      }
    }

    console.log(`  Album: ${metadata.album} — ${metadata.artist} (${metadata.year || '?'})`)

    // Determine album slug and cover art blob path
    const slug = slugify(metadata.album || folder.name)
    const coverExt = coverArtMimeType === 'image/png' ? 'png' : 'jpg'
    const coverBlobPath = `music/${slug}/cover.${coverExt}`
    let coverUrl = null

    // Upload cover art to Vercel Blob
    if (coverArtBuffer) {
      const alreadyExists = existingBlobs.has(coverBlobPath) &&
        existingBlobs.get(coverBlobPath) === coverArtBuffer.length

      if (!force && alreadyExists) {
        console.log(`  Cover art already on CDN, skipping.`)
        // Reconstruct the URL from the known origin
        if (detectedOrigin) {
          coverUrl = `${detectedOrigin}/${coverBlobPath}`
        }
        coversSkipped++
      } else if (dryRun) {
        console.log(`  [dry] Would upload cover art → ${coverBlobPath} (${(coverArtBuffer.length / 1024).toFixed(0)}KB)`)
      } else {
        console.log(`  Uploading cover art → ${coverBlobPath} (${(coverArtBuffer.length / 1024).toFixed(0)}KB)`)
        const res = await put(coverBlobPath, coverArtBuffer, {
          access: 'public',
          token: blobToken,
          addRandomSuffix: false,
          allowOverwrite: true,
          contentType: coverArtMimeType,
        })
        coverUrl = res.url
        coversUploaded++

        // Detect the blob origin from the first upload
        if (!detectedOrigin) {
          detectedOrigin = new URL(res.url).origin
        }
      }
    } else {
      console.log('  No embedded cover art found.')
    }

    // If we skipped upload but know the origin, construct the URL
    if (!coverUrl && detectedOrigin && coverArtBuffer) {
      coverUrl = `${detectedOrigin}/${coverBlobPath}`
    }

    collection.push({
      slug,
      album: metadata.album,
      artist: metadata.artist,
      year: metadata.year,
      genre: metadata.genre,
      coverUrl,
      trackCount: tracks.length,
      tracks,
    })

    console.log('')
  }

  // Sort collection: by artist, then by year
  collection.sort((a, b) => {
    const artistCmp = (a.artist || '').localeCompare(b.artist || '')
    if (artistCmp !== 0) return artistCmp
    return (a.year || 0) - (b.year || 0)
  })

  // Write collection.json
  if (!dryRun) {
    await mkdir(path.dirname(COLLECTION_OUTPUT), { recursive: true })
    await writeFile(COLLECTION_OUTPUT, JSON.stringify(collection, null, 2) + '\n')
    console.log(`Wrote ${collection.length} album(s) to ${path.relative(PROJECT_ROOT, COLLECTION_OUTPUT)}`)
  } else {
    console.log(`[dry] Would write ${collection.length} album(s) to ${path.relative(PROJECT_ROOT, COLLECTION_OUTPUT)}`)
  }

  console.log('')
  console.log(`Done. Covers uploaded: ${coversUploaded}, skipped: ${coversSkipped}`)

  if (detectedOrigin) {
    console.log('')
    console.log('Blob origin (for vercel.json rewrite):')
    console.log(detectedOrigin)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
