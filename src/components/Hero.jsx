import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import Starfield from './three/Starfield'
import Phone3D from './three/Phone3D'

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Full-screen 3D background */}
      <div className="hero__canvas">
        <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 1.8]}>
          <Starfield />
          <Phone3D />
        </Canvas>
      </div>

      <div className="hero__overlay" />

      <div className="hero__content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero__chip"
        >
          <span className="hero__dot" /> Available for work
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero__name"
        >
          <span className="hero__greet">Hi, I'm</span>
          <span className="hero__gradient">{profile.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero__title"
        >
          {profile.title}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hero__actions"
        >
          <a href="#projects" className="btn btn--primary">View Projects</a>
          <a href="#contact" className="btn btn--ghost">Contact Me</a>
        </motion.div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          href="#about"
          className="hero__scroll"
        >
          <span className="hero__mouse">
            <span className="hero__wheel" />
          </span>
        </motion.a>
      </div>
    </section>
  )
}
