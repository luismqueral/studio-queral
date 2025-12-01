# Changelog

All notable changes to this project will be documented in this file.

## 2025-12-01

- added "How To Attend Meetings" blog post - converted Brian Peterson's presentation deck to a full blog article with embedded slide images, covering meeting decision frameworks, red flags, flavor combinations, and real invite examples
- added interactive StrategyCard component - React component that fetches from 186 strategy cards JSON, displays random prompts on click with theme/title/prompt, embedded in Strategy Cards blog post
- updated Strategy Cards blog post - added Oblique Strategies/Brian Eno reference and lateral thinking context, converted to MDX for component embedding
- added Jump City Records post with Asciinema player - detailed architecture breakdown of the generative noise label bot, embedded terminal recording with autoplay
- added Data Synth and Media Tool Kit blog posts - project documentation posts with architecture details, Cursor rules philosophy, and GitHub links
- added default table styling to tachyons-ext.css - clean borders, hover states, and proper padding for markdown tables across the site
- migrated from Vite + React to Astro - complete framework migration for better content management and SEO, static HTML generation, and Content Collections for blog/logs
- added blog with Astro Content Collections - new /blog route with listing page and individual post pages, sample "Hello World" post included
- migrated cursor logs to Astro Content Collections - logs now use built-in markdown rendering with frontmatter schema validation, moved from public/logs to src/content/logs
- cleaned up old Vite/React infrastructure - removed vite.config.js, main.jsx, App.jsx, index.html, react-router-dom, and old CursorLog components
- created Astro layouts and pages - BaseLayout.astro for consistent structure, index.astro for homepage, blog/[...slug].astro and logs/[slug].astro for content pages
- restructured documentation to follow docs/ folder pattern - created docs/HOW-IT-WORKS.md with plain-English explanations and ASCII diagrams, docs/ARCHITECTURE.md with technical design decisions, and docs/GLOSSARY.md with jargon definitions
- removed redundant root-level documentation files - deleted CURSOR-LOG-IMPLEMENTATION.md and QUICK-START-LOG-VIEWER.md, consolidated content into new docs structure
- streamlined README.md - shortened to focus on quick start with links to new docs folder for detailed explanations

- updated response header to show model info - changed "Cursor Response" to "Response" with model info displayed below in gray IBM Plex Mono, removed hover underline from header
- added ThinkingBlock component for AI thinking display - highlighted section with brain icon on left, gray background, consecutive thoughts merged into single section with bullet list
- added SpecStory format parser support - CursorLogPage now handles both original Cursor export format and SpecStory format (with `_**User (timestamp)**_` and `_**Agent (model)**_` markers), extracts thinking blocks separately for dedicated UI display
- added remark-gfm for table rendering - installed remark-gfm plugin and added to ReactMarkdown components to properly render markdown tables, also styled tables with borders and padding
- switched cursor log page to system font - replaced IBM Plex Sans with system font stack (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, etc.)
- improved cursor response header - changed "Cursor" to "Cursor Response", added Material Icons chevron_right that rotates on expand/collapse, moved Expand/Collapse text to right side, made entire header row clickable, added Material Icons font to index.html
- switched to Atom One Dark theme for code blocks - applied inline theme in CursorLogPage.jsx with #282c34 background, #abb2bf text, purple keywords, green strings, blue functions, red tags
- removed global pre/code styles from tachyons-ext.css - deleted the conflicting light-theme code block rules that were overriding cursor log dark theme
- overhauled code block rendering in cursor log viewer - refactored ConversationBlock.jsx to use SyntaxHighlighter for ALL code blocks (with 'text' fallback for unspecified languages), added customStyle prop for consistent theming
- wired up react router for cursor log viewer - updated App.jsx with Routes for / (HomePage) and /logs/:slug (CursorLogPage), added BrowserRouter wrapper and cursor-log.css import to main.jsx, log viewer now fully functional at /logs/scout-cursor-log
- consolidated log viewer documentation into README.md - merged all documentation into main README, removed setup instructions since routing is now complete, streamlined QUICK-START-LOG-VIEWER.md to brief reference
- built cursor conversation log viewer components - created infrastructure for displaying exported Cursor conversations with sticky question navigation, user/assistant message distinction, syntax-highlighted code blocks, and responsive styling in src/components/CursorLog/, src/pages/CursorLogPage.jsx, and src/styles/cursor-log.css
- added markdown parser for cursor export format - implemented parseCursorLog utility that extracts conversation structure (title, metadata, user/cursor messages, questions for navigation) from Cursor's export format in src/utils/parseCursorLog.js
- created sticky navigation component - built StickyNav that extracts user questions, tracks scroll position, highlights current section, and enables smooth scrolling to any question in the conversation
- styled conversation blocks with visual distinction - user messages have green accent and border, cursor messages have blue accent and border, all with comfortable typography optimized for long-form reading
- moved scout cursor log to public logs directory - relocated scout-cursor-log.md to public/logs/ and created manifest.json index system for managing multiple conversation logs
- added log documentation - created README in public/logs/ explaining how to add new logs and what features the system provides, plus CURSOR-LOG-IMPLEMENTATION.md with complete technical overview
- installed markdown rendering dependencies - added react-markdown and react-syntax-highlighter packages for parsing markdown and highlighting code blocks in conversation logs

## 2025-11-26

- created comprehensive project rules document - added .cursor/rules/project-rules.mdc establishing project philosophy, Tachyons styling approach (not Tailwind), React patterns, content patterns, and AI assistant guidance
- updated bio description from "hypermedia artist" to "creative technologist" for more accurate professional positioning in HomePage.jsx
- refined work-in-progress message with em dash formatting and added "writing" to planned content sections in HomePage.jsx

## 2025-11-10

- added random takes feature - displays random opinion/thought on homepage load, documented in README, first take about Fifth Element in HomePage.jsx
- styled newsletter section - made label bold with colon, increased top margin to mt5, changed text to black in NewsletterSignup.jsx
- simplified newsletter to buttondown embed - reverted to working Buttondown form embed after API integration issues in NewsletterSignup.jsx
- updated homepage intro text - changed to work-in-progress message in HomePage.jsx
- connected newsletter to buttondown - updated form action to use actual Buttondown newsletter at studioqueral, form now functional and will add subscribers in HomePage.jsx
- added newsletter signup form - added simple email subscription form below contact email with full-width input and subscribe button in HomePage.jsx
- commented out recent work section - temporarily hidden FeaturedSection while gathering project content in HomePage.jsx
- deployed to github and configured vercel - force pushed new React project to github.com/luismqueral/studio-queral, added vercel.json configuration for Vite deployment
- added rza image to creative confidence project - updated On Creative Confidence project to use rza.png with standard display format in FeaturedSection.jsx
- added waves vol 1 project image - moved waves.png to projects directory and updated project to use image-only display (fullImage, hideTitle, hideDescription) in FeaturedSection.jsx
- removed white background from spooky looper image - used ImageMagick to make white pixels transparent with 10% fuzz tolerance for cleaner display in spooky-looper.png
- updated spooky looper project text - changed title to lowercase "spooky looper" and description to "a playground for looping sounds", enabled title and description display in FeaturedSection.jsx
- added spooky looper project - moved spooky-looper-crisp.png to projects directory and added new project entry with fullImage display in FeaturedSection.jsx
- simplified crystal legs to image-only display - added hideTitle and hideDescription flags, changed image size to w-70, now showing only year and image for minimal presentation in FeaturedSection.jsx
- enabled full image display for crystal legs - added fullImage flag to allow project to display complete image without container constraints, showing natural dimensions instead of 400x200 crop in FeaturedSection.jsx
- added crystal legs project image - updated Crystal Legs project to use actual image file at /images/projects/crystal-legs.png in FeaturedSection.jsx
- created projects image directory - added /public/images/projects/ directory to organize project thumbnail images
- added underline on hover to project links - added hover-underline class to project links for better interactive feedback in FeaturedSection.jsx
- fine-tuned project title alignment - adjusted negative left margin on year labels to -4rem for perfect flush alignment with "recent work" heading in FeaturedSection.jsx
- increased slider label font size to f5 - changed "luis, not luis" labels from f7 to f5 for better readability in WebGLMorpher.jsx
- aligned project titles flush left with heading - added negative left margin to year labels, pushing dates into left margin so project titles align with "recent work" heading in FeaturedSection.jsx
- adjusted WebGL graphic size to 450x450 - refined canvas dimensions to 450x450 pixels and container max-width to 450px for better balance between visual prominence and page layout in WebGLMorpher.jsx

## 2025-11-09

- changed image dimensions to 400px x 200px - updated container size and placeholder URLs from square (400x400) to rectangular 2:1 aspect ratio (400x200) in FeaturedSection.jsx
- wrapped images in 400px x 400px container - added container div with fixed size and bg-light-gray, images now fill container at 100% with object-fit cover in FeaturedSection.jsx
- added gray background to image placeholders - added bg-light-gray class to image elements so placeholder size is more visible in FeaturedSection.jsx
- aligned square images flush left with title/description - moved image inside the flex-auto column so it aligns with the title text instead of spanning full width, maintaining 100% width within its column in FeaturedSection.jsx
- moved project images below descriptions with 1:1 aspect ratio - repositioned images to appear under title/description instead of above, changed from 400x300 to 400x400 square placeholders, added aspectRatio CSS property in FeaturedSection.jsx
- changed project images to gray placeholders - updated all placeholder images to simple gray boxes (#e5e5e5) instead of colorful ones in FeaturedSection.jsx
- updated featured section to recent work with images - renamed "featured" to "recent work", added placeholder images to all items, increased title font to f4 and description to f5 to match homepage typography, restructured layout to show images above project info in FeaturedSection.jsx
- fixed slider functionality - changed morphValue from state to ref (morphValueRef) so the animation loop always reads the current value instead of capturing stale closures, removed redundant useEffect for morphValue changes in WebGLMorpher.jsx
- increased homepage text size to f4 - changed all paragraph text on homepage from f5 (and no class) to f4 for larger, more readable typography in HomePage.jsx
- increased base font size to 18px - updated html font-size in tachyons-ext.css so all Tachyons typography classes (f1-f7, measure, lh-copy, etc.) now render larger across the entire site
- fixed animation to start immediately on load - changed animation loop useEffect to trigger on isInitialized state instead of morphValue, so the WebGL animations (ripples, flows, swirls, pixel sorting) begin as soon as textures are loaded rather than waiting for user interaction
- rebuilt WebGLMorpher component from scratch with proper React patterns - completely rewrote the component using hooks (useRef, useState, useEffect) to properly manage WebGL context, textures, animation loop, and cleanup, ensuring sustainable code structure instead of sloppy porting
- implemented full fragment shader with all original effects - ported complete pixel sorting system (horizontal/vertical bands, diagonal anchor-based sorting, radial sorting), multi-anchor ripple effects, directional flows, curved flows, edge-to-edge waves, and corner swirls from original implementation in WebGLMorpher.jsx
- added statistically weighted randomization system - implemented biased random parameter generation (75% subtle effects, 25% extreme effects) with power curve distributions for wave frequencies, speeds, intensities, and pixel sort parameters to favor visually pleasing results
- created proper WebGL initialization and cleanup - set up vertex/fragment shader compilation, program linking, geometry buffers, texture loading with error handling, and proper resource cleanup on component unmount
- integrated interactive slider control - connected range input to morphValue state (0-100 mapped to 0.0-1.0) to smoothly transition between luis.png and pelican.png with real-time WebGL rendering updates
- added click-to-randomize functionality - clicking canvas regenerates all random parameters and re-renders with new visual effects, allowing users to explore different distortion patterns
- copied source images from old project - transferred luis.png and pelican.png from studio-queral-site static/images to new project's public/images directory for WebGL texture loading
- maintained skeleton loader UX - kept shimmer loading animation that displays while images load, then fades to reveal WebGL canvas for smooth user experience

