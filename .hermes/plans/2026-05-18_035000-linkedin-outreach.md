# Implementation Plan: LinkedIn Authority & Professional Outreach

## Goal
Establish a high-authority LinkedIn presence for Mohamed Moughamir to convert senior developer technical work into career opportunities.

## Context
- The portfolio and blog are now live and technically sharp.
- The next phase is visibility: getting this content in front of target recruiters and tech leaders in the EMEA region.
- Goal: Systematize professional networking to move from "active search" to "inbound interest."

## Proposed Approach
1. **Profile Optimization**: Align LinkedIn profile copy with the new portfolio's Senior Full-Stack/Product-Minded positioning.
2. **Outreach Systematization**: Execute the 15-minute daily comment routine (scheduled via cron) to build visibility.
3. **LinkedIn Showcase Project**: Utilize the Bun-based project skeleton to create a fast, impressive "Portfolio Showcase" link for the LinkedIn signature.

## Step-by-Step Plan
1. **Audit LinkedIn Profile**:
   - Update headline: "Senior Full-Stack Developer | React, TypeScript, Bun | Agentic AI Systems & High-Conversion Web Products"
   - Align experience sections with the STAR-format narratives stored in Obsidian.
2. **Setup Outreach routine**:
   - Use the `daily-comment-routine` cron job to draft and store 3-5 technical comments daily.
   - Manually review/post once daily.
3. **Showcase Deployment**:
   - Refine the `/home/m7r/projects/portfolio-showcase/` Bun skeleton.
   - Deploy to a public URL (e.g., Vercel) for the LinkedIn link.
   - Feature the "Obsidian MCP Plugin" and "Anaqio" showcase.

## Files to be updated/created
- `LinkedIn Profile` (Manual update)
- `/home/m7r/projects/portfolio-showcase/index.html` (UI polish)
- `/home/m7r/projects/portfolio-showcase/index.ts` (Deployment config)

## Validation
- Monitor LinkedIn profile view count and connection requests.
- Track outreach comment impact.
- Verify "Portfolio Showcase" performance (load speed, visual polish).

## Risks & Tradeoffs
- Risk: LinkedIn's algorithm throttling overly-active accounts. Mitigation: Keep comments thoughtful and manual-review only.
- Tradeoff: Time spent on outreach vs. building new technical features. Mitigation: Maintain strict 15-minute daily limit for comments.

## Open Questions
- Should we prioritize specific LinkedIn groups vs. direct executive connections? (Recommendation: Start with influential individual creators).
