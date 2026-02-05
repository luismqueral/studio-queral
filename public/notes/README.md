This folder is intentionally kept **out of git**.

Notes media (images/videos) should be hosted on a CDN / Vercel Blob / S3, then referenced via absolute URLs.

Local dev:
- set `VITE_NOTES_CDN_BASE_URL` (e.g. `http://localhost:3000` or your CDN origin)

