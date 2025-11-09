# Studio Queral - React Homepage

A React recreation of the Studio Queral homepage featuring an interactive WebGL morphing canvas.

## Features

- **WebGL Morphing Effect**: Interactive canvas that morphs between two images with complex distortion effects
- **Statistically Weighted Randomization**: 75% subtle effects, 25% extreme effects for varied visual experiences
- **Click to Randomize**: Click the canvas to generate new random distortion parameters
- **Interactive Slider**: Control the morph transition between images
- **Responsive Design**: Works on all screen sizes
- **Tachyons CSS**: Utility-first CSS framework matching the original site

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tachyons CSS** - Utility-first CSS framework
- **WebGL** - For the morphing canvas effect
- **Vanilla JavaScript** - No TypeScript for simplicity

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding Images

Place your images in the `public/images/` directory:

- `public/images/luis.png` - First image for the morph
- `public/images/pelican.png` - Second image for the morph

The images should ideally be square (300x300px or larger) for best results.

## Project Structure

```
studio-queral-react/
├── public/
│   └── images/          # Add your images here
├── src/
│   ├── components/
│   │   ├── HomePage.jsx           # Main homepage component
│   │   ├── WebGLMorpher.jsx       # WebGL canvas component
│   │   └── FeaturedSection.jsx    # Featured work list
│   ├── styles/
│   │   ├── custom.css             # WebGL and animation styles
│   │   └── tachyons-ext.css       # Tachyons extensions
│   ├── App.jsx                     # Root component
│   └── main.jsx                    # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## WebGL Morpher Component

The WebGL morpher implements:

- **Multi-anchor distortion system** - Ripples, swirls, and flows from edges/corners (no center)
- **Progressive pixel sorting** - Brightness-based sorting effects in horizontal, vertical, diagonal, and radial patterns
- **Weighted randomization** - Parameters favor subtle effects (75%) over extreme ones (25%)
- **Continuous animation** - Time-based shader effects that evolve
- **Smooth morphing** - Gradual transition between two images

### Customization

You can adjust the morph behavior by modifying the `WebGLMorpher.jsx` component:

- Change bias ratios in `generateRandomParams()` for different effect distributions
- Modify shader uniforms for different visual styles
- Adjust morph transition timing in the fragment shader's `pelicanBlend` calculation

## Development

The dev server runs on `http://localhost:3000` by default.

All changes will hot-reload automatically.

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory ready for deployment.

## License

MIT

## Author

Luis Queral - [hey@queral.studio](mailto:hey@queral.studio)

