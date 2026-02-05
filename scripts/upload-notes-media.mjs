import { put } from '@vercel/blob'
import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const DEFAULT_DIR = 'notes-media'

const parseArgs = (argv) => {
  const args = {
    dir: DEFAULT_DIR,
    dryRun: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (token === '--dir') args.dir = argv[i + 1]
    if (token === '--dry-run') args.dryRun = true
  }

  return args
}

const listFilesRecursive = async (rootDir) => {
  const out = []
  const walk = async (dir) => {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name === '.DS_Store') continue
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
      } else if (entry.isFile()) {
        out.push(fullPath)
      }
    }
  }

  await walk(rootDir)
  return out
}

const toPosixPath = (p) => p.split(path.sep).join('/')

const getBlobToken = () => {
  // Vercel normally provides BLOB_READ_WRITE_TOKEN, but Blob stores can be configured
  // with a custom env var prefix (e.g. STUDIO_QUERAL_READ_WRITE_TOKEN).
  return (
    process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.STUDIO_QUERAL_READ_WRITE_TOKEN ||
    null
  )
}

const main = async () => {
  const { dir, dryRun } = parseArgs(process.argv.slice(2))

  const absDir = path.resolve(process.cwd(), dir)
  const token = getBlobToken()

  if (!token) {
    console.error('Missing Blob read/write token.')
    console.error('Expected one of:')
    console.error('- BLOB_READ_WRITE_TOKEN (default Vercel name)')
    console.error('- STUDIO_QUERAL_READ_WRITE_TOKEN (custom prefix)')
    console.error('')
    console.error('Add it to `.env.local` (never commit it) and re-run.')
    process.exit(1)
  }

  let files
  try {
    files = await listFilesRecursive(absDir)
  } catch (e) {
    console.error(`Failed to read directory: ${absDir}`)
    console.error('Create it and put media under e.g. notes-media/notes/<slug>/...')
    process.exit(1)
  }

  if (files.length === 0) {
    console.log(`No files found under: ${absDir}`)
    return
  }

  console.log(`Found ${files.length} file(s) under: ${absDir}`)
  if (dryRun) {
    console.log('Dry run enabled — no uploads will happen.')
  }

  let detectedOrigin = null

  for (const filePath of files) {
    const rel = path.relative(absDir, filePath)
    const pathname = toPosixPath(rel)

    const s = await stat(filePath)
    const sizeMB = (s.size / (1024 * 1024)).toFixed(1)

    // We expect the relative path to start with "notes/..." so the runtime rewrite works.
    if (!pathname.startsWith('notes/')) {
      console.warn(`Skipping (expected under notes/): ${pathname}`)
      continue
    }

    if (dryRun) {
      console.log(`[dry] ${pathname} (${sizeMB}MB)`)
      continue
    }

    console.log(`Uploading ${pathname} (${sizeMB}MB) ...`)
    const body = await readFile(filePath)

    const res = await put(pathname, body, {
      access: 'public',
      token,
      addRandomSuffix: false,
    })

    if (!detectedOrigin) {
      detectedOrigin = new URL(res.url).origin
      console.log('')
      console.log('Detected Blob origin (use this for VITE_NOTES_CDN_BASE_URL):')
      console.log(detectedOrigin)
      console.log('')
    }
  }

  console.log('Done.')
  if (detectedOrigin) {
    console.log('')
    console.log('Next steps:')
    console.log(`- set VITE_NOTES_CDN_BASE_URL="${detectedOrigin}" (local + Vercel env vars)`)
    console.log('- your markdown can keep using /notes/<slug>/... paths')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

