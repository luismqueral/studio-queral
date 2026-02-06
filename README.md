# Studio Queral

Personal website with notes, WebGL graphics, and newsletter integration.

## Prerequisites

- **Node.js** v18 or higher

  On macOS with Homebrew:
  ```bash
  brew install node
  ```

  Or use a version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm).

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
├── api/
│   └── subscribe.js              # Vercel serverless function (newsletter)
├── src/
│   ├── components/
│   │   ├── HomePage.jsx          # Main page with bio + notes list
│   │   ├── NotePage.jsx          # Individual note renderer
│   │   ├── WebGLMorpher.jsx      # Interactive WebGL portrait
│   │   └── NewsletterSignup.jsx  # Newsletter form
│   ├── notes/
│   │   ├── content/<slug>.md     # Note markdown files
│   │   └── index.js              # Notes registry (title, date metadata)
│   ├── pages/
│   │   ├── AboutPage.jsx
│   │   └── NotesIndexPage.jsx    # Password-protected notes dashboard
│   └── styles/
│       └── tachyons-ext.css      # Custom CSS + font-face declarations
├── public/
│   ├── fonts/                    # Neue Haas Unica woff files
│   └── images/                   # Static images (luis.png, pelican.png, etc.)
├── notes-media/                  # Local media files (git-ignored)
│   └── notes/<slug>/             # Organized by note slug
│       ├── *.webp                # Optimized images
│       ├── *.mp4                 # Compressed videos
│       └── raw/                  # Original uncompressed files (backup)
└── scripts/
    └── upload-notes-media.mjs    # Uploads notes-media/ to Vercel Blob
```

## Environment Variables

Create `.env.local` in project root:

```env
# Vercel Blob (for CDN media uploads)
STUDIO_QUERAL_READ_WRITE_TOKEN=vercel_blob_rw_xxx

# CDN base URL (where note media is hosted)
VITE_NOTES_CDN_BASE_URL=https://xxx.public.blob.vercel-storage.com

# Newsletter (optional)
BUTTONDOWN_API_KEY=your_buttondown_api_key
```

| Variable | Description | Required |
|----------|-------------|----------|
| `STUDIO_QUERAL_READ_WRITE_TOKEN` | Vercel Blob read/write token for uploads | For media uploads |
| `VITE_NOTES_CDN_BASE_URL` | Base URL for note media (images/videos) | Yes, for notes with media |
| `BUTTONDOWN_API_KEY` | Buttondown newsletter API key | For newsletter |

## Notes System

### Adding a New Note

1. **Create the markdown file:**
   ```
   src/notes/content/<slug>.md
   ```

2. **Register it in the index:**
   ```javascript
   // src/notes/index.js
   const notesMetadata = {
     '<slug>': { title: 'Your Note Title', date: 'Month Year' },
     // ...
   }
   ```

3. **Add to homepage** (optional):
   ```javascript
   // src/components/HomePage.jsx
   const notes = [
     { title: 'Your Note Title', slug: '<slug>', subtitle: 'optional subtitle' },
     // ...
   ]
   ```

### Markdown Format

- First `# Heading` is automatically stripped (title comes from registry)
- Use standard markdown + HTML for rich content
- Reference media with `/notes/<slug>/filename.ext` paths

## CDN Media Pipeline

Notes media (images, videos) is stored on Vercel Blob, not in git.

### Setup (One-Time)

1. **Create Vercel Blob store:**
   - Vercel Dashboard → Storage → Blob → Create
   - Create a read/write token

2. **Add token to `.env.local`:**
   ```env
   STUDIO_QUERAL_READ_WRITE_TOKEN=vercel_blob_rw_xxx
   ```

### Adding Media to a Note

1. **Organize files locally** (git-ignored):
   ```
   notes-media/notes/<slug>/
   ├── image_123.webp
   ├── video_456.mp4
   └── raw/                 # Keep originals as backup
   ```

2. **Optimize before uploading:**
   - Images: Convert to WebP (quality 90), max 1400px width
   - Videos: 720p, H.264, CRF 23, faststart

   Example with ffmpeg/cwebp:
   ```bash
   # Image optimization
   sips -Z 1400 raw/image.png --out /tmp/image.png
   cwebp -q 90 /tmp/image.png -o image.webp

   # Video compression
   ffmpeg -i raw/video.mp4 \
     -vf "scale=-2:720" \
     -c:v libx264 -crf 23 -preset medium \
     -c:a aac -b:a 128k \
     -movflags +faststart \
     video.mp4
   ```

3. **Upload to Vercel Blob:**
   ```bash
   npm run upload:notes-media
   ```
   This automatically loads tokens from `.env.local`. To run the script manually without npm:
   ```bash
   node --env-file=.env.local scripts/upload-notes-media.mjs
   ```

4. **Set the CDN URL** (script prints detected origin):
   ```env
   VITE_NOTES_CDN_BASE_URL=https://xxx.public.blob.vercel-storage.com
   ```

5. **Reference in markdown:**
   ```html
   <img src="/notes/<slug>/image_123.webp" />
   <video src="/notes/<slug>/video_456.mp4" controls></video>
   ```

   The `/notes/...` paths are rewritten to the CDN URL in two ways:
   - **Client-side:** `NotePage.jsx` rewrites `src="/notes/..."` to CDN URLs at render time (requires `VITE_NOTES_CDN_BASE_URL`)
   - **Server-side:** `vercel.json` has a rewrite rule that proxies `/notes/:slug/:file+` requests directly to Vercel Blob, so direct media URLs also work

### Current Blob Contents

To list what's on the CDN:
```javascript
// Quick check via Node REPL
const { list } = require('@vercel/blob');
const token = process.env.STUDIO_QUERAL_READ_WRITE_TOKEN;
const { blobs } = await list({ token });
blobs.forEach(b => console.log(b.pathname, (b.size/1024/1024).toFixed(1) + 'MB'));
```

## Newsletter Setup

Uses Buttondown for subscriptions.

1. Get API key from https://buttondown.email/settings/programming
2. Add to `.env.local`: `BUTTONDOWN_API_KEY=xxx`
3. Add to Vercel environment variables for production

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run upload:notes-media` | Upload `notes-media/` to Vercel Blob |

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment.

**Required Vercel env vars** (Settings → Environment Variables):
- `VITE_NOTES_CDN_BASE_URL` — CDN origin for note media (e.g. `https://xxx.public.blob.vercel-storage.com`). This is baked into the JS bundle at build time by Vite, so you must **redeploy** after adding or changing it.
- `BUTTONDOWN_API_KEY` — Newsletter API key (if using newsletter)

**Media proxying:** `vercel.json` includes a rewrite rule that proxies `/notes/:slug/:file+` to Vercel Blob. This ensures direct media URLs work (e.g. sharing an image link). The CDN base URL is hardcoded in `vercel.json` — if the Blob store changes, update it there too.

## Tech Stack

- React 18 + Vite 5
- Tachyons CSS (CDN + custom extensions)
- WebGL for graphics
- Vercel Blob for media CDN
- Buttondown for newsletter
- Vercel for hosting
