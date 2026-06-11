---
title: "BRUTAL PERFORMANCE: MCP FOR OBSIDIAN"
description: "RAG flattens graphs. I built a graph-aware MCP server. 50ms tool response. Zero-config Bun runtime. Agentic navigation at scale."
publishDate: 2026-05-18
tags: ["AI", "MCP", "Obsidian", "Bun", "Architecture"]
img: "/assets/stock-2.jpg"
img_alt: "MCP Server architecture"
---

RAG FLATTENS DATA. 
Flattened data kills intelligence. I built an MCP Server to give agents graph-aware access to local vaults.

### THE STACK: NO FAT
- **RUNTIME:** Bun. Startup <100ms. Speed is non-negotiable.
- **STORAGE:** `bun:sqlite` for the graph; local vector index for semantics. Hybrid power.
- **PROTOCOL:** Model Context Protocol (MCP). The new standard for agent-tool communication.

### SYSTEM LAYERS: ENGINEERED FOR SPEED
1. **TRANSPORT:** stdio (Claude Desktop) + HTTP (Remote). Flexible, fast.
2. **SCHEMA:** Notes aren't strings; they are objects. Tags, frontmatter, directional links.
3. **TOOLING:** Granular ops: `get_backlinks`, `search_notes`, `read_note`. Pure utility.

### BENCHMARKS: HARD METRICS
| Operation | Latency (p50) | Latency (p95) |
|---|---|---|
| Vector Search | 45ms | 120ms |
| Metadata Query (SQL) | 3ms | 8ms |
| Note Parse/Read | 8ms | 25ms |

### SO WHAT?
AI value is in **tool engineering**, not the model. High-perf local bridges enable agents to navigate information with human-level structural awareness.

Source: [github.com/moughamir/obsidian-mcp-plugin](https://github.com/moughamir/obsidian-mcp-plugin).
