import { useState } from 'react'

function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: wire this to your backend/API endpoint when it's ready.
    // e.g. fetch('/api/contact', { method: 'POST', body: new FormData(e.target) })
    setSent(true)
  }

  return (
    <div className="page">
      <h1>Contact</h1>
      <p>Got a question, booking request, or just want to say what's up? Send us a message.</p>
      {sent ? (
        <p>Thanks — form UI is working. (Not yet wired to actually send anywhere — see the TODO in Contact.jsx.)</p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your name" required />
          <input type="email" name="email" placeholder="Your email" required />
          <textarea name="message" placeholder="Your message" rows={6} required></textarea>
          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  )
}

export default Contact