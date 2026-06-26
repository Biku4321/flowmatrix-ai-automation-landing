# Flowmatrix — AI Automation Landing Page

Premium, responsive landing page for an AI-driven data automation platform.
Built with React + Vite + Tailwind CSS v4, zero external UI/animation
dependencies.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # serve the production build locally
```

## Architecture notes

### Feature 1 — Matrix-driven pricing, zero re-render
- `src/data/pricingMatrix.js` is the single source of truth for all pricing.
  Every price is derived at read-time from a base USD rate, a flat 20%
  annual discount multiplier, and a per-currency regional tariff — nothing
  is hardcoded.
- `src/hooks/usePriceRegistry.js` keeps the active currency/cycle selection
  in a `ref`, not React state. Switching currency or billing cycle writes
  directly to each price card's text node via `textContent`, so no parent
  or sibling component re-renders. Verify in Chrome DevTools ("Highlight
  updates on paint") — only the price text nodes should flash, nothing else.

### Feature 2 — Bento ↔ Accordion with context lock
- `src/hooks/useBentoAccordionState.js` holds one shared `activeIndex` above
  both the bento grid and the accordion list. Both layouts stay mounted at
  all times (visibility toggled via CSS media query, not conditional
  rendering), so a resize mid-interaction has nowhere to lose state —
  the accordion opens on the exact panel that was active in the bento grid.
- All transitions are native CSS (`grid-template-rows` for animatable
  accordion height, `grid-column` span + `max-height` for the bento
  expand/collapse). No animation library is used anywhere in this feature.

### Motion tokens
Defined once in `src/index.css`:
- `--duration-micro` (180ms, ease-out) — hovers, toggles
- `--duration-structural` (360ms, ease-in-out) — layout reflows
- Entrance sequence is staggered and budgeted to finish within 500ms total.

## Assets (integrated)
- [x] Color palette wired into `src/index.css` `:root` (Arctic Powder, Forsythia,
      Nocturnal Expedition, Mystic Mint, Deep Saffron, Oceanic Noir).
- [x] Fonts wired in via Google Fonts in `index.html`: JetBrains Mono
      (headings/labels) + Inter (body/UI).
- [x] All 14 provided SVGs recolored to `currentColor` and integrated as a
      single `Icon` component (`src/components/icons/Icon.jsx`), used across
      the header logo, bento cards, accordion triggers, and pricing cards.
- [x] Motion/structure cross-checked against `demo.mp4` (extracted + reviewed
      frame-by-frame): monospace `// LABEL` eyebrows, dark-primary theme with
      light accent sections, icon+heading grid pattern, rotating chevron
      accordion — all reflected in the build.

## Remaining before submission
- [ ] Add `/public/og-cover.png` (1200×630) and re-enable the commented
      `og:image` / `twitter:image` tags in `index.html`.
- [ ] Replace placeholder favicon/`icons.svg` with a branded favicon if desired.
- [ ] Deploy and update the canonical URL in `index.html`.
- [ ] Record your own submission demo video showing the live deployment.
