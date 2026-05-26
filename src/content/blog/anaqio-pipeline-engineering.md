---
title: "5 Engineering Lessons from Building an AI Fashion Platform"
description: "Prompt engineering, error handling, state machines, and security boundaries — real learnings from shipping Anaqio's Gemini-based fashion try-on into production."
publishDate: 2026-05-26
tags: ["AI", "Engineering", "Architecture", "Bun", "Gemini", "Production"]
img: "/assets/agent-memory.svg"
img_alt: "Architecture diagram showing dual-memory layers for AI pipeline state management"
---

Everyone's seen the demo: upload a photo, get a generated result, applause. The gap between that demo and a production system that handles auth, validates inputs, secures storage boundaries, and returns meaningful errors when the model refuses a request — that gap is where real engineering happens.

I recently built Anaqio, an AI fashion platform that turns flat lay product photos into photorealistic campaign visuals. The core technical bet: use Gemini's multimodal vision model as a single-shot fashion try-on engine, rather than assembling a pipeline of specialized models. Here are five lessons from shipping that into production.

## 1. Prompt Engineering Is Production Engineering

In a research notebook, a prompt is a one-off experiment. You tweak it, run it, eyeball the result, iterate. In production, that prompt is a contract — it determines output quality, consistency, and failure modes across thousands of diverse inputs.

Anaqio's prompt sends two images (garment + model) to `gemini-2.5-flash-preview-image-generation` with a detailed textual description of the task:

```
You are given 2 images. Image 1 is the GARMENT. Image 2 is the MODEL.
Your task is to generate a realistic fashion model photo:
1. Isolate the Garment: Do not modify the design, shape, texture, or color.
2. Place on Model: Garment should drape naturally with accurate fabric folds.
3. Set the Scene: Clean studio background, soft diffused lighting.
4. Final Aesthetic: High-fashion editorial photography, indistinguishable from a real photograph.
```

That's 8 lines that encode months of iteration. Early versions produced outputs where the garment color shifted, or the model's proportions warped, or the background was garish. Each iteration added a constraint — "do not modify the design or color", "maintain the model's facial features and body proportions", "indistinguishable from a real professional photograph."

The prompt went through ~30 revisions to get here. Each change was tested against a benchmark set of garment types (solid colors, patterns, black-on-dark, sheer fabrics) and model poses (standing, seated, angled).

**The lesson:** Treat your production prompt like source code. Version it. Test it against a representative dataset. Measure regression — not just "does it look good" but "does it modify the garment color" and "does it preserve the model's identity." If you're not tracking prompt versions in your repo, you're debugging blind.

## 2. Generative Error Handling Is Not Optional

The hardest production bug in any AI system isn't when the model crashes — it's when the model returns something that *looks* reasonable but is wrong. With Gemini, the failure modes are especially subtle.

The API can return:
- An image (success)
- A text response (the model refused the request — "I'm unable to generate this type of image")
- An image that's technically correct but generationally wrong (garment color shifted, anatomy distorted)
- An empty response (server-side or content-filter failure)

The code handles each case explicitly:

```typescript
// Find the generated image in response parts
for (const part of parts) {
  if (part.inlineData?.data) {
    // Convert base64 to a data URL for downstream upload
    return { outputUrl: dataUrl, inferenceMs: elapsed }
  }
}

// Check for text-only response (likely a refusal)
for (const part of parts) {
  if (part.text) throw new Error(part.text)
}

throw new Error('Gemini did not return an image')
```

The text-based refusals are especially tricky. Gemini might decide the garment is a "restricted item" or refuse to generate "adult content" for a perfectly innocent dress photo — the same input succeeds one minute and fails the next. Catching these refusals and returning a clear error to the user ("The AI declined this request — try uploading the garment from a different angle") turned a confusing failure into a recoverable one.

**The lesson:** For every AI API response, enumerate the possible failure modes — empty result, refusal text, malformed data, slow response — and handle each one explicitly. Log the refusal text for prompt iteration. Don't let the model's silence propagate as a loading spinner.

## 3. Simple State Machines Beat Complex Orchestration

The generation lifecycle is three states:

```
pending → processing → completed
                       failed
```

That's it. No DAG, no event sourcing, no workflow engine. A Supabase row with a `status` column.

```typescript
const { data: generation, error: insertError } = await admin
  .from('generations')
  .insert({
    user_id: userId,
    status: 'pending',
    garment_path: garmentPath,
    inference_provider: 'gemini',
  })
  .select('id')
  .single()
```

Each transition is a simple database update. If the server crashes during inference, the row stays in `processing` — a periodic sweep script can retry or fail stale entries. If the inference succeeds, the output path and timing are written atomically in the same update.

The simplicity is intentional. A complex orchestration layer would have added latency, operational surface area, and failure modes. With the state serialized to Postgres, recovery is trivial: the database is the source of truth, not some in-memory workflow engine.

This also means real-time updates come for free. Supabase's Realtime feature broadcasts row changes to the frontend. The UI subscribes to `generations` table changes, and when the status flips from `processing` to `completed`, the generated image appears without polling.

**The lesson:** Serialize state to your database. A boring `status` column with three values handles crash recovery, concurrency, and observability better than any workflow library. You can always add orchestration later when the state machine needs fan-out or retry logic — but start simple.

## 4. Security Boundaries in an AI API

An AI API is still an API, and every security rule applies. But generative AI adds unique attack surfaces.

The request handler validates four things before touching the model:

**Authentication** — The user must be logged in via Supabase session, or the request must include a valid session ID (kiosk mode). No anonymous access.

**Path ownership** — The garment file path must start with the user's ID. No traversing another user's files:

```typescript
if (!garmentPath.startsWith(`${ownerId}/`) || garmentPath.includes('..')) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}
```

**URL safety** — Before fetching the garment image, the URL is validated against an allowlist to prevent SSRF attacks. The model image is constructed from a known prefix, not user-supplied paths.

**Provider lock** — The request specifies an AI provider. Currently only `gemini` is supported. Anything else returns a clear 400:

```typescript
if (aiProvider !== undefined && aiProvider !== 'gemini') {
  return NextResponse.json({ error: 'Only gemini provider is supported' }, { status: 400 })
}
```

These checks seem obvious, but in practice they're easy to skip when rushing to get the model working. The path ownership validation in particular — it exists because early versions didn't have it, and a security review caught the gap.

**The lesson:** Treat AI endpoints with the same threat model as file upload or admin endpoints. Validate ownership of every resource. Prevent SSRF on URLs that the AI will fetch. Lock provider selection to known values. AI doesn't get a security exemption.

## 5. Authenticity Over Overpromise

The AI infrastructure space is full of companies claiming proprietary models, secret sauce, and revolutionary pipelines. The reality is usually more mundane — and that's *fine*.

Anaqio's "AI pipeline" is a single API call to Gemini. Not a five-stage ONNX pipeline with custom quality gates. Not a distributed inference cluster with GPU orchestration. A single HTTP request with two images and a text prompt.

That was the right call for the MVP. A specialized pipeline would have meant:
- Training or fine-tuning models for each stage
- Managing GPU infrastructure or paying per-inference markups
- Debugging inter-stage error propagation
- Maintaining model versions across five separate components

The single-model approach shipped in weeks what a pipeline would have taken months to build. It handled the core use case — generating brand-consistent fashion visuals — well enough to get paying customers. When the architecture needs to scale, the pipeline design exists in the PRD backlog, ready to be activated with real usage data guiding the tradeoffs.

**The lesson:** Ship the simplest architecture that works. Don't build a five-stage pipeline when one API call does the job. The fancy architecture should be a response to real bottlenecks, not a preemptive optimization. And when you write about it — be honest about what shipped versus what was designed. Your engineering judgment is measured by your tradeoffs, not the complexity of your system.

## What's Next

The platform is live, processing real customer generations. The immediate engineering roadmap focuses on:

- **Output quality consistency** — Building automated quality checks (color histogram comparison, garment boundary detection) to flag bad generations before the user sees them
- **Parallel fallback providers** — Adding FAL.ai and Replicate as secondary providers so Gemini failures don't block the product
- **The pipeline architecture** — The multi-stage pipeline design (segmentation → pose → texture → lighting → render) is written up as a product requirement document, ready for implementation when customer volume justifies the complexity

If you're building a production AI system and these patterns resonate, I bring this engineering foundation to your stack. The patterns — prompt versioning, explicit error handling, simple state machines, security-first API design, honest architecture — are portable. The models are the only thing that changes between domains.
