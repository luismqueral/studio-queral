# How It Works

> Plain-English explanations of how this site works under the hood.

---

## The Big Picture

Studio Queral is a personal website that does three main things:

1. **Shows an interactive homepage** with a WebGL morph effect
2. **Displays Cursor AI conversation logs** as navigable web pages
3. **Collects newsletter signups** via Buttondown

Think of it like a portfolio site with a reading room attached.

---

## The Cursor Log Viewer

### What It Is

A system that transforms exported Cursor AI conversations into beautiful, navigable web pages—like turning a chat transcript into a polished blog post.

### Why It Matters

Raw Cursor exports are just markdown files. This viewer makes them scannable, searchable, and shareable.

### The Analogy

Imagine you have a box of handwritten letters. The log viewer is like a librarian who:
1. Reads through the letters
2. Identifies each conversation turn (who said what)
3. Creates an index of all the questions asked
4. Arranges everything in a reading room with a table of contents

### How It Works

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Cursor Export  │ ──▶ │    Parser    │ ──▶ │  React Components│
│  (markdown.md)  │     │              │     │                 │
└─────────────────┘     └──────────────┘     └─────────────────┘
         │                     │                      │
    Raw text with        Extracts:              Renders:
    **User** and         - Title                - Sticky nav
    **Cursor** blocks    - Questions            - Color-coded blocks
                         - Message blocks       - Syntax-highlighted code
```

**Step by step:**

1. **You export a conversation** from Cursor → drops a `.md` file
2. **You place it in `public/logs/`** and add an entry to `manifest.json`
3. **User visits `/logs/your-slug`** → React Router loads CursorLogPage
4. **CursorLogPage fetches the markdown** from the public folder
5. **The parser (`parseCursorLog.js`) splits it** into structured data
6. **Components render each piece** with appropriate styling

### The Parser Logic

The parser looks for specific patterns in Cursor's export format:

```
**User** (timestamp)          ← Identifies a user message block
...user content...

**Cursor** (model info)       ← Identifies an AI response block
...cursor content...
```

It also handles SpecStory format exports, which look slightly different:

```
_**User (timestamp)**_        ← SpecStory user format
_**Agent (model)**_           ← SpecStory agent format
```

### The Sticky Navigation

As you scroll through a long conversation, questions can get buried. The sticky nav solves this by:

1. **Extracting every user question** (looks for `**User**` blocks)
2. **Creating clickable links** in a sidebar
3. **Tracking scroll position** to highlight current section
4. **Enabling smooth scrolling** when you click a question

It's like having bookmarks that update as you read.

---

## The WebGL Morpher

### What It Is

An interactive image effect on the homepage that morphs between two photos with various visual distortions.

### Why It Matters

Makes the homepage memorable and interactive—visitors can play with it.

### The Analogy

Think of two overhead projector transparencies stacked on top of each other. The slider controls which one you see. But instead of just fading between them, we're also running the images through a funhouse mirror that shifts based on random parameters.

### How It Works

```
┌───────────┐    ┌───────────┐
│  luis.png │    │pelican.png│
└─────┬─────┘    └─────┬─────┘
      │                │
      └──────┬─────────┘
             ▼
    ┌────────────────────┐
    │   WebGL Fragment   │
    │      Shader        │
    │                    │
    │  - Pixel sorting   │
    │  - Ripple effects  │
    │  - Flow distortion │
    │  - Wave effects    │
    └─────────┬──────────┘
              ▼
    ┌────────────────────┐
    │   Canvas Output    │
    │    (interactive)   │
    └────────────────────┘
```

**The slider** (morphValue) controls the blend between the two images.

**Clicking the canvas** randomizes all the distortion parameters—each click produces a new visual effect.

**The shader** runs on the GPU, which is why it's smooth even with complex effects.

---

## Newsletter Signup

### What It Is

A simple form that subscribes visitors to a Buttondown newsletter.

### How It Works

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  User enters    │ ──▶ │ Vercel Function │ ──▶ │   Buttondown    │
│  email + submit │     │ (api/subscribe) │     │      API        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

The form POSTs to `/api/subscribe`, which is a Vercel serverless function. This function forwards the request to Buttondown's API with your API key (stored as an environment variable, never exposed to the browser).

---

## Routing

### How URLs Map to Components

```
/                    →  HomePage.jsx
/logs/:slug          →  CursorLogPage.jsx (fetches public/logs/{slug}.md)
```

React Router handles this client-side. On Vercel, `vercel.json` rewrites ensure all routes fall through to `index.html` so the SPA can handle them.

---

## File Flow Diagram

```
User visits site
       │
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        index.html                               │
│  (loads main.jsx → App.jsx → React Router)                      │
└──────────────────────────────┬──────────────────────────────────┘
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
           ▼                   ▼                   ▼
      ┌─────────┐      ┌─────────────┐      ┌─────────────┐
      │    /    │      │ /logs/:slug │      │   /api/*    │
      │HomePage │      │CursorLogPage│      │   Vercel    │
      └─────────┘      └─────────────┘      │  Functions  │
           │                   │            └─────────────┘
           ▼                   ▼
    ┌─────────────┐    ┌─────────────────┐
    │WebGLMorpher │    │  Fetches .md    │
    │Newsletter   │    │  Parses content │
    │Featured     │    │  Renders blocks │
    └─────────────┘    └─────────────────┘
```

---

## Key Concepts Summary

| Concept | What It Does | Why |
|---------|--------------|-----|
| **Parser** | Splits markdown into structured blocks | So we can style user vs. AI messages differently |
| **Sticky Nav** | Shows questions in sidebar | So readers can jump to any part of long conversations |
| **WebGL Shader** | Renders pixel effects on GPU | Fast, smooth, interactive graphics |
| **Serverless Function** | Handles newsletter signup | Keeps API key secret, runs on Vercel's servers |
| **Manifest.json** | Lists all available logs | So the system knows what logs exist without scanning filesystem |

