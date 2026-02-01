# Changelog

All notable changes to this project will be documented in this file.

2026-01-28
- refined Layout P with fixed 400px left sidebar containing WebGL morpher, bio, and contact links that stays in place while notes scroll on the right
- added custom 700px CSS breakpoint for mobile/desktop switching - mobile layout stacks content and centers it nicely
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

