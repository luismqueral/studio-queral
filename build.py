#!/usr/bin/env python3
"""
Simple build script for studio site.

This script generates individual markdown files from your studio log
and processes assets for deployment.
"""

import subprocess
import sys
import os

def main():
    """Run the complete build process"""
    print("🚀 Building studio site...")
    
    # Load environment variables
    env = os.environ.copy()
    if os.path.exists('.env'):
        with open('.env', 'r') as f:
            for line in f:
                if '=' in line and not line.strip().startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env[key] = value.strip('"\'')
    
    # Step 1: Generate new logo variations
    print("\n🎨 Generating logo variations...")
    try:
        result = subprocess.run([
            sys.executable, 'generate_logo.py'
        ], env=env, check=True)
        print("✅ Logo generation complete!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Logo generation failed: {e}")
        return False
    
    # Step 2: Run the markdown builder
    print("\n📝 Building markdown content...")
    try:
        result = subprocess.run([
            sys.executable, 'build_markdown.py'
        ], env=env, check=True)
        print("✅ Markdown build complete!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Markdown build failed: {e}")
        return False
        
    print("\n🎉 Build complete!")
    print("\n📋 Next steps:")
    print("   1. git add content/ static/images/")
    print("   2. git commit -m 'Update posts and logo'")
    print("   3. git push")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 