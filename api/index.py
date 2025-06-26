import sys
import os

# Add the parent directory to the Python path so we can import app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app

# Vercel expects a variable named 'app' or a function named 'handler'
# Since we already have 'app' from our Flask application, we're good to go 