import os
import yaml
import markdown
from pathlib import Path
from datetime import datetime
from flask import Flask, render_template, request
from typing import List, Dict, Optional

app = Flask(__name__)

# Global data - loaded once at startup
posts_data = []
tags_data = {}
build_info = {}

def parse_markdown_file(file_path: Path) -> Dict:
    """Parse a markdown file with YAML frontmatter"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split frontmatter and content
    if content.startswith('---\n'):
        try:
            _, frontmatter_str, markdown_content = content.split('---\n', 2)
            frontmatter = yaml.safe_load(frontmatter_str)
        except ValueError:
            # No frontmatter found
            frontmatter = {}
            markdown_content = content
    else:
        frontmatter = {}
        markdown_content = content
    
    # Convert markdown to HTML
    md = markdown.Markdown(extensions=['extra', 'codehilite', 'toc'])
    html_content = md.convert(markdown_content)
    
    # Parse date if it's a string
    if 'date' in frontmatter and isinstance(frontmatter['date'], str):
        frontmatter['date_obj'] = datetime.fromisoformat(frontmatter['date'])
        frontmatter['date_formatted'] = frontmatter['date_obj'].strftime('%B %d, %Y')
    
    return {
        **frontmatter,
        'content': markdown_content,
        'html_content': html_content,
        'file_path': str(file_path)
    }

def load_content():
    """Load content from markdown files"""
    global posts_data, tags_data, build_info
    
    current_dir = Path(__file__).parent
    content_dir = current_dir / "content"
    posts_dir = content_dir / "posts"
    
    # Load posts
    posts_data = []
    if posts_dir.exists():
        for md_file in posts_dir.glob("*.md"):
            try:
                post = parse_markdown_file(md_file)
                posts_data.append(post)
            except Exception as e:
                print(f"⚠️  Error loading {md_file.name}: {e}")
        
        # Sort by date (newest first)
        posts_data.sort(key=lambda p: p.get('date_obj', datetime.min), reverse=True)
    
    # Load tags
    tags_file = content_dir / "tags.md"
    if tags_file.exists():
        try:
            tags_info = parse_markdown_file(tags_file)
            tags_data = {
                'tags': tags_info.get('tags', []),
                'tag_counts': tags_info.get('tag_counts', {}),
                'total_tags': tags_info.get('total_tags', 0)
            }
        except Exception as e:
            print(f"⚠️  Error loading tags: {e}")
            tags_data = {'tags': [], 'tag_counts': {}, 'total_tags': 0}
    
    # Load build info
    build_file = content_dir / "build_info.md"
    if build_file.exists():
        try:
            build_info = parse_markdown_file(build_file)
        except Exception as e:
            print(f"⚠️  Error loading build info: {e}")
            build_info = {}

def get_all_posts() -> List[Dict]:
    """Get all posts"""
    return posts_data

def get_all_tags():
    """Get unique tags from all posts"""
    return tags_data.get('tags', [])

def get_posts(tag_filter=None):
    """Get posts, optionally filtered by tag"""
    posts = get_all_posts()
    if tag_filter:
        return [p for p in posts if tag_filter in p.get('tags', [])]
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
    all_tags = get_all_tags()
    
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
    post = next((p for p in posts if p.get('slug') == slug), None)
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
    tag_counts = tags_data.get('tag_counts', {})
    
    return render_template('tags.html', tags=all_tags, tag_counts=tag_counts)

@app.route('/about')
def about_page():
    """About page - handles full page and HTMX fragment loads."""
    if request.headers.get('HX-Request'):
        return render_template('fragments/about_content.html')
    return render_template('about.html')

@app.route('/projects')
def projects_page():
    """Projects page - handles full page and HTMX fragment loads."""
    if request.headers.get('HX-Request'):
        return render_template('fragments/projects_content.html')
    return render_template('projects.html')

@app.route('/scratch-book')
def scratch_book_page():
    """Scratch Book page"""
    if request.headers.get('HX-Request'):
        return render_template('fragments/scratch_book_content.html')
    return render_template('scratch_book.html')

@app.route('/debug')
def debug_info():
    """Debug endpoint to show build info and content status"""
    current_dir = Path(__file__).parent
    content_dir = current_dir / "content"
    posts_dir = content_dir / "posts"
    
    output = ["<h2>🔍 Debug: Markdown Site Status</h2>"]
    
    # Build info
    if build_info:
        output.append("<h3>🏗️ Build Info:</h3>")
        output.append("<ul>")
        output.append(f"<li>Build time: {build_info.get('build_time', 'Unknown')}</li>")
        output.append(f"<li>Total posts: {build_info.get('total_posts', 0)}</li>")
        output.append(f"<li>Total tags: {build_info.get('total_tags', 0)}</li>")
        output.append(f"<li>Assets processed: {build_info.get('assets_processed', False)}</li>")
        output.append("</ul>")
        
        source_files = build_info.get('source_files', [])
        if source_files:
            output.append("<h4>Source files:</h4>")
            output.append("<ul>")
            for file in source_files:
                output.append(f"<li><code>{file}</code></li>")
            output.append("</ul>")
    else:
        output.append("<p><strong>No build info found!</strong> Run <code>python build_markdown.py</code> to build content.</p>")
    
    # Content status
    output.append("<h3>📁 Content Files:</h3>")
    output.append("<ul>")
    
    # Check for markdown files
    if posts_dir.exists():
        md_files = list(posts_dir.glob("*.md"))
        output.append(f"<li>✅ Posts directory: {len(md_files)} markdown files</li>")
        
        if md_files:
            output.append("<li>Recent files:</li>")
            output.append("<ul>")
            for md_file in sorted(md_files)[-5:]:  # Show last 5 files
                size = md_file.stat().st_size
                output.append(f"<li><code>{md_file.name}</code> ({size} bytes)</li>")
            output.append("</ul>")
    else:
        output.append("<li>❌ Posts directory missing</li>")
    
    for filename in ['tags.md', 'build_info.md']:
        file_path = content_dir / filename
        if file_path.exists():
            size = file_path.stat().st_size
            output.append(f"<li>✅ <code>{filename}</code> ({size} bytes)</li>")
        else:
            output.append(f"<li>❌ <code>{filename}</code> (missing)</li>")
    
    output.append("</ul>")
    
    # Posts status
    output.append("<h3>📝 Posts Status:</h3>")
    output.append(f"<p>Loaded posts: {len(posts_data)}</p>")
    
    if posts_data:
        output.append("<h4>Recent posts:</h4>")
        output.append("<ul>")
        for post in posts_data[:5]:
            title = post.get('title', 'Untitled')
            date = post.get('date', 'No date')
            tags = post.get('tags', [])
            output.append(f"<li><strong>{title}</strong> ({date}) - {len(tags)} tags</li>")
        output.append("</ul>")
    
    output.append("<p><a href='/'>← Back to site</a></p>")
    
    return "<br/>".join(output)

# Load content at startup
load_content()

if __name__ == '__main__':
    print("🚀 Starting Markdown-based HTMX Studio Site")
    print(f"📊 Loaded {len(posts_data)} posts and {len(tags_data.get('tags', []))} tags")
    print()
    print("🌐 URLs:")
    print("   http://localhost:5002/                   - Homepage")
    print("   http://localhost:5002/blog               - Blog index")
    print("   http://localhost:5002/debug              - Debug info")
    print()
    app.run(debug=True, port=5002) 