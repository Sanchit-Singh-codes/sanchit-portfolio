import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { skills } from '../data/profile'
import SkillOrbit from './three/SkillOrbit'

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="section__header">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section__kicker"
        >
          02 · Skills
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section__title"
        >
          My tech universe
        </motion.h2>
      </div>

      <div className="skills__grid">
        <div className="skills__orbit">
          <Canvas camera={{ position: [0, 0.5, 10], fov: 45 }} dpr={[1, 1.8]}>
            <SkillOrbit skills={skills} />
          </Canvas>
        </div>

        <div className="skills__list">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="skill-bar"
            >
              <div className="skill-bar__top">
                <span className="skill-bar__name">
                  <i style={{ background: s.color }} />
                  {s.name}
                </span>
                <span className="skill-bar__pct">{s.level}%</span>
              </div>
              <div className="skill-bar__track">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
                  className="skill-bar__fill"
                  style={{ background: `linear-gradient(90deg, ${s.color}, #00e5ff)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
