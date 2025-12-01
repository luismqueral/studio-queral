# Architecture

> Technical design decisions and their rationale.

---

## Tech Stack Decisions

### React + Vite (Not Next.js)

**Decision:** Use plain React with Vite instead of Next.js.

**Rationale:** This is a simple portfolio site with:
- No server-side rendering needs (content is mostly static)
- No complex routing requirements
- No database
- Fast iteration speed matters more than SEO optimization

Vite provides instant HMR and fast builds. The added complexity of Next.js isn't justified here.

### Tachyons CSS (Not Tailwind)

**Decision:** Use Tachyons functional CSS.

**Rationale:** 
- Smaller footprint than Tailwind
- No build process for CSS
- Sufficient for this project's needs
- Personal preference for its naming conventions

Extended in `tachyons-ext.css` for custom utilities.

### Client-Side Routing

**Decision:** Use React Router for SPA routing.

**Rationale:**
- All routes are truly client-side (no SSR)
- Simple mental model
- Works well with Vercel's static hosting

The `vercel.json` rewrites handle the SPA fallback:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Component Architecture

### Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── CursorLog/       # Log viewer domain (grouped feature)
│   │   ├── LogViewer.jsx
│   │   ├── StickyNav.jsx
│   │   └── ConversationBlock.jsx
│   ├── HomePage.jsx     # Page-level component (could move to pages/)
│   ├── WebGLMorpher.jsx
│   ├── NewsletterSignup.jsx
│   └── FeaturedSection.jsx
├── pages/               # Route entry points
│   └── CursorLogPage.jsx
├── utils/               # Pure functions, no React
│   └── parseCursorLog.js
└── styles/              # CSS files
    ├── tachyons-ext.css
    ├── cursor-log.css
    └── webgl-homepage-component.css
```

### Component Boundaries

**CursorLog Feature:**
- `CursorLogPage` – Route handler, fetches markdown, passes to LogViewer
- `LogViewer` – Orchestrates parsing and layout
- `StickyNav` – Navigation sidebar, manages scroll tracking
- `ConversationBlock` – Renders individual user/AI message

**Homepage:**
- `HomePage` – Main content, random takes logic
- `WebGLMorpher` – Self-contained WebGL component
- `NewsletterSignup` – Form with Buttondown integration
- `FeaturedSection` – Project grid (currently hidden)

---

## Data Flow

### Log Viewer Data Flow

```
URL param (:slug)
       │
       ▼
CursorLogPage
       │
       ├─── fetch(`/logs/${slug}.md`)
       │
       ▼
parseCursorLog(markdown)
       │
       ├─── Returns: { title, metadata, blocks, questions }
       │
       ▼
LogViewer receives parsed data
       │
       ├─── Passes questions → StickyNav
       │
       └─── Maps blocks → ConversationBlock[]
```

### State Management

**No global state library.** React's built-in useState and useRef are sufficient:

| State | Location | Why |
|-------|----------|-----|
| Parsed log data | CursorLogPage | Fetched once, passed down |
| Current question (scroll) | StickyNav | Local scroll tracking |
| Morph value | WebGLMorpher | Slider-controlled local state |
| Form state | NewsletterSignup | Local form management |

---

## Cursor Log Parser Design

### Why a Custom Parser?

Cursor exports have a specific format that markdown renderers don't understand semantically. We need to:

1. Distinguish User from AI messages
2. Extract questions for navigation
3. Handle both Cursor export and SpecStory formats
4. Preserve code blocks with language info

### Parser Output Shape

```typescript
interface ParsedLog {
  title: string;              // Extracted from first heading
  metadata: {
    date?: string;
    version?: string;
  };
  blocks: MessageBlock[];     // The conversation
  questions: Question[];      // For sticky nav
}

interface MessageBlock {
  speaker: 'user' | 'cursor';
  content: string;            // Markdown content
  timestamp?: string;
  model?: string;             // For AI responses
  thinking?: string[];        // AI thinking blocks (if present)
}

interface Question {
  id: string;                 // For scroll targeting
  text: string;               // Truncated question text
  blockIndex: number;         // Which block it's from
}
```

### Format Detection

The parser auto-detects format based on markers:

```javascript
if (content.includes('_**User')) {
  // SpecStory format
} else if (content.includes('**User**')) {
  // Standard Cursor export
}
```

---

## WebGL Component Design

### Isolation

`WebGLMorpher` is fully self-contained:
- Creates and manages its own canvas
- Loads textures from public folder
- Compiles shaders internally
- Cleans up on unmount

No WebGL state leaks outside the component.

### Resource Management

```javascript
useEffect(() => {
  // Initialize WebGL context, compile shaders, load textures
  return () => {
    // Clean up: delete textures, delete program, lose context
  };
}, []);
```

### Animation Pattern

Uses `requestAnimationFrame` with refs (not state) to avoid stale closure issues:

```javascript
const morphValueRef = useRef(0);

// Update ref when state changes
useEffect(() => {
  morphValueRef.current = morphValue;
}, [morphValue]);

// Animation loop reads ref, not state
function animate() {
  render(morphValueRef.current);
  requestAnimationFrame(animate);
}
```

---

## API Design

### Newsletter Subscription

**Endpoint:** `POST /api/subscribe`

**Request:**
```json
{ "email": "user@example.com" }
```

**Response:**
```json
{ "success": true }
// or
{ "success": false, "error": "message" }
```

**Implementation:** Vercel serverless function at `api/subscribe.js`

**Security:**
- API key stored in environment variable
- Never exposed to client
- Rate limiting handled by Buttondown

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Vercel                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐    ┌─────────────────────────────┐│
│  │  Static Files   │    │    Serverless Functions     ││
│  │  (dist/)        │    │    (api/)                   ││
│  │                 │    │                             ││
│  │  - index.html   │    │  - subscribe.js             ││
│  │  - assets/      │    │                             ││
│  │  - images/      │    │                             ││
│  │  - logs/        │    │                             ││
│  └─────────────────┘    └─────────────────────────────┘│
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Build Process:**
1. `vite build` compiles React → `dist/`
2. Vercel serves `dist/` as static files
3. Vercel runs `api/` as serverless functions
4. Rewrites route all non-API requests to `index.html`

---

## Future Considerations

### If Adding More Features

- **Search:** Add client-side search with Fuse.js or similar
- **More logs:** Current manifest.json approach scales to ~50 logs; beyond that, consider pagination
- **Comments:** Would need a backend (Supabase, Firebase, etc.)

### If Performance Becomes an Issue

- **Large logs:** Could lazy-load log sections
- **WebGL:** Already GPU-accelerated; main optimization would be reducing texture size
- **Bundle size:** Already code-split by route; further splits possible with React.lazy

### Migration Paths

- **To Next.js:** Move pages to `app/` directory, convert to RSC where beneficial
- **To TypeScript:** Add `.tsx` extensions, define interfaces for parsed data

