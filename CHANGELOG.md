# Changelog

All notable changes to this project will be documented in this file.

## 2025-11-10

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

