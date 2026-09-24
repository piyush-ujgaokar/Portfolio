# Piyush Ujgaokar — Award-Level Developer Portfolio

> **Full Stack Web Developer (MERN + AI Integrations)**  
> Built with React 19, Tailwind CSS, Three.js (`@react-three/fiber` & `@react-three/drei`), Framer Motion, GSAP, and Lenis Smooth Scrolling using a **Scalable 4-Layer React Architecture**.

---

## ⚡ Tech Stack & Architecture

### **The 4-Layer Architecture**
This codebase is strictly separated into four decoupled layers for maximum testability, maintainability, and clean state flow:

```
src/
├── features/
│   ├── api/          # LAYER 1: Single source of truth data (portfolioData.js) & API handlers (contactService.js)
│   ├── state/        # LAYER 2: Global UI store (PortfolioContext.jsx: sound, cursor, filters, accessibility)
│   ├── hooks/        # LAYER 3: Custom reusable abstractions (useLenisSmoothScroll, useMousePosition, useSoundEffect)
│   └── ui/           # LAYER 4: Pure presentation components, 3D Canvas viewports, and page routes
│       ├── components/
│       ├── three/
│       └── pages/
```

### **Libraries & Tooling**
- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS with custom Glassmorphism & cyber-glow utilities
- **3D Graphics:** Three.js + `@react-three/fiber` + `@react-three/drei`
- **Animations:** Framer Motion (page transitions, kinetic text reveals) + Lenis (momentum scrolling)
- **Icons:** Lucide React + custom inline SVG Socials
- **Fonts:** Space Grotesk, Syne, Inter, JetBrains Mono

---

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Production Build:**
   ```bash
   npm run build
   ```

---

## 🧭 Routes & Pages

- `/` — **Home Hero**: Giant kinetic name reveal, interactive 3D icosahedron/orbiting cyber rings centerpiece, live stats, marquee ticker, compact skills strip, and featured case studies.
- `/projects` — **Projects Catalog**: Filter by category (`All`, `Gen-AI`, `AI Chat`, `Frontend`) with interactive 3D device preview cards and live demo links.
- `/projects/:slug` — **Project Detail**: Deep dive architectural case study with 4-layer breakdown, problem/solution challenges, performance metrics, and 3D device canvas.
- `/skills` — **Technical Arsenal**: 3 strictly labeled categories (Frontend, Backend & DevOps, Frameworks & Tools) with high-contrast 16px+ chips, live search filter, and 3D floating tech orbit canvas.
- `/about` — **Story & Trajectory**: Personal narrative, cyber portrait, G.H Raisoni University BCA education timeline, and Sheryians Coding School certifications.
- `/contact` — **Direct Dispatch**: Contact form with validation feedback, instant one-click copy buttons for email & phone, and direct LinkedIn & GitHub links.
- `*` — **404 Page**: Kinetic glitch cyberpunk page with fast return navigation.

---

## 🔧 Where to Customize & Update Data

All portfolio data is centralized in **one clean file**:
📁 [`src/features/api/portfolioData.js`](file:///c:/Users/User/Desktop/portfolio/src/features/api/portfolioData.js)

1. **Add / Edit Projects:**
   - Modify the `PROJECTS` array in `portfolioData.js`. Add your title, slug, liveUrl, githubUrl, description, metrics, and architecture points.
2. **Add / Edit Skills:**
   - Update `SKILL_CATEGORIES` in `portfolioData.js`.
3. **Change Profile Photo:**
   - Replace `public/profile.jpg`.
4. **Change Resume PDF:**
   - Replace `public/Piyush_Ujgaokar_Resume.pdf`.
5. **Update Live Link Placeholders:**
   - Replace `[LIVE_LINK]` in `Cookz Recipe Website` project within `portfolioData.js`.
