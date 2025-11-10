# Studio Queral 2026

A modern React + Vite personal website with WebGL graphics and newsletter integration.

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:3001

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

## Project Structure

```
├── api/
│   └── subscribe.js          # Vercel serverless function for newsletter
├── src/
│   ├── components/
│   │   ├── HomePage.jsx      # Main page component
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
