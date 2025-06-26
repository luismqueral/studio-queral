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
    """Run the markdown build process"""
    print("🚀 Building studio site...")
    
    # Load environment variables
    env = os.environ.copy()
    if os.path.exists('.env'):
        with open('.env', 'r') as f:
            for line in f:
                if '=' in line and not line.strip().startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env[key] = value.strip('"\'')
    
    # Run the markdown builder
    try:
        result = subprocess.run([
            sys.executable, 'build_markdown.py'
        ], env=env, check=True)
        
        print("\n🎉 Build complete!")
        print("\n📋 Next steps:")
        print("   1. git add content/")
        print("   2. git commit -m 'Update posts'")
        print("   3. git push")
        
        return True
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Build failed: {e}")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 