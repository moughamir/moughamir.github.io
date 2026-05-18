---
version: alpha
name: Moughamir Portfolio
description: Clean minimal modern portfolio — white canvas, tight typography, high contrast, subtle card borders. Linear/Vercel-inspired senior full-stack persona.
colors:
  primary: "#171717"
  secondary: "#737373"
  tertiary: "#0a72ef"
  neutral: "#fafafa"
  surface: "#f5f5f5"
  on-primary: "#ffffff"
  on-tertiary: "#ffffff"
  border: "rgba(0, 0, 0, 0.08)"
typography:
  display:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  h1:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  h2:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  h3:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Geist, system-ui, sans-serif
    fontSize: 1rem
    lineHeight: 1.65
  label:
    fontFamily: Geist Mono, ui-monospace, monospace
    fontSize: 0.78rem
    fontWeight: 500
    letterSpacing: "0.04em"
    textTransform: uppercase
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  2xl: 80px
  3xl: 120px
components:
  nav-link:
    textColor: "{colors.secondary}"
    fontSize: 0.95rem
    fontWeight: 500
    padding: 8px
  nav-link-active:
    textColor: "{colors.primary}"
  btn-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    fontWeight: 500
    fontSize: 0.95rem
  btn-primary-hover:
    backgroundColor: "{colors.tertiary}"
  btn-ghost:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  article-header:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    padding: 0
  tag-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.full}"
    padding: 6px 14px
    fontSize: 0.85rem
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
    border: "1px solid {colors.border}"
  cta-section:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
---

## Overview

A clean, minimal, modern portfolio that builds technical authority and functions as a "hire-me-now" tool. Inspired by Linear and Vercel's design language — white canvas, tight typography, high contrast, subtle card borders. The portfolio communicates senior full-stack credibility without decorative noise.

## Colors

- **Primary (#171717):** Headlines, body text, primary buttons — strong ink presence.
- **Secondary (#737373):** Metadata, captions, nav links — supporting voice.
- **Tertiary (#0a72ef):** Accent/interaction color — links, hover states, active elements. Used sparingly.
- **Neutral (#fafafa):** Page background — warm white, not cold.
- **Surface (#f5f5f5):** Card backgrounds, code blocks, subtle section fills.
- **Border (rgba(0,0,0,0.08)):** Subtle separators — visible but not noisy.

## Typography

Geist for all text (system fallback). Weight and size carry hierarchy — no font family switching. Display size (3rem) reserved for hero landing only. H1 (2.25rem) for article titles. H2 (1.75rem) for section headings. Body text at 1rem / 1.0625rem with comfortable 1.65–1.7 line height. Label/mono for metadata tags and timestamps.

## Layout

Content max-width: 72rem (1152px). Horizontal padding: 1.25rem mobile, 2rem desktop. Article content max-width: 65ch for optimal reading line length. Section vertical spacing: xl (48px) between major sections, lg (24px) between related content groups. No decorative gradients on page body — only on hero/landing.

## Components

`article-header` has NO background color — the red block was a bug. Clean white/transparent. Title uses h1 tokens. Subtitle/description in secondary color. Back link above title, subtle. Tags use `tag-pill` — light surface bg, not dark.

`btn-primary` is the primary CTA. `btn-ghost` for secondary actions. No gradient fills.

`cta-section` uses surface color for background, not dark. Subtle border top/bottom.

## Do's and Don'ts

- **Do** use token references (`{colors.primary}`) in all component definitions.
- **Do** keep article titles at h1 size (2.25rem), not display size (3rem).
- **Do** use surface color for in-page sections (tags bar, CTA band), never hardcoded dark bg.
- **Don't** hardcode color classes like `bg-red-500` or `bg-zinc-900` — use semantic tokens.
- **Don't** use `text-justify` on body text — it's bad for reading. Use `text-left` or natural flow.
- **Don't** expose raw email addresses — use contact form or alternative.
- **Don't** nest component variants. `btn-primary-hover` is a sibling, not a child.