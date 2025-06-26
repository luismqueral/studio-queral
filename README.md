# Studio Queral Site

A clean, fast HTMX-powered studio log site that transforms your Obsidian notes into a beautiful web experience.

## Architecture

**Simple & Fast**: Individual markdown files with YAML frontmatter, processed assets, and a lightweight Flask app.

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

## Features

- ✅ **Markdown-first**: Write in Obsidian, deploy as clean markdown
- ✅ **Asset processing**: Images/videos compressed and uploaded to Vercel Blob
- ✅ **Fast runtime**: Pre-processed content, no parsing overhead
- ✅ **HTMX powered**: Smooth navigation without full page reloads
- ✅ **Inter typography**: Beautiful, readable typography system
- ✅ **Tag filtering**: Organize and filter posts by tags
- ✅ **Mobile responsive**: Works great on all devices

## Workflow

### 1. Write
Continue writing in your studio log files as normal in Obsidian.

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

Vercel automatically deploys on push.

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Build content
python build.py

# Run locally
python app.py
```

Visit http://localhost:5002

## Environment Variables

Create a `.env` file:

```
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

## File Structure

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

## Deployment

The site is configured for Vercel deployment:

1. Connect your GitHub repo to Vercel
2. Set the `BLOB_READ_WRITE_TOKEN` environment variable
3. Deploy automatically on push

## Typography

Uses the Inter font family for clean, readable typography:
- Inter Regular (400)
- Inter Medium (500) 
- Inter Bold (700)
- Inter Variable for optimal loading

## Asset Processing

Images and videos are automatically:
- Compressed for optimal web delivery
- Converted to modern formats (WebP for images)
- Uploaded to Vercel Blob storage
- URLs updated in markdown content

## Performance

- **Fast builds**: Only processes changed assets (cached)
- **Fast runtime**: Pre-processed markdown, no parsing overhead
- **Small bundles**: Optimized assets and modern formats
- **Progressive enhancement**: Works without JavaScript, enhanced with HTMX 