# Glossary

> Plain-English definitions for terms used in this project.

---

## General Terms

### SPA (Single Page Application)
A website that loads once and updates dynamically without full page reloads. When you click a link, JavaScript swaps the content instead of fetching a new HTML page from the server.

### Serverless Function
A small piece of code that runs on-demand on someone else's server (Vercel, AWS, etc.). You don't manage the server—it just executes when called and shuts down after. Like renting a kitchen for 10 seconds to make one sandwich.

### Environment Variable
A secret value stored outside your code (like `BUTTONDOWN_API_KEY`). Never commit these to git. On Vercel, you set them in the dashboard; locally, you use a `.env.local` file.

---

## React & JavaScript Terms

### Component
A reusable piece of UI. In this project, everything from a button to an entire page is a component. Think of them like LEGO bricks that snap together.

### Props
Data passed from a parent component to a child. Like function arguments, but for components.

### State
Data that can change over time within a component. When state updates, React re-renders that component.

### Hook
A function that lets you "hook into" React features. Common ones:
- `useState` – creates state
- `useEffect` – runs code when something changes
- `useRef` – holds a value that doesn't trigger re-renders

### JSX
HTML-like syntax in JavaScript files. `<div className="foo">` instead of `<div class="foo">`. React transforms it into regular JavaScript.

---

## Build & Tooling Terms

### Vite
The build tool for this project. Handles:
- Development server with hot reload
- Bundling code for production
- Resolving imports

Pronounced "veet" (French for "fast").

### HMR (Hot Module Replacement)
When you save a file, only the changed module updates in the browser—no full page reload. Your component state often survives edits.

### Bundle
All your JavaScript combined into fewer files for production. Smaller bundles = faster load times.

---

## WebGL Terms

### WebGL
A browser API for GPU-accelerated graphics. Think of it as Photoshop filters that run in real-time on your graphics card.

### Shader
A small program that runs on the GPU. Two types:
- **Vertex shader** – positions geometry
- **Fragment shader** – colors pixels

In this project, the fragment shader creates the image morph effects.

### Texture
An image loaded into GPU memory for use in shaders. The two images (`luis.png`, `pelican.png`) are textures that the shader blends.

### Canvas
The HTML element that displays WebGL graphics. Like a TV screen that shaders paint on.

---

## Cursor Log Terms

### Slug
A URL-friendly identifier. For `/logs/scout-cursor-log`, the slug is `scout-cursor-log`. It matches the filename without `.md`.

### Manifest
The `manifest.json` file that lists all available logs. Like a table of contents that the site reads to know what logs exist.

### Parser
Code that reads text and extracts structured data. The log parser reads markdown and outputs objects with `speaker`, `content`, `questions`, etc.

### SpecStory Format
An alternative export format from Cursor (via the SpecStory extension). Uses slightly different markers like `_**User**_` instead of `**User**`.

---

## Styling Terms

### Tachyons
A functional CSS framework where classes do one thing each. `f4` = font size 4, `pa3` = padding all 3, `bg-blue` = blue background. You compose styles by adding multiple classes.

### Functional CSS
CSS where each class has a single purpose. Also called "atomic CSS" or "utility-first CSS." Tailwind is another example (though this project uses Tachyons).

---

## Hosting & Deployment Terms

### Vercel
The hosting platform for this site. Handles:
- Serving static files
- Running serverless functions
- Automatic deploys from git

### Rewrite
A server rule that maps one URL to another internally. In this project, all routes are rewritten to `/index.html` so React Router can handle them.

### Edge Network / CDN
A global network of servers. When someone in Tokyo visits your site, they get files from a server in Asia, not your origin server in the US. Faster for everyone.

---

## API Terms

### API Key
A password for an API. The Buttondown API key proves you own the newsletter. Keep it secret.

### POST Request
An HTTP request that sends data to a server (like submitting a form). Contrast with GET, which retrieves data.

### Endpoint
A specific URL that accepts requests. `/api/subscribe` is an endpoint that handles newsletter signups.

---

## Git Terms

### Branch
A parallel version of your code. You can experiment on a branch without affecting `main`.

### Commit
A saved snapshot of changes. Like a save point in a video game.

### Merge
Combining one branch into another. When a feature is done, you merge it into `main`.

