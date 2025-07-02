"""
Simple parser replicating the user's existing studio log parser
Adapted for the HTMX Flask demo
"""

import re
import os
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional, Tuple, Set
from dataclasses import dataclass, field
import markdown

# Date formats from the original parser
DATE_FORMATS = [
    '%m-%d-%Y',
    '%m/%d/%Y', 
    '%Y-%m-%d',
    '%B %d, %Y',
    '%b %d, %Y'
]

@dataclass
class Post:
    """Represents a single post (studio log or scratch book)"""
    title: str
    slug: str
    date: datetime
    content: str
    html_content: str
    excerpt: str
    source_file: Path
    content_type: str = "log"  # "log" or "scratch-book"
    has_title: bool = False
    tags: List[str] = field(default_factory=list)
    
    @property
    def url_path(self) -> str:
        """Generate URL path for this post based on content type"""
        if self.content_type == "scratch-book":
            return f"scratch-book/{self.slug}/"
        return f"log/{self.slug}/"

class ContentParser:
    """Parser for both studio logs and scratch books"""
    
    def __init__(self, vault_path: Path, content_dir: Path):
        self.vault_path = Path(vault_path)
        self.content_dir = Path(content_dir)
        self.referenced_assets: Set[str] = set()
        
        # Initialize markdown processor with extensions for mixed HTML/markdown
        self.markdown_processor = markdown.Markdown(
            extensions=[
                'markdown.extensions.extra',      # Includes tables, fenced_code, etc.
                'markdown.extensions.codehilite', # Syntax highlighting
                'markdown.extensions.toc',        # Table of contents
                'markdown.extensions.attr_list',  # Attribute lists {: .class}
                'markdown.extensions.def_list',   # Definition lists
                'markdown.extensions.footnotes',  # Footnotes
                'markdown.extensions.md_in_html', # Markdown inside HTML blocks
            ],
            extension_configs={
                'markdown.extensions.codehilite': {
                    'css_class': 'highlight',
                    'use_pygments': False,  # Use CSS classes instead
                },
                'markdown.extensions.toc': {
                    'permalink': True,
                },
            }
        )
        
    def process_markdown_content(self, content: str) -> Tuple[str, str]:
        """
        Process markdown content and return (html_content, excerpt)
        Handles mixed markdown and HTML content
        """
        # Convert markdown to HTML
        html_content = self.markdown_processor.reset().convert(content)
        
        # Create excerpt from HTML (strip HTML tags for plain text excerpt)
        import re
        # Remove HTML tags for excerpt
        excerpt_text = re.sub(r'<[^>]+>', '', html_content)
        # Remove extra whitespace
        excerpt_text = re.sub(r'\s+', ' ', excerpt_text).strip()
        
        # Take first 200 chars or first paragraph
        if len(excerpt_text) > 200:
            excerpt = excerpt_text[:200] + "..."
        else:
            excerpt = excerpt_text
            
        return html_content, excerpt
        
    def find_asset_references(self, content: str) -> Set[str]:
        """Find all asset references in markdown content"""
        assets = set()
        
        # Find markdown image references: ![alt](path)
        img_pattern = r'!\[.*?\]\(([^)]+)\)'
        for match in re.finditer(img_pattern, content):
            asset_path = match.group(1)
            if not asset_path.startswith(('http://', 'https://')):
                assets.add(asset_path)
        
        # Find HTML img tags: <img src="path">
        html_img_pattern = r'<img[^>]+src=["\']([^"\']+)["\']'
        for match in re.finditer(html_img_pattern, content):
            asset_path = match.group(1)
            if not asset_path.startswith(('http://', 'https://')):
                assets.add(asset_path)
        
        # Find video references: <video src="path">
        video_pattern = r'<video[^>]+src=["\']([^"\']+)["\']'
        for match in re.finditer(video_pattern, content):
            asset_path = match.group(1)
            if not asset_path.startswith(('http://', 'https://')):
                assets.add(asset_path)
        
        # Find audio references: <audio src="path">
        audio_pattern = r'<audio[^>]+src=["\']([^"\']+)["\']'
        for match in re.finditer(audio_pattern, content):
            asset_path = match.group(1)
            if not asset_path.startswith(('http://', 'https://')):
                assets.add(asset_path)
        
        return assets
    
    def extract_hashtags(self, content: str) -> List[str]:
        """Extract hashtags (#tag) from content"""
        hashtag_pattern = r'(?<!^#\s)(?<!\s#\s)#([a-zA-Z][a-zA-Z0-9_-]*)'
        
        hashtags = []
        lines = content.split('\n')
        
        for line in lines:
            # Skip lines that are markdown headers (start with # followed by space)
            if line.strip().startswith('# '):
                continue
                
            # Find hashtags in this line
            for match in re.finditer(hashtag_pattern, line):
                tag = match.group(1).lower()
                if tag not in hashtags:  # Avoid duplicates
                    hashtags.append(tag)
        
        return hashtags
    
    def remove_hashtags_from_content(self, content: str) -> str:
        """Remove hashtags from content after they've been extracted"""
        hashtag_pattern = r'(?<!^#\s)(?<!\s#\s)#[a-zA-Z][a-zA-Z0-9_-]*'
        
        lines = content.split('\n')
        cleaned_lines = []
        
        for line in lines:
            # Skip cleaning lines that are markdown headers
            if line.strip().startswith('# '):
                cleaned_lines.append(line)
                continue
            
            # Remove hashtags from this line
            cleaned_line = re.sub(hashtag_pattern, '', line)
            
            # Clean up any extra whitespace left behind
            cleaned_line = re.sub(r'\s+', ' ', cleaned_line).strip()
            
            # Only add non-empty lines or lines that had other content
            if cleaned_line or line.strip() == '':
                cleaned_lines.append(cleaned_line)
        
        return '\n'.join(cleaned_lines)
    
    def is_placeholder_date(self, date_string: str) -> bool:
        """Check if a date string is a placeholder like x-xx-xxxx"""
        # Remove any title part after —
        date_part = date_string.split(' — ')[0].strip()
        
        # Check for placeholder patterns
        placeholder_patterns = [
            r'^x-x+-\d{4}$',  # x-xx-2025
            r'^x{1,2}-x{1,2}-x{4}$',  # x-x-xxxx, xx-xx-xxxx
            r'^name of project$',  # literal "name of project"
            r'^placeholder',  # anything starting with "placeholder"
            r'^draft',  # anything starting with "draft"
            r'^template',  # anything starting with "template"
        ]
        
        for pattern in placeholder_patterns:
            if re.match(pattern, date_part, re.IGNORECASE):
                return True
        
        return False

    def parse_title_and_date(self, raw_title: str) -> Tuple[Optional[datetime], Optional[str]]:
        """Parse title and extract date"""
        # Split on em dash if present
        parts = raw_title.split(' — ', 1)
        date_part = parts[0].strip()
        title_part = parts[1].strip() if len(parts) > 1 else None
        
        # Try to parse the date
        date_obj = None
        for date_format in DATE_FORMATS:
            try:
                date_obj = datetime.strptime(date_part, date_format)
                break
            except ValueError:
                continue
        
        return date_obj, title_part
    
    def generate_slug(self, title: str, date: datetime) -> str:
        """Generate URL slug from title and date"""
        if title:
            # Clean title for URL
            slug = re.sub(r'[^\w\s-]', '', title.lower())
            slug = re.sub(r'[-\s]+', '-', slug)
            slug = slug.strip('-')
            if slug:
                return slug
        
        # Fallback to date if no clean title
        return f"{date.month}-{date.day}-{date.year}"
    
    def parse_section(self, section: str, source_file: Path, content_type: str = "log") -> Optional[Post]:
        """Parse a single section into a Post"""
        lines = section.split('\n')
        if not lines:
            return None
        
        # First line should be the H1 header
        header_line = lines[0].strip()
        if not header_line.startswith('# '):
            return None
        
        # Extract title from header (remove the '# ')
        raw_title = header_line[2:].strip()
        
        # Skip placeholder dates
        if self.is_placeholder_date(raw_title):
            print(f"⏭️  Skipping placeholder date: '{raw_title}' in {source_file}")
            return None
        
        # Parse date and title
        date_obj, clean_title = self.parse_title_and_date(raw_title)
        if not date_obj:
            print(f"⚠️  Warning: Could not parse date from '{raw_title}' in {source_file}")
            return None
        
        # Determine display title and whether it has a real title
        has_title = clean_title is not None
        display_title = clean_title if has_title else raw_title
        slug_title = clean_title if clean_title else raw_title
        
        # Generate slug
        slug = self.generate_slug(slug_title, date_obj)
        
        # Get content (everything after the header)
        content_lines = lines[1:]
        content = '\n'.join(content_lines).strip()
        
        # Extract hashtags from content
        tags = self.extract_hashtags(content)
        
        # Remove hashtags from content after extraction
        cleaned_content = self.remove_hashtags_from_content(content)
        
        # Process markdown content to HTML
        html_content, excerpt = self.process_markdown_content(cleaned_content)
        
        return Post(
            title=display_title,
            slug=slug,
            date=date_obj,
            content=cleaned_content,      # Keep original markdown for editing
            html_content=html_content,    # Processed HTML for display
            excerpt=excerpt,              # Plain text excerpt
            source_file=source_file,
            content_type=content_type,
            has_title=has_title,
            tags=tags
        )
    
    def parse_file(self, file_path: Path, content_type: str = "log") -> List[Post]:
        """Parse a file into individual posts"""
        if not file_path.exists():
            return []
        
        try:
            content = file_path.read_text(encoding='utf-8')
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return []
        
        posts = []
        
        # Find all asset references in this content
        assets = self.find_asset_references(content)
        self.referenced_assets.update(assets)
        
        # Split by H1 headers (# at start of line)
        sections = re.split(r'\n(?=# )', content)
        
        # Skip the first section if it doesn't start with #
        if sections and not sections[0].strip().startswith('#'):
            sections = sections[1:]
        
        for section in sections:
            section = section.strip()
            if not section:
                continue
            
            post = self.parse_section(section, file_path, content_type)
            if post and 'draft' not in post.tags:  # Skip draft posts
                posts.append(post)
        
        # Sort posts by date (newest first)
        posts.sort(key=lambda p: p.date, reverse=True)
        return posts
    
    def find_studio_log_files(self) -> List[Path]:
        """Find studio log files ONLY in journals/studio log/ directory for privacy"""
        studio_log_files = []
        
        # Only look in journals/studio log/ directory (privacy-focused)
        studio_log_dir = self.vault_path / "journals" / "studio log"
        if studio_log_dir.exists():
            for md_file in studio_log_dir.glob("*.md"):
                studio_log_files.append(md_file)
                print(f"📁 Found studio log: {md_file.relative_to(self.vault_path)}")
        else:
            print(f"⚠️  Studio log directory not found: {studio_log_dir}")
            print("   Make sure your studio logs are in journals/studio log/")
        
        # NOTE: Intentionally NOT scanning entire vault for privacy
        # Only files in journals/studio log/ will be published
        
        return studio_log_files
    
    def find_scratch_book_files(self) -> List[Path]:
        """Find scratch book files in journals/studio log/ directory"""
        scratch_book_files = []
        
        # Look for files with "scratch book" in the name
        studio_log_dir = self.vault_path / "journals" / "studio log"
        if studio_log_dir.exists():
            for md_file in studio_log_dir.glob("*scratch book*.md"):
                scratch_book_files.append(md_file)
                print(f"📓 Found scratch book: {md_file.relative_to(self.vault_path)}")
        else:
            print(f"⚠️  Studio log directory not found: {studio_log_dir}")
        
        return scratch_book_files
    
    def parse_studio_logs(self) -> List[Post]:
        """Parse studio log files and return posts"""
        print("🚀 Starting Studio Log Parser")
        
        studio_log_files = self.find_studio_log_files()
        
        if not studio_log_files:
            print("❌ No studio log files found!")
            return []
        
        print(f"📁 Found {len(studio_log_files)} studio log files")
        
        all_posts = []
        
        for file_path in studio_log_files:
            # Skip scratch book files
            if "scratch book" in file_path.name.lower():
                continue
                
            print(f"📝 Parsing studio log: {file_path.name}")
            try:
                posts = self.parse_file(file_path, "log")
                all_posts.extend(posts)
                print(f"  ✅ Found {len(posts)} posts")
            except Exception as e:
                print(f"  ❌ Error parsing {file_path}: {e}")
        
        print(f"📊 Total studio log posts parsed: {len(all_posts)}")
        return all_posts
    
    def parse_scratch_books(self) -> List[Post]:
        """Parse scratch book files and return posts"""
        print("📓 Starting Scratch Book Parser")
        
        scratch_book_files = self.find_scratch_book_files()
        
        if not scratch_book_files:
            print("❌ No scratch book files found!")
            return []
        
        print(f"📁 Found {len(scratch_book_files)} scratch book files")
        
        all_posts = []
        
        for file_path in scratch_book_files:
            print(f"📝 Parsing scratch book: {file_path.name}")
            try:
                posts = self.parse_file(file_path, "scratch-book")
                all_posts.extend(posts)
                print(f"  ✅ Found {len(posts)} posts")
            except Exception as e:
                print(f"  ❌ Error parsing {file_path}: {e}")
        
        print(f"📊 Total scratch book posts parsed: {len(all_posts)}")
        return all_posts
    
    def parse_all_files(self) -> List[Post]:
        """Parse all files (studio logs only) - legacy method for compatibility"""
        return self.parse_studio_logs()

def get_posts_from_vault(vault_path="../") -> List[Post]:
    """Main function to get studio log posts from the vault"""
    parser = ContentParser(Path(vault_path), Path("content"))
    return parser.parse_studio_logs()

def get_scratch_books_from_vault(vault_path="../") -> List[Post]:
    """Main function to get scratch book posts from the vault"""
    parser = ContentParser(Path(vault_path), Path("content"))
    return parser.parse_scratch_books()

def get_all_content_from_vault(vault_path="../") -> tuple[List[Post], List[Post]]:
    """Get both studio logs and scratch books from the vault"""
    parser = ContentParser(Path(vault_path), Path("content"))
    studio_logs = parser.parse_studio_logs()
    scratch_books = parser.parse_scratch_books()
    return studio_logs, scratch_books

if __name__ == "__main__":
    # Test the parser
    studio_logs, scratch_books = get_all_content_from_vault()
    print(f"Found {len(studio_logs)} studio log posts:")
    for post in studio_logs[:3]:  # Show first 3
        print(f"  - {post.title} ({post.date.strftime('%Y-%m-%d')}) [{', '.join(post.tags)}]")
    print(f"Found {len(scratch_books)} scratch book posts:")
    for post in scratch_books[:3]:  # Show first 3
        print(f"  - {post.title} ({post.date.strftime('%Y-%m-%d')}) [{', '.join(post.tags)}]") 