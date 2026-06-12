# Moughamir Brand Guidelines v1.0

> Last updated: 2026-06-11
> Status: Active

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | #ff6719 (Vibrant Orange) |
| Secondary Color | #18181b (Zinc-900) |
| Accent Color | #ff6719 (Orange — single-brand accent) |
| Heading Font | Archivo (bold, condensed, uppercase) |
| Body Font | Space Grotesk (geometric, modern) |
| Mono Font | JetBrains Mono |
| Design Style | Kinetic Brutalism |
| Voice | Bold, Direct, Unpolished, Expert |

---

## 1. Brand Philosophy

### Core Attributes

| Attribute | Description |
|-----------|-------------|
| **Experienced** | 10+ years shipping — depth without arrogance |
| **Craftsperson** | Clean code, maintainable architecture, practical delivery |
| **Global** | Trilingual (Arabic, French, English), cross-cultural perspective |
| **Builder** | Ships constantly — 250+ public repos, open-source contributor |
| **Human** | Warm, approachable, explains complex things simply |

### Brand Narrative

> A senior engineer who builds things that work — and helps others do the same. Technical depth without the ego. Global experience with local empathy.

---

## 2. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Orange Regular** | **#ff6719** | rgb(255,103,25) | CTAs, accent elements, links, hover shadows |
| **Orange Dark** | **#cc5200** | rgb(204,82,0) | Hover states, emphasis (dark mode accent) |
| **Orange Content** | **#ffffff** | rgb(255,255,255) | Text on orange backgrounds |

### Neutral Palette

| Name | Hex | RGB | Tailwind | Usage |
|------|-----|-----|----------|-------|
| Base-100 | #fafafa | rgb(250,250,250) | zinc-50 | Page background |
| Base-200 | #f4f4f5 | rgb(244,244,245) | zinc-100 | Surfaces, cards |
| Base-300 | #e4e4e7 | rgb(228,228,231) | zinc-200 | Borders, dividers |
| Base Content | #09090b | rgb(9,9,11) | zinc-950 | Primary text |
| Gray-0 | #09090b | rgb(9,9,11) | — | Deepest text, heading color |
| Gray-50 | #18181b | rgb(24,24,27) | zinc-900 | Heavy text (secondary) |
| Gray-100 | #27272a | rgb(39,39,42) | zinc-800 | Tertiary text |
| Gray-200 | #3f3f46 | rgb(63,63,66) | zinc-700 | Secondary text |
| Gray-300 | #52525b | rgb(82,82,91) | zinc-600 | Body text |
| Gray-400 | #71717a | rgb(113,113,122) | zinc-500 | Muted text |
| Gray-700 | #e4e4e7 | rgb(228,228,231) | zinc-200 | Borders |
| Gray-800 | #f4f4f5 | rgb(244,244,245) | zinc-100 | Surfaces |
| Gray-900 | #fafafa | rgb(250,250,250) | zinc-50 | Background (light) |
| Gray-999 | #ffffff | rgb(255,255,255) | white | Card backgrounds, elevated |

### Dark Mode

| Token | Light | Dark |
|-------|-------|------|
| Base-100 Background | #fafafa | #09090b |
| Base-200 Surface | #f4f4f5 | #18181b |
| Base-300 Border | #e4e4e7 | #27272a |
| Base Content | #09090b | #fafafa |
| Gray-0 (Headings) | #09090b | #fafafa |
| Gray-300 (Body) | #52525b | #a1a1aa |
| Gray-999 (Cards) | #ffffff | #000000 |

### Semantic Colors

| State | Hex | Usage |
|-------|-----|-------|
| Success | #16a34a | Positive actions, confirmations |
| Warning | #ca8a04 | Cautions, pending states |
| Error | #dc2626 | Errors, destructive actions |
| Info | #2563eb | Informational messages |

### Accessibility

| Combination | Ratio | Level |
|-------------|-------|-------|
| #ff6719 (Orange) on #fafafa | ~4.5:1 | AA |
| #09090b on #fafafa | ~17:1 | AAA |
| #ffffff on #ff6719 | ~4.5:1 | AA |
| #52525b on #fafafa | ~6.5:1 | AA |

- All interactive elements meet WCAG 2.1 AA standards
- Text on background: 4.5:1 minimum (AA)
- Large text (18px+): 3:1 minimum

### Color Usage Guidelines (60:30:10 Rule)

| Ratio | Role | Colors |
|-------|------|--------|
| 60% | Dominant - Background | Base-100, Gray-900 |
| 30% | Secondary - Surfaces, cards, nav | Base-200, Base-300, Gray-800 |
| 10% | Accent - CTAs, highlights | Orange #ff6719 |

- Orange is the ONLY accent color — single-brand accent keeps the identity sharp
- Don't use more than 2-3 colors in a single component
- Never rely solely on color for meaning — use icons/text too
- Dark mode inverts the neutral scale while keeping orange at full saturation

---

## 3. Typography

### Font Stack

```css
--font-heading: 'Archivo', system-ui, -apple-system, sans-serif;
--font-body: 'Space Grotesk', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

Archivo (headings) provides the **kinetic** quality — tight letter-spacing, strong presence, unapologetically bold in uppercase. Space Grotesk (body) is geometric and modern, balancing the brutalist headings with readability.

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing |
|---------|----------------|---------------|--------|-------------|----------------|
| H1 | 3rem (48px) | 2.25rem (36px) | 800 | 1.0 | -0.02em |
| H2 | 2.25rem (36px) | 1.75rem (28px) | 800 | 1.05 | -0.02em |
| H3 | 1.75rem (28px) | 1.5rem (24px) | 800 | 1.1 | -0.02em |
| H4 | 1.25rem (20px) | 1.125rem (18px) | 800 | 1.15 | -0.02em |
| Body | 1rem (16px) | 1rem (16px) | 400 | 1.6 | 0 |
| Body Large | 1.125rem (18px) | 1rem (16px) | 400 | 1.6 | 0 |
| Small | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.5 | 0 |
| Caption | 0.75rem (12px) | 0.75rem (12px) | 400 | 1.4 | 0 |
| Code | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.6 | 0 |

### Heading Style

All headings are:
- **Uppercase** — always
- **Font weight 800** (Extra Bold)
- **Letter spacing -0.02em** (tight)
- **Color: gray-0** (#09090b light, #fafafa dark)

### Font Weights

| Name | Value | Usage |
|------|-------|-------|
| Regular | 400 | Body text, paragraphs |
| Medium | 500 | Buttons, nav items |
| Bold | 700 | Strong emphasis |
| Extra Bold | 800 | All headings (Archivo) |

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Line Height Guidelines

- Headings: 1.0-1.15 (tight for brutalist impact)
- Body text: 1.5-1.6 (optimal readability)
- Long-form content: 1.6-1.75 (comfortable)
- Code: 1.5-1.6

### Maximum Line Length

- Body text: 65-75 characters per line (optimal)
- Code blocks: 80-100 characters

---

## 4. Logo Usage

### Variants

| Variant | File | Use Case |
|---------|------|----------|
| Full Horizontal | logo-full-horizontal.svg | Website headers, documents |
| Stacked | logo-stacked.svg | Square spaces |
| Icon/Mark | logo-icon.svg | Favicons, small spaces |
| Wordmark | logo-wordmark.svg | When icon already present |

### Color Variants

| Variant | Use Case |
|---------|----------|
| Full Color (Orange + Slate) | Default on white/light backgrounds |
| Reversed (White) | On orange or dark backgrounds |
| Monochrome Dark | On light backgrounds when color not possible |
| Monochrome Light | On dark backgrounds |

### Clear Space

Minimum clear space = height of the logo mark (icon portion).

### Minimum Size

| Context | Minimum Width |
|---------|---------------|
| Digital - Full Logo | 120px |
| Digital - Icon | 24px |
| Favicon | 32x32px |
| Print - Full Logo | 35mm |
| Print - Icon | 10mm |

### Logo Don'ts

- Don't stretch or distort proportions
- Don't rotate or skew
- Don't change colors outside approved palette
- Don't add shadows, gradients, or effects
- Don't crop or rearrange elements
- Don't place on busy backgrounds without sufficient contrast
- Don't use pure black (#000) for the logo

---

## 5. Voice & Tone

### Brand Personality

| Trait | Description |
|-------|-------------|
| **Bold** | Takes a stand, has opinions, doesn't hedge. Kinetic. |
| **Direct** | Gets to the point, respects your time. No filler. |
| **Unpolished** | Authentic over polished. Real experience, not marketing. |
| **Expert** | 10+ years shipping. Speaks from production, not theory. |
| **Builder** | Ships constantly. 250+ repos. Open-source contributor. |

### Voice Chart

| Trait | We Sound Like | We Don't Sound Like |
|-------|--------------|---------------------|
| **Bold** | "Here's what works." | "In my humble opinion..." |
| **Direct** | "Skip the config. Start here." | Fluff, filler, over-explaining |
| **Unpolished** | "I learned this the hard way." | Corporate, sterile, jargon-heavy |
| **Expert** | "I've shipped this in production." | "I'm an expert in..." |
| **Builder** | "Built X. Here's how." | Vague claims, buzzwords |

### Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| Blog / Writing | Story-driven, practical | "Here's how I cut CI from 12min to 90s." |
| Homepage / Bio | Brutalist-confident | "10+ years shipping web products." |
| Work / Case Studies | Results-focused, specific | "Built X → improved Y by Z%." |
| Error messages | Short, solution-focused | "Something broke. Refresh or email me." |
| Social / Bio | Brief, direct | "Senior full-stack dev. Ships things." |
| Code / Comments | Clean, minimal | Comments explain *why*, not *what*. |

### Prohibited Terms

| Avoid | Use Instead |
|-------|-------------|
| Revolutionary | (Show the result) |
| Best-in-class | (Be specific) |
| Seamless | Smooth, clean |
| Synergy | Integration |
| Leverage | Use |
| Game-changing | (Prove with numbers) |
| Rockstar / Ninja | Senior, builder |
| Deep dive | Walk through |
| Utilizing | Using |
| Empowering | (Cut it) |

### Voice Testing

Before publishing:
1. Does this sound like a person, not a corporation?
2. Would I say this to another engineer?
3. What word can I cut right now?
4. Is this useful or just noise?

---

## 6. Kinetic Brutalism — Design System

### Design Philosophy

Kinetic Brutalism is **raw, energetic, and unapologetic**. It takes the brutalist ethos (honest materials, rough textures, bold typography) and adds **movement and tension** — elements shift on interaction, nothing sits perfectly still.

| Principle | Description |
|-----------|-------------|
| **Raw** | No decorative fluff. Every element earns its place. |
| **Kinetic** | Interactions have physical weight — offsets, shadows, pops. |
| **High Contrast** | Black/white with orange as the only color. |
| **Bold Typography** | Uppercase, heavy weight, tight tracking. |
| **Geometric** | Sharp angles, squared corners, grid-based. |

### Core Components

#### Brutal Cards

```css
.brutal-card {
  border: 2px solid #09090b;
  border-radius: 0;
  background: #ffffff;
  /* On hover: translate(-4px, -4px) + box-shadow: 4px 4px 0 0 #09090b */
}
```

| State | Description |
|-------|-------------|
| Default | Flat card with 2px black border |
| Hover | Shifts up-left (-4px, -4px), dropshadow follows |
| Active | Returns to flat, orange shadow replaces black |

#### Brutal Buttons

```css
.brutal-btn {
  background: #09090b;
  color: #ffffff;
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  /* On hover: translate(-2px, -2px) + box-shadow: 4px 4px 0 0 #ff6719 */
}
```

| State | Description |
|-------|-------------|
| Default | Solid black button, white text, uppercase |
| Hover | Shifts up-left, orange shadow emerges beneath |
| Active | Deep press — returns to default |

### Photography

- **Style:** Authentic, never stock — real screenshots, actual code, genuine workspace
- **Color treatment:** High contrast, can desaturate non-orange colors
- **Composition:** Bold framing, asymmetric, close crops
- **Subjects:** Code, terminal windows, architecture diagrams, real tools

### Code Screenshots

- Dark terminal theme with orange (#ff6719) syntax highlighting
- JetBrains Mono font
- High contrast, no compression artifacts
- Show only the relevant code — crop tight

### Diagrams & Architecture

- Orange (#ff6719) for primary flow / data path
- Black (#09090b) for containers and boundaries
- White / negative space for background
- Sharp corners (0px radius) — no rounding
- 2px solid borders, no gradients

### Icons

- **Style:** Solid, high-contrast, geometric
- **Stroke:** 2px minimum
- **Corners:** 0px (sharp)
- **Colors:** Black or Orange only
- **Grid:** 24px base

---

## 7. Design Components

### Buttons

| Type | Background | Text | Border Radius | Hover |
|------|------------|------|---------------|-------|
| Primary | #09090b | #ffffff | 0px | translate(-2px,-2px), orange shadow |
| Secondary | Transparent | #09090b | 0px | Border becomes solid |
| Ghost | Transparent | #09090b | 0px | Underline appears |
| Orange | #ff6719 | #ffffff | 0px | Darker orange bg |

### Links

| State | Color | Decoration |
|-------|-------|------------|
| Default | #ff6719 | None |
| Hover | #ff6719 | Underline |
| Active | #cc5200 | Underline |
| In Body Text | #ff6719 | Underline on hover |

### Tags / Tech Badges

| Property | Value |
|----------|-------|
| Background | #09090b |
| Text | #ffffff |
| Border Radius | 0px |
| Font | Space Grotesk, 14px, 500 weight |
| Text Transform | Uppercase |
| Hover | Orange background, white text |

### Cards

| Property | Light | Dark |
|----------|-------|------|
| Background | #ffffff | #000000 |
| Border | 2px solid #09090b | 2px solid #fafafa |
| Border Radius | 0px | 0px |
| Hover Transform | translate(-4px, -4px) | translate(-4px, -4px) |
| Hover Shadow | 4px 4px 0 #09090b | 4px 4px 0 #ff6719 |
| Padding | 24px | 24px |

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Compact elements |
| md | 16px | Standard spacing |
| lg | 24px | Section spacing |
| xl | 32px | Large gaps |
| 2xl | 48px | Section dividers |
| 3xl | 64px | Page sections |

### Border Radius

| Element | Radius |
|---------|--------|
| Buttons | 0px (sharp) |
| Cards | 0px (sharp) |
| Inputs | 0px (sharp) |
| Modals | 0px (sharp) |
| Tags/Badges | 0px (sharp) |
| Images | 0px (sharp) |

> **Brutalist rule**: 0px border radius everywhere. No rounded corners. Sharp is the point.

---

## 8. AI Image Generation

### Base Prompt Template

Always prepend to image generation prompts:

```
High-contrast geometric composition with vibrant orange (#ff6719) on black-and-white base. Brutalist aesthetic — sharp angles, no curves, bold typography in uppercase Archivo. Kinetic energy: elements feel like they could shift or move. Tech/developer context. Raw, unpolished, authentic. No gradients, no rounded corners, no decorative fluff.
```

### Style Keywords

| Category | Keywords |
|----------|----------|
| **Lighting** | Hard, directional, high contrast, dramatic |
| **Mood** | Bold, energetic, raw, confident, uncompromising |
| **Composition** | Asymmetric, geometric, generous whitespace, grid-aligned |
| **Treatment** | High contrast, desaturated except orange, sharp, grain texture |
| **Aesthetic** | Brutalist, kinetic, tech raw, underground, developer |

### Visual Mood Descriptors

- Kinetic energy — nothing sits still, elements shift and react
- Raw confidence — unpolished, honest, no makeup
- Orange tension — the single accent color creates visual friction
- Sharp geometry — straight lines, right angles, grid precision

### Visual Don'ts

| Avoid | Reason |
|-------|--------|
| Rounded corners | Breaks the brutalist language |
| Gradients | Softens the raw edge |
| Corporate stock photos | Destroys authenticity |
| More than one accent color | Dilutes the orange identity |
| Drop shadows (soft) | Use hard shadow offsets instead |
| Decorative flourishes | Every element must earn its place |

### Example Prompts

**Hero Banner:**
```
High-contrast hero banner. Black (#09090b) background with vibrant orange (#ff6719) geometric shapes breaking through. Bold uppercase Archivo typography in white. Sharp angles, 0px border radius. Code elements in JetBrains Mono with orange syntax highlights. Kinetic feel — elements slightly offset like they're mid-motion. No gradients, no rounded corners, no photos. Brutalist tech portfolio.
```

**Blog Post Header:**
```
Brutalist blog header. White (#fafafa) background with a single bold orange (#ff6719) geometric block breaking the grid on the right side. Black (#09090b) uppercase Archivo heading. Sharp lines, 2px black borders. Code fragment in JetBrains Mono with orange highlight in the corner. Raw, unpolished, high contrast. No rounded corners, no illustrations, no stock photos.
```

**Social Share Image:**
```
OG image (1200x630px) for technical content. Split composition: left 60% black (#09090b), right 40% white (#fafafa). Orange (#ff6719) diagonal slice cuts across the split. Bold uppercase Archivo heading in white on the black side. JetBrains Mono code fragment in orange on the white side. High contrast, sharp edges, no rounded corners, no gradients. Brutalist tech aesthetic.
```

---

## 9. Asset Organization

### Directory Structure

```
assets/
├── logos/
│   ├── full-horizontal/
│   │   ├── logo-full-color.svg
│   │   ├── logo-reversed.svg
│   │   ├── logo-mono-dark.svg
│   │   └── logo-mono-light.svg
│   ├── icon-only/
│   │   ├── icon-full-color.svg
│   │   └── icon-reversed.svg
│   ├── wordmark/
│   │   ├── wordmark-color.svg
│   │   └── wordmark-mono.svg
│   └── favicon/
│       ├── favicon.ico
│       └── apple-touch-icon.png
├── design-tokens.json
├── design-tokens.css
└── brand-guidelines.md
```

### Naming Convention

- Lowercase kebab-case for all files
- Logo variants: `{variant}-{color-mode}.{ext}`
- Icons: `icon-{name}.svg`
- Images: `{context}-{description}.{ext}`

### File Formats

| Usage | Format | Notes |
|-------|--------|-------|
| Web | SVG | Preferred, scalable |
| Web fallback | PNG | With transparency |
| Print | PDF | Vector |
| Icons | SVG | Outline style |

---

## 10. Brand Compliance Checklist

### Before Publishing Any Content

- [ ] Colors match the approved palette (no off-brand colors)
- [ ] Typography uses Inter (heading/body) or JetBrains Mono (code)
- [ ] Voice aligns with brand personality (bold, warm, clear, expert)
- [ ] No prohibited terms or corporate jargon
- [ ] Logo uses correct variant for the context
- [ ] Sufficient color contrast for accessibility (WCAG AA)
- [ ] Images follow warm, clean, authentic style
- [ ] Writing passes the "would I say this to another engineer?" test

### Monthly / Quarterly

- [ ] Review any new assets for brand consistency
- [ ] Update design tokens if brand evolves
- [ ] Run `node scripts/inject-brand-context.cjs` to verify context
- [ ] Check all public pages for brand consistency

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-06-11 | Initial brand guidelines — orange primary identity |
