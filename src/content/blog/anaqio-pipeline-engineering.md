---
title: "AI PRODUCTION: 5 LESSONS FROM THE TRENCHES"
description: "Demos are easy. Production is hard. Lessons from Anaqio: Prompt-as-code, Generative Error Handling, and Boring State Machines."
publishDate: 2026-05-26
tags: ["AI", "Engineering", "Architecture", "Bun", "Gemini", "Production"]
img: "/assets/agent-memory.svg"
img_alt: "Architecture diagram showing dual-memory layers for AI pipeline state management"
---

DEMOS ARE EASY. 
Production is a war. Shipping Anaqio taught me that real AI engineering happens in the plumbing, not the model.

### 1. PROMPT ENGINEERING IS PRODUCTION ENGINEERING
A prompt is a contract. 
- **ANAQIO'S PROMPT:** 8 lines, 30 revisions. Encodes garment isolation, model proportions, and editorial aesthetics.
- **SO WHAT:** Version your prompts. Test them against benchmarks. If it's not in Git, it's a liability.

### 2. GENERATIVE ERROR HANDLING
Models don't just crash. They fail subtly.
- **THE FAILURE:** Text refusals disguised as results. "I'm unable to generate this."
- **THE FIX:** Explicitly catch text-only responses. Map them to user-recoverable errors. Don't let the loading spinner spin forever.

### 3. BORING STATE MACHINES WIN
Simple beats complex.
- **THE FLOW:** `pending → processing → completed/failed`.
- **THE STORAGE:** A single Supabase row. No DAGs. No workflow engines.
- **SO WHAT:** Crash recovery is trivial. The DB is the source of truth.

### 4. SECURITY BOUNDARIES
AI doesn't get a pass.
- **VALIDATE EVERYTHING:** Path ownership (`!path.startsWith(userId)`), URL safety (SSRF allowlist), and Provider locking.
- **SO WHAT:** Treat AI endpoints like file uploads. Assume malicious intent.

### 5. AUTHENTICITY > OVERPROMISE
Ship the simplest architecture that works.
- **THE BET:** Single API call (Gemini) > 5-stage custom pipeline.
- **THE RESULT:** Shipped in weeks, not months. Real customers, real revenue. 

### THE TAKEAWAY
Ship the simplest path. Optimize when volume dictates. Boring engineering wins.
