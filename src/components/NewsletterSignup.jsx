function NewsletterSignup() {
  return (
    <div className="mt5 mb4">
      <p className="f4 mb2 near-black fw6">Newsletter</p>
      <p className="f5 mb3 near-black lh-copy">
        You'll get <a href="#" className="blue underline hover-no-underline">occasional project / life updates</a> straight to your inbox.
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
          className="input-reset ba b--moon-gray br2 pa2 w-100 flex-auto-ns f5 mr2-ns mb2 mb0-ns"
        />
        <button
          type="submit"
          className="input-reset bn br2 pa2 f6 fw6 pointer bg-blue white hover-bg-dark-blue w-100 w-auto-ns"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsletterSignup

