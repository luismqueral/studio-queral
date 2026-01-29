# Quick Start Guide - Cursor Log Viewer

## View Your Log

The dev server is running. Visit:

```
http://localhost:5173/logs/scout-cursor-log
```

You should see:
- ✅ Your conversation title at the top
- ✅ Sticky navigation on the left with all your questions
- ✅ User messages with green accents
- ✅ Cursor messages with blue accents
- ✅ Syntax-highlighted code blocks
- ✅ Smooth scrolling when clicking questions

## Test the Features

### 1. Sticky Navigation
- Scroll down the page
- Notice the navigation stays visible
- Click any question to jump to that section
- Current section highlights automatically

### 2. Responsive Design
- Resize your browser window
- On smaller screens, navigation becomes collapsible
- Click the ← button to collapse/expand

### 3. Code Highlighting
- Look for code blocks in the conversation
- They should have syntax highlighting (dark theme)
- Different languages highlighted differently

## Add Another Log (Example)

1. **Export a conversation from Cursor**
   - File → Export Conversation
   - Save as `my-feature-discussion.md`

2. **Add to your project**
   ```bash
   # Place the file
   mv ~/Downloads/my-feature-discussion.md public/logs/
   ```

3. **Update the manifest**
   Edit `public/logs/manifest.json`:
   ```json
   [
     {
       "slug": "scout-cursor-log",
       "title": "Rewriting surface-sniffer-cli for pd-scout",
       "date": "2025-11-30",
       "description": "Complete conversation log documenting the architecture and design decisions for pd-scout",
       "tags": ["architecture", "design-systems", "tooling", "typescript"]
     },
     {
       "slug": "my-feature-discussion",
       "title": "Building the New Feature",
       "date": "2025-12-01",
       "description": "Discussion about implementing the new feature",
       "tags": ["feature", "development"]
     }
   ]
   ```

4. **View it**
   ```
   http://localhost:5173/logs/my-feature-discussion
   ```

## Add Link from Homepage (Optional)

Edit `src/components/HomePage.jsx` to include:

```jsx
import { LogLinks } from './LogLinks';

// In your component:
<LogLinks />
```

This will show a list of all logs with links.

## What's Next?

The system is complete and ready to use. Every Cursor export you add will automatically:
- Parse the conversation structure
- Extract questions for navigation
- Apply the same beautiful styling
- Enable smooth navigation
- Highlight code blocks

No additional configuration needed!

## Troubleshooting

**Log doesn't load?**
- Check the file is in `public/logs/`
- Check the slug matches the filename (without .md)
- Check manifest.json is valid JSON

**Questions not showing?**
- The parser looks for `**User**` headers
- Make sure your export follows Cursor's format

**Code not highlighted?**
- Code blocks need language tags: \`\`\`javascript
- Parser automatically handles this from Cursor exports

## Files Created

```
src/
├── utils/parseCursorLog.js
├── components/
│   ├── CursorLog/
│   │   ├── LogViewer.jsx
│   │   ├── StickyNav.jsx
│   │   └── ConversationBlock.jsx
│   └── LogLinks.jsx
├── pages/CursorLogPage.jsx
├── styles/cursor-log.css
├── App.jsx (updated)
└── main.jsx (updated)

public/
└── logs/
    ├── scout-cursor-log.md
    ├── manifest.json
    └── README.md
```

Enjoy your new log viewer! 🎉


