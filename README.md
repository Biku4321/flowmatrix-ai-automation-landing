# Flowmatrix — AI Automation Landing Page

Premium, responsive landing page for an advanced AI-driven data automation platform. 
Built with React + Vite + Tailwind CSS v4, strictly adhering to the zero external UI/animation dependency rule.

## 🔗 Submission Links
* **Live Deployment:** `https://flowmatrix-ai-automation-landing.vercel.app` 
* **Public GitHub Repository:** `https://github.com/Biku4321/flowmatrix-ai-automation-landing`
* **Demo Video:** `https://drive.google.com/file/d/1VcPnEdD4UiqO6Ot1MchbuQEYuPtsJ1NS/view?usp=sharing`

## 🚀 Run Locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # serve the production build locally
```

## 🏗️ Architecture & Logic (40 Points)

### Feature 1 — Matrix-Driven Pricing, Zero Re-render
* `src/data/pricingMatrix.js` is the single source of truth for all pricing. Every price is derived at read-time from a base USD rate, a flat 20% annual discount multiplier, and a per-currency regional tariff — nothing is hardcoded.
* `src/hooks/usePriceRegistry.js` keeps the active currency (INR/USD/EUR) and cycle selection in a `ref`, not React state. 
* **State Isolation Guardrail:** Switching currency or billing cycle writes directly to each price card's text node via `textContent`, ensuring no parent or sibling component re-renders. Evaluated via Chrome DevTools, updates are strictly isolated to localized DOM text nodes.

### Feature 2 — Bento ↔ Accordion with Context Lock
* `src/hooks/useBentoAccordionState.js` holds one shared `activeIndex` above both the desktop Bento Grid and the mobile Accordion list. 
* Both layouts stay mounted at all times (visibility toggled via CSS media query, not conditional rendering). 
* **Context Lock:** If the browser window is abruptly resized mid-interaction, the active index context is programmatically transferred, ensuring the accordion opens on the exact panel that was active in the bento grid.
* **Zero-Dependency Rule:** All transitions utilize native CSS Transitions and are written entirely from scratch without libraries like Framer Motion or HeadlessUI.

## 🌐 SEO Optimization & Semantic HTML (30 Points)
* **Semantic DOM Layout:** Built entirely with semantic HTML5 tags (`<main>`, `<header>`, `<section>`, `<article>`) avoiding deep, non-semantic `<div>` nesting.
* **SEO Hygiene:** Implements standard meta headers, Open Graph (OG) tags, accessible image attributes (`alt`), and perfectly crawlable text nodes.
* **Performance Cap:** The initial loading sequence and entry animations execute well under the 500ms threshold, completely hardware-accelerated, ensuring zero delay to Time to Interactive (TTI) and semantic HTML indexing.

## 🎨 UI/UX Usability & Motion Matching (30 Points)

### Assets Integration
* **Color Palette:** Hex codes dynamically wired into `src/index.css` `:root` (Arctic Powder, Forsythia, Nocturnal Expedition, Mystic Mint, Deep Saffron, Oceanic Noir).
* **Typography:** Strict parameters enforced via Google Fonts in `index.html`: JetBrains Mono (headings/labels) + Inter (body/UI).
* **SVGs:** All 14 provided SVGs recolored to `currentColor` and integrated as a single `Icon` component (`src/components/icons/Icon.jsx`) without relying on external resources.

### Motion Tokens & Breakpoint Fluidity
Transitions replicate the structural layout motion expected from `demo.mp4`:
* `--duration-micro` (150ms-200ms, ease-out) — Hovers, toggles, and micro-interactions.
* `--duration-structural` (300ms-400ms, ease-in-out) — Structural layout reflows.
* **Fluidity:** Layout adapts cleanly across mobile, tablet, and desktop viewports without horizontal clipping or overlapping typography.