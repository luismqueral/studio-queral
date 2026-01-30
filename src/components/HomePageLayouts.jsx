import { useState, useEffect } from 'react'
import WebGLMorpher from './WebGLMorpher'

// =============================================================================
// LAYOUT A: "The Reveal" - WebGL hero at top, bio below
// Surprise: The morphing face greets you first
// =============================================================================
export function LayoutA() {
  return (
    <>
      {/* Hero: WebGL first */}
      <section className="bg-near-white pv5">
        <div className="center ph3" style={{ maxWidth: '480px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
        </div>
      </section>

      {/* Bio below */}
      <section className="bg-white pv4">
        <div className="center ph3" style={{ maxWidth: '580px' }}>
          <p className="f4 lh-copy near-black">
            <strong>Luis Queral</strong> is a product designer and creative technologist.
          </p>
          <p className="f4 lh-copy near-black">
            He works for <em style={{ whiteSpace: 'nowrap' }}>The New York Times</em> designing tools and workflows for platforms.
          </p>
          <p className="f4 lh-copy near-black">
            In his spare time, he enjoys writing, making audio-visual experiments, and hanging out with his kids :-).
          </p>
          <p className="f4 lh-copy mt4">
            <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a>
          </p>
        </div>
      </section>
    </>
  )
}

// =============================================================================
// LAYOUT B: "Side by Side" - Bio left, WebGL right on desktop
// Confident, gallery-like feel
// =============================================================================
export function LayoutB() {
  return (
    <section className="bg-white min-vh-100 flex items-center">
      <div className="center ph3 w-100" style={{ maxWidth: '1000px' }}>
        <div className="flex-ns items-center-ns">
          {/* Bio on left */}
          <div className="w-100 w-50-ns pr4-ns mb4 mb0-ns">
            <p className="f3 lh-title near-black mb3">
              <strong>Luis Queral</strong>
            </p>
            <p className="f4 lh-copy near-black">
              Product designer and creative technologist at <em>The New York Times</em>, designing tools and workflows for platforms.
            </p>
            <p className="f5 lh-copy gray mt3">
              Writing, audio-visual experiments, hanging out with kids :-).
            </p>
            <p className="f5 mt4">
              <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">Contact →</a>
            </p>
          </div>
          
          {/* WebGL on right */}
          <div className="w-100 w-50-ns">
            <WebGLMorpher
              image1Url="/images/luis.png"
              image2Url="/images/pelican.png"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// LAYOUT C: "The Business Card" - Minimal, centered, tight stack
// WebGL as small avatar, everything very condensed
// =============================================================================
export function LayoutC() {
  return (
    <section className="bg-white min-vh-100 flex items-center justify-center">
      <div className="center ph3 tc" style={{ maxWidth: '400px' }}>
        {/* Small WebGL avatar */}
        <div className="center mb4" style={{ maxWidth: '200px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
        </div>
        
        <p className="f3 lh-title near-black mb2">
          <strong>Luis Queral</strong>
        </p>
        <p className="f5 lh-copy gray mb3">
          Product Designer & Creative Technologist
        </p>
        <p className="f6 lh-copy gray mb4">
          The New York Times · Baltimore
        </p>
        
        <div className="flex justify-center">
          <a href="mailto:hey@queral.studio" className="f6 blue underline hover-no-underline mh2">Email</a>
          <span className="gray">·</span>
          <a href="#" className="f6 blue underline hover-no-underline mh2">Work</a>
          <span className="gray">·</span>
          <a href="#" className="f6 blue underline hover-no-underline mh2">Notes</a>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// LAYOUT D: "The Wink" - Playful with rotating elements
// Random emoji/symbol adds surprise each visit
// =============================================================================
export function LayoutD() {
  const [randomEmoji, setRandomEmoji] = useState('◈')
  const [caption, setCaption] = useState('')
  
  const emojis = ['◈', '◉', '◎', '●', '○', '◐', '◑', '◒', '◓']
  const captions = [
    'this is what I look like sometimes',
    'drag the slider',
    'that\'s me on the left',
    'I promise the right one is also me',
    '← human · bird →',
  ]
  
  useEffect(() => {
    setRandomEmoji(emojis[Math.floor(Math.random() * emojis.length)])
    setCaption(captions[Math.floor(Math.random() * captions.length)])
  }, [])
  
  return (
    <>
      <section className="bg-white pv4">
        <div className="center ph3" style={{ maxWidth: '580px' }}>
          <p className="f4 lh-copy near-black">
            <span className="gray mr2">{randomEmoji}</span>
            <strong>Luis Queral</strong> is a product designer and creative technologist.
          </p>
          <p className="f4 lh-copy near-black">
            <span className="gray mr2">{randomEmoji}</span>
            He works for <em style={{ whiteSpace: 'nowrap' }}>The New York Times</em> designing tools and workflows for platforms.
          </p>
          <p className="f4 lh-copy near-black">
            <span className="gray mr2">{randomEmoji}</span>
            In his spare time, he enjoys writing, making audio-visual experiments, and hanging out with his kids :-).
          </p>
          <p className="f4 lh-copy mt3">
            <span className="gray mr2">→</span>
            <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">Contact</a>
          </p>
        </div>
      </section>

      <section className="bg-near-white pv4">
        <div className="center ph3" style={{ maxWidth: '540px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
          <p className="f6 gray tc mt3 i">{caption}</p>
        </div>
      </section>
    </>
  )
}

// =============================================================================
// LAYOUT E: "Stacked Minimal" - Very clean, just the essentials
// Name big, details small, WebGL prominent
// =============================================================================
export function LayoutE() {
  return (
    <>
      <section className="bg-white pv5">
        <div className="center ph3" style={{ maxWidth: '580px' }}>
          <h1 className="f1 fw7 near-black mb2 mt0">Luis Queral</h1>
          <p className="f5 gray mt0 mb4">
            Product Designer · Creative Technologist · NYT
          </p>
          
          <div className="mv4" style={{ maxWidth: '480px' }}>
            <WebGLMorpher
              image1Url="/images/luis.png"
              image2Url="/images/pelican.png"
            />
          </div>
          
          <p className="f4 lh-copy near-black mt4">
            I design tools and workflows for platforms at The New York Times. 
            Outside of work, I write, make audio-visual experiments, and hang out with my kids.
          </p>
          
          <p className="f5 mt4">
            <a href="mailto:hey@queral.studio" className="near-black underline hover-no-underline">hey@queral.studio</a>
          </p>
        </div>
      </section>
    </>
  )
}
