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
            <strong>Luis Queral</strong> is a product designer and creative technologist based in Baltimore, Maryland.
          </p>
          <p className="f4 lh-copy">
            He works for <em style={{ whiteSpace: 'nowrap' }}>The New York Times.</em>
          </p>
          <p className="f4 lh-copy near-black mb0">
            You can reach me at{' '}
            <a href="mailto:hey@queral.studio" className="link blue hover-dark-blue">
              hey@queral.studio
            </a>
          </p>
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
          <p className="f4 mb2 near-black fw6">Notes</p>
          <ul className="list pl0 mt2 mb4">
            {blogPosts.map((post) => (
              <li key={post.slug} className="mb2 f4 near-black">
                <a href={`/blog/${post.slug}`} className="link blue hover-dark-blue">
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

