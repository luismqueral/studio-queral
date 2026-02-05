# content + publishing pipeline

this doc describes how to keep **raw content** and **large media** separate from the app repo, while still making it easy to publish.

## current state (what’s set up)

- **notes markdown lives in this repo** at `src/notes/content/<slug>.md`
- **notes media does not live in this repo**
  - `public/notes/**` is ignored so we don’t accidentally commit huge videos again
- there is a simple uploader for blob:
  - `notes-media/**` is ignored (local source of truth for big files)
  - `npm run upload:notes-media` uploads `notes-media/notes/**` to vercel blob
- the app supports a configurable base URL:
  - set `VITE_NOTES_CDN_BASE_URL`
  - any `"/notes/..."` references in markdown/html get rewritten to `${VITE_NOTES_CDN_BASE_URL}/notes/...` at render time

## what’s *not* set up yet

- there is **no “one click” auto publish** (markdown + media) — you still upload media when you’re ready

right now, the app is ready to *consume* media from anywhere — you just need to pick where to host it.

## recommended provider (simple default): vercel blob

if you’re already deploying the site on vercel, vercel blob is the lowest-friction way to host note media:

- upload videos/images to blob (public)
- use the blob **origin** as your `VITE_NOTES_CDN_BASE_URL`
- vercel will serve those assets fast and reliably without bloating git

### vercel blob setup

1) in the vercel dashboard:
- storage → blob → create (or select) a blob store
- create a **read/write token**

2) locally, add the token to `.env.local`:

```env
BLOB_READ_WRITE_TOKEN=your_vercel_blob_read_write_token
```

note: blob stores can be configured with a custom env var prefix. if you see something like `STUDIO_QUERAL_READ_WRITE_TOKEN` in your envs, that works too.

3) put media files (out of git) under:

```
notes-media/notes/<slug>/*
```

4) upload to blob:

```bash
npm run upload:notes-media
```

the script prints the detected blob origin; set it as:

```bash
VITE_NOTES_CDN_BASE_URL="https://<detected-blob-origin>"
```

5) in vercel, add env vars:
- `VITE_NOTES_CDN_BASE_URL` (public base URL)
- `BLOB_READ_WRITE_TOKEN` (only needed if you later automate uploads in CI; not needed for the site at runtime)

## practical publishing pipeline (manual, low effort)

### 1) write/edit the note text (in git)

- create/edit: `src/notes/content/<slug>.md`
- in the markdown, reference media like:
  - `/notes/<slug>/video_123.mp4`
  - `/notes/<slug>/image_123.png`

### 2) keep your raw media backed up locally (out of git)

pick a local folder that’s **not this repo**, for example:

- `notes-media/notes/<slug>/...` (ignored by git in this repo)
- or `~/studio-queral-notes-media/notes/<slug>/...` (if you prefer keeping it fully outside the repo)

this is your “source of truth” for big files (and you can back it up with icloud drive / google drive / dropbox / external drive).

### 3) upload media to your provider (out of band)

upload the folder to your chosen host so it ends up addressable at:

- `https://<your-host>/notes/<slug>/...`

### 4) configure the site to point at that host

local dev:

```bash
VITE_NOTES_CDN_BASE_URL="https://<your-host>"
```

vercel:
- add `VITE_NOTES_CDN_BASE_URL` in the vercel project env vars

## future upgrade (fully decouple markdown too)

when you’re ready to pull markdown out of this repo:

- host `notes/<slug>.md` files on the same CDN/blob
- change `src/notes/index.js` to fetch markdown over HTTP instead of bundling it with vite

this keeps the app repo stable while content ships independently.

