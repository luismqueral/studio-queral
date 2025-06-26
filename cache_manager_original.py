"""
Post Cache Manager
Handles caching of processed posts with rebuild and selective update capabilities
"""

import os
import json
import hashlib
import shutil
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Set
from dataclasses import dataclass, asdict

from parser import Post, StudioLogParser
from asset_processor import AssetProcessor

@dataclass
class CacheEntry:
    """Represents a cached post with metadata"""
    post_data: Dict  # Serialized Post object
    source_hash: str  # Hash of source file
    processed_at: str  # When it was processed
    assets_processed: List[str]  # List of processed assets

class PostCacheManager:
    """Manages caching of processed posts with smart invalidation"""
    
    def __init__(self, vault_path: str = "../", cache_dir: str = ".cache"):
        self.vault_path = Path(vault_path)
        
        # Use /tmp/ directory in serverless environments (like Vercel)
        # where the file system is read-only except for /tmp/
        if os.environ.get('VERCEL') or os.environ.get('AWS_LAMBDA_FUNCTION_NAME'):
            self.cache_dir = Path("/tmp") / "cache"
        else:
            self.cache_dir = Path(cache_dir)
            
        # Create cache directory if it doesn't exist (and we have write permissions)
        try:
            self.cache_dir.mkdir(exist_ok=True)
        except OSError as e:
            print(f"⚠️  Cannot create cache directory {self.cache_dir}: {e}")
            print("   Running without persistent cache...")
            # Fall back to in-memory only mode
            self.cache_dir = None
        
        # Handle cache setup when cache directory is available
        if self.cache_dir:
            self.cache_index_file = self.cache_dir / "index.json"
            self.posts_cache_dir = self.cache_dir / "posts"
            self.posts_cache_dir.mkdir(exist_ok=True)
        else:
            self.cache_index_file = None
            self.posts_cache_dir = None
        
        self.parser = StudioLogParser(self.vault_path, Path("content"))
        self.asset_processor = AssetProcessor()
        
    def get_file_hash(self, file_path: Path) -> str:
        """Get hash of file content for change detection"""
        try:
            content = file_path.read_text(encoding='utf-8')
            return hashlib.sha256(content.encode()).hexdigest()
        except Exception:
            return ""
    
    def load_cache_index(self) -> Dict[str, CacheEntry]:
        """Load the cache index"""
        if not self.cache_index_file or not self.cache_index_file.exists():
            return {}
        
        try:
            with open(self.cache_index_file, 'r') as f:
                data = json.load(f)
                return {
                    key: CacheEntry(**entry) 
                    for key, entry in data.items()
                }
        except Exception as e:
            print(f"⚠️  Error loading cache index: {e}")
            return {}
    
    def save_cache_index(self, cache_index: Dict[str, CacheEntry]):
        """Save the cache index"""
        if not self.cache_index_file:
            return  # Skip saving if no cache directory available
            
        try:
            serializable_data = {
                key: asdict(entry) 
                for key, entry in cache_index.items()
            }
            with open(self.cache_index_file, 'w') as f:
                json.dump(serializable_data, f, indent=2, default=str)
        except Exception as e:
            print(f"❌ Error saving cache index: {e}")
    
    def get_changed_files(self) -> Dict[str, str]:
        """Get files that have changed since last cache"""
        cache_index = self.load_cache_index()
        studio_log_files = self.parser.find_studio_log_files()
        
        changed_files = {}
        
        for file_path in studio_log_files:
            file_key = str(file_path.relative_to(self.vault_path))
            current_hash = self.get_file_hash(file_path)
            
            if (file_key not in cache_index or 
                cache_index[file_key].source_hash != current_hash):
                changed_files[file_key] = current_hash
                print(f"📝 Changed: {file_key}")
            else:
                print(f"📋 Cached: {file_key}")
        
        return changed_files
    
    def process_and_cache_post(self, post: Post, file_key: str, source_hash: str) -> CacheEntry:
        """Process a single post and cache it with asset processing"""
        
        # Extract assets specifically for THIS post's content
        post_assets = self.parser.find_asset_references(post.content)
        post_assets.update(self.parser.find_asset_references(post.html_content))
        
        print(f"📎 Processing {len(post_assets)} assets for: {post.title}")
        asset_url_mapping = self.asset_processor.process_referenced_assets(
            post_assets, 
            self.vault_path
        )
        
        # Update content with blob URLs
        updated_html_content = self.asset_processor.update_content_urls(
            post.html_content, 
            asset_url_mapping
        )
        updated_content = self.asset_processor.update_content_urls(
            post.content, 
            asset_url_mapping
        )
        
        # Serialize post data with updated URLs
        post_data = {
            'title': post.title,
            'slug': post.slug,
            'date': post.date.isoformat(),
            'content': updated_content,
            'html_content': updated_html_content,
            'excerpt': post.excerpt,
            'source_file': str(post.source_file),
            'has_title': post.has_title,
            'tags': post.tags,
            'url_path': post.url_path,
            'asset_urls': asset_url_mapping  # Track asset mappings
        }
        
        # Save individual post cache (if cache directory available)
        if self.posts_cache_dir:
            post_cache_file = self.posts_cache_dir / f"{post.slug}.json"
            with open(post_cache_file, 'w') as f:
                json.dump(post_data, f, indent=2, default=str)
        
        # Create cache entry
        cache_entry = CacheEntry(
            post_data=post_data,
            source_hash=source_hash,
            processed_at=datetime.now().isoformat(),
            assets_processed=list(asset_url_mapping.keys())
        )
        
        print(f"💾 Cached: {post.title} ({post.slug}) with {len(asset_url_mapping)} assets")
        return cache_entry
    
    def rebuild_cache(self, force_all: bool = False, specific_files: Optional[List[str]] = None):
        """Rebuild cache for changed files or all files"""
        print("🔄 Rebuilding post cache...")
        
        cache_index = self.load_cache_index()
        
        if force_all:
            print("🧹 Force rebuild - clearing all cache...")
            cache_index = {}
            # Clear cached post files
            for cached_file in self.posts_cache_dir.glob("*.json"):
                cached_file.unlink()
        
        # Get files to process
        if specific_files:
            files_to_process = {f: self.get_file_hash(self.vault_path / f) 
                              for f in specific_files}
            print(f"🎯 Processing specific files: {specific_files}")
        else:
            files_to_process = self.get_changed_files()
        
        if not files_to_process and not force_all:
            print("✅ No changes detected. Cache is up to date.")
            return
        
        # Process changed files
        updated_posts = 0
        for file_key, source_hash in files_to_process.items():
            file_path = self.vault_path / file_key
            print(f"\n📝 Processing: {file_key}")
            
            try:
                posts = self.parser.parse_file(file_path)
                for post in posts:
                    if 'draft' not in post.tags:  # Skip drafts
                        cache_entry = self.process_and_cache_post(post, file_key, source_hash)
                        cache_index[file_key] = cache_entry
                        updated_posts += 1
                        
            except Exception as e:
                print(f"❌ Error processing {file_key}: {e}")
        
        # Save updated index
        self.save_cache_index(cache_index)
        
        print(f"\n🎉 Cache rebuild complete!")
        print(f"   📝 Updated {updated_posts} posts")
        print(f"   📁 Cache location: {self.cache_dir.absolute()}")
    
    def get_cached_posts(self) -> List[Post]:
        """Get all cached posts as Post objects"""
        # If no cache directory available, parse files directly
        if not self.posts_cache_dir:
            print("⚡ No cache available - parsing files directly...")
            return self._parse_all_posts_directly()
            
        cached_posts = []
        
        for post_file in self.posts_cache_dir.glob("*.json"):
            try:
                with open(post_file, 'r') as f:
                    post_data = json.load(f)
                
                # Convert back to Post object
                post = Post(
                    title=post_data['title'],
                    slug=post_data['slug'],
                    date=datetime.fromisoformat(post_data['date']),
                    content=post_data['content'],
                    html_content=post_data['html_content'],
                    excerpt=post_data['excerpt'],
                    source_file=Path(post_data['source_file']),
                    has_title=post_data['has_title'],
                    tags=post_data['tags']
                )
                cached_posts.append(post)
                
            except Exception as e:
                print(f"⚠️  Error loading cached post {post_file}: {e}")
        
        # Sort by date (newest first)
        cached_posts.sort(key=lambda p: p.date, reverse=True)
        return cached_posts
    
    def _parse_all_posts_directly(self) -> List[Post]:
        """Parse all posts directly without caching (fallback for serverless)"""
        all_posts = []
        
        try:
            studio_log_files = self.parser.find_studio_log_files()
            for file_path in studio_log_files:
                posts = self.parser.parse_file(file_path)
                for post in posts:
                    if 'draft' not in post.tags:  # Skip drafts
                        all_posts.append(post)
        except Exception as e:
            print(f"❌ Error parsing files directly: {e}")
        
        # Sort by date (newest first)
        all_posts.sort(key=lambda p: p.date, reverse=True)
        return all_posts
    
    def cleanup(self):
        """Clean up temporary files"""
        if hasattr(self.asset_processor, 'cleanup'):
            self.asset_processor.cleanup()
    
    def clear_cache(self):
        """Clear all cache"""
        print("🧹 Clearing all cache...")
        
        # Remove cache index
        if self.cache_index_file.exists():
            self.cache_index_file.unlink()
        
        # Remove cached posts
        for cached_file in self.posts_cache_dir.glob("*.json"):
            cached_file.unlink()
        
        print("✅ Cache cleared!")
    
    def get_cache_stats(self) -> Dict:
        """Get cache statistics"""
        if not self.cache_dir:
            return {
                'cached_files': 0,
                'cached_posts': 0,
                'total_size_mb': 0,
                'cache_location': 'No cache (serverless mode)',
                'last_updated': 'N/A'
            }
            
        cache_index = self.load_cache_index()
        cached_posts = list(self.posts_cache_dir.glob("*.json"))
        
        total_size = sum(f.stat().st_size for f in cached_posts)
        total_size += self.cache_index_file.stat().st_size if self.cache_index_file.exists() else 0
        
        return {
            'cached_files': len(cache_index),
            'cached_posts': len(cached_posts),
            'total_size_mb': round(total_size / 1024 / 1024, 2),
            'cache_location': str(self.cache_dir.absolute()),
            'last_updated': max([datetime.fromisoformat(entry.processed_at) 
                               for entry in cache_index.values()], default=None)
        }

def main():
    """CLI interface for cache management"""
    import sys
    
    cache_manager = PostCacheManager()
    
    if len(sys.argv) < 2:
        print("📋 Post Cache Manager")
        print("Usage:")
        print("  python cache_manager.py rebuild      # Rebuild changed files")
        print("  python cache_manager.py rebuild --force  # Rebuild all files")
        print("  python cache_manager.py clear        # Clear all cache")
        print("  python cache_manager.py stats        # Show cache stats")
        return
    
    command = sys.argv[1]
    
    if command == "rebuild":
        force = "--force" in sys.argv
        cache_manager.rebuild_cache(force_all=force)
        
    elif command == "clear":
        cache_manager.clear_cache()
        
    elif command == "stats":
        stats = cache_manager.get_cache_stats()
        print("📊 Cache Statistics:")
        print(f"   Cached files: {stats['cached_files']}")
        print(f"   Cached posts: {stats['cached_posts']}")
        print(f"   Total size: {stats['total_size_mb']} MB")
        print(f"   Location: {stats['cache_location']}")
        if stats['last_updated']:
            print(f"   Last updated: {stats['last_updated']}")
    
    else:
        print(f"❌ Unknown command: {command}")

if __name__ == "__main__":
    main() 