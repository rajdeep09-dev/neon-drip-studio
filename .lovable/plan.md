

# DRIP Coffee Studio — Implementation Plan

## Phase 1: Design System & Foundation
Set up the complete visual identity across the app:
- **Color palette**: Dark moody backgrounds (#0A0A0A, #111111, #1A1A1A) with burnt orange (#FF6B35), warm cream (#E8D5B7), and teal mint (#4ECDC4) accents
- **Typography**: Space Grotesk for headings, Inter/General Sans for body, a handwritten font (Caveat) for playful annotations, JetBrains Mono for labels/prices
- **Global styles**: Neon glow utilities, gradient fills, glassmorphism card styles

## Phase 2: Living Background System
Build the multi-layered atmospheric background that gives the site its "breathing" feel:
- **Dot grid pattern** — subtle structural texture across the page
- **Animated mesh gradient blobs** — large, slow-drifting color orbs (orange, teal, cream at very low opacity) creating ambient lighting
- **Film grain overlay** — animated noise texture for analog warmth
- **Falling coffee leaves particle system** — 15-25 gently falling botanical elements (leaves, coffee beans, dots) with sine-wave drift, slow rotation, and mouse interaction (wind effect). Respects `prefers-reduced-motion`
- **Floating blurred orbs** — additional large blurred circles for ambient color mixing

## Phase 3: Hero Section — Typography & Layout
Full-viewport immersive hero with the signature headline treatment:
- **"not your average cup."** — massive, bold heading with per-word effects: "average" gets an animated strikethrough, "cup" gets gradient text fill
- **Staggered entrance animation** — words slide up from masked overflow with spring timing
- **Blinking cursor period** — the dot at the end pulses like a typing cursor
- **Sub-headline** fades in after headline completes
- **Floating glassmorphism badges** — "est. 2024", "single origin only" float with gentle oscillation
- **Sparkle/star decorative elements** scattered around the headline area
- **Hand-drawn SVG doodles** — sketchy arrows, circles, and underlines that draw themselves on load

## Phase 4: Hero Section — Interactive Elements
- **CTA buttons** — "see the menu" (orange pill with magnetic hover, neon glow, shine sweep) and "find us on the map" (transparent pill with border-fill hover animation)
- **Scroll indicator** — bouncing "scroll down" in Caveat font with animated arrow, fades on scroll
- **Parallax on scroll** — headline, sub-headline, buttons, and decorative elements all move at different speeds creating depth as you scroll past

## Phase 5: Polish & Motion Details
- Smooth scroll behavior throughout
- All hover micro-interactions (magnetic pull, scale, glow effects)
- Reduced motion media query support (static fallbacks for all animations)
- Mobile responsive layout (adjusted particle count, font sizes, simplified effects)
- Performance optimization (recycled DOM elements for particles, GPU-accelerated transforms, will-change hints)

