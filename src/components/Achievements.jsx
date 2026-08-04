import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { achievements } from '../data/profile'

export default function Achievements() {
  const [items, setItems] = useState(achievements)
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    // Auto-scan the public/achievements folder.
    // Files are listed via a generated manifest at build time (see vite plugin),
    // otherwise fall back to the config entries.
    const scan = async () => {
      try {
        const res = await fetch('/achievements/manifest.json')
        if (res.ok) {
          const files = await res.json()
          if (files && files.length) {
            setItems(files)
          }
        }
      } catch {
        /* fall back to config */
      } finally {
        setScanning(false)
      }
    }
    scan()
  }, [])

  return (
    <section id="achievements" className="section achievements">
      <div className="section__header">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section__kicker"
        >
          04 · Achievements
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section__title"
        >
          Certificates & offers
        </motion.h2>
        {!scanning && items.length === 0 && (
          <p className="projects__error">
            Drop your PDFs into <code>public/achievements/</code> and add them in{' '}
            <code>src/data/profile.js</code>
          </p>
        )}
      </div>

      <div className="achievements__grid">
        {items.map((item, i) => {
          const isImage = /\.(jpe?g|png|gif|webp)$/i.test(item.pdf)
          const href = item.pdf.startsWith('http')
            ? item.pdf
            : item.pdf
              ? `/achievements/${item.pdf.replace(/^\/+/, '')}`
              : null
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotateY: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`cert ${href ? 'cert--link' : ''}`}
            >
              <div className="cert__3d">
                <div className="cert__sheet">
                  <div className="cert__sheet-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="cert__back" />
              </div>
              <div className="cert__body">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                {href ? (
                  <a href={href} target={item.pdf.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="btn btn--small">
                    {isImage ? 'View Certificate' : 'Open PDF'}
                  </a>
                ) : (
                  <span className="btn btn--small btn--disabled">Add PDF</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
