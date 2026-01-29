import { useState, useEffect } from 'react'
import WebGLMorpher from './WebGLMorpher'
import FeaturedSection from './FeaturedSection'
import NewsletterSignup from './NewsletterSignup'
import blogPosts from '../content/blog/posts'

// Random takes - add more here
const takes = [
  "The Fifth Element is the greatest sci-fi movie ever made.",
]


function HomePage() {
  const [randomTake, setRandomTake] = useState('')

  useEffect(() => {
    // Pick a random take on component mount
    const randomIndex = Math.floor(Math.random() * takes.length)
    setRandomTake(takes[randomIndex])
  }, [])
  return (
    <>
      {/* Section 1: Introduction - White */}
      <section className="bg-white pv4">
        <div className="center ph4" style={{ maxWidth: '580px' }}>
          <p className="f4 lh-copy near-black">
            <strong>Luis Queral</strong> is a product designer and creative technologist currently working for <em style={{ whiteSpace: 'nowrap' }}>The New York Times.</em>
          </p>
          <p className="f4 lh-copy near-black">
            He lives in Baltimore and enjoys writing, making audio-visual experiments, and hanging out with his kids :-).
          </p>
          <div className="ml3 mt3">
            <a href="#" className="blue underline hover-no-underline db f4">More info</a>
            <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline db f4">Contact</a>
          </div>
        </div>
      </section>

      {/* Section 2: WebGL Applet - Light Gray */}
      <section className="bg-near-white pv4">
        <div className="center ph4" style={{ maxWidth: '540px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
        </div>
      </section>

      {/* Section 3: Notes + Newsletter - White */}
      <section className="bg-white pv4">
        <div className="center ph4" style={{ maxWidth: '580px' }}>
          <p className="f4 mb3 near-black fw6">Notes</p>
          <ul className="pl4 mt2 mb4">
            {blogPosts.map((post) => (
              <li key={post.slug} className="mb3 f4 near-black lh-copy">
                <a href={`/blog/${post.slug}`} className="blue underline hover-no-underline">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
          <NewsletterSignup />
        </div>
      </section>
    </>
  )
}

export default HomePage

