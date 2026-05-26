---
title: "Engineering a High-Performance MCP Server for Obsidian"
description: "Architecture of a Model Context Protocol server that gives agents structured access to knowledge graphs. 50ms tool response, hybrid SQL/Vector search."
publishDate: 2026-05-18
tags: ["AI", "MCP", "Obsidian", "Bun", "Architecture"]
img: "/assets/stock-2.jpg"
img_alt: "MCP Server architecture"
---

Standard RAG flattens Obsidian vaults into text chunks, losing the link graph. I built an **MCP Server** to give agents structured, graph-aware access to local vaults.

### Technical Stack
- **Runtime:** Bun (Startup <100ms, essential for subprocess spawning).
- **Storage:** `bun:sqlite` for the link graph; local vector index for semantic search.
- **Protocol:** Model Context Protocol (MCP) over stdio and HTTP.

### System Layers
1.  **Transport:** Dual-mode (stdio for Claude Desktop, HTTP for remote tools).
2.  **Schema:** Parses notes into structured objects: tags, frontmatter, and directional links (inbound/outbound). 
3.  **Tooling:** Exposes granular ops: `get_backlinks`, `search_notes`, `read_note`, `list_directory`.

### Performance
| Operation | Latency (p50) | Latency (p95) |
|---|---|---|
| Vector Search | 45ms | 120ms |
| Metadata Query (SQL) | 3ms | 8ms |
| Note Parse/Read | 8ms | 25ms |
| Initial Vault Scan | 1.2s | 2.1s |

### Takeaway
Agentic AI value is in the **tool engineering**, not the model. High-perf local bridges enable agents to navigate information with the same structural awareness as a human.

The full server implementation runs on Bun with zero config: [github.com/moughamir/obsidian-mcp-plugin](https://github.com/moughamir/obsidian-mcp-plugin).

*Most of the value in AI tooling isn't the model — it's the schema design, the tool boundaries, the performance tuning. If you're building agent infrastructure and need that engineering foundation, let's talk.*
