# Changelog

All notable changes to this project will be documented in this file.

2026-02-06
- updated README with documentation for the CDN media rewrite, `--env-file` usage for the upload script, and Vercel env var setup instructions
- fixed `npm run upload:notes-media` to auto-load `.env.local` via `--env-file` flag so blob tokens are picked up automatically
- fixed note media (images/videos) not loading on production by adding a CDN rewrite rule in vercel.json - requests to /notes/:slug/:file+ now proxy to the Vercel Blob CDN instead of being caught by the SPA catch-all

2026-02-05
- added IBM Plex Mono font via Google Fonts with `.font-ibm-plex-mono` utility class for data-heavy tables
- added complex baseball stats table to Data Synth case study showcasing dense numerical data in IBM Plex Mono
- fixed note images not loading in production: Vercel was serving index.html for /notes/* due to SPA catch-all; added rewrite so /notes/(.*) goes to api/notes-media which redirects to the notes CDN (requires VITE_NOTES_CDN_BASE_URL or NOTES_CDN_BASE_URL in Vercel)
- added Vite dev middleware to serve note media from notes-media/notes at /notes so local dev shows images without setting VITE_NOTES_CDN_BASE_URL
- hardened NotePage URL rewrite: normalize CDN base URL with trim and safe empty check
- added "Introducing Data Synth" case study page for the data sonification project (datasynth.vercel.app)
- converted all OTF fonts to WOFF2 for better web performance (~30-50% smaller file sizes) using fonttools
- added 70+ new fonts to tachyons-ext.css with utility classes: Pilowlava, Compagnon, Mess, Anthony, Teranoptia, Typefesse (2 variants), Kaerukaeru, all 25 Cheee variants, 20 Obert variants, and 18 Bianzhidai variants
- updated StyleGuidePage with new font sections: Fun & Experimental, Cheee Family, Obert Family, and Bianzhidai Family with clickable previews
- added Holy Diver audio player (starting at :50) and autoplay video to richard-cigarette-bot post
- improved upload-notes-media script to skip unchanged files (compares by pathname and size), added --force flag to override
- made Dio album cover image larger (400px) and centered in richard-cigarette-bot post
- added 4 screenshots to "Richard Cigarette (Bot)" post showing the last.fm profile and scrobble stats
- updated notes index password screen: added keyboard-cowboy.gif image, removed title and description text, changed Enter button to blue
- added new blog entry "Richard Cigarette (Bot)" about a last.fm bot obsessed with Dio's "Holy Diver" album in src/notes/content/richard-cigarette-bot.md and registered it in src/notes/index.js
- added "Custom Extensions" section to StyleGuidePage showing all the new colors with swatches
- added custom color palette to tachyons-ext.css: purple, teal, coral, indigo, amber, lime, cyan, rose, and slate with text/bg/border/hover variants plus washed backgrounds for each
- added TeX Gyre font family: Heros (.font-tex-heros), Heros Condensed (.font-tex-heros-cn), and Termes (.font-tex-termes) with full weight/style variants
- updated style guide: aligned all typography tables to consistent 200px first column to fit longest class names, moved .font-neue-haas-unica to Other Fonts section, wider color swatches (96x48px) with reduced border radius
- updated StyleGuidePage header to pale yellow background with personalized intro text explaining the style guide purpose and recommending Tachyons
- added /styles route with StyleGuidePage documenting the custom Tachyons instance: color palette (grays, accents, semantic, washed), typography scale (f1-f7 with px values at 22px base), font weights, breakpoints, and custom utility classes
- added ingredient card styling with full-width mobile breakout (`ingredient-card` class) and consistent padding
- tightened list spacing (0.25rem between items) with nested list rules for consistent vertical rhythm
- updated paella recipe: nested ingredient list with styled card wrapper, original recipe as blockquotes
- switched syntax highlighting to solarizedlight theme, scoped inline code CSS to avoid theme conflicts
- fixed 404 errors on production for article pages - added SPA fallback rewrite in vercel.json so direct navigation to routes like /notes/paella-recipe properly loads index.html instead of returning 404
- cleaned up code block implementation: simplified CodeBlock component for reuse across notes
- re-added syntax highlighting for code blocks using react-syntax-highlighter (without custom block types)
- removed custom code block types (ingredients, note, tip, warning) - reverted to simple markdown styling for ingredients list
- added password-protected /notes index page showing public vs draft status
- added "an ode to interns" and "forget grades" essays from Figure 53 (2013)
- migrated wu-tang assets to CDN with proper /notes/ paths
- updated NotePage to strip first # heading and show "last updated" in footer
- moved notes media off-repo by ignoring `public/notes/**` and adding a simple `VITE_NOTES_CDN_BASE_URL` rewrite so note images/videos can be served from a CDN/blob without changing markdown
- added a small `public/notes/README.md` to document the new media hosting convention
- documented the content/media publishing pipeline and current CDN setup status in `CONTENT_PIPELINE.md` so future notes can ship without bloating git
- added a simple `npm run upload:notes-media` script for uploading `notes-media/notes/**` to vercel blob and pinned `@vercel/blob` to a node 18 compatible version for local dev
- made the uploader accept custom blob token env var prefixes (like `STUDIO_QUERAL_READ_WRITE_TOKEN`) so it works with vercel's advanced blob env naming

2026-02-04
- added prerequisites section to README documenting Node.js requirement and installation, fixed localhost port from 3001 to 3000
- installed Node.js via Homebrew and npm dependencies to enable local development on new machine

2026-02-03
- added remark-gfm plugin and table CSS styling to enable markdown table rendering in notes
- added content for "a guidebook for product cowboys" note (generating-software.md) - covers criteria for "vibecoding" projects, example use cases, and red flags

2026-02-01
- created AboutPage stub with single-column layout, placeholder content, and entrance animation in src/pages/AboutPage.jsx
- added animated page transition for "learn more" link: sidebar expands to full width while content fades out and slides left in HomePageLayouts.jsx
- renamed "about me" to "learn more" and linked to /about route in HomePageLayouts.jsx
- added /about route in App.jsx
- changed sidebar link bullets from list dots to thick horizontal dashes (em dashes) in gray for about me, contact, instagram links in HomePageLayouts.jsx
- split newsletter heading into two lines: "thanks for reading!" (bold) and "consider joining my mailing list:" (gray) in NewsletterSignup.jsx
- restructured newsletter form layout: moved subscribe button below description, made it full width (500px max), stacked vertically in NewsletterSignup.jsx
- updated newsletter description to "you'll get updates on projects / writing / life a few times a year, that's it!" in NewsletterSignup.jsx
- changed newsletter heading from "keep in touch!" to "thanks for reading" and moved description text below the input in NewsletterSignup.jsx
- reduced top padding and changed newsletter section to lightest gray (bg-near-white) in HomePageLayouts.jsx
- redesigned WebGL playground with brutalist aesthetic - black background, monospace typography, raw borders, no rounded corners, high contrast white/black UI in webgl-playground.css
- improved responsive layout with CSS grid - stacks vertically on tablet, adapts control panel height, handles landscape mobile with side-by-side layout
- added multiple breakpoints: 1024px (tablet stack), 640px (mobile compact), 400px (small screens), landscape detection for proper orientation handling
- updated all parameter labels to uppercase with underscores (WAVE_FREQ_X, CENTER_POS, etc.) for raw industrial feel
- simplified image thumbnails to grayscale by default, color on hover/selected
- refactored section rendering with reusable Section component for cleaner collapsible headers in WebGLPlaygroundPage.jsx
- created interactive WebGL playground page at /playground with comprehensive real-time parameter controls for exploring shader effects
- added image selection from 7 preset images plus custom upload capability
- implemented 6 effect presets (Default, Psychedelic, Glitch Art, Calm Waters, Vortex, Retro VHS) for quick exploration
- built extensive control panel with sliders for waves, ripples, swirls, turbulence, pixel sorting, color adjustments, and post-effects
- added XY pad controls for positioning ripple and swirl effect centers - can also click directly on canvas
- created custom fragment shader supporting all parameters with real-time uniform updates
- made "keep in touch" newsletter section full width with light gray background - moved it outside the constrained content areas in both mobile and desktop views of LayoutP in HomePageLayouts.jsx

- changed notes bullet points to large asterisks (*) in moon-gray color with proper vertical alignment to heading text
- refactored subtitle system to use slug-based keys instead of numeric indices - subtitles no longer break when posts are reordered or added
- added multiple new blog posts: "how to attend meetings", "how designers should talk about AI", "diagramming with LLMs", "my design journal from when I worked for the NYC subway", "what it's like to design software for trading floors"
- made WebGL component grayscale by default with color on hover, smooth 0.3s transitions, and removed outline on hover
- added newsletter signup at bottom of notes section with minimal styling: "if you like these, consider joining my mailing list"
- fixed WebGL loading flash by using aspect-ratio instead of fixed height, added opacity fade-in transition
- various title and subtitle content updates for blog posts including "generative design thinking", "the split triple diamond", "media tool kit", etc.

2026-01-28
- added 6 experimental homepage layouts (J-O) with bolder form-making: "The Edge" (asymmetric left-aligned), "The Void" (dark cinematic), "The Overlap" (layered with giant type), "The Scroll" (ultra-narrow vertical), "The Split" (hard 50/50 divide), and "The Statement" (massive headline architecture) in HomePageLayouts.jsx
- added Notes section to all standard layouts (A-E) to incorporate article list across all variations
- removed WIP message, changed "He currently works" to "He works", updated slider labels to use site font instead of mono in HomePage.jsx and WebGLMorpher.jsx
- increased horizontal padding on content containers (pa2 to ph4) for better mobile readability in HomePage.jsx
- switched back to system default font for faster load times - removed Google Fonts import in index.html
- inverted section colors: intro and notes now white, WebGL section now light gray in HomePage.jsx
- fixed gaps around section backgrounds by removing horizontal padding from App container and resetting body margin in App.jsx and tachyons-ext.css
- restructured homepage into three horizontal sections with alternating backgrounds: intro (light gray), WebGL applet (white), notes+newsletter (light gray) in HomePage.jsx
- moved "still working on this site" and contact info above WebGL applet, increased Notes section text to f4 to match intro sizing in HomePage.jsx
- set text content areas to 580px max-width while keeping WebGL applet at 540px for a slightly wider text measure in HomePage.jsx
- increased base font size to 22px in tachyons-ext.css for larger overall typography
- updated homepage intro to third person: "Luis Queral is a product designer..." and "He currently works for The New York Times."
- adjusted homepage layout so main content matches WebGL applet width (450px), renamed "Writing" section to "Notes", and moved newsletter signup to a footer section at the bottom of the page in HomePage.jsx
- switched site typography from IBM Plex to system default fonts - removed Google Fonts import from index.html, updated body class to use font-system, and replaced ibm-mono references with font-system-mono in components for faster load times and native feel

2026-01-26
- added basic blog post routing so homepage titles link to real post pages with a placeholder template
- linked homepage blog titles to their asset folders for now so each entry has a working target in HomePage.jsx
- added a test blog entry in the blog registry so it appears in the homepage list, with a placeholder media folder
- set up a simple blog content registry and media folder conventions so posts can live in src/content/blog and assets in public/blog
- added a minimal writing list below the newsletter signup so blog titles show up on the homepage in HomePage.jsx

## 2025-12-01

- built repeatable cursor conversation log viewer system - created complete infrastructure for displaying exported Cursor conversations with sticky question navigation, user/assistant message distinction, syntax-highlighted code blocks, and responsive styling in src/components/CursorLog/, src/pages/CursorLogPage.jsx, and src/styles/cursor-log.css
- added markdown parser for cursor export format - implemented parseCursorLog utility that extracts conversation structure (title, metadata, user/cursor messages, questions for navigation) from Cursor's export format in src/utils/parseCursorLog.js
- integrated react router for log navigation - added BrowserRouter to main.jsx and created route structure in App.jsx to support /logs/:logSlug pattern for dynamic log viewing
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

