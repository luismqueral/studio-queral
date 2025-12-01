# Studio Queral 2026

A personal website built with Astro, featuring WebGL graphics, a blog, and conversation log archives.

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Documentation

| Doc | What It Covers |
|-----|----------------|
| [HOW-IT-WORKS.md](./docs/HOW-IT-WORKS.md) | Plain-English explanations with diagrams |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Technical design decisions |
| [GLOSSARY.md](./docs/GLOSSARY.md) | Terms and jargon explained |

---

## Adding Content

### Blog Posts

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description"
date: 2025-12-01
tags: ["topic1", "topic2"]
draft: false
---

Your content here...
```

View at: `http://localhost:3000/blog/your-post-title`

### Cursor Logs

Add conversation exports to `src/content/logs/` with frontmatter:

```markdown
---
title: "Log Title"
description: "What this conversation covers"
date: 2025-12-01
tags: ["topic"]
---

...exported conversation content...
```

View at: `http://localhost:3000/logs/your-log-slug`

---

## Project Structure

```
├── astro.config.mjs              # Astro configuration
├── src/
│   ├── content/
│   │   ├── config.ts             # Content collection schemas
│   │   ├── blog/                 # Blog posts (markdown)
│   │   └── logs/                 # Cursor conversation logs
│   ├── layouts/
│   │   └── BaseLayout.astro      # Main HTML wrapper
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro       # Blog listing
│   │   │   └── [...slug].astro   # Individual posts
│   │   └── logs/
│   │       └── [slug].astro      # Log viewer
│   ├── components/               # React components
│   │   ├── WebGLMorpher.jsx
│   │   └── NewsletterSignup.jsx
│   └── styles/
├── public/
│   └── images/
├── api/
│   └── subscribe.js              # Newsletter (Vercel function)
└── package.json
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |

## Tech Stack

- **Astro 4** - Static site generator with content collections
- **React 18** - For interactive components (WebGL, forms)
- **Tachyons CSS** - Functional CSS framework
- **Vercel** - Hosting and serverless functions
