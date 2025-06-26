import os
from pathlib import Path
from flask import Flask, render_template, request
from cache_manager import PostCacheManager
from typing import List

app = Flask(__name__)

# Fix path handling for Vercel serverless environment
# Get the directory containing this script
current_dir = os.path.dirname(os.path.abspath(__file__))

# In Vercel serverless environment, we need to find the deployment root
# In local development, look in parent directory
if os.environ.get('VERCEL') or os.environ.get('AWS_LAMBDA_FUNCTION_NAME'):
    # In Vercel, find the deployment root by looking for the journals directory
    # Start from current directory and walk up until we find it
    search_dir = current_dir
    for _ in range(5):  # Safety limit
        journals_path = os.path.join(search_dir, "journals")
        if os.path.exists(journals_path):
            vault_path = search_dir
            break
        search_dir = os.path.dirname(search_dir)
    else:
        # Fallback if not found
        vault_path = os.path.dirname(current_dir)
else:
    vault_path = os.path.join(current_dir, "..")  # Local development

# Initialize cache manager with proper paths
cache_manager = PostCacheManager(vault_path, ".cache")

def get_all_posts() -> List:
    """Get all cached posts"""
    return cache_manager.get_cached_posts()

def get_all_tags():
    """Get unique tags from all posts"""
    posts = get_all_posts()
    tags = set()
    for post in posts:
        tags.update(post.tags)
    return sorted(list(tags))

def get_posts(tag_filter=None):
    """Get posts, optionally filtered by tag"""
    posts = get_all_posts()
    if tag_filter:
        return [p for p in posts if tag_filter in p.tags]
    return posts

@app.route('/')
def homepage():
    """Homepage - handles full page and HTMX fragment loads."""
    if request.headers.get('HX-Request'):
        return render_template('fragments/homepage_content.html')
    return render_template('homepage.html')

@app.route('/blog')
def blog_index():
    """Blog index page - handles full page and HTMX fragment loads."""
    posts = get_posts()
    all_tags = get_all_tags()
    
    if request.headers.get('HX-Request'):
        # For HTMX requests, return just the list of posts fragment
        return render_template('fragments/posts_list.html', posts=posts, all_tags=all_tags)
    
    # For regular browser requests, return the full page
    return render_template('index.html', posts=posts, all_tags=all_tags)

@app.route('/posts')
def posts_fragment():
    """HTMX endpoint - returns just the posts list fragment"""
    tag_filter = request.args.get('tag')
    posts = get_posts(tag_filter)
    all_tags = get_all_tags()  # Always include all_tags for filtering
    
    # Check if this is an HTMX request
    is_htmx = request.headers.get('HX-Request')
    
    if is_htmx:
        # Return just the posts fragment for HTMX
        return render_template('fragments/posts_list.html', 
                             posts=posts, 
                             all_tags=all_tags,
                             active_tag=tag_filter)
    else:
        # Full page for direct access (SEO, bookmarks)
        return render_template('index.html', 
                             posts=posts, 
                             all_tags=all_tags,
                             active_tag=tag_filter)

@app.route('/posts/<slug>')
def post_detail(slug):
    """Individual post page"""
    posts = get_all_posts()
    post = next((p for p in posts if p.slug == slug), None)
    if not post:
        return "Post not found", 404
    
    is_htmx = request.headers.get('HX-Request')
    
    if is_htmx:
        return render_template('fragments/post_detail.html', post=post)
    else:
        return render_template('post.html', post=post)

@app.route('/tags')
def tags_index():
    """Tags overview page"""
    all_tags = get_all_tags()
    tag_counts = {}
    for tag in all_tags:
        tag_counts[tag] = len(get_posts(tag))
    
    return render_template('tags.html', tags=all_tags, tag_counts=tag_counts)

@app.route('/about')
def about_page():
    """Stub page for About - handles full page and HTMX fragment loads."""
    if request.headers.get('HX-Request'):
        return render_template('fragments/about_content.html')
    return render_template('about.html')

@app.route('/projects')
def projects_page():
    """Stub page for Projects - handles full page and HTMX fragment loads."""
    if request.headers.get('HX-Request'):
        return render_template('fragments/projects_content.html')
    return render_template('projects.html')

@app.route('/scratch-book')
def scratch_book_page():
    """Stub page for Scratch Book"""
    if request.headers.get('HX-Request'):
        return render_template('fragments/scratch_book_content.html')
    return render_template('scratch_book.html')

# Cache management endpoints
@app.route('/cache/rebuild')
def rebuild_cache():
    """Rebuild cache for changed files"""
    cache_manager.rebuild_cache()
    stats = cache_manager.get_cache_stats()
    return f"""
    <h2>✅ Cache Rebuilt!</h2>
    <p>Processed posts from changed files.</p>
    <ul>
        <li>Cached posts: {stats['cached_posts']}</li>
        <li>Cache size: {stats['total_size_mb']} MB</li>
        <li>Location: {stats['cache_location']}</li>
    </ul>
    <p><a href="/">← Back to blog</a></p>
    """

@app.route('/cache/rebuild-force')
def rebuild_cache_force():
    """Force rebuild all cache"""
    cache_manager.rebuild_cache(force_all=True)
    stats = cache_manager.get_cache_stats()
    return f"""
    <h2>✅ Cache Force Rebuilt!</h2>
    <p>Processed all posts from scratch.</p>
    <ul>
        <li>Cached posts: {stats['cached_posts']}</li>
        <li>Cache size: {stats['total_size_mb']} MB</li>
        <li>Location: {stats['cache_location']}</li>
    </ul>
    <p><a href="/">← Back to blog</a></p>
    """

@app.route('/cache/clear')
def clear_cache():
    """Clear all cache"""
    cache_manager.clear_cache()
    return """
    <h2>🧹 Cache Cleared!</h2>
    <p>All cached posts have been removed.</p>
    <p><strong>Note:</strong> You'll need to rebuild the cache to see posts again.</p>
    <p><a href="/cache/rebuild">Rebuild Cache</a> | <a href="/">Back to blog</a></p>
    """

@app.route('/cache/stats')
def cache_stats():
    """Show cache statistics"""
    stats = cache_manager.get_cache_stats()
    return f"""
    <h2>📊 Cache Statistics</h2>
    <ul>
        <li><strong>Cached files:</strong> {stats['cached_files']}</li>
        <li><strong>Cached posts:</strong> {stats['cached_posts']}</li>
        <li><strong>Total size:</strong> {stats['total_size_mb']} MB</li>
        <li><strong>Location:</strong> {stats['cache_location']}</li>
        <li><strong>Last updated:</strong> {stats.get('last_updated', 'Never')}</li>
    </ul>
    
    <h3>Cache Actions:</h3>
    <ul>
        <li><a href="/cache/rebuild">Rebuild Changed Files</a></li>
        <li><a href="/cache/rebuild-force">Force Rebuild All</a></li>
        <li><a href="/cache/clear">Clear Cache</a></li>
    </ul>
    
    <p><a href="/">← Back to blog</a></p>
    """

@app.route('/debug')
def debug_files():
    """Debug endpoint to show what files are being found"""
    from parser import StudioLogParser
    from pathlib import Path
    
    parser = StudioLogParser(Path(vault_path), Path("content"))
    files = parser.find_studio_log_files()
    
    cache_stats = cache_manager.get_cache_stats()
    
    output = ["<h2>Debug: Studio Log Files & Cache</h2>"]
    output.append(f"<p>Looking in: <code>{Path(vault_path).resolve()}</code></p>")
    
    output.append("<h3>📁 Source Files Found:</h3>")
    output.append(f"<p>Found {len(files)} files:</p>")
    output.append("<ul>")
    for file_path in files:
        relative_path = file_path.relative_to(Path(vault_path))
        output.append(f"<li><code>{relative_path}</code></li>")
    output.append("</ul>")
    
    output.append("<h3>💾 Cache Status:</h3>")
    output.append(f"<ul>")
    output.append(f"<li>Cached posts: {cache_stats['cached_posts']}</li>")
    output.append(f"<li>Cache size: {cache_stats['total_size_mb']} MB</li>")
    output.append(f"<li>Last updated: {cache_stats.get('last_updated', 'Never')}</li>")
    output.append(f"</ul>")
    
    if not files:
        output.append("<p><strong>No files found!</strong> Make sure you have studio log files in:</p>")
        output.append("<ul>")
        output.append("<li><code>journals/studio log/*.md</code></li>")
        output.append("<li>Or files with 'studio log' in the filename</li>")
        output.append("</ul>")
    
    if cache_stats['cached_posts'] == 0:
        output.append("<p><strong>No cached posts!</strong> <a href='/cache/rebuild'>Rebuild cache</a> to process posts.</p>")
    
    output.append("<p><a href='/cache/stats'>View Cache Stats</a> | <a href='/'>Back to blog</a></p>")
    
    return "<br/>".join(output)

@app.route('/markdown-test')
def markdown_test():
    """Test endpoint to show markdown processing capabilities"""
    test_markdown = """
# Markdown Processing Test

This shows how **markdown** and *HTML* mix together.

## Lists and Code

Here's a list:
- Item one with `inline code`
- Item two with [a link](https://example.com)
- Item three with **bold text**

## Code Blocks

```python
def hello_world():
    print("Hello from markdown!")
    return "success"
```

## Mixed HTML

<div style="padding: 1rem; background: #f0f0f0; border-radius: 4px;">
This is **markdown inside HTML** - the `md_in_html` extension handles this!
</div>

## Tables

| Feature | Supported |
|---------|-----------|
| **Bold** | ✅ |
| *Italic* | ✅ |
| `Code` | ✅ |
| Tables | ✅ |

## Images and Media

![Example](https://via.placeholder.com/400x200?text=Test+Image)

<video controls width="400">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Blockquotes

> This is a blockquote with **formatting** and `code`.
> It supports multiple lines too.

---

Pretty neat, right? 🎉
"""
    
    # Process the test markdown
    from parser import StudioLogParser
    from pathlib import Path
    
    parser = StudioLogParser(Path(vault_path), Path("content"))
    html_content, excerpt = parser.process_markdown_content(test_markdown)
    
    return f"""
    <html>
    <head>
        <title>Markdown Test</title>
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css" />
        <style>
        /* Basic styling for markdown test */
        .content h1, .content h2, .content h3 { margin-top: 1.5rem; margin-bottom: 1rem; }
        .content p { margin-bottom: 1rem; }
        .content code { background: #f4f4f4; padding: 0.125rem 0.25rem; border-radius: 3px; }
        .content pre { background: #f8f8f8; padding: 1rem; border-radius: 4px; overflow-x: auto; }
        </style>
    </head>
    <body class="sans-serif bg-light-gray pa4">
        <div class="mw7 center">
            <div class="mb4 pa3 bg-white br2">
                <h1>Markdown Processing Test</h1>
                <p><a href="/">&larr; Back to demo</a></p>
            </div>
            
            <div class="mb4 pa3 bg-white br2">
                <h2>Raw Markdown Input:</h2>
                <pre><code>{test_markdown}</code></pre>
            </div>
            
            <div class="pa4 bg-white br2">
                <h2>Processed HTML Output:</h2>
                <div class="content">
                    {html_content}
                </div>
            </div>
            
            <div class="mt4 pa3 bg-white br2">
                <h2>Generated Excerpt:</h2>
                <p><em>{excerpt}</em></p>
            </div>
        </div>
    </body>
    </html>
    """

if __name__ == '__main__':
    print("🚀 Starting HTMX Studio Log Demo with Caching")
    print("📁 Will look for studio log files in ../")
    print()
    print("🌐 Main URLs:")
    print("   http://localhost:5002/                   - Blog homepage")
    print("   http://localhost:5002/markdown-test      - Markdown processing demo")
    print("   http://localhost:5002/debug              - File discovery & cache status")
    print()
    print("💾 Cache Management:")
    print("   http://localhost:5002/cache/stats        - Cache statistics")
    print("   http://localhost:5002/cache/rebuild      - Rebuild changed files")
    print("   http://localhost:5002/cache/rebuild-force - Force rebuild all")
    print("   http://localhost:5002/cache/clear        - Clear all cache")
    print()
    app.run(debug=True, port=5002) 