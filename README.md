# Studio Queral 2026

A modern React + Vite personal website with WebGL graphics and newsletter integration.

## Prerequisites

- **Node.js** (v18 or higher recommended)
  
  On macOS with Homebrew:
  ```bash
  brew install node
  ```

  Or use a version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm).

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Newsletter Setup

This site uses Buttondown for newsletter subscriptions.

### Local Development

1. Create a `.env.local` file in the project root:

```env
BUTTONDOWN_API_KEY=your_api_key_here
```

2. Get your API key from https://buttondown.email/settings/programming

3. Paste your key into `.env.local`

### Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add a new variable:
   - **Name**: `BUTTONDOWN_API_KEY`
   - **Value**: Your Buttondown API key
   - **Environment**: Production, Preview, Development (select all)
4. Redeploy

## Random Takes Feature

The homepage displays a random "take" (opinion/thought) on each page load. 

### Adding New Takes

Edit `src/components/HomePage.jsx` and add to the `takes` array at the top:

```javascript
const takes = [
  "The Fifth Element is the greatest sci-fi movie ever made.",
  "Your next take here",
  "Another take here",
]
```

Each page load will randomly select one take to display.

## Project Structure

```
├── api/
│   └── subscribe.js          # Vercel serverless function for newsletter
├── src/
│   ├── components/
│   │   ├── HomePage.jsx      # Main page component (includes random takes)
│   │   ├── WebGLMorpher.jsx  # WebGL image morpher
│   │   ├── NewsletterSignup.jsx  # Newsletter form component
│   │   └── FeaturedSection.jsx   # Projects section
│   └── main.jsx
├── public/
│   └── images/               # Static images
└── package.json
```

## Tech Stack

- React 18
- Vite 5
- WebGL for graphics
- Tachyons CSS
- Buttondown API for newsletter
- Vercel for hosting

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BUTTONDOWN_API_KEY` | Buttondown newsletter API key | Yes |
