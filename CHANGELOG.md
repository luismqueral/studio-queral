# Changelog

## 2025-01-04
- restructured split view layout - moved intro body content (NYT, website purpose, contact) from white section into yellow header section and removed *** divider for cleaner visual hierarchy
- added [coming soon] placeholders for writing and projects sections - commented out existing content links to prepare for clean launch with music section remaining visible
- fine-tuned WebGL area spacing - increased spacing between intro text and WebGL graphic from mb2 to mb3, and between WebGL graphic and slider from mb2 to mb3 for better visual breathing room
- adjusted text area width on desktop - settled on mw5 (max-width 28rem) for tighter, more focused reading experience on non-mobile screens
- tightened spacing around WebGL/slider area - reduced padding from pa4 to pa2, changed intro text margin from mb4 to mb2, reduced canvas-to-slider spacing from mb4 to mb2, and adjusted header section padding from pv4 to pv3 for a more compact layout
- removed white background and shadow from WebGL card - WebGL morphing canvas now blends seamlessly with the yellow header section background instead of appearing as a separate white card with shadow
- extended mobile split view design to desktop version - removed mobile-only media queries so the yellow header background and white content section with full-width styling now appears on all screen sizes, creating a consistent visual split between the intro/WebGL section and main content across devices
