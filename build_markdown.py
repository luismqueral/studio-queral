#!/usr/bin/env python3
"""
Markdown Build Script for Studio Site

This script:
1. Parses your studio log markdown files
2. Splits them into individual markdown files with frontmatter
3. Processes and uploads assets to Vercel Blob
4. Generates clean markdown files ready for deployment
"""

import os
import yaml
from pathlib import Path
from datetime import datetime
from parser import StudioLogParser
from asset_processor import AssetProcessor

def build_markdown_site():
    """Build the site content as individual markdown files"""
    
    print("🚀 Building studio site with markdown files...")
    print()
    
    # Paths
    current_dir = Path(__file__).parent
    vault_path = current_dir.parent  # "NYT Design Log" directory
    content_dir = current_dir / "content"
    posts_dir = content_dir / "posts"
    
    # Create directories
    content_dir.mkdir(exist_ok=True)
    posts_dir.mkdir(exist_ok=True)
    
    print(f"📁 Source: {vault_path}")
    print(f"📦 Output: {posts_dir}")
    print()
    
    # Initialize parser
    parser = StudioLogParser(vault_path, content_dir)
    
    # Parse all posts
    print("📝 Parsing posts...")
    posts = parser.parse_all_files()
    
    if not posts:
        print("❌ No posts found!")
        return False
    
    print(f"✅ Found {len(posts)} posts")
    print()
    
    # Process assets if blob token is available
    asset_processor = None
    blob_token = os.getenv('BLOB_READ_WRITE_TOKEN')
    
    if blob_token:
        print("🔄 Processing assets...")
        asset_processor = AssetProcessor(blob_token)
        
        # Collect all referenced assets from all posts
        all_referenced_assets = set()
        for post in posts:
            assets = parser.find_asset_references(post.content)
            all_referenced_assets.update(assets)
        
        # Process all assets and get URL mapping
        asset_url_mapping = asset_processor.process_referenced_assets(all_referenced_assets, vault_path)
        
        # Update all post content with new URLs
        for post in posts:
            post.content = asset_processor.update_content_urls(post.content, asset_url_mapping)
            post.html_content = asset_processor.update_content_urls(post.html_content, asset_url_mapping)
        
        asset_processor.cleanup()
        print("✅ Assets processed")
    else:
        print("⚠️  No BLOB_READ_WRITE_TOKEN - skipping asset upload")
    
    print()
    
    # Clear existing posts
    for existing_file in posts_dir.glob("*.md"):
        existing_file.unlink()
        print(f"🗑️  Removed old file: {existing_file.name}")
    
    # Generate individual markdown files
    print("📝 Generating individual markdown files...")
    
    for post in posts:
        # Create filename from date and slug
        date_str = post.date.strftime('%Y-%m-%d')
        filename = f"{date_str}-{post.slug}.md"
        file_path = posts_dir / filename
        
        # Prepare frontmatter
        frontmatter = {
            'title': post.title,
            'date': post.date.isoformat(),
            'slug': post.slug,
            'tags': post.tags,
            'excerpt': post.excerpt,
            'has_title': post.has_title,
            'url_path': post.url_path
        }
        
        # Write markdown file with frontmatter
        with open(file_path, 'w', encoding='utf-8') as f:
            # Write YAML frontmatter
            f.write('---\n')
            yaml.dump(frontmatter, f, default_flow_style=False, allow_unicode=True)
            f.write('---\n\n')
            
            # Write content (use original markdown, not HTML)
            f.write(post.content)
        
        print(f"📄 Created: {filename}")
    
    print()
    
    # Generate tags summary
    all_tags = set()
    for post in posts:
        all_tags.update(post.tags)
    
    tags_info = {
        'total_tags': len(all_tags),
        'tags': sorted(list(all_tags)),
        'tag_counts': {tag: len([p for p in posts if tag in p.tags]) for tag in all_tags}
    }
    
    # Write tags as markdown file
    tags_file = content_dir / "tags.md"
    with open(tags_file, 'w', encoding='utf-8') as f:
        f.write('---\n')
        yaml.dump(tags_info, f, default_flow_style=False, allow_unicode=True)
        f.write('---\n\n')
        f.write('# Tags\n\n')
        f.write('This file contains tag metadata for the site.\n')
    
    print(f"🏷️  Created tags.md with {len(all_tags)} tags")
    
    # Generate build info
    build_info = {
        'build_time': datetime.now().isoformat(),
        'total_posts': len(posts),
        'total_tags': len(all_tags),
        'assets_processed': asset_processor is not None,
        'source_files': [str(f.relative_to(vault_path)) for f in parser.find_studio_log_files()]
    }
    
    build_file = content_dir / "build_info.md"
    with open(build_file, 'w', encoding='utf-8') as f:
        f.write('---\n')
        yaml.dump(build_info, f, default_flow_style=False, allow_unicode=True)
        f.write('---\n\n')
        f.write('# Build Information\n\n')
        f.write('This file contains build metadata for the site.\n')
    
    print(f"ℹ️  Created build_info.md")
    print()
    
    print("🎉 Build complete!")
    print()
    print("📋 Summary:")
    print(f"   - Posts: {len(posts)} markdown files")
    print(f"   - Tags: {len(all_tags)}")
    print(f"   - Assets: {'Processed' if asset_processor else 'Skipped'}")
    print(f"   - Output: {posts_dir}")
    print()
    print("📁 Generated files:")
    for md_file in sorted(posts_dir.glob("*.md")):
        print(f"   - {md_file.name}")
    print()
    print("🚀 Ready for deployment:")
    print("   1. git add content/")
    print("   2. git commit -m 'Update markdown content'")
    print("   3. git push")
    
    return True

if __name__ == "__main__":
    import sys
    success = build_markdown_site()
    sys.exit(0 if success else 1) 