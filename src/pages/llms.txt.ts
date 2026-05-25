import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const content = `# Mohamed Moughamir — Portfolio

## Overview
Senior Software Engineer based in Bouskoura, Casablanca, Morocco. 10+ years of experience building high-conversion web products with React, TypeScript, Bun, Node.js, PHP, and Python. Available for remote EMEA contract and full-time roles.

## Pages

### Home (/)
I build things that ship and scale. Senior full-stack engineer with 10+ years, focused on React, TypeScript, Node.js, PHP, Python, and AI-assisted workflows. Available for contract, full-time, and rescue sprints.

Key sections:
- Proof points: 10+ years, 249 GitHub repos, 3 languages (Arabic/French/English), 48-72h delivery
- Capabilities: Full-stack product delivery, rescue and modernization, AI-assisted automation
- Selected projects: Obsidian MCP Plugin (AI/Obsidian), Anaqio AI Fashion Platform (Bun monorepo)
- Work principles: Calm execution, small useful versions first, business constraints as inputs

### About (/about/)
Senior Software Engineer: Product-Minded & Founder-Driven. Located in Bouskoura, Morocco.

Stack includes: React, TypeScript, Node.js, PHP, Python, Astro, Bun, SQLite, MongoDB, MySQL, WordPress, Tailwind, Git, Linux

Education:
- Université Hassan II — FSJES Casablanca (Licence en Gestion d'Entreprise, 2011–2015)
- HarvardX CS50: Introduction to Computer Science (2016–2017)
- MITx Algorithms, Python programming, introductory AI (2017)

Contact: moughamir@gmail.com | GitHub | LinkedIn | YouTube | Podcast RSS

### Blog (/blog/)
Articles on AI agents, Bun/TypeScript architecture, and building for scale.

### Work (/work/)
Selected work and project signals: web showcases, developer education concepts, open-source experiments, and practical product engineering.

## Expertise

### Core Stack
- React / TypeScript / Node.js / Bun
- PHP / Python / Astro / WordPress
- SQLite / MongoDB / MySQL / SQL
- Tailwind / Git / Linux

### Specializations
- Full-stack web development and product delivery
- AI-assisted software delivery and agentic AI workflows
- MCP (Model Context Protocol) and RAG (Retrieval-Augmented Generation)
- Remote team collaboration
- High-conversion landing pages and web products

## Projects

### Obsidian MCP Plugin
A high-performance Model Context Protocol (MCP) server providing AI tools with direct, semantic access to an Obsidian vault for agent-native application development. Most popular tool with active community contributions.

### Anaqio AI Fashion Platform
Full-stack AI fashion platform demonstrating Bun monorepo architecture, scalable backend, and AI integration for complex product logic.

## Contact

- Email: moughamir@gmail.com
- GitHub: https://github.com/moughamir
- LinkedIn: https://linkedin.com/in/moughamir
- YouTube: https://youtube.com/@moughamir
- Podcast RSS: /feed.xml

Location: Bouskoura, Casablanca-Settat, Morocco
Time zone: CET (UTC+1)
Availability: Open to remote EMEA work — contract, full-time, rescue sprints
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": "inline; filename=\"llms.txt\"",
      "Cache-Control": "public, max-age=3600",
    },
  });
};