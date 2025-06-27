#!/usr/bin/env python3
"""
Build and Deploy - Automated build and deployment script
that generates new logo variations and commits them.
"""

import subprocess
import sys
import os
from datetime import datetime

def run_command(cmd, description):
    """Run a command and handle errors"""
    print(f"📋 {description}...")
    try:
        result = subprocess.run(cmd, shell=True, check=True, capture_output=True, text=True)
        if result.stdout.strip():
            print(f"   {result.stdout.strip()}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed: {e}")
        if e.stderr:
            print(f"   Error: {e.stderr.strip()}")
        return False

def check_git_status():
    """Check if there are uncommitted changes"""
    result = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
    return result.stdout.strip()

def main():
    """Main deployment process"""
    print("🚀 Starting build and deployment process...")
    
    # Generate new logos
    print("\n🎨 Generating fresh logo variations...")
    if not run_command('python3 generate_logo.py', 'Logo generation'):
        return False
    
    # Check if logos were actually generated/changed
    git_status = check_git_status()
    if not git_status:
        print("✅ No changes detected - logos are up to date!")
        return True
    
    # Add generated logos to git
    if not run_command('git add static/images/logo-*.svg', 'Adding logo files to git'):
        return False
    
    # Check if we have other changes to commit too
    remaining_changes = check_git_status()
    if remaining_changes:
        print("\n📝 Found additional changes to commit:")
        print(f"   {remaining_changes}")
        
        # Add all changes
        if not run_command('git add .', 'Adding all changes'):
            return False
    
    # Create commit message with timestamp
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    commit_msg = f"🎨 Generate new logo variations - {timestamp}"
    
    if not run_command(f'git commit -m "{commit_msg}"', 'Committing changes'):
        return False
    
    # Push to remote
    if not run_command('git push', 'Pushing to remote repository'):
        return False
    
    print("\n🎉 Deployment complete!")
    print(f"✅ New logo variations generated and deployed")
    print(f"✅ Changes committed with: {commit_msg}")
    print(f"✅ Pushed to remote repository")
    
    return True

if __name__ == "__main__":
    success = main()
    if success:
        print("\n🌟 Ready for production!")
    else:
        print("\n💥 Deployment failed!")
    sys.exit(0 if success else 1) 