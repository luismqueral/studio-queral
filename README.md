# Studio Queral Site

*A clean, fast HTMX-powered studio log site that transforms your Obsidian notes into a beautiful web experience.*

## What this is (and why it exists)

Honestly, I got tired of wrestling with complex static site generators every time I wanted to publish my studio log. Here's what I'm thinking — I write everything in Obsidian anyway, so why not just build something that takes those markdown files and turns them into a clean web experience without all the ceremony?

This is my solution: a simple Flask app that processes individual markdown files, handles asset compression, and serves everything up with HTMX for that smooth, modern feel. No database, no complex build chains, just markdown-first publishing that works the way I actually write.

## Architecture (The Simple Version)

**Here's how it works** — I keep writing in my studio log files like normal, then when I'm ready to publish, a simple build script splits everything into individual posts, processes the assets, and generates clean markdown files that the Flask app can serve.

```
📁 Your Writing (Outside Repo)
├── journals/studio log/studio log — 2025.md    # Your main studio log
└── journals/studio log/projects.md             # Project notes

🔨 Build Process
├── build.py                                    # Simple build script
├── build_markdown.py                           # Markdown processor
├── parser.py                                   # Studio log parser
└── asset_processor.py                          # Asset compression & upload

📦 Generated Content (Committed to Repo)
├── content/posts/                              # Individual markdown files
│   ├── 2025-06-25-generative-point-guards.md
│   ├── 2025-06-23-6-23-2025.md
│   └── ...
├── content/tags.md                             # Tag metadata
└── content/build_info.md                      # Build information

🚀 Deployment
├── app.py                                      # Simple Flask app
├── templates/                                  # Jinja2 templates
├── static/                                     # CSS, fonts, etc.
└── vercel.json                                # Vercel config
```

## What makes this different

- **Markdown-first** — Write in Obsidian, deploy as clean markdown (no wrestling with frontmatter)
- **Asset processing** — Images/videos get compressed and uploaded to Vercel Blob automatically
- **Fast runtime** — Pre-processed content means no parsing overhead when people visit
- **HTMX powered** — Smooth navigation without the full page reload dance
- **Inter typography** — Clean, readable typography that doesn't get in the way
- **Tag filtering** — Organize and filter posts by tags (surprisingly useful)
- **Mobile responsive** — Works great on all devices (as it should)

## My workflow (and hopefully yours)

### 1. Write
Continue writing in your studio log files as normal in Obsidian. Nothing changes here — this is the whole point.

### 2. Build
When ready to publish:

```bash
python build.py
```

This will:
- Parse your studio log files
- Split them into individual markdown files
- Process and upload assets to Vercel Blob
- Update asset URLs in content
- Generate metadata files

### 3. Deploy
```bash
git add content/
git commit -m "Update posts"
git push
```

Vercel automatically deploys on push. Simple as that.

## Getting started locally

```bash
# Install dependencies
pip install -r requirements.txt

# Build content
python build.py

# Run locally
python app.py
```

Visit http://localhost:5002 and you should see your site running.

## Environment setup

Create a `.env` file:

```
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

You'll need this for asset uploads to work properly.

## File structure (if you're curious)

### Core Files
- `app.py` - Main Flask application
- `build.py` - Simple build script
- `build_markdown.py` - Markdown file generator
- `parser.py` - Studio log parser
- `asset_processor.py` - Asset compression & upload

### Templates
- `templates/base.html` - Base layout
- `templates/index.html` - Blog index
- `templates/post.html` - Individual post
- `templates/fragments/` - HTMX fragments

### Content (Generated)
- `content/posts/` - Individual markdown files
- `content/tags.md` - Tag metadata
- `content/build_info.md` - Build information

## Deployment notes

The site is configured for Vercel deployment (because it just works):

1. Connect your GitHub repo to Vercel
2. Set the `BLOB_READ_WRITE_TOKEN` environment variable
3. Deploy automatically on push

That's it. No complex CI/CD pipelines, no Docker containers, just push and deploy.

## Typography choices

Uses the Inter font family for clean, readable typography:
- Inter Regular (400)
- Inter Medium (500) 
- Inter Bold (700)
- Inter Variable for optimal loading

I spent way too much time trying different typefaces and honestly, Inter just works. It's readable, it's clean, and it doesn't distract from the content.

## Asset processing details

Images and videos are automatically:
- Compressed for optimal web delivery
- Converted to modern formats (WebP for images)
- Uploaded to Vercel Blob storage
- URLs updated in markdown content

The asset processor is probably the most complex part of this whole thing, but it handles caching properly so it only processes changed assets.

## Performance considerations

- **Fast builds** — Only processes changed assets (cached)
- **Fast runtime** — Pre-processed markdown, no parsing overhead
- **Small bundles** — Optimized assets and modern formats
- **Progressive enhancement** — Works without JavaScript, enhanced with HTMX

## Worth noting

This is built specifically for my workflow, but I think it could work for anyone who:
- Writes in Obsidian or similar markdown editors
- Wants a simple publishing workflow
- Doesn't need a complex CMS
- Values fast, clean web experiences

Let me know if you run into any issues or have questions about how something works. 