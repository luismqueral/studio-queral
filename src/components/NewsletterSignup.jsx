function NewsletterSignup() {
  return (
    <div>
      <p className="f6 mb1 near-black b">keep in touch!</p>
      <p className="f6 mb3 gray lh-copy">
        sign up to receive project / life updates whenever I feel like sending them.
      </p>
      
      <form 
        action="https://buttondown.email/api/emails/embed-subscribe/studioqueral" 
        method="post" 
        target="popupwindow"
        onSubmit={() => window.open('https://buttondown.email/studioqueral', 'popupwindow', 'scrollbars=yes,width=800,height=600')}
        className="flex-ns items-center w-100"
      >
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className="input-reset ba b--moon-gray br2 pa2 w-100 flex-auto-ns f6 mr2-ns mb2 mb0-ns"
        />
        <button
          type="submit"
          className="input-reset bn br2 pa2 f6 pointer bg-blue white hover-bg-dark-blue w-100 w-auto-ns"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsletterSignup

