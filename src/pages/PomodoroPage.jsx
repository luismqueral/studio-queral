import { useState, useEffect, useRef } from 'react'

const PRESETS = [3, 5, 10, 15, 25]

// gentle three-tone chime using Web Audio API
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
  const [intervalMinutes, setIntervalMinutes] = useState(5)
  const [secondsLeft, setSecondsLeft] = useState(5 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)
  const intervalMinutesRef = useRef(5)

  // keep ref in sync so the setInterval callback always reads the latest value
  useEffect(() => {
    intervalMinutesRef.current = intervalMinutes
  }, [intervalMinutes])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          playChime()
          return intervalMinutesRef.current * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  useEffect(() => {
    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
    const ss = String(secondsLeft % 60).padStart(2, '0')
    document.title = `${mm}:${ss} — timer`
    return () => { document.title = 'Studio Queral' }
  }, [secondsLeft])

  const selectPreset = (minutes) => {
    setIntervalMinutes(minutes)
    setSecondsLeft(minutes * 60)
  }

  const reset = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setSecondsLeft(intervalMinutes * 60)
  }

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  return (
    <div className="vh-100 flex flex-column items-center justify-center pa3 transition-color">
      {/* time display */}
      <h1 className="f-timer-ns near-black font-system-mono font-tabular lh-timer ma0 mb3">
        {mm}:{ss}
      </h1>

      {/* controls */}
      <div className="flex items-center mb4">
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className="f6 link pointer bn bg-transparent near-black underline hover-no-underline ph3 pv2"
        >
          {isRunning ? 'pause' : 'start'}
        </button>
        <button
          onClick={reset}
          className="f6 link pointer bn bg-transparent gray underline hover-no-underline ph3 pv2"
        >
          reset
        </button>
      </div>

      {/* presets */}
      <div className="flex items-center">
        {PRESETS.map((m, i) => (
          <span key={m} className="flex items-center">
            {i > 0 && <span className="silver ph1">/</span>}
            <button
              onClick={() => selectPreset(m)}
              className={`f7 link pointer bn bg-transparent ph2 pv1 ${intervalMinutes === m ? 'near-black' : 'silver hover-gray'}`}
            >
              {m} min
            </button>
          </span>
        ))}
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
