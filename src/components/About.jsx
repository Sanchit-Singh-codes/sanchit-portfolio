import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import AboutScene from './three/AboutScene'

const stats = [
  { value: '2+', label: 'Years Coding' },
  { value: '15+', label: 'Apps Built' },
  { value: '8+', label: 'Technologies' },
  { value: '∞', label: 'Curiosity' }
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section__header">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section__kicker"
        >
          01 · About
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section__title"
        >
          Beyond the code
        </motion.h2>
      </div>

      <div className="about__grid">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="about__scene"
        >
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.8]}>
            <AboutScene />
          </Canvas>
        </motion.div>

        <div className="about__text">
          {profile.about.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {para}
            </motion.p>
          ))}

          <div className="about__stats">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="stat-card"
              >
                <span className="stat-card__value">{s.value}</span>
                <span className="stat-card__label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
