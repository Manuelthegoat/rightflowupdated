import { useState } from "react";

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("https://formspree.io/f/xrpggazd", {
      method: "POST",
      body: new FormData(e.target),
      headers: { Accept: "application/json" },
    }).then(() => setSent(true));
  }

  return (
    <main className="contact-page">
      <header className="contact-page__hero">
        <span className="contact-page__stamp">Bookings &amp; Enquiries</span>
        <h1>Say Hello</h1>
        <p>
          For show bookings, collaborations, press, or a quick hello, leave a
          note and the Rightflow team will get back to you.
        </p>
      </header>

      <section className="contact-desk" aria-labelledby="contact-form-title">
        <div className="contact-desk__heading">
          <span>New message</span>
          <h2 id="contact-form-title">Let&apos;s talk.</h2>
        </div>

        {sent ? (
          <div className="contact-success" role="status">
            <span className="contact-success__mark" aria-hidden="true">
              OK
            </span>
            <h2>Message received.</h2>
            <p>Thanks for reaching out. We&apos;ll be in touch soon.</p>
            <button type="button" onClick={() => setSent(false)}>
              Send another
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <label>
                <span>Your name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label>
                <span>Email address</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </label>
            </div>
            <label>
              <span>Your message</span>
              <textarea name="message" rows={7} required></textarea>
            </label>
            <button type="submit">Send Message</button>
          </form>
        )}
      </section>
    </main>
  );
}

export default Contact;
