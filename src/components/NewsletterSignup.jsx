import { useState } from 'react'

function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }

  return (
    <div className="mt3 mb4">
      <p className="f5 mb2 gray">Subscribe to occasional project / life updates</p>
      
      <form onSubmit={handleSubmit} className="flex items-center w-100">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          className="input-reset ba b--moon-gray br2 pa2 flex-auto f5 mr2"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="input-reset bn br2 pa2 f6 fw6 pointer bg-blue white hover-bg-dark-blue"
          style={{ opacity: status === 'loading' ? 0.6 : 1 }}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {status === 'success' && (
        <p className="f6 mt2 green">{message}</p>
      )}
      
      {status === 'error' && (
        <p className="f6 mt2 red">{message}</p>
      )}
    </div>
  )
}

export default NewsletterSignup

