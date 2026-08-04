import { profile } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <p>
        © {year} <span className="footer__name">{profile.name}</span> · Built with React Three Fiber, in 3D. 🚀
      </p>
      <div className="footer__links">
        <a href={profile.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  )
}
