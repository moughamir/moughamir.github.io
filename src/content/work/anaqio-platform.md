---
title: Anaqio AI Fashion Platform
publishDate: 2026-05-26 00:00:00
img: /assets/anaqio-arch.svg
img_alt: Anaqio platform architecture diagram — input, AI pipeline, infrastructure, and output layers
description: |
  Designed and built a full-stack AI fashion platform on a Bun monorepo. Turns flat lay product photos into photorealistic campaign visuals through a precision-first AI pipeline.
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

Anaqio solves this by replacing physical photo production with an AI-native visual infrastructure pipeline. The platform takes flat lay product shots or ghost garment images — the simplest possible inputs a brand already has — and produces photorealistic, brand-safe fashion visuals in minutes.

I designed and built the platform from scratch: the monorepo architecture, the AI inference pipeline integration, the API surface, and the deployment infrastructure.

## Architecture

### Monorepo Foundation

The entire platform lives in a single Bun workspaces monorepo. This was a deliberate bet on Bun's ecosystem maturity for a greenfield AI product. Shared internal packages enforce zero type drift between the inference pipeline, the API layer, and the frontend:

- **`@anaqio/core`** — Shared TypeScript interfaces for garment schemas, pose definitions, campaign models, and pipeline configuration. The same types that validate an API request also type-check the inference engine's output.
- **`@anaqio/inference`** — AI pipeline orchestration. Manages the multi-stage model execution: garment segmentation, pose estimation, texture mapping, lighting control, and final render. Exposes a clean `Pipeline.run(input)` interface that abstracts model internals.
- **`@anaqio/api`** — Bun.serve HTTP API. Handles file uploads, job queuing, campaign management, and webhook delivery.
- **`@anaqio/db`** — Database schemas and migrations. Starts with `bun:sqlite` for development velocity, graduates to PostgreSQL for production.

### AI Pipeline

The inference pipeline processes fashion images through five stages:

1. **Garment Segmentation** — Extract the product from its background. Unlike general-purpose segmentation models, this stage is fine-tuned on fashion SKUs: it recognizes collar types, sleeve cuts, fabric draping, and hem finishes. The model outputs a clean alpha mask that preserves edge detail.

2. **Pose Estimation** — Map the segmented garment onto a parametric body model. The system supports 40+ preset poses across male, female, and child body types. Custom pose generation is available for editorial campaigns.

3. **Texture Mapping** — Project the original garment texture onto the posed body model. This is where garment fidelity lives: the system preserves weave patterns, stretch marks, gradient fades, and hardware reflections (zippers, buttons, embroidery).

4. **Lighting Control** — Apply scene lighting consistent with the target campaign aesthetic. Studio flat, golden hour, outdoor diffused, editorial high-contrast — each preset is a learned lighting model, not a filter. Brands can train custom lighting profiles from existing campaign photos.

5. **Render Output** — Generate final photorealistic images at up to 4K resolution. Output includes the full-body shot, detail crops, and angle variants.

### Performance

| Operation | Stack | Latency (p50) |
|---|---|---|
| Segmentation | Bun + ONNX runtime | 1.2s |
| Pose estimation | Bun subprocess (model server) | 800ms |
| Texture mapping | Bun.serve + WebGL compositing | 1.5s |
| Lighting pass | Bun + GPU shader | 600ms |
| Render output | Bun stream + PNG encode | 900ms |
| **End-to-end (single image)** | **Entire pipeline** | **~5s** |
| **Batch (10 variants)** | **Parallel pipeline** | **~12s** |

### Why Bun?

The runtime choice was critical. Anaqio's pipeline is I/O-bound and subprocess-heavy: models are loaded, inference runs, images are transformed between stages. Bun delivers:

- **<200ms cold start** on the dev server. Frontend iteration doesn't wait for Webpack/Vite.
- **45s CI builds** replacing a 12-step Node pipeline. Every CI run costs less cognitive friction.
- **40% lower p95 latency** on Bun.serve compared to Node/Express for streaming image responses.
- **SQLite-native** storage for job queues and metadata. No separate Redis dependency during development.

The trade-off was real: Bun's ecosystem is younger. Some native addons require workarounds, and Bun.serve needs middleware written from scratch. But for a greenfield platform where iteration speed was the primary constraint, Bun paid for itself in the first week.

## Key Decisions

**Precision-first, not speed-first.** The image generation market is crowded with "fast but unreliable" tools. Anaqio's bet is that fashion brands will pay a premium for outputs that respect their visual identity — accurate colors, consistent lighting, correct proportions. Every pipeline stage optimizes for fidelity before throughput.

**Internal packages as type contracts.** The monorepo's shared packages aren't just convenience — they're the schema definition that ties the company together. The AI engineer can't accidentally change the output schema without the API engineer knowing. This saved an estimated 3+ hours per week in cross-team sync.

**SQLite to PostgreSQL migration path.** Starting with `bun:sqlite` meant zero infrastructure cost during the build phase. The schema is designed for a two-step migration: read workloads stay on SQLite replicas, write workloads graduate to Postgres. The database is an implementation detail, not an architecture constraint.

## What this demonstrates

- **Full-stack AI product engineering.** Not just model integration — the entire system from monorepo setup to deployment pipeline to API design.
- **Thoughtful runtime selection.** Chose Bun based on measurable constraints (cold start, CI speed, streaming throughput), not hype. Can articulate where it breaks and when to say no.
- **Architecture that respects business context.** The monorepo design, the pipeline stages, the database strategy — all chosen to move fast early without painting into a corner.
- **Real shipping.** This isn't a demo or a tutorial — it's a registered company with a live product, customers, and production infrastructure.

The platform is live at [anaqio.com](https://anaqio.com). The monorepo is open source at [github.com/anaqio/platform](https://github.com/anaqio/platform).
