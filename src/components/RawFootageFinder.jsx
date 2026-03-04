import { useState, useCallback } from 'react'

const PALETTES = [
  { bg: '#ede7f6', text: '#4a148c' },
  { bg: '#e0f2f1', text: '#004d40' },
  { bg: '#ffeae8', text: '#bf360c' },
  { bg: '#e8eaf6', text: '#1a237e' },
  { bg: '#fff8e1', text: '#e65100' },
  { bg: '#fce4ec', text: '#880e4f' },
  { bg: '#e0f7fa', text: '#006064' },
  { bg: '#f1f8e9', text: '#1b5e20' },
  { bg: '#fff3e0', text: '#bf360c' },
  { bg: '#e8eaf6', text: '#283593' },
  { bg: '#f3e5f5', text: '#6a1b9a' },
  { bg: '#e1f5fe', text: '#01579b' },
  { bg: '#fbe9e7', text: '#b71c1c' },
  { bg: '#f9fbe7', text: '#33691e' },
  { bg: '#fffde7', text: '#f57f17' },
]

function pickPalette(excludeBg) {
  const options = excludeBg ? PALETTES.filter(p => p.bg !== excludeBg) : PALETTES
  return options[Math.floor(Math.random() * options.length)]
}

const DCF_PATTERNS = [
  { prefix: 'DSC', sep: '_', hint: 'generic DCF', weight: 10 },
  { prefix: 'DSCF', sep: '', hint: 'Fujifilm', weight: 5 },
  { prefix: 'DSCN', sep: '', hint: 'Nikon compact', weight: 5 },
  { prefix: 'MOV', sep: '_', hint: 'QuickTime video', weight: 8 },
  { prefix: 'VID', sep: '_', hint: 'generic video', weight: 8 },
  { prefix: 'IMG', sep: '_', hint: 'Canon image', weight: 10 },
  { prefix: 'MVI', sep: '_', hint: 'Canon video', weight: 8 },
  { prefix: 'CSI', sep: '_', hint: 'Canon burst', weight: 3 },
  { prefix: '_MG', sep: '_', hint: 'Canon Adobe RGB', weight: 2 },
  { prefix: 'DSC', sep: '', hint: 'Sony no separator', weight: 5 },
  { prefix: 'C', sep: '', padding: 7, hint: 'Sony camcorder', weight: 3 },
  { prefix: 'P', sep: '', padding: 7, hint: 'Panasonic', weight: 5 },
  { prefix: 'R', sep: '', padding: 7, hint: 'Panasonic RAW', weight: 2 },
  { prefix: 'GOPR', sep: '', hint: 'GoPro image', weight: 6 },
  { prefix: 'GH01', sep: '', padding: 5, hint: 'GoPro Hero 8+', weight: 4 },
  { prefix: 'GX01', sep: '', padding: 5, hint: 'GoPro 360', weight: 2 },
  { prefix: 'GP', sep: '', padding: 6, hint: 'GoPro legacy', weight: 3 },
  { prefix: 'VIDEO', sep: '_', hint: 'Samsung video', weight: 5 },
  { prefix: 'CLIP', sep: '_', hint: 'screen recording', weight: 3 },
  { prefix: 'REC', sep: '_', hint: 'recording', weight: 3 },
  { prefix: 'FILE', sep: '_', hint: 'generic file', weight: 2 },
  { prefix: 'AMBA', sep: '', hint: 'dashcam', weight: 3 },
  { prefix: 'VID_2024', sep: '', padding: 6, hint: 'Android 2024', weight: 4 },
  { prefix: 'VID_2023', sep: '', padding: 6, hint: 'Android 2023', weight: 4 },
  { prefix: 'VID_2022', sep: '', padding: 6, hint: 'Android 2022', weight: 3 },
  { prefix: 'IMG_2024', sep: '', padding: 6, hint: 'Android 2024', weight: 3 },
]

const PATH_PATTERNS = [
  { path: '100APPLE', hint: 'iPhone DCIM folder' },
  { path: '100ANDRO', hint: 'Android DCIM folder' },
  { path: '100CANON', hint: 'Canon DCIM folder' },
  { path: '100NCD40', hint: 'Nikon D40 folder' },
  { path: '100ND750', hint: 'Nikon D750 folder' },
  { path: '100EOS5D', hint: 'Canon EOS 5D folder' },
  { path: '100MEDIA', hint: 'generic DCIM folder' },
  { path: '100GOPRO', hint: 'GoPro DCIM folder' },
  { path: '100_PANA', hint: 'Panasonic folder' },
  { path: '101MSDCF', hint: 'Sony folder' },
  { path: '100OLYMP', hint: 'Olympus folder' },
  { path: '100PENTX', hint: 'Pentax folder' },
  { path: '100SAMSN', hint: 'Samsung folder' },
  { path: '100RICOH', hint: 'Ricoh folder' },
  { path: '100LEICA', hint: 'Leica folder' },
  { path: '100FUJIF', hint: 'Fujifilm folder' },
  { path: 'DCIM 100', hint: 'DCIM search' },
  { path: 'DCIM 101', hint: 'DCIM overflow folder' },
  { path: 'DCIM 102', hint: 'DCIM overflow folder' },
  { path: '100MEDIA DJI', hint: 'DJI drone' },
  { path: 'DJI Album', hint: 'DJI app export' },
  { path: '100PHANT', hint: 'DJI Phantom folder' },
  { path: '100MAVIC', hint: 'DJI Mavic folder' },
  { path: '100MINI', hint: 'DJI Mini folder' },
  { path: '100INSTA', hint: 'Insta360 folder' },
  { path: '100SJCAM', hint: 'SJCAM folder' },
  { path: '100AKASO', hint: 'Akaso folder' },
  { path: 'CARDV', hint: 'dashcam folder' },
  { path: 'DCIM MOVIE', hint: 'dashcam recordings' },
  { path: 'Normal Video', hint: 'dashcam normal' },
  { path: 'Event Video', hint: 'dashcam event' },
  { path: 'Parking Video', hint: 'dashcam parking' },
  { path: 'BlackVue', hint: 'BlackVue dashcam' },
  { path: 'VIOFO', hint: 'Viofo dashcam' },
  { path: 'storage emulated 0 DCIM Camera', hint: 'Android internal' },
  { path: 'sdcard DCIM Camera', hint: 'Android SD card' },
  { path: 'internal storage DCIM', hint: 'phone storage' },
  { path: 'DCIM Camera', hint: 'camera folder' },
  { path: 'private var mobile Media DCIM', hint: 'iOS filesystem' },
  { path: 'Camera uploads', hint: 'cloud sync' },
  { path: 'WhatsApp Video', hint: 'WhatsApp' },
  { path: 'WhatsApp Media Video', hint: 'WhatsApp received' },
  { path: 'Telegram Video', hint: 'Telegram' },
  { path: 'Facebook Video', hint: 'Facebook' },
  { path: 'LINE Movies', hint: 'LINE app' },
  { path: 'WeChat Video', hint: 'WeChat' },
  { path: 'Snapchat Memories', hint: 'Snapchat export' },
  { path: 'TikTok', hint: 'TikTok saved' },
  { path: 'Screen recordings', hint: 'phone screen record' },
  { path: 'ScreenRecord', hint: 'screen capture' },
  { path: 'Captures', hint: 'game captures' },
  { path: 'Xbox DVR', hint: 'Xbox game clip' },
  { path: 'Nvidia Share', hint: 'GeForce recording' },
  { path: 'Download video', hint: 'downloads folder' },
  { path: 'Movies Camera', hint: 'movies folder' },
  { path: 'Video Editor', hint: 'editor exports' },
  { path: 'NVR recordings', hint: 'security NVR' },
  { path: 'DVR backup', hint: 'DVR export' },
  { path: 'IPCamera', hint: 'IP camera' },
  { path: 'Reolink', hint: 'Reolink camera' },
  { path: 'Wyze', hint: 'Wyze cam' },
  { path: 'Ring Video', hint: 'Ring doorbell' },
  { path: 'Nest cam', hint: 'Nest camera' },
  { path: 'Blink', hint: 'Blink camera' },
]

const TOTAL_WEIGHT = DCF_PATTERNS.reduce((sum, p) => sum + p.weight, 0)

function generate() {
  if (Math.random() < 0.20) {
    const pattern = PATH_PATTERNS[Math.floor(Math.random() * PATH_PATTERNS.length)]
    return { query: pattern.path, hint: pattern.hint }
  }

  let roll = Math.random() * TOTAL_WEIGHT
  let selected = DCF_PATTERNS[0]

  for (const pattern of DCF_PATTERNS) {
    roll -= pattern.weight
    if (roll <= 0) {
      selected = pattern
      break
    }
  }

  const pad = selected.padding || (Math.random() < 0.7 ? 4 : Math.random() < 0.5 ? 3 : 5)

  let num
  const numRoll = Math.random()
  if (numRoll < 0.5) num = Math.floor(Math.random() * 100) + 1
  else if (numRoll < 0.8) num = Math.floor(Math.random() * 900) + 100
  else num = Math.floor(Math.random() * 9000) + 1000

  const query = `${selected.prefix}${selected.sep}${String(num).padStart(pad, '0')}`
  return { query, hint: selected.hint }
}

function RawFootageFinder() {
  const [result, setResult] = useState(() => generate())
  const [palette, setPalette] = useState(() => pickPalette())
  const [buttonHovered, setButtonHovered] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  const refresh = useCallback(() => {
    setResult(generate())
    setPalette(prev => pickPalette(prev.bg))
  }, [])

  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(result.query)}&sp=EgIQAQ%253D%253D`

  return (
    <div className="note-widget mt2 mb4 pa4 br3 tc mw6-5 center" style={{ backgroundColor: palette.bg }}>
      <div className="mb3 font-ibm-plex-mono" style={{ color: palette.text, opacity: 0.35 }}>
        <span className="f7">{result.hint}</span>
      </div>
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-ibm-plex-mono no-underline db"
        style={{ color: palette.text }}
        onMouseEnter={() => setLinkHovered(true)}
        onMouseLeave={() => setLinkHovered(false)}
      >
        <span className="f2 f1-ns fw5 tracked-tight">{result.query}</span>
      </a>
      <div className="mt2 font-ibm-plex-mono" style={{ color: palette.text, opacity: 0.35, visibility: (linkHovered || buttonHovered) ? 'visible' : 'hidden' }}>
        <span className="f7">{buttonHovered ? 'regenerate filename' : 'click to search youtube'}</span>
      </div>
      <div className="mt3">
        <button
          onClick={refresh}
          className="bn pointer f2 ph3 pv2 br2 inline-flex items-center"
          style={{ color: palette.text, opacity: buttonHovered ? 0.8 : 0.5, backgroundColor: buttonHovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)' }}
          title="regenerate filename"
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          ↻
        </button>
      </div>
    </div>
  )
}

export default RawFootageFinder
