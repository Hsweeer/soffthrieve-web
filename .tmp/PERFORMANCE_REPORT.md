# PageSpeed & Performance — SoftThrive Website

**Site URL tested:** https://softthrieve.netlify.app (and https://www.softthrive.com when live)  
**Date:** 2026-06-04

## PageSpeed scores — https://www.softthrive.com (before deploy of this update)

Screenshots saved in `.tmp/`:

| Device | Performance | Accessibility | Best Practices | SEO |
|--------|-------------|---------------|----------------|-----|
| **Mobile** | **70** | 85 | 100 | 100 |
| **Desktop** | **88** | 85 | 100 | 100 |

Files: `pagespeed-mobile-softthrive.png`, `pagespeed-desktop-softthrive.png`

Mobile is **below 80** — WebP conversion + lazy loading were applied in this branch. **Re-run PageSpeed after deploying** to confirm mobile ≥ 80.

---

## Point 1 — Changes applied

### WebP conversion (32 local assets)

All PNG/JPEG under `public/` were converted to WebP (quality 82) via `scripts/convert-public-images-webp.mjs`. Code references updated to `.webp` for:

- Logos, hero shots, Saudi portfolio mobiles, featured case study images, brand assets, badges

External URLs (Apple CDN, Microlink) are unchanged.

### Lazy loading (below the fold)

- `Iphone16ProFrame` — `loading="lazy"` unless `priority` is set
- `LaptopMockupFrame` — `loading="lazy"`
- `PlatformLogo` — lazy by default; hero can pass `priority`
- Next.js `Image` — default lazy; `priority` only on header logo and explicit hero spots

Hero section images (logo with `priority`, first visible store tiles with `priority={isSpotlight}`) load immediately.

---

## Large JavaScript — flag for owner (do not delete without approval)

These bundles are heavy and may load on pages where they are not fully used. **Confirm before removing:**

| Source | Approx. concern | Pages affected |
|--------|----------------|----------------|
| `VantaHeroBackground` + `three` + `vanta` | Large WebGL/network hero effect | Homepage hero only |
| `@splinetool/react-spline` | 3D scene download | Where `InteractiveRobot` / Spline is mounted |
| `gsap` | Animation library | Hero, scroll sections |
| `lenis` (`SmoothScroll`) | Smooth scroll polyfill | Site-wide via `SiteShell` |
| `lottie-react` + `assistant-bot.json` | Chatbot animation | Site-wide when chatbot open |
| `motion` (Framer Motion) | UI motion | Header menu, many sections |

**Recommendation:** Defer Spline/Vanta to `dynamic(() => import(...), { ssr: false })` on homepage only, or disable on mobile — after owner approval.

---

## UX points 2–10

Implemented in code (see commit / diff): mobile nav (5 items), hero urgency line, Arabic homepage tagline, footer mailto (already present), Instagram first + “Follow us”, trust strip `#1E3A5F`, contact Saudi banner, custom 404, homepage meta tags only.
