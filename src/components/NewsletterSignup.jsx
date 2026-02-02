function NewsletterSignup() {
  return (
    <div style={{ maxWidth: '500px' }}>
      <p className="f6 mb1 near-black b">thanks for reading!</p>
      <p className="f6 mb3 gray">consider joining my mailing list:</p>
      
      <form 
        action="https://buttondown.email/api/emails/embed-subscribe/studioqueral" 
        method="post" 
        target="popupwindow"
        onSubmit={() => window.open('https://buttondown.email/studioqueral', 'popupwindow', 'scrollbars=yes,width=800,height=600')}
        className="w-100"
      >
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className="input-reset ba b--moon-gray br2 pa2 w-100 f6 mb2"
        />
        
        <p className="f6 mt1 mb3 gray lh-copy">
          you'll get updates on projects / writing / life a few times a year, that's it!
        </p>
        
        <button
          type="submit"
          className="input-reset bn br2 pa2 ph4 f6 pointer bg-blue white hover-bg-dark-blue w-100"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsletterSignup

