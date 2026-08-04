import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    const form = e.target
    setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject.value || 'Hello')}&body=${encodeURIComponent(form.message.value)}`
      setSent(false)
      form.reset()
    }, 800)
  }

  return (
    <section id="contact" className="section contact">
      <div className="section__header">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section__kicker"
        >
          05 · Contact
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section__title"
        >
          Let's build something great
        </motion.h2>
      </div>

      <div className="contact__grid">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="contact__info"
        >
          <h3>{profile.name}</h3>
          <p className="contact__role">{profile.title} · {profile.location}</p>

          <div className="contact__socials">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="social-chip">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 3a9 9 0 0 0-9 9c0 4 2.6 7.4 6.2 8.6.4.1.6-.2.6-.4v-1.5c-2.5.5-3-1.2-3-1.2-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .5-1.2-1.9-.2-3.9-1-3.9-4.3 0-1 .3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9a8.2 8.2 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.3 0 3.4-2 4.1-3.9 4.3.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A9 9 0 0 0 21 12a9 9 0 0 0-9-9z"/></svg>
              GitHub
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-chip">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.2 8.6h4.6V23H.2V8.6zm7.5 0h4.4v2h.1c.6-1.1 2-2.3 4.2-2.3 4.5 0 5.3 2.9 5.3 6.7V23h-4.6v-7c0-1.7 0-3.9-2.4-3.9s-2.7 1.9-2.7 3.8V23H7.7V8.6z"/></svg>
              LinkedIn
            </a>
            <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-chip">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.2 2.6h3.3l-7.3 8.3L22.8 21.4h-6.7l-5.3-6.9-6 6.9H1.5l7.8-8.9L1.2 2.6H8l4.8 6.3 5.4-6.3zm-1.2 17h1.8L7 4.4H5L17 19.6z"/></svg>
              Twitter
            </a>
          </div>

          <a className="contact__mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={submit}
          className="contact__form"
        >
          <input type="text" name="name" placeholder="Your name" required />
          <input type="email" name="email" placeholder="Your email" required />
          <input type="text" name="subject" placeholder="Subject" />
          <textarea name="message" placeholder="Your message..." rows="5" required />
          <button type="submit" className="btn btn--primary">
            {sent ? 'Opening email...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
