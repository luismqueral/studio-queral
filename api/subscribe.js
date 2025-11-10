export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  // Validate email
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  // Check if API key is configured
  if (!process.env.BUTTONDOWN_API_KEY) {
    console.error('BUTTONDOWN_API_KEY is not configured')
    return res.status(500).json({ 
      error: 'Newsletter service is not configured. Please contact the site administrator.' 
    })
  }

  try {
    // Call Buttondown API
    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        tags: ['website'],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      // Handle specific Buttondown errors
      if (response.status === 400 && data.email) {
        return res.status(400).json({ error: 'This email is already subscribed!' })
      }
      throw new Error(data.detail || 'Failed to subscribe')
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed! Check your email to confirm.' 
    })

  } catch (error) {
    console.error('Subscription error:', error)
    return res.status(500).json({ 
      error: 'Failed to subscribe. Please try again later.' 
    })
  }
}

