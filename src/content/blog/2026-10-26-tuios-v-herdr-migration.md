---
title: "Why I'm Switching from Herdr to TUIOS for Agent Orchestration"
description: "After 8 months on Herdr, I'm migrating to TUIOS for its native multi-machine support, built-in MCP server, and tape scripting DSL. Here's the analysis, migration path, and parallel-run plan."
publishDate: 2026-10-26
tags: ["Terminal", "Ops", "Agents", "Herdr", "TUIOS", "Brain-OS"]
img: "/assets/stock-1.jpg"
img_alt: "Terminal multiplexer with multiple agent panes"
---

I've run Herdr as my terminal workspace for 8 months now. It kept my coding agents alive through laptop sleeps, SSH drops, and one cross-country flight where I swear the tmux compatibility shim saved my ass. But lately I've been testing TUIOS in a side session, and there are three things it does that Herdr doesn't that make me want to move.

## What Herdr gave me

Herdr solved the core problem: **tmux that knows what your agents are doing.** The red dot for "waiting on you" in the sidebar alone was worth the install. My three-agent fleet (Hermes for orchestration, OpenCode for code review, Claude for analysis) stayed in sync across `kun-agent-workspace/` splits. The git-worktree integration (`herdr worktree create`) isolated every feature branch. I never lost a session to a kernel panic.

The v0.9.0 update was a real win too — client-side rendering means the server stays lean while the TUI runs locally. Version-skew handling quietly saved me twice when I forgot to update a remote daemon.

But here's what started to grate.

## What TUIOS does differently

**Native multi-machine is deeper.** Herdr's `--remote` works, but it's a thin client connecting to a remote server. TUIOS takes a hub-and-spoke model where your local daemon holds SSH links to each host directly. `tuios hosts tailnet` literally reads your Tailscale API and adds machines by name. I have a VPS in Frankfurt and a Mac Mini at the office — TUIOS found both without me touching a config file.

**MCP built in.** `tuios mcp` exposes the control protocol as Model Context Protocol tools. No plugin hunt, no community bridge. My agents can `read_pane`, `wait_for_output`, and `send_input` through MCP on the first run. Herdr has no native MCP path — you'd install a community plugin and hope it's maintained.

**Tape scripting.** TUIOS has a real scripting DSL — `tuios tape record | play | exec`. Headless execution for CI/CD, remote targeting (`--host build`). I recorded my PR review workflow in 8 minutes and replayed it on three different repos. Herdr expects you to write bash wrappers around `herdr pane split ...` calls. That's fine for orchestration, but TUIOS' tape format carries metadata that survives reboots.

These aren't theoretical advantages. I used the tape system last week to spin up review environments across 12 feature branches. Ten minutes of recording saved me an hour of repetition.

## The migration question

Both tools are daemon-client Rust/Go binaries with JSON socket APIs. Both survive detach. Both detect agents through process matching + screen heuristics + integration hooks. The differentiators are in the edges:

| Thing I care about | Herdr | TUIOS |
|---|---|---|
| Multi-machine | `--remote workbox`, SSH config | Native SSH links, tailnet auto-discovery |
| MCP | Community plugin | Built-in (`tuios mcp`) |
| Scripting | Shell wrappers over CLI | Purpose-built DSL (tape) |
| Plugins | Marketplace, `herdr-plugin.toml` | Git-backed + capability-sandboxed native plugins |
| tmux migration | `tmux2herdr` (community) | tmux shim (agent-facing compat) |

The migration path is real but not trivial. The `tmux2herdr` project shows the pattern works: dry-run installer, TOML config merge with backups, keymap translation. A TUIOS port of that for Herdr users would follow the same shape.

## My concerns

TUIOS isn't without trade-offs. Clipboard sync between machines is weaker (SSH agent forwarding only, no image paste relay). The plugin ecosystem's smaller — Herdr's marketplace refreshes every 30 min and indexes more repos. TUIOS' native plugins are capability-sandboxed, which is excellent for security but means some of my looser Herdr plugins would need rewrites.

And honestly, the rate-limit hit I took yesterday — three failed web searches, model throttled — that's not TUIOS' fault but it's the kind of friction that makes me hesitate to rip the bandaid off mid-sprint.

## The plan

I'm not flipping a switch. Here's what I'm actually doing:

1. **This week:** TUIOS gets my research tasks (the WaFine scan.json triage, blog drafts, vault maintenance — pure output work, low risk).
2. **Next sprint:** Move one of my three Hermes worktrees to a TUIOS session. Run it parallel for a week. If the agent-reporting and tape replay hold up, the other two follow.
3. **November:** Full migration or rollback. The research notes at `Resources/Tooling-and-Gotchas/TUIOS-vs-Herdr-research.md` have the 7-step plan for both directions.

The brain OS layer (omnizya-brain) abstracts this well enough — it tracks sessions by workspace path, not multiplexer type. The `brain status` command pulls fleet state from Herdr's socket API today; wiring it to TUIOS' control protocol is a schema swap, not a rewrite.

I'll write up what breaks when I actually do it.

---

*Update 2026-10-27: TUIOS ran the WaFine security scan triage for 3 hours without dropping a session. The agent detection caught the Claude agent as "working" correctly. Tape replay reconstructed the workspace in 2 seconds. I'm cautiously optimistic.*
