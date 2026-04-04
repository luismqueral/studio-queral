import { useState, useEffect, useRef, useCallback } from 'react'

const MODES = {
  work: { label: 'work', minutes: 25 },
  break: { label: 'break', minutes: 5 },
}

// gentle three-tone chime using Web Audio API — no external files needed
function playChime() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const notes = [440, 523.25, 659.25] // A4, C5, E5
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.3)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.3 + 0.8)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime + i * 0.3)
    osc.stop(ctx.currentTime + i * 0.3 + 0.8)
  })
}

function PomodoroPage() {
  const [mode, setMode] = useState('work')
  const [secondsLeft, setSecondsLeft] = useState(MODES.work.minutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const resetTimer = useCallback((newMode) => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setMode(newMode)
    setSecondsLeft(MODES[newMode].minutes * 60)
  }, [])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setIsRunning(false)
          playChime()
          const next = mode === 'work' ? 'break' : 'work'
          setMode(next)
          return MODES[next].minutes * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [isRunning, mode])

  // update document title with time remaining
  useEffect(() => {
    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
    const ss = String(secondsLeft % 60).padStart(2, '0')
    document.title = `${mm}:${ss} — ${MODES[mode].label}`
    return () => { document.title = 'Studio Queral' }
  }, [secondsLeft, mode])

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  const toggleRunning = () => setIsRunning((prev) => !prev)

  return (
    <div className="vh-100 flex flex-column items-center justify-center pa3 transition-color">
      {/* mode label */}
      <p className="f6 gray tracked ttu mb2">{MODES[mode].label}</p>

      {/* time display */}
      <h1 className="f-timer-ns near-black font-system-mono font-tabular lh-timer ma0 mb3">
        {mm}:{ss}
      </h1>

      {/* controls */}
      <div className="flex items-center mb4">
        <button
          onClick={toggleRunning}
          className="f6 link pointer bn bg-transparent near-black underline hover-no-underline ph3 pv2"
        >
          {isRunning ? 'pause' : 'start'}
        </button>
        <button
          onClick={() => resetTimer(mode)}
          className="f6 link pointer bn bg-transparent gray underline hover-no-underline ph3 pv2"
        >
          reset
        </button>
      </div>

      {/* mode switcher */}
      <div className="flex items-center">
        <button
          onClick={() => resetTimer('work')}
          className={`f7 link pointer bn bg-transparent ph2 pv1 ${mode === 'work' ? 'near-black' : 'silver hover-gray'}`}
        >
          25 min
        </button>
        <span className="silver ph1">/</span>
        <button
          onClick={() => resetTimer('break')}
          className={`f7 link pointer bn bg-transparent ph2 pv1 ${mode === 'break' ? 'near-black' : 'silver hover-gray'}`}
        >
          5 min
        </button>
      </div>

      {/* back link */}
      <p className="f7 gray mt5">
        <a href="https://queral.studio" className="gray underline hover-no-underline">
          queral.studio
        </a>
      </p>
    </div>
  )
}

export default PomodoroPage
