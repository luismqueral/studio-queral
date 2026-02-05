import { Link } from 'react-router-dom'

/**
 * StyleGuidePage - Documents the custom Tachyons instance for Studio Queral
 * Reference guide for colors, typography, and custom utilities
 */

// Complete Tachyons color palette
const allColors = [
  // Row 1: Black & Grays start
  { name: 'black', bg: 'bg-black', hex: '#000000' },
  { name: 'near-black', bg: 'bg-near-black', hex: '#111111' },
  { name: 'dark-gray', bg: 'bg-dark-gray', hex: '#333333' },
  { name: 'mid-gray', bg: 'bg-mid-gray', hex: '#555555' },
  // Row 2: Grays continued
  { name: 'gray', bg: 'bg-gray', hex: '#777777' },
  { name: 'silver', bg: 'bg-silver', hex: '#999999' },
  { name: 'light-silver', bg: 'bg-light-silver', hex: '#AAAAAA' },
  { name: 'moon-gray', bg: 'bg-moon-gray', hex: '#CCCCCC' },
  // Row 3: Light grays & white
  { name: 'light-gray', bg: 'bg-light-gray', hex: '#EEEEEE' },
  { name: 'near-white', bg: 'bg-near-white', hex: '#F4F4F4' },
  { name: 'white', bg: 'bg-white', hex: '#FFFFFF' },
  null, // empty cell
  // Row 4: Reds & Orange
  { name: 'dark-red', bg: 'bg-dark-red', hex: '#E7040F' },
  { name: 'red', bg: 'bg-red', hex: '#FF4136' },
  { name: 'light-red', bg: 'bg-light-red', hex: '#FF725C' },
  { name: 'orange', bg: 'bg-orange', hex: '#FF6300' },
  // Row 5: Yellows & Purple
  { name: 'gold', bg: 'bg-gold', hex: '#FFB700' },
  { name: 'yellow', bg: 'bg-yellow', hex: '#FFD700' },
  { name: 'light-yellow', bg: 'bg-light-yellow', hex: '#FBF1A9' },
  { name: 'purple', bg: 'bg-purple', hex: '#5E2CA5' },
  // Row 6: Purples & Pinks
  { name: 'light-purple', bg: 'bg-light-purple', hex: '#A463F2' },
  { name: 'dark-pink', bg: 'bg-dark-pink', hex: '#D5008F' },
  { name: 'hot-pink', bg: 'bg-hot-pink', hex: '#FF41B4' },
  { name: 'pink', bg: 'bg-pink', hex: '#FF80CC' },
  // Row 7: Pink & Greens
  { name: 'light-pink', bg: 'bg-light-pink', hex: '#FFA3D7' },
  { name: 'dark-green', bg: 'bg-dark-green', hex: '#137752' },
  { name: 'green', bg: 'bg-green', hex: '#19A974' },
  { name: 'light-green', bg: 'bg-light-green', hex: '#9EEBCF' },
  // Row 8: Blues
  { name: 'navy', bg: 'bg-navy', hex: '#001B44' },
  { name: 'dark-blue', bg: 'bg-dark-blue', hex: '#00449E' },
  { name: 'blue', bg: 'bg-blue', hex: '#357EDD' },
  { name: 'light-blue', bg: 'bg-light-blue', hex: '#96CCFF' },
  // Row 9: Light blues & Washed
  { name: 'lightest-blue', bg: 'bg-lightest-blue', hex: '#CDECFF' },
  { name: 'washed-blue', bg: 'bg-washed-blue', hex: '#F6FFFE' },
  { name: 'washed-green', bg: 'bg-washed-green', hex: '#E8FDF5' },
  { name: 'washed-yellow', bg: 'bg-washed-yellow', hex: '#FFFCEB' },
  // Row 10: Washed red
  { name: 'washed-red', bg: 'bg-washed-red', hex: '#FFDFDF' },
]

// Custom colors - extending Tachyons palette
const customColors = [
  { name: 'deep-purple', bg: 'bg-deep-purple', hex: '#512DA8' },
  { name: 'washed-purple', bg: 'bg-washed-purple', hex: '#EDE7F6' },
  { name: 'teal', bg: 'bg-teal', hex: '#009688' },
  { name: 'washed-teal', bg: 'bg-washed-teal', hex: '#E0F2F1' },
  { name: 'coral', bg: 'bg-coral', hex: '#FF6F61' },
  { name: 'washed-coral', bg: 'bg-washed-coral', hex: '#FFEAE8' },
  { name: 'indigo', bg: 'bg-indigo', hex: '#3F51B5' },
  { name: 'washed-indigo', bg: 'bg-washed-indigo', hex: '#E8EAF6' },
  { name: 'amber', bg: 'bg-amber', hex: '#FFB300' },
  { name: 'washed-amber', bg: 'bg-washed-amber', hex: '#FFF8E1' },
  { name: 'lime', bg: 'bg-lime', hex: '#C0CA33' },
  { name: 'washed-lime', bg: 'bg-washed-lime', hex: '#F9FBE7' },
  { name: 'cyan', bg: 'bg-cyan', hex: '#00BCD4' },
  { name: 'washed-cyan', bg: 'bg-washed-cyan', hex: '#E0F7FA' },
  { name: 'rose', bg: 'bg-rose', hex: '#E91E63' },
  { name: 'washed-rose', bg: 'bg-washed-rose', hex: '#FCE4EC' },
  { name: 'slate', bg: 'bg-slate', hex: '#607D8B' },
  { name: 'washed-slate', bg: 'bg-washed-slate', hex: '#ECEFF1' },
]

// Typography scale - Tachyons defaults at base 22px
const typeScale = [
  { class: 'f1', size: '3rem', px: '66px', preview: 'Headline' },
  { class: 'f2', size: '2.25rem', px: '49.5px', preview: 'Subheadline' },
  { class: 'f3', size: '1.5rem', px: '33px', preview: 'Section title' },
  { class: 'f4', size: '1.25rem', px: '27.5px', preview: 'Large body text' },
  { class: 'f5', size: '1rem', px: '22px', preview: 'The quick brown fox jumps over the lazy dog. This is the base body text size at 22px, used for main content throughout the site.' },
  { class: 'f6', size: '.875rem', px: '19.25px', preview: 'The quick brown fox jumps over the lazy dog. This smaller text size is useful for secondary information, captions, and metadata.' },
  { class: 'f7', size: '.75rem', px: '16.5px', preview: 'Caption text' },
]

function ColorSwatch({ color }) {
  if (!color) return null
  
  return (
    <li className="flex items-center mb3" style={{ breakInside: 'avoid' }}>
      <div 
        className={`${color.bg} ba b--light-gray br1`}
        style={{ width: '96px', height: '48px', flexShrink: 0 }}
      />
      <div className="ml3">
        <strong className="f6 near-black db">{color.name}</strong>
        <code className="f7 gray">{color.hex}</code>
      </div>
    </li>
  )
}

function StyleGuidePage() {
  return (
    <div>
      <header className="bg-light-yellow pa4">
        <div className="measure-wide center">
          <p className="f6 mb3">
            <Link to="/" className="near-black underline hover-no-underline">← back</Link>
          </p>
          <h1 className="f1 font-blackletter normal near-black mb3 lh-title">Style Reference</h1>
          <p className="f5 near-black lh-copy mb3">
            This is a reference guide for the styles of this site as I continue to build it out.
          </p>
          <p className="f5 near-black lh-copy mb0">
            I'm using <a href="https://tachyons.io" className="near-black underline hover-no-underline" target="_blank" rel="noopener noreferrer">Tachyons</a> which is a lightweight, no-compile utility style framework. I have been using it for the past 10 years with little drama, you should try it too!
          </p>
        </div>
      </header>

      <div className="pa4 mw7 center">

      {/* Typography */}
      <section className="mb5">
        <h2 className="f4 near-black mb3 pb2 bb b--light-gray">Typography</h2>
        
        <table className="w-100 mb4 style-guide-table" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            {typeScale.map((t) => (
              <tr key={t.class} className="bb b--light-gray hover-bg-near-white">
                <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.{t.class}</code></td>
                <td className="pv2"><span className={`${t.class} near-black`}>{t.preview}</span></td>
                <td className="pv2 tr f7 gray" style={{ width: '80px' }}>{t.size}</td>
                <td className="pv2 tr f7 silver" style={{ width: '60px' }}>{t.px}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="f5 gray mb3">Font Stacks</h3>
        <table className="w-100 mb4 style-guide-table" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-system</code></td>
              <td className="pv2 font-system f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-system-serif</code></td>
              <td className="pv2 font-system-serif f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-system-mono</code></td>
              <td className="pv2 font-system-mono f5 near-black">const x = 42;</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-times</code></td>
              <td className="pv2 font-times f4 near-black">The quick brown fox</td>
            </tr>
          </tbody>
        </table>

        <h4 className="f6 gray mb2">Other Fonts</h4>
        <table className="w-100 mb4 style-guide-table" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-neue-haas-unica</code></td>
              <td className="pv2 font-neue-haas-unica f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-galapagos-a</code></td>
              <td className="pv2 font-galapagos-a f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-galapagos-ab</code></td>
              <td className="pv2 font-galapagos-ab f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-galapagos-abc</code></td>
              <td className="pv2 font-galapagos-abc f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-comic</code></td>
              <td className="pv2 font-comic f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-blackletter</code></td>
              <td className="pv2 font-blackletter f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-algerian</code></td>
              <td className="pv2 font-algerian f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-brush-script</code></td>
              <td className="pv2 font-brush-script f3 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-curlz</code></td>
              <td className="pv2 font-curlz f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-davida</code></td>
              <td className="pv2 font-davida f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-hobo</code></td>
              <td className="pv2 font-hobo f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-relinquish</code></td>
              <td className="pv2 font-relinquish f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-tex-heros</code></td>
              <td className="pv2 font-tex-heros f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-tex-heros-cn</code></td>
              <td className="pv2 font-tex-heros-cn f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="bb b--light-gray hover-bg-near-white">
              <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="f7 gray">.font-tex-termes</code></td>
              <td className="pv2 font-tex-termes f4 near-black">The quick brown fox</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Colors */}
      <section className="mb5">
        <h2 className="f4 near-black mb3 pb2 bb b--light-gray">Color Palette</h2>
        
        <h3 className="f5 gray mb3">Tachyons Defaults</h3>
        <ul className="list pl0 color-palette-grid mb4">
          {allColors.filter(c => c !== null).map((c) => (
            <ColorSwatch key={c.name} color={c} />
          ))}
        </ul>

        <h3 className="f5 gray mb3">Custom Extensions</h3>
        <ul className="list pl0 color-palette-grid">
          {customColors.map((c) => (
            <ColorSwatch key={c.name} color={c} />
          ))}
        </ul>
      </section>

      <footer className="mt5 pt4 bt b--light-gray">
          <p className="f6 gray">
            Based on <a href="https://tachyons.io" className="blue underline hover-no-underline" target="_blank" rel="noopener noreferrer">Tachyons</a> v4.12.0
          </p>
        </footer>
      </div>
    </div>
  )
}

export default StyleGuidePage
