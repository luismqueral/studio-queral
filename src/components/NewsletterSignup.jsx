function NewsletterSignup() {
  return (
    <div className="mt5 mb4">
      <p className="f4 mb2 near-black fw6">Newsletter</p>
      <p className="f5 mb3 near-black lh-copy">
        You'll get occasional project / life updates straight to your inbox. <a href="#" className="blue underline hover-no-underline">See some older emails here.</a>
      </p>
      
      <form 
        action="https://buttondown.email/api/emails/embed-subscribe/studioqueral" 
        method="post" 
        target="popupwindow"
        onSubmit={() => window.open('https://buttondown.email/studioqueral', 'popupwindow', 'scrollbars=yes,width=800,height=600')}
        className="flex items-center w-100"
      >
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className="input-reset ba b--moon-gray br2 pa2 flex-auto f5 mr2"
        />
        <button
          type="submit"
          className="input-reset bn br2 pa2 f6 fw6 pointer bg-blue white hover-bg-dark-blue"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsletterSignup

