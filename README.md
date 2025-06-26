# My HTMX Studio Log

This is my personal blog, rebuilt using a server-centric architecture with Python (Flask) and **[HTMX](https://htmx.org/)**.

The goal was to build a site that feels as fast and modern as a JavaScript single-page application (SPA), but with a much simpler and more direct approach that keeps most of the logic on the server. This project serves as my hands-on way of learning and applying HTMX concepts.

## Core Architecture: "Just Send HTML"

The main principle of the site is that the server is always in charge. Instead of sending data (like JSON) and having the browser figure out how to display it, the server just sends small fragments of pre-rendered HTML. HTMX then intelligently swaps that HTML into the correct place on the page.

This gives me the best of both worlds:
- **Speed**: The site feels fast because HTMX requests are lightweight and only update the parts of the page that change.
- **Simplicity**: I can keep most of my logic in Python and my templates in HTML/Jinja2, without needing a complex client-side framework or state management.
- **Robustness**: The site is fundamentally just plain HTML, which means it works perfectly for web crawlers (good SEO) and even for users with JavaScript disabled.

---

## How It's Put Together

I've structured the project with a clear separation between the backend logic, the content pipeline, and the frontend templates.

### 1. The Backend (Flask - `app.py`)
This is the application's brain.
- **URL Routing**: It defines all the site's URLs (like `/`, `/blog`, `/about`) and maps them to Python functions.
- **HTMX Awareness**: Each route knows how to handle two types of requests. If I navigate to a URL directly, it sends the full `base.html` shell. If I click an internal link, HTMX sends a special header, and the route smartly responds with *only* the small HTML fragment needed for the content area.
- **Content Orchestration**: It uses my `CacheManager` to get the content it needs to render.

### 2. The Content Pipeline (The "Magic")
To make the site as fast as possible, I don't parse my Markdown files every time someone loads a page. Instead, I have a pre-processing pipeline that does all the heavy lifting ahead of time.

- **`parser.py`**: This script reads my `.md` files from my Obsidian vault. It knows how to split a long log file into individual posts, find all the `#tags`, and identify any local image or video paths.
- **`asset_processor.py`**: This script takes the local asset paths found by the parser, runs compression on the files to optimize them for the web, and uploads them to a cloud blob store. It then updates the HTML to point to the new cloud URLs.
- **`cache_manager.py`**: This is the orchestrator. When I trigger a rebuild, it uses the parser and asset processor to generate the final, ready-to-serve HTML for each post. It stores these in a local `.cache` directory. The live Flask app *only* ever reads from this super-fast cache.

### 3. The Frontend (Jinja2 Templates)
- **`templates/base.html`**: This is the main skeleton of the site. It has the header, the main navigation, and an empty `<main>` element. All the page content gets loaded into this `<main>` element.
- **`templates/fragments/`**: This is the core of the HTMX architecture. Every piece of swappable content (the homepage, the about page, the list of blog posts) lives here as a small, self-contained HTML file. These are the files that the Flask routes send for all HTMX-powered navigation.

---

## My Publishing Workflow

This is the process I follow to write and publish a new post.

### Step 1: Write in Obsidian
I just write my posts as I normally would in my `journals/studio log/` directory.

### Step 2: Run the Local Server
To see how things look, I start the local Flask server.

```bash
# 1. Go to the project folder
cd studio-log-htmx-test

# 2. Activate the virtual environment
source venv/bin/activate

# 3. Run the app
python app.py
```
The site is now running at `http://localhost:5002`.

### Step 3: Rebuild the Cache
After I've made changes to my Markdown files, I need to update the site's cache. I just open a browser and go to one of these two URLs:

- **`http://localhost:5002/cache/rebuild`**: This is the one I usually use. It's smart and only updates the posts that have actually changed.
- **`http://localhost:5002/cache/rebuild-force`**: This clears everything and rebuilds all posts from scratch. It's slower but good for when I make big changes to the parser itself.

### Step 4: Preview
I can now navigate the local site to see my new post, fully rendered with all its assets.

## What This Demonstrates

### HTMX Interactions
- **Tag Filtering**: Click any tag to filter posts without page reload
- **Navigation**: Logo and nav links use HTMX to swap content
- **Post Details**: Click post titles to view full content
- **Back Navigation**: Browser back/forward buttons work correctly
- **URL Updates**: URLs update as you navigate (good for bookmarking/sharing)

### Key HTMX Concepts Shown
1. **`hx-get`**: Make GET requests to server endpoints
2. **`hx-target`**: Specify where to put the response HTML
3. **`hx-push-url`**: Update browser URL for history/bookmarks
4. **`hx-trigger`**: When to trigger the request (default is 'click' for buttons)
5. **Progressive Enhancement**: All links work without JavaScript

## How to Run

1. **Install Flask**:
   ```bash
   cd studio-log-htmx-test
   pip install -r requirements.txt
   ```

2. **Run the app**:
   ```bash
   python app.py
   ```

3. **Open browser**: http://localhost:5001

## Try These Interactions

1. **Tag Filtering**: 
   - Click "All Posts" to see everything
   - Click "#obsidian" to see only obsidian posts
   - Click "#writing" to see only writing posts
   - Notice the URL changes and you can bookmark/share these filtered views

2. **Post Navigation**:
   - Click any post title to view the full post
   - Click "← Back to posts" to return
   - Use browser back/forward buttons

3. **Logo Randomization**:
   - Click the logo to randomize fonts and colors (your existing feature!)
   - Logo clicks also navigate home via HTMX

## Architecture

```
Templates Structure:
├── base.html              # Main layout with HTMX
├── index.html            # Homepage with tag filters
├── post.html             # Individual post page
├── tags.html             # Tags overview page
└── fragments/
    ├── posts_list.html   # Post list (swapped by HTMX)
    └── post_detail.html  # Post content fragment
```

### HTMX Pattern Used

**Traditional Web**: 
- Click link → Full page reload → Server renders new page

**HTMX Pattern**:
- Click element → HTMX request → Server returns HTML fragment → Replace target element

### Flask Endpoints

- `GET /` - Homepage (full page or HTMX target)
- `GET /posts` - Posts list (with optional ?tag= filter)
- `GET /posts/<slug>` - Individual post
- `GET /tags` - Tags overview

Each endpoint can return either:
- **Full HTML page** (for direct access, SEO, bookmarks)
- **HTML fragment** (for HTMX requests)

## Integration with Your Existing Code

This demo shows how you could integrate with your existing parser:

```python
# Instead of SAMPLE_POSTS, you'd use:
from your_parser import IncrementalStudioLogParser

parser = IncrementalStudioLogParser(vault_path, output_dir)
posts = parser.get_all_posts()  # Your existing logic
```

## Benefits Over React/Next.js

1. **Semantic HTML**: Every element has proper meaning
2. **Server-side rendering**: SEO-friendly, fast initial loads  
3. **Progressive enhancement**: Works without JavaScript
4. **Simpler mental model**: HTML templates instead of components
5. **Less complexity**: No build process, no client-side state management

## Next Steps

If you like this approach, you could:
1. Integrate your existing parser logic
2. Add your actual CSS/assets
3. Deploy to Railway/Render
4. Add more HTMX interactions (infinite scroll, real-time updates, etc.) 