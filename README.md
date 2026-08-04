# Sanchit Singh — 3D Portfolio

A fully 3D, single-page portfolio for an Android/mobile app developer, built with **React Three Fiber** (Three.js), **Framer Motion** and **Vite**.

## 🚀 Run locally

```bash
npm install
npm run dev      # start dev server → http://localhost:5173
npm run build    # production build
```

> On this machine PowerShell blocks `npm`; use `npm.cmd` instead.

## ✏️ Personalize

Open **`src/data/profile.js`** — everything lives there:

| Setting | What it does |
|---|---|
| `name`, `title`, `tagline`, `about` | Hero + About text |
| `email`, `location` | Contact section |
| `socials` | GitHub / LinkedIn / Twitter / Instagram links |
| `skills` | The 3D "tech universe" planets + skill bars |
| `githubUsername` | Projects are auto-loaded from this GitHub account |
| `pinnedProjects` | Optional fallback projects if GitHub is unreachable |
| `achievements` | PDF entries for the Achievements section |

## 🏆 Adding your offer letters & certificates (PDFs)

**Option 1 — drop files (auto-listed):**
1. Copy your PDFs into `public/achievements/` (you can make subfolders).
2. Create/update `public/achievements/manifest.json`:

```json
[
  { "title": "Offer Letter", "subtitle": "Software Engineer", "pdf": "OfferLetter.pdf" },
  { "title": "Achievement Certificate", "subtitle": "Best Intern", "pdf": "certs/Achievement.pdf" }
]
```

**Option 2 — edit `src/data/profile.js`** the same way in the `achievements` array. Use a full URL (Drive link etc.) if the PDF is hosted online.

## 📁 Structure

```
src/
  data/profile.js         ← EDIT ME
  components/
    three/                ← 3D scenes (Phone3D, Starfield, SkillOrbit, AboutScene)
    Navbar, Hero, About, Skills, Projects, Achievements, Contact, Footer
  index.css               ← all styling
```

## 🛠 Tech
- React 18 + Vite
- Three.js + @react-three/fiber + @react-three/drei
- Framer Motion
