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
    <li 
      className="flex items-center mb3 hover-bg-near-white hover-br2 pointer active-nudge" 
      style={{ breakInside: 'avoid' }}
      onClick={() => navigator.clipboard.writeText(color.name)}
    >
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
    <div style={{ userSelect: 'none' }}>
      <header className="bg-light-yellow pa4">
        <div className="measure-wide center">
          <p className="f6 mb3">
            <Link to="/" className="near-black underline hover-no-underline">← back</Link>
          </p>
          <h1 className="f1 font-blackletter normal near-black mb3 lh-title">Style Reference</h1>
          <p className="f5 near-black lh-copy mb0">
            This is a reference guide for the styles of this site as I continue to build it out.
          </p>
        </div>
      </header>

      <div className="pa4 mw7 center">

      {/* Typography */}
      <section className="mb5">
        <h2 className="f4 near-black mb3">Typography</h2>
        
        <table className="w-100 mb4 style-guide-table" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            {typeScale.map((t) => (
              <tr key={t.class} className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText(t.class)}>
                <td className="pv2 pl4" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.{t.class}</code></td>
                <td className="pv2"><span className={`${t.class} near-black`}>{t.preview}</span></td>
                <td className="pv2 tr gray font-system-mono" style={{ width: '80px', fontSize: '12px' }}>{t.size}</td>
                <td className="pv2 pr4 tr silver font-system-mono" style={{ width: '60px', fontSize: '12px' }}>{t.px}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="f5 gray mb3">Font Stacks</h3>
        <table className="w-100 mb4 style-guide-table" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-system')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-system</code></td>
              <td className="pv2 font-system f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-system-serif')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-system-serif</code></td>
              <td className="pv2 font-system-serif f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-system-mono')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-system-mono</code></td>
              <td className="pv2 font-system-mono f5 near-black">const x = 42;</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-times')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-times</code></td>
              <td className="pv2 font-times f4 near-black">The quick brown fox</td>
            </tr>
          </tbody>
        </table>

        <h4 className="f6 gray mb2">Other Fonts</h4>
        <table className="w-100 mb4 style-guide-table" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-neue-haas-unica')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-neue-haas-unica</code></td>
              <td className="pv2 font-neue-haas-unica f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-galapagos-a')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-galapagos-a</code></td>
              <td className="pv2 font-galapagos-a f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-galapagos-ab')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-galapagos-ab</code></td>
              <td className="pv2 font-galapagos-ab f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-galapagos-abc')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-galapagos-abc</code></td>
              <td className="pv2 font-galapagos-abc f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-comic')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-comic</code></td>
              <td className="pv2 font-comic f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-blackletter')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-blackletter</code></td>
              <td className="pv2 font-blackletter f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-algerian')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-algerian</code></td>
              <td className="pv2 font-algerian f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-brush-script')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-brush-script</code></td>
              <td className="pv2 font-brush-script f3 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-curlz')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-curlz</code></td>
              <td className="pv2 font-curlz f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-davida')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-davida</code></td>
              <td className="pv2 font-davida f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-hobo')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-hobo</code></td>
              <td className="pv2 font-hobo f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-relinquish')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-relinquish</code></td>
              <td className="pv2 font-relinquish f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-tex-heros')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-tex-heros</code></td>
              <td className="pv2 font-tex-heros f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-tex-heros-cn')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-tex-heros-cn</code></td>
              <td className="pv2 font-tex-heros-cn f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-tex-termes')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-tex-termes</code></td>
              <td className="pv2 font-tex-termes f4 near-black">The quick brown fox</td>
            </tr>
            {/* Fun & Experimental */}
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-pilowlava')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-pilowlava</code></td>
              <td className="pv2 font-pilowlava f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-compagnon')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-compagnon</code></td>
              <td className="pv2 font-compagnon f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-mess')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-mess</code></td>
              <td className="pv2 font-mess f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-anthony')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-anthony</code></td>
              <td className="pv2 font-anthony f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-teranoptia')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-teranoptia</code></td>
              <td className="pv2 font-teranoptia f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-typefesse-claire')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-typefesse-claire</code></td>
              <td className="pv2 font-typefesse-claire f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-typefesse-pleine')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-typefesse-pleine</code></td>
              <td className="pv2 font-typefesse-pleine f4 near-black">The quick brown fox</td>
            </tr>
            <tr className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText('font-kaerukaeru')}>
              <td className="pv2" style={{ width: '200px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-kaerukaeru</code></td>
              <td className="pv2 font-kaerukaeru f4 near-black">The quick brown fox</td>
            </tr>
          </tbody>
        </table>

        <h4 className="f6 gray mb2">Cheee Family (25 variants)</h4>
        <table className="w-100 mb4 style-guide-table" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            {[
              'baby', 'bingbong', 'boogy', 'chaarleee', 'choy', 'conshred', 'crimer', 'gnat',
              'jabroni', 'jimbo', 'juanito', 'kingstreet', 'oldskool', 'oyen', 'peeenutt',
              'pickles', 'schemer', 'shishi', 'small', 'smortious', 'sticky', 'stinkhead',
              'tbone', 'tomboe', 'wowie'
            ].map(v => (
              <tr key={v} className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText(`font-cheee-${v}`)}>
                <td className="pv2" style={{ width: '220px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.font-cheee-{v}</code></td>
                <td className={`pv2 font-cheee-${v} f3 near-black`}>The quick brown fox</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 className="f6 gray mb2">Obert Family (20 variants)</h4>
        <table className="w-100 mb4 style-guide-table" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            {[
              { cls: 'font-obert-basic', name: 'Basic' },
              { cls: 'font-obert-basic-45', name: 'Basic 45°' },
              { cls: 'font-obert-basic-90', name: 'Basic 90°' },
              { cls: 'font-obert-basic-135', name: 'Basic 135°' },
              { cls: 'font-obert-slant', name: 'Slant' },
              { cls: 'font-obert-slant-45', name: 'Slant 45°' },
              { cls: 'font-obert-slant-90', name: 'Slant 90°' },
              { cls: 'font-obert-slant-135', name: 'Slant 135°' },
              { cls: 'font-obert-reclined', name: 'Reclined' },
              { cls: 'font-obert-reclined-45', name: 'Reclined 45°' },
              { cls: 'font-obert-reclined-90', name: 'Reclined 90°' },
              { cls: 'font-obert-reclined-135', name: 'Reclined 135°' },
              { cls: 'font-obert-bright-high', name: 'Bright High' },
              { cls: 'font-obert-bright-mid', name: 'Bright Mid' },
              { cls: 'font-obert-bright-low', name: 'Bright Low' },
              { cls: 'font-obert-ball', name: 'Ball' },
              { cls: 'font-obert-chip', name: 'Chip' },
              { cls: 'font-obert-screen', name: 'Screen' },
              { cls: 'font-obert-sharp', name: 'Sharp' },
              { cls: 'font-obert-thorn', name: 'Thorn' },
            ].map(f => (
              <tr key={f.cls} className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText(f.cls)}>
                <td className="pv2" style={{ width: '220px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.{f.cls}</code></td>
                <td className={`pv2 ${f.cls} f3 near-black`}>The quick brown fox</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 className="f6 gray mb2">Bianzhidai Family (18 variants)</h4>
        <table className="w-100 mb4 style-guide-table" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            {[
              { cls: 'font-bianzhidai-base', name: 'Base' },
              { cls: 'font-bianzhidai-brush', name: 'Brush' },
              { cls: 'font-bianzhidai-bubble', name: 'Bubble' },
              { cls: 'font-bianzhidai-cloud', name: 'Cloud' },
              { cls: 'font-bianzhidai-cube', name: 'Cube' },
              { cls: 'font-bianzhidai-messier', name: 'Messier' },
              { cls: 'font-bianzhidai-messy', name: 'Messy' },
              { cls: 'font-bianzhidai-pearl', name: 'Pearl' },
              { cls: 'font-bianzhidai-ring', name: 'Ring' },
              { cls: 'font-bianzhidai-stitches', name: 'Stitches' },
              { cls: 'font-bianzhidai-nobg-base', name: 'NoBG Base' },
              { cls: 'font-bianzhidai-nobg-brush', name: 'NoBG Brush' },
              { cls: 'font-bianzhidai-nobg-bubble', name: 'NoBG Bubble' },
              { cls: 'font-bianzhidai-nobg-cloud', name: 'NoBG Cloud' },
              { cls: 'font-bianzhidai-nobg-cube', name: 'NoBG Cube' },
              { cls: 'font-bianzhidai-nobg-messier', name: 'NoBG Messier' },
              { cls: 'font-bianzhidai-nobg-messy', name: 'NoBG Messy' },
              { cls: 'font-bianzhidai-nobg-pearl', name: 'NoBG Pearl' },
              { cls: 'font-bianzhidai-nobg-ring', name: 'NoBG Ring' },
              { cls: 'font-bianzhidai-nobg-stitches', name: 'NoBG Stitches' },
            ].map(f => (
              <tr key={f.cls} className="hover-bg-near-white hover-br2 pointer active-nudge" onClick={() => navigator.clipboard.writeText(f.cls)}>
                <td className="pv2" style={{ width: '260px', whiteSpace: 'nowrap' }}><code className="gray bg-light-gray ph2 pv1 br2" style={{ fontSize: '12px' }}>.{f.cls}</code></td>
                <td className={`pv2 ${f.cls} f3 near-black`}>The quick brown fox</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Colors */}
      <section className="mb5">
        <h2 className="f4 near-black mb3">Color Palette</h2>
        
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

      <footer className="mt5 pt4">
          <p className="f6 gray">
            Based on <a href="https://tachyons.io" className="blue underline hover-no-underline" target="_blank" rel="noopener noreferrer">Tachyons</a> v4.12.0
          </p>
        </footer>
      </div>
    </div>
  )
}

export default StyleGuidePage
