import WebGLMorpher from '../components/WebGLMorpher'
import NewsletterSignup from '../components/NewsletterSignup'

function AboutPage() {
  return (
    <div className="min-vh-100">
      {/* Header with WebGL and slider */}
      <div className="bg-near-white pa4">
        <div className="center mw5-5">
          <p className="f6 mb4"><a href="/" className="blue underline hover-no-underline">← back</a></p>
        </div>
        <div className="center mw5-3">
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
            hideSlider={false}
          />
        </div>
      </div>
      
      {/* Text content */}
      <div className="bg-white pa4">
        <div className="center mw5-5">
          <p className="f5 lh-copy near-black">
            <strong>Luis Queral</strong> is a product designer and creative technologist based in Baltimore, MD.
          </p>
          
          {/* <p className="f5 lh-copy near-black">
            He currently works for <em>The New York Times</em> focusing on improving developer workflows and building the Generative Design Lab — an initiative exploring how AI can augment creative and editorial processes.
          </p>
          
          <p className="f5 lh-copy near-black">
            Before that, he designed software for trading floors at Goldman Sachs, built tools for the MTA's subway system, and worked on various products across fintech, media, and enterprise software.
          </p>
          
          <p className="f5 lh-copy near-black">
            In his spare time, he enjoys writing, making video art, and generally hanging out.
          </p>
          
          <p className="f5 lh-copy near-black">
            He graduated from UMBC's <em>Interdisciplinary Studies</em> program where he wrote a thesis using storytelling as a framing for designing interactive experiences.
          </p> */}
          
          <p className="tc moon-gray mv4 bullet-asterisk">*&nbsp;*&nbsp;*</p>
          
          <p className="f5 lh-copy near-black">
            I'm not on social media much, but if I am, it's mostly on this <a href="https://instagram.com/studio.queral" className="blue underline hover-no-underline">instagram</a> page.
          </p>
          
          <p className="f5 lh-copy near-black">
            A few times a year, I gather my thoughts, share some projects, and re-connect with people I enjoy.
          </p>
          
          <p className="f5 lh-copy near-black">
            If you'd like to follow my work, feel free to join my <strong>mailing list</strong>.
          </p>
          
          <div className="mt3">
            <NewsletterSignup showHeading={false} showDescription={false} />
          </div>
          
          <div className="f6 mt4 near-black">
            <p className="mb0"><a href="/" className="blue underline hover-no-underline">← back</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
