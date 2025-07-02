"""
Asset Processor for HTMX Demo
Integrates with Vercel Blob upload and URL replacement
"""

import os
import requests
import hashlib
import json
import re
import subprocess
import tempfile
from pathlib import Path
from urllib.parse import urlparse
from typing import Set, Dict, List

try:
    from PIL import Image
except ImportError:
    print("⚠️  PIL not available - image compression will be skipped")
    Image = None

class AssetProcessor:
    """Handles asset upload to Vercel Blob with compression"""
    
    def __init__(self, blob_token: str = None):
        self.blob_token = blob_token or os.getenv('BLOB_READ_WRITE_TOKEN')
        
        # Always initialize these core attributes
        self.cache_file = "blob_cache.json"
        self.cache = self.load_cache()
        self.upload_url = "https://blob.vercel-storage.com"
        self.temp_dir = Path(tempfile.mkdtemp(prefix="blob_assets_"))
        
        if not self.blob_token:
            print("⚠️  No BLOB_READ_WRITE_TOKEN found. Asset upload will be skipped.")
        else:
            print(f"📁 Using temp directory: {self.temp_dir}")
    
    def load_cache(self) -> Dict:
        """Load asset cache to avoid re-uploading unchanged files"""
        try:
            with open(self.cache_file, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return {}
    
    def save_cache(self):
        """Save asset cache"""
        with open(self.cache_file, 'w') as f:
            json.dump(self.cache, f, indent=2)
    
    def get_file_hash(self, file_path: Path) -> str:
        """Get MD5 hash of file for change detection"""
        hash_md5 = hashlib.md5()
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hash_md5.update(chunk)
        return hash_md5.hexdigest()
    
    def compress_image(self, input_path: Path, output_path: Path) -> Path:
        """Compress image using Pillow"""
        if not Image:
            # Copy original if PIL not available
            print(f"    📄 PIL not available - copying original file")
            import shutil
            shutil.copy2(input_path, output_path)
            return output_path
            
        try:
            print(f"    🔍 Analyzing image: {input_path.name}")
            with Image.open(input_path) as img:
                print(f"    📏 Original: {img.size[0]}x{img.size[1]} pixels, mode: {img.mode}")
                
                # Convert RGBA to RGB if saving as JPEG
                if img.mode in ('RGBA', 'LA', 'P'):
                    print(f"    🔄 Converting {img.mode} to RGB for better compression...")
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                    img = background
                
                original_size = os.path.getsize(input_path)
                print(f"    📊 Original file size: {original_size/1024:.1f}KB")
                
                # Try WebP first (best compression)
                print(f"    🔧 Compressing to WebP (quality: 85)...")
                webp_path = output_path.with_suffix('.webp')
                img.save(webp_path, 'WebP', quality=85, optimize=True)
                webp_size = os.path.getsize(webp_path)
                print(f"    📦 WebP result: {webp_size/1024:.1f}KB")
                
                # Try JPEG (good compatibility)
                print(f"    🔧 Compressing to JPEG (quality: 85)...")
                jpeg_path = output_path.with_suffix('.jpg')
                img.save(jpeg_path, 'JPEG', quality=85, optimize=True)
                jpeg_size = os.path.getsize(jpeg_path)
                print(f"    📦 JPEG result: {jpeg_size/1024:.1f}KB")
                
                # Choose the smaller file
                if webp_size < jpeg_size:
                    if jpeg_path.exists():
                        jpeg_path.unlink()
                    final_path = webp_path
                    final_size = webp_size
                    print(f"    ✅ Selected WebP (better compression)")
                else:
                    if webp_path.exists():
                        webp_path.unlink()
                    final_path = jpeg_path
                    final_size = jpeg_size
                    print(f"    ✅ Selected JPEG (smaller result)")
                
                compression_ratio = (1 - final_size / original_size) * 100
                print(f"    🎉 Final: {original_size/1024:.0f}KB → {final_size/1024:.0f}KB ({compression_ratio:.1f}% smaller)")
                return final_path
                
        except Exception as e:
            print(f"    ❌ Image compression failed: {str(e)}")
            import shutil
            shutil.copy2(input_path, output_path)
            return output_path
    
    def compress_video(self, input_path: Path, output_path: Path) -> Path:
        """Compress video using ffmpeg"""
        try:
            print(f"    🔍 Checking for ffmpeg...")
            subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
            print(f"    ✅ ffmpeg found and ready")
            
            original_size = os.path.getsize(input_path)
            print(f"    📊 Original video size: {original_size/1024/1024:.1f}MB")
            
            print(f"    🎬 Starting video compression with settings:")
            print(f"        • Codec: H.264 (libx264)")
            print(f"        • Quality: CRF 28 (good balance)")
            print(f"        • Preset: medium (reasonable speed)")
            print(f"        • Audio: AAC 128k")
            
            cmd = [
                'ffmpeg', '-i', str(input_path),
                '-c:v', 'libx264',
                '-crf', '28',
                '-preset', 'medium',
                '-c:a', 'aac',
                '-b:a', '128k',
                '-movflags', '+faststart',
                '-y',
                str(output_path)
            ]
            
            print(f"    ⚙️  Running ffmpeg compression...")
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0 and output_path.exists():
                compressed_size = os.path.getsize(output_path)
                compression_ratio = (1 - compressed_size / original_size) * 100
                print(f"    🎉 Video compression complete!")
                print(f"    📹 Final: {original_size/1024/1024:.1f}MB → {compressed_size/1024/1024:.1f}MB ({compression_ratio:.1f}% smaller)")
                return output_path
            else:
                print(f"    ❌ Video compression failed!")
                print(f"    📝 Error: {result.stderr}")
                print(f"    📄 Copying original file instead")
                import shutil
                shutil.copy2(input_path, output_path)
                return output_path
                
        except (subprocess.CalledProcessError, FileNotFoundError):
            print(f"    ⚠️  ffmpeg not available - copying original video")
            import shutil
            shutil.copy2(input_path, output_path)
            return output_path
    
    def compress_audio(self, input_path: Path, output_path: Path) -> Path:
        """Compress audio using ffmpeg"""
        try:
            print(f"    🔍 Checking for ffmpeg...")
            subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
            print(f"    ✅ ffmpeg found and ready")
            
            original_size = os.path.getsize(input_path)
            print(f"    📊 Original audio size: {original_size/1024:.1f}KB")
            
            # Determine best output format and settings
            input_ext = input_path.suffix.lower()
            
            if input_ext in ['.wav', '.flac', '.aiff']:
                # Compress lossless formats to MP3 for better Vercel Blob compatibility
                output_format = 'mp3'
                output_ext = '.mp3'
                print(f"    🎵 Compressing lossless audio to MP3...")
                print(f"    ⚙️  Settings: MP3 192kbps, 44.1kHz")
            elif input_ext in ['.mp3', '.aac', '.ogg']:
                # Convert all compressed formats to MP3 for consistency
                output_format = 'mp3'
                output_ext = '.mp3'
                if input_ext == '.mp3':
                    print(f"    🎵 Optimizing MP3 quality...")
                else:
                    print(f"    🎵 Converting to MP3 for Vercel Blob compatibility...")
                print(f"    ⚙️  Settings: MP3 192kbps, 44.1kHz")
            else:
                # Default to MP3 for unknown formats (better Vercel Blob support)
                output_format = 'mp3'
                output_ext = '.mp3'
                print(f"    🎵 Converting unknown format to MP3...")
                print(f"    ⚙️  Settings: MP3 192kbps, 44.1kHz")
            
            # Set output path with correct extension
            final_output_path = output_path.with_suffix(output_ext)
            
            # Build ffmpeg command (always MP3 now for Vercel Blob compatibility)
            cmd = [
                'ffmpeg', '-i', str(input_path),
                '-codec:a', 'libmp3lame',
                '-b:a', '192k',
                '-ar', '44100',
                '-y',
                str(final_output_path)
            ]
            
            print(f"    ⚙️  Running ffmpeg compression...")
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0 and final_output_path.exists():
                compressed_size = os.path.getsize(final_output_path)
                compression_ratio = (1 - compressed_size / original_size) * 100
                print(f"    🎉 Audio compression complete!")
                print(f"    🎵 Final: {original_size/1024:.1f}KB → {compressed_size/1024:.1f}KB ({compression_ratio:.1f}% smaller)")
                return final_output_path
            else:
                print(f"    ❌ Audio compression failed!")
                print(f"    📝 Error: {result.stderr}")
                print(f"    📄 Copying original file instead")
                import shutil
                shutil.copy2(input_path, output_path)
                return output_path
                
        except (subprocess.CalledProcessError, FileNotFoundError):
            print(f"    ⚠️  ffmpeg not available - copying original audio")
            import shutil
            shutil.copy2(input_path, output_path)
            return output_path
    
    def upload_to_blob(self, file_path: Path, filename: str = None) -> str:
        """Upload file to Vercel Blob"""
        if not self.blob_token:
            print(f"⚠️  No blob token - skipping upload of {filename}")
            return str(file_path)  # Return local path as fallback
            
        if filename is None:
            filename = file_path.name
        
        # Check cache first
        file_hash = self.get_file_hash(file_path)
        cache_key = f"{filename}_{file_hash}"
        
        if cache_key in self.cache:
            print(f"📋 Cache hit! Using existing URL for {filename}")
            cached_url = self.cache[cache_key]['url']
            print(f"    🔗 Cached URL: {cached_url}")
            return cached_url
        
        file_size = os.path.getsize(file_path)
        print(f"📤 Starting blob upload for {filename}")
        print(f"    📊 File size: {file_size / 1024 / 1024:.1f}MB")
        print(f"    🔑 Hash: {file_hash[:12]}...")
        
        try:
            headers = {
                'Authorization': f'Bearer {self.blob_token}',
            }
            
            upload_url = f"{self.upload_url}/{filename}"
            print(f"    🌐 Upload URL: {upload_url}")
            print(f"    🚀 Uploading to Vercel Blob...")
            
            with open(file_path, 'rb') as f:
                response = requests.put(upload_url, headers=headers, data=f)
            
            print(f"    📡 Upload complete - Status: {response.status_code}")
            
            if response.status_code in [200, 201]:
                result = response.json()
                blob_url = result.get('url', f"{self.upload_url}/{filename}")
                
                # Cache the result
                self.cache[cache_key] = {
                    'url': blob_url,
                    'filename': filename,
                    'hash': file_hash,
                    'size': file_size,
                    'uploaded_at': str(file_path.stat().st_mtime)
                }
                self.save_cache()
                
                print(f"✅ Upload successful!")
                print(f"    🔗 Blob URL: {blob_url}")
                print(f"    💾 Cached for future use")
                return blob_url
            else:
                print(f"❌ Upload failed!")
                print(f"    📝 Status: {response.status_code}")
                print(f"    📝 Response: {response.text}")
                print(f"    📄 Falling back to local path")
                return str(file_path)  # Return local path as fallback
                
        except Exception as e:
            print(f"❌ Upload error: {str(e)}")
            print(f"    📄 Falling back to local path")
            return str(file_path)  # Return local path as fallback
    
    def process_asset(self, asset_path: Path, vault_path: Path) -> str:
        """Process a single asset: compress and upload to blob"""
        if not asset_path.exists():
            print(f"⚠️  Asset not found: {asset_path}")
            return str(asset_path)
        
        ext = asset_path.suffix.lower()
        temp_output = self.temp_dir / asset_path.name
        
        print(f"📦 Processing asset: {asset_path.name}")
        
        # Determine file type for display
        if ext in ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff']:
            file_type = 'image'
        elif ext in ['.mp4', '.mov', '.avi', '.mkv', '.webm']:
            file_type = 'video'
        elif ext in ['.wav', '.mp3', '.aac', '.ogg', '.flac', '.m4a', '.aiff']:
            file_type = 'audio'
        else:
            file_type = 'other'
            
        print(f"    📁 Type: {ext} ({file_type})")
        
        # Compress based on file type
        if ext in ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff']:
            print(f"    🖼️  Starting image compression...")
            compressed_path = self.compress_image(asset_path, temp_output)
        elif ext in ['.mp4', '.mov', '.avi', '.mkv', '.webm']:
            print(f"    🎥 Starting video compression...")
            compressed_path = self.compress_video(asset_path, temp_output.with_suffix('.mp4'))
        elif ext in ['.wav', '.mp3', '.aac', '.ogg', '.flac', '.m4a', '.aiff']:
            print(f"    🎵 Starting audio compression...")
            compressed_path = self.compress_audio(asset_path, temp_output)
        else:
            print(f"    📄 Unknown type - copying as-is: {asset_path.name}")
            import shutil
            shutil.copy2(asset_path, temp_output)
            compressed_path = temp_output
        
        print(f"    ⬆️  Ready for upload: {compressed_path.name}")
        # Upload to blob
        blob_url = self.upload_to_blob(compressed_path, compressed_path.name)
        
        print(f"✅ Asset processing complete: {asset_path.name}")
        print(f"    🔗 Final URL: {blob_url}")
        print()
        return blob_url
    
    def process_referenced_assets(self, referenced_assets: Set[str], vault_path: Path) -> Dict[str, str]:
        """Process all referenced assets and return URL mapping"""
        if not referenced_assets:
            print("📋 No assets referenced")
            return {}
        
        print(f"📎 Processing {len(referenced_assets)} referenced assets...")
        
        # Try different potential asset directory locations
        potential_assets_dirs = [
            vault_path / "_assets",
            vault_path / "NYT Design Log" / "_assets",
            vault_path.parent / "_assets"
        ]
        
        assets_dir = None
        for potential_dir in potential_assets_dirs:
            if potential_dir.exists():
                assets_dir = potential_dir
                print(f"📁 Found assets directory: {assets_dir}")
                break
        
        if not assets_dir:
            print("⚠️  No assets directory found")
            return {}
            
        asset_url_mapping = {}
        
        for asset_ref in referenced_assets:
            # Clean up the asset path
            clean_path = asset_ref.lstrip('./')
            if clean_path.startswith('_assets/'):
                clean_path = clean_path[8:]  # Remove '_assets/'
            elif clean_path.startswith('../_assets/'):
                clean_path = clean_path[11:]  # Remove '../_assets/'
            
            asset_path = assets_dir / clean_path
            if asset_path.exists():
                blob_url = self.process_asset(asset_path, vault_path)
                asset_url_mapping[asset_ref] = blob_url
            else:
                print(f"⚠️  Referenced asset not found: {asset_path}")
                asset_url_mapping[asset_ref] = asset_ref  # Keep original reference
        
        return asset_url_mapping
    
    def update_content_urls(self, content: str, asset_url_mapping: Dict[str, str]) -> str:
        """Replace asset URLs in content with blob URLs"""
        updated_content = content
        changes_made = False
        
        # Patterns to find asset references
        patterns = [
            (r'!\[([^\]]*)\]\(([^)]+)\)', 'markdown_image'),  # ![alt](path)
            (r'<img[^>]+src="([^"]+)"[^>]*>', 'html_image'),   # <img src="path">
            (r'<video[^>]+src="([^"]+)"[^>]*>', 'html_video'), # <video src="path">
            (r'<audio[^>]+src="([^"]+)"[^>]*>', 'html_audio'), # <audio src="path">
        ]
        
        for pattern, pattern_type in patterns:
            matches = list(re.finditer(pattern, updated_content))
            
            for match in matches:
                if pattern_type == 'markdown_image':
                    alt_text, asset_path = match.groups()
                    full_match = match.group(0)
                elif pattern_type in ['html_image', 'html_video', 'html_audio']:
                    asset_path = match.group(1)
                    full_match = match.group(0)
                else:
                    continue
                
                # Skip if already a URL
                if asset_path.startswith(('http://', 'https://', 'blob:')):
                    continue
                
                # Replace if we have a mapping for this asset
                if asset_path in asset_url_mapping:
                    blob_url = asset_url_mapping[asset_path]
                    
                    if pattern_type == 'markdown_image':
                        new_ref = f"![{alt_text}]({blob_url})"
                    else:
                        new_ref = full_match.replace(asset_path, blob_url)
                    
                    updated_content = updated_content.replace(full_match, new_ref)
                    changes_made = True
                    print(f"🔄 Replaced {asset_path} with {blob_url}")
        
        return updated_content
    
    def cleanup(self):
        """Clean up temporary directory"""
        import shutil
        if self.temp_dir.exists():
            shutil.rmtree(self.temp_dir)
            print(f"🧹 Cleaned up temp directory: {self.temp_dir}")

def main():
    """Test the asset processor"""
    processor = AssetProcessor()
    print("🚀 Asset Processor Test")
    
    if not processor.blob_token:
        print("❌ No BLOB_READ_WRITE_TOKEN found")
        print("Set it with: export BLOB_READ_WRITE_TOKEN=your_token_here")
        return
    
    print("✅ Asset processor ready!")
    print("Use this in your cache manager to process assets.")

if __name__ == "__main__":
    main() 