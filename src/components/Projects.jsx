import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { githubUsername, pinnedProjects } from '../data/profile'

const fallbackRepos = pinnedProjects

export default function Projects() {
  const [repos, setRepos] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=9`)
        if (!res.ok) throw new Error('GitHub fetch failed')
        const data = await res.json()
        const clean = data
          .filter((r) => !r.fork)
          .map((r) => ({
            name: r.name,
            description: r.description || 'A project I built. No description provided.',
            html_url: r.html_url,
            language: r.language || 'Other',
            stars: r.stargazers_count,
            forks: r.forks_count,
            topics: r.topics || [],
            homepage: r.homepage
          }))
        if (active) {
          setRepos(clean.length ? clean : fallbackRepos)
          setError(null)
        }
      } catch (e) {
        if (active) {
          setRepos(fallbackRepos)
          setError('Could not reach GitHub right now — showing sample projects.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [])

  const langColor = (lang) => {
    const colors = {
      Kotlin: '#7c4dff',
      Java: '#ff5252',
      'JavaScript': '#ffb300',
      'TypeScript': '#00e5ff',
      Dart: '#40c4ff',
      Swift: '#ff6ec7',
      Python: '#69f0ae'
    }
    return colors[lang] || '#00e5ff'
  }

  return (
    <section id="projects" className="section projects">
      <div className="section__header">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section__kicker"
        >
          03 · Projects
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section__title"
        >
          Live from my GitHub
        </motion.h2>
        {error && <p className="projects__error">{error}</p>}
      </div>

      {loading ? (
        <div className="projects__loader">
          <div className="spinner" /> Loading projects from GitHub...
        </div>
      ) : (
        <div className="projects__grid">
          {repos.map((r, i) => (
            <motion.a
              key={r.name + i}
              href={r.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 60, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.15 }}
              className="project-card"
            >
              <div className="project-card__glow" />
              <div className="project-card__head">
                <span className="project-card__icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 2a5 5 0 0 0-5 5v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3v2H9V7a3 3 0 0 1 3-3z" />
                  </svg>
                </span>
                <span className="project-card__lang" style={{ background: langColor(r.language) }}>
                  {r.language}
                </span>
              </div>
              <h3 className="project-card__name">{r.name.replace(/-/g, ' ')}</h3>
              <p className="project-card__desc">{r.description}</p>
              <div className="project-card__foot">
                <span><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 17.3l-6.2 3.7 1.6-7-5.4-4.6 7.1-.6L12 2l2.9 6.8 7.1.6-5.4 4.6 1.6 7z"/></svg> {r.stars}</span>
                <span><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 3a9 9 0 0 0-9 9c0 4 2.6 7.4 6.2 8.6.4.1.6-.2.6-.4v-1.5c-2.5.5-3-1.2-3-1.2-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .5-1.2-1.9-.2-3.9-1-3.9-4.3 0-1 .3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9a8.2 8.2 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.3 0 3.4-2 4.1-3.9 4.3.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A9 9 0 0 0 21 12a9 9 0 0 0-9-9z"/></svg> {r.forks}</span>
                <span className="project-card__link">
                  Open in GitHub <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8"/></svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  )
}
