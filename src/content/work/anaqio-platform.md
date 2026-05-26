---
title: Anaqio AI Fashion Platform
publishDate: 2026-05-26 00:00:00
img: /assets/anaqio-arch.svg
img_alt: Anaqio platform architecture diagram — input, AI pipeline, infrastructure, and output layers
description: |
  Designed and built a full-stack AI fashion platform on a Bun monorepo. Turns flat lay product photos into photorealistic campaign visuals through prompt-engineered Gemini vision models.
tags:
  - AI
  - Architecture
  - Bun
  - Monorepo
  - TypeScript
  - Product Design
---

## Context

Fashion brands face a fundamental scaling problem: every new product variant, colorway, or seasonal collection requires fresh photography. Traditional e-commerce shoots cost thousands per day, take weeks to schedule, and make iteration impossible. As brands grow, visual production becomes a bottleneck instead of a growth engine.

Anaqio solves this by replacing physical photo production with AI-generated fashion visuals. The platform takes flat lay product shots or ghost garment images — the simplest possible inputs a brand already has — and produces photorealistic, model-worn campaign visuals in minutes.

I designed and built the platform from scratch: the monorepo architecture, the AI inference integration, the API surface, and the infrastructure.

## Architecture

### Monorepo Foundation

The entire platform lives in a single Bun workspaces monorepo orchestrated by Turborepo. This was a deliberate bet on Bun's ecosystem maturity for a greenfield AI product. Shared internal packages enforce zero type drift between the inference pipeline, the API layer, and the frontend:

- **`@anaqio/schemas`** — Zod validation schemas shared across apps and packages. The same schemas that validate an API request also type-check database inserts.
- **`@anaqio/types`** — Shared TypeScript interfaces for the generation models, user profiles, and API contracts.
- **`@anaqio/supabase`** — Three-client Supabase factory: browser (client-side RLS), server (server component cookies), admin (service role for DB operations). Exported as a single package so every app uses the same connection pattern.
- **`@anaqio/ui`** — Shared shadcn/ui component library in New York style, used across studio and backoffice.
- **`@anaqio/auth`** — Auth middleware and RBAC permission utilities.
- **`@anaqio/constants`** — App-wide constants (providers, status enums, configuration).
- **`@anaqio/utils`** — Common utilities (`cn()`, format helpers).

The monorepo runs 3 Next.js 16 apps, each independently deployable:

| App | Purpose | Stack |
|---|---|---|
| `studio` | AI fashion generation UI | Next.js 16, Supabase, Zustand, Tailwind v4 |
| `landing-page` | Brand site + waitlist | Next.js 16, Framer Motion, next-intl |
| `backoffice` | Internal CRM + dashboard | Next.js 16, Supabase, Tailwind v4 |

### AI Inference Pipeline

The core technical problem: how to make a vision-language model reliably produce brand-consistent fashion try-on results. The solution is prompt-engineered inference using Google's Gemini model, adapted from Google's AI Studio reference architecture.

```
Garment image + Model image + Text prompt
  → [Gemini 2.5 Flash] → Generated try-on image
    → [Validation] Image returned? Yes → upload to storage, mark complete.
                      No → parse refusal text, return meaningful error.
```

The inference itself is a single API call — send the garment photo, the model photo, and a detailed prompt to `gemini-2.5-flash-preview-image-generation`. The model handles garment isolation, placement, draping, lighting, and scene composition internally:

```typescript
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-preview-image-generation',
  contents: {
    parts: [
      { inlineData: { data: garmentB64, mimeType: garmentB64.mimeType } },
      { inlineData: { data: modelB64, mimeType: modelB64.mimeType } },
      { text: prompt },
    ],
  },
  config: { responseModalities: ['image', 'text'] },
})
```

The prompt encodes the fashion domain: isolate the garment without modifying it, place it naturally on the model with accurate fabric draping, apply studio lighting, and produce an editorial-quality output indistinguishable from a professional photograph.

### Generation State Machine

The platform tracks generation lifecycle in Supabase:

```
pending → processing → completed
                       failed
```

Each API request:
1. Validates input via Zod schema
2. Authenticates via Supabase session (or kiosk mode with session ID)
3. Verifies garment path ownership (security boundary)
4. Inserts a `generations` row (status: `pending`)
5. Updates to `processing` while inference runs
6. Uploads the output to Supabase Storage
7. Updates to `completed` with output path and inference timing
8. On error: updates to `failed` with error message

### Performance

| Operation | Stack | Typical Latency |
|---|---|---|
| Gemini inference | `gemini-2.5-flash-preview-image-generation` | 5-15s |
| Output upload | Supabase Storage (base64 → signed URL) | <500ms |
| End-to-end (single image) | Full request cycle | 6-18s |
| Max request duration | Vercel function timeout | 300s |

### Why Bun + Next.js?

The runtime choice was critical. Bun delivers fast installs, native TypeScript execution, and Turborepo compatibility — but we use Next.js 16 for the app framework rather than Bun.serve. This gives us the App Router, React Server Components, and Vercel deployment without sacrificing monorepo performance:

- **~2s cold start** on dev from `bun run dev` vs 8-12s with npm/Node
- **45s CI builds** replacing a multi-minute Node pipeline
- **Shared packages work without build step** — Bun resolves TypeScript directly
- **SQLite-native** for local development, PostgreSQL via Supabase in production

The trade-off was real: Bun's ecosystem is younger. Some ESLint plugins require workarounds, and Supabase tooling sometimes expects Node. But for a greenfield platform where iteration speed was the primary constraint, Bun paid for itself in the first week.

## Key Decisions

**Prompt engineering over fine-tuning.** Rather than training a custom model (which requires datasets, GPU budgets, and ongoing maintenance), the platform invests in prompt design and few-shot context. The Gemini prompt has been iterated dozens of times based on output quality audits — small wording changes produce measurably better garment isolation and lighting realism.

**Single-model architecture over pipeline assembly.** The industry trend is toward specialized models (segmentation → pose → texture → lighting → render). Anaqio deliberately goes the opposite direction: a single multimodal model that handles everything. This means simpler infrastructure, no inter-stage error propagation, and easier debugging — at the cost of less fine-grained control. For the MVP and early customers, this was the right trade.

**Internal packages as type contracts.** The monorepo's shared packages aren't just convenience — they're the schema definition that ties the company together. The AI engineer can't accidentally change the output schema without the API engineer knowing. This saved an estimated 3+ hours per week in cross-team sync.

**Three-schema Supabase architecture.** Rather than a monolithic `public` schema, the database is split into `studio`, `landing`, and `public` schemas. Each app owns its schema, with `public` serving cross-app views for the backoffice. This keeps migration concerns isolated and prevents accidental cross-app coupling.

**3-client Supabase pattern.** Instead of inlining `createClient()` everywhere, the platform uses a single `@anaqio/supabase` package that exports three factories: `browser` (client-side with RLS), `server` (server component cookies), and `admin` (service role for trusted operations). This eliminates a class of auth bugs and makes the auth pattern auditable in one place.

## What this demonstrates

- **Full-stack AI product engineering.** Not just model integration — the entire system from monorepo setup to deployment pipeline to API design. Evaluated multiple providers (FAL.ai, Replicate, Gemini) and chose Gemini based on output quality and integration simplicity.
- **Thoughtful runtime selection.** Chose Bun based on measurable constraints (install speed, TypeScript resolution, CI throughput), not hype. Chose Next.js 16 over alternative frameworks for App Router and RSC. Can articulate where each breaks and when alternatives are better.
- **Architecture that respects business context.** The monorepo design, the Supabase schema isolation, the single-model inference strategy — all chosen to move fast early without painting into a corner.
- **Production deployment.** The platform has a deployed Next.js app with Supabase infrastructure, handling real generation requests through a complete auth + storage + inference pipeline.

*The inference architecture described here represents the current shipped implementation. Earlier concepts for a multi-stage custom pipeline (segmentation, pose estimation, texture mapping, lighting, render) were evaluated in design but deferred in favor of the simpler Gemini-based approach.*
