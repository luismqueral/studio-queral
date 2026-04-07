# Studio Queral — Project Guide

## Philosophy

Personal portfolio site. Minimalism with personality, performance-first, creative experimentation. Built with React 18 + Vite, deployed on Vercel.

## Tech Stack

- **React 18** with Vite — functional components, hooks, no class components
- **Tachyons v4.12.0** via CDN — utility-first CSS, NOT Tailwind
- **React Router** for client-side routing
- **Vercel** for hosting, Vercel Blob for media CDN
- No global state management — component-level state only

## Subdomain Architecture

Single React app serves all subdomains via hostname detection in `App.jsx`:
- `queral.studio` — main portfolio
- `notes.queral.studio` — password-protected notes
- `music.queral.studio` — music collection
- `timer.queral.studio` — pomodoro timer

Pattern: check `window.location.hostname`, render different routes per subdomain. DNS uses wildcard CNAME to Vercel.

## Styling Rules (Critical)

**Decision tree — follow every time:**
1. Can Tachyons do it? Use the class. Done.
2. Tachyons can't? Extend `src/styles/tachyons-ext.css` with a custom utility. Done.
3. Neither? Stop and ask before inline styles.

**Hard rules:**
- NO inline styles (except JS-driven animations/randomized values)
- NO Tailwind (`tw-`, `@apply`, etc.)
- NO CSS-in-JS (styled-components, emotion)
- Base font size: 22px on `<html>`
- Body font: `.font-system` (Helvetica stack)
- Type scale: `f1` display > `f3` titles > `f4-f5` body > `f6` meta > `f7` captions
- Links: `blue underline hover-no-underline`
- Page containers: `pa4 mw7 center`
- Colors: `near-black`, `gray`, `silver`, `moon-gray`, plus custom palette in tachyons-ext.css

## File Structure

```
src/
  components/    # React components
  pages/         # Page-level components
  styles/        # tachyons-ext.css (custom utilities, fonts, colors)
  notes/         # Notes system (content + registry)
  music/         # Music feature
  App.jsx        # Root — subdomain routing
  main.jsx       # Entry point (BrowserRouter)
public/
  fonts/         # 130+ WOFF2 font files
  images/        # Static images
```

## Writing Voice

For any prose (notes, blog posts, descriptions):
- Conversational, direct — like explaining to a friend
- Lowercase in newer writing
- Short paragraphs (1-2 sentences max)
- Simple declarative sentences
- Avoid LLM tells: no dramatic framing, no "secrets", no tricolons, no performative signposting
- Personal without performative
- Endings: casual or just stop

## Development

```bash
npm run dev       # Vite dev server, port 3000
npm run build     # vite build + generate OG pages
npm run preview   # Preview production build
```

## Code Standards

- Named exports preferred
- Descriptive variable names: `isLoading`, `hasError`
- Comments explain "why", not "what"
- Keep bundle size small — avoid heavy dependencies
- Follow existing patterns before creating new approaches
