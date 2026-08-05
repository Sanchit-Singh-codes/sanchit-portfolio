import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { skills } from '../data/profile'
import SkillCubes from './three/SkillCubes'

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
          What I work with
        </motion.h2>
      </div>

      <div className="skills__grid">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="skills__scene"
        >
          <Canvas camera={{ position: [0, 1, 12], fov: 42 }} dpr={[1, 1.8]}>
            <SkillCubes skills={skills} />
          </Canvas>
        </motion.div>

        <div className="skills__info">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="skills__desc"
          >
            I specialise in building native Android applications with modern
            tooling. From architecture patterns to cloud backends, every layer of
            the stack is something I enjoy working in.
          </motion.p>

          <div className="skills__tags">
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="skill-tag"
                style={{ borderColor: `${s.color}22` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${s.color}55`
                  e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}18`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${s.color}22`
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span
                  className="skill-tag__dot"
                  style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }}
                />
                {s.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
