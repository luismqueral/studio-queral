# content + publishing pipeline

this doc describes how to keep **raw content** and **large media** separate from the app repo, while still making it easy to publish.

## current state (what’s set up)

- **notes markdown lives in this repo** at `src/notes/content/<slug>.md`
- **notes media does not live in this repo**
  - `public/notes/**` is ignored so we don’t accidentally commit huge videos again
- the app supports a configurable base URL:
  - set `VITE_NOTES_CDN_BASE_URL`
  - any `"/notes/..."` references in markdown/html get rewritten to `${VITE_NOTES_CDN_BASE_URL}/notes/...` at render time

## what’s *not* set up yet

- there is **no CDN/blob provider configured automatically** by this repo
- there is **no “upload” script** wired up yet

right now, the app is ready to *consume* media from anywhere — you just need to pick where to host it.

## recommended provider (simple default): vercel blob

if you’re already deploying the site on vercel, vercel blob is the lowest-friction way to host note media:

- upload videos/images to blob
- use a public URL as your `VITE_NOTES_CDN_BASE_URL` (or just reference the full blob URLs directly)
- vercel will serve those assets fast and reliably without bloating git

## practical publishing pipeline (manual, low effort)

### 1) write/edit the note text (in git)

- create/edit: `src/notes/content/<slug>.md`
- in the markdown, reference media like:
  - `/notes/<slug>/video_123.mp4`
  - `/notes/<slug>/image_123.png`

### 2) keep your raw media backed up locally (out of git)

pick a local folder that’s **not this repo**, for example:

- `~/studio-queral-notes-media/notes/<slug>/...`

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

