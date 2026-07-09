# World 48 — Style Guide

Single source of truth for the visual system. Every page is held against this. Built logo-first (the wordmark gradient), with semantic accent roles that kill the "rainbow" tell, plus supporting neutrals. Palettes validated with Coolors (contrast), Adobe Color (harmony) and Paletton (colour-blind simulation).

## Colour

### Brand signature (reserved)
| Token | Hex | Use |
|---|---|---|
| Brand gradient | `#00D9FF → #00D98E → #FFB74D` | **The "World 48" wordmark only.** Mirrors the logo. Never on body copy or generic headings. |

**Hero lockup rule (do not change):** in the headline "Undiscovered / World 48", the word **"Undiscovered" stays white** and only **"World 48"** takes the gradient. Never gradient the whole lockup — the white/gradient split is the intended treatment.

### Semantic accents (one role each — never decorative)
| Token | Hex | Role — the ONLY thing it means |
|---|---|---|
| Cyan | `#00D9FF` | Primary / interactive: links, eyebrows, focus rings, active filters |
| Gold | `#FFB74D` | Achievement / proof: offers received, D1, results, trophies |
| Green | `#00D98E` | Positive status: success, approved, live-good |
| Red | `#E53E3E` | Action: primary CTA + urgency / live |

Rule: if a colour's use on a page can't be named by one of these roles, it's decorative rainbow — remove it. Headings are white (or the wordmark gradient). Section eyebrows are cyan. Card/section titles do **not** rotate cyan/green/gold.

### Surfaces (near-black, blue-shifted for depth)
| Token | Hex | Use |
|---|---|---|
| Ink | `#0A0C10` | Page background |
| Court Navy | `#101B2D` | Supporting deep panel — richer than flat black for feature sections |
| Card | `#10141B` | Card background |
| Elevated | `#1A1F29` | Hover / inputs / elevated |
| Border | `#262C38` | Dividers, borders |

### Supporting neutrals (the "2–3 others")
| Token | Hex | Use |
|---|---|---|
| Chalk | `#F4F1EA` | Warm off-white for any light context (sponsor tiles, light CTA) |
| Steel | `#7C8A9A` | Blue-grey for dividers / secondary text on light surfaces |

### Text on dark (ink tokens)
| Token | Value | Use |
|---|---|---|
| White | `#FFFFFF` | Headings, primary |
| ink-muted | `rgba(255,255,255,0.62)` | Load-bearing secondary: body, meta, form labels, nav |
| ink-faint | `rgba(255,255,255,0.40)` | Decorative: eyebrows, footnotes |
| ink-ghost | `rgba(255,255,255,0.28)` | Credits, placeholders, "no data" glyphs |

Contrast: ink-muted ≈ 8.6:1, ink-faint ≈ 3.9:1 (large/decorative only). Load-bearing text is always ≥ ink-muted.

## Treatment (owner decision, 2026-07)
- **Editorial Black (Nike)** is the primary language: marketing/story pages — home, about, sponsors, contact. Near-black, huge white type, one cyan hairline, gold only on proof, maximum negative space.
- **Court Navy (Kitman/Hudl)** for data-dense pages: roster, player profiles, NCAA eligibility. Deep `surface-navy #101B2D` panels, left cyan accent bar, framed data tiles.

## Type
- **Headline display:** Archivo Black (`font-display` → Archivo 800/900), uppercase, tracking `-0.01em`. The brand grotesque, in the Nike/adidas register.
- **Numerals:** Anton (`font-numeral`), condensed heavy — every stat, jersey number, count and proof figure (the scoreboard hit). Always with `.stat-nums` for tabular alignment.
- **Body:** Inter. Body 400, labels/eyebrows 600.
- **Eyebrow:** `.eyebrow` — 11px, 600, uppercase, tracking `0.22em`. One spec everywhere.
- **Numerals:** `.stat-nums` (tabular) on every stat, count and jersey number.

## Components
- **Buttons:** `.btn-primary` (red) / `.btn-secondary` (outlined). One geometry, one `cubic-bezier(0.22,1,0.36,1)` lift-on-hover, focus-visible rings. No white or ad-hoc buttons.
- **Icons:** bespoke set in `components/icons.tsx` (24px grid, 2.25px stroke, squared terminals). No Unicode arrows, no stock icon paths, no emoji as UI.
- **Motion:** `.card-in` staggered entrance; shared easing `cubic-bezier(0.22,1,0.36,1)`.

## Anti-patterns (auto-reject)
- Three equal accent-headed cards in a row (the AI landing silhouette). Use editorial numbered processes or asymmetric layouts.
- Rainbow headings (cyan/green/gold rotating as decoration).
- Generic React-starter forms (heavy border + ring + tiny grey label). Use the refined input system + a reassurance rail.
- Em-dash sentence connectors; "X, Y, and Z" serial-comma cadence.
