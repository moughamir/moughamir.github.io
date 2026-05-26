---
title: "Building a Production AI Image Pipeline: 5 Engineering Lessons from Anaqio"
description: "Latency budgets, model orchestration, error handling, and the gap between a notebook demo and a production image pipeline. Real metrics from building Anaqio's fashion AI."
publishDate: 2026-05-26
tags: ["AI", "Engineering", "Architecture", "Bun", "Performance", "Production"]
img: "/assets/agent-memory.svg"
img_alt: "Dual-memory architecture diagram showing working and episodic memory layers"
---

Everyone's seen the demo: upload a photo, get a generated result, applause. The gap between that demo and a production pipeline that runs reliably at scale, handles edge cases gracefully, and doesn't bankrupt you in GPU costs — that gap is where real engineering happens.

I recently built Anaqio, an AI fashion platform that turns flat lay product photos into photorealistic campaign visuals. The core technical challenge wasn't model accuracy — the models are good enough out of the box. It was orchestrating them into a reliable pipeline. Here are five lessons from that process.

## 1. Latency Budgets Change Everything

In a Jupyter notebook, inference latency doesn't matter. You wait, you get a result, you iterate. In production, that latency propagates: the user's request holds a connection open, the job queue backs up, and if you're not careful, a single slow stage blocks the entire pipeline.

Anaqio's pipeline processes images through five stages: garment segmentation, pose estimation, texture mapping, lighting control, and render output. I gave each stage a strict latency budget during architecture design:

| Stage | Budget (p50) | Budget (p95) | What happens if exceeded |
|---|---|---|---|
| Segmentation | 1.5s | 3s | Return cached mask from similar SKU |
| Pose estimation | 1s | 2s | Fall back to template body |
| Texture mapping | 2s | 4s | Skip detail pass, use base projection |
| Lighting | 800ms | 2s | Apply generic studio preset |
| Render | 1.2s | 3s | Downscale to 1080p |

These budgets forced engineering decisions that a notebook never would: model quantization (FP16 → INT8), input size limits (cap at 2048px), and parallel pipeline execution for batch jobs. More importantly, every stage has a degradation path — a cheaper, faster alternative when the primary model misses its budget. The user gets a result in every case; it's just sometimes lower quality.

## 2. Orchestration Is Harder Than Inference

The models themselves are the easy part. Most fashion AI models are fine-tuned versions of open-weight architectures (SAM for segmentation, OpenPose variants for pose, ControlNet for rendering). The hard part is making them talk to each other reliably.

I built the pipeline as a state machine with explicit transitions:

```
Raw input
  → [Segmentation] → mask + metadata
    → [Validation] mask coverage > 90%? Yes → proceed. No → retry with different params.
      → [Pose] → posed UV map
        → [Texture] → mapped texture
          → [Lighting] → lit scene
            → [Render] → output
```

Each stage writes its output to an in-memory buffer with a known schema. The next stage validates its input schema before processing — garbage in, garbage out is not acceptable in production. If validation fails, the stage re-queues with context up to 3 times, then crashes to a dead-letter queue.

The state machine itself runs in Bun.serve, with each pipeline instance in an isolated `AsyncLocalStorage` context. This means concurrent pipeline executions don't leak state between each other — a problem that cost me a day of debugging when a texture map from one brand's puff jacket incorrectly wrapped another brand's formal dress.

## 3. Error Handling Is Your API Contract

Users don't care about your model architecture. They care that they uploaded an image and got a result or a clear error. The biggest source of production bugs in AI pipelines is silent degradation: the model returns something that *looks* reasonable but is actually wrong.

The worst case: a segmentation model that silently masked out half the garment because the background was a similar color. The output looked photorealistic — but it was a photo of half a dress. The user would only discover this after downloading and inspecting at full resolution.

My fix: stage-level quality gates with concrete metrics.

- **Segmentation gate**: Mask coverage must be ≥ 85% of the expected bounding box. Coverage < 70% triggers a full retry with different preprocessing. Coverage between 70-85% triggers a warning in the response metadata.
- **Pose gate**: Skeletal confidence scores must average ≥ 0.6. Below that, the pose model likely hallucinated joint positions.
- **Texture gate**: Color histogram of the output must match the input within a configurable delta (∆E < 12 by default). If the pipeline turned your navy blue sweater into teal, it fails here.
- **Lighting gate**: Mean luminance must fall within the target scene profile. If the "studio flat" lighting preset somehow outputs a silhouette, the gate catches it.

These gates turned anecdotally "good" results into reliably inspectable ones. They also generate structured log data that I use to tune model parameters over time.

## 4. Measure Everything, Especially the Things You Think Are Fine

When you're iterating fast, it's tempting to skip instrumentation. "I'll add metrics later." This is a trap. Without metrics, you're debugging production issues by guessing.

The first version of Anaqio had a basic health check endpoint and request logging. That was it. When a user reported that "sometimes the images look washed out," I had no way to correlate that with model version, input image properties, or server load. I was flying blind.

The second version measures every pipeline stage individually:

- **Per-stage latency histograms** (p50, p95, p99) — time-sliced by input resolution and model version
- **Gate pass/fail rates** — which quality gates fire most often, and for which input types
- **Memory pressure** per pipeline execution — Bun's `process.memoryUsage()` sampled at each stage transition
- **Cache hit rates** — for the prompt cache and the SKU-level mask cache
- **Degradation frequency** — how often each stage falls back to its cheaper alternative

With this data, I discovered that the segmentation gate failed ~12% of the time for black garments on dark backgrounds — a straightforward preprocessing fix that would have taken weeks to identify without metrics.

## 5. The Cache Is the Product

Here's the insight that changed the architecture more than any model swap: **in a fashion AI pipeline, the same garment gets processed hundreds of times.** A single SKU with 8 colorways across 3 angles and 2 campaign themes is 48 renders — and 90% of the pipeline work is identical across variants.

The cache strategy has three tiers:

1. **SKU-level mask cache** — Store segmentation masks keyed by SKU + angle. The expensive garment segmentation runs once per product, not once per render.
2. **Pose template cache** — Pre-compute the UV mapping for each of the 40+ supported poses. Pose estimation becomes a lookup instead of a model invocation.
3. **Prompt cache** — Cache the lighting model's warm-state payload (the scene definition, not the image). Subsequent renders in the same campaign skip the lighting model's cold-start penalty.

The result: a repeat render costs ~40% of the original in latency and ~25% in compute. For batch campaigns — which make up most of the product's use case — this is the difference between "fast" and "viable."

Most of the value in AI infrastructure isn't in the model — it's in the engineering around it: the latency budgets that force good decisions, the quality gates that prevent silent failures, the state machine that makes concurrency safe, the metrics that reveal hidden problems, and the cache that makes the economics work.

If you're building a production AI system and these patterns resonate, I bring this engineering foundation to your stack. The pipeline orchestration code, the quality gate framework, and the performance monitoring are portable — the models are the only thing that changes between domains.
