# Modern Hiring Portfolio Rewrite Implementation Plan

> **For Hermes:** Implement directly in this Astro repo with small verified edits. Preserve existing routes and GitHub Pages deployment.

**Goal:** Reposition moughamir.github.io as a clean, minimal, modern hiring-focused portfolio that builds trust fast and routes visitors toward email, LinkedIn, GitHub, and concrete proof of work.

**Architecture:** Keep the existing Astro static-site architecture. Rewrite the highest-impact public pages and content instead of introducing new dependencies. Use a Vercel/Linear-inspired visual system: white canvas, tight typography, high contrast, subtle card borders, concrete proof sections, and clear CTAs.

**Tech Stack:** Astro 5, TypeScript content collections, Tailwind integration already present, plain component CSS.

---

### Task 1: Inspect and protect the repository

**Objective:** Clone with `gh`, inspect structure, identify weak public-image issues.

**Files:**
- Read: `src/pages/index.astro`
- Read: `src/pages/about.astro`
- Read: `src/components/ContactCTA.astro`
- Read: `src/components/MainHead.astro`
- Read: `src/content/work/*.md`

**Verification:** Confirm repository builds through Astro after edits.

---

### Task 2: Replace the homepage with a hiring-first landing page

**Objective:** Make `/` immediately communicate senior full-stack value, availability, proof, service offers, selected work, and next action.

**Files:**
- Modify: `src/pages/index.astro`

**Implementation notes:**
- Hero headline: “Senior full-stack developer shipping practical web products.”
- Positioning: Morocco/remote, React/TypeScript/Node/PHP/Python, product-minded execution.
- Add CTAs: email, LinkedIn, GitHub, work.
- Add proof metrics: 10+ years, 249 GitHub repos, 35 gists, Arabic/French/English, Morocco/remote.
- Add sections: What I can do this week, selected proof, operating principles, availability.
- Avoid desperation language; show capability and calm urgency.

**Verification:** `pnpm build` succeeds and homepage renders cleanly.

---

### Task 3: Rewrite About page and remove placeholder content

**Objective:** Remove all weak template bullets and turn About into recruiter-friendly narrative.

**Files:**
- Modify: `src/pages/about.astro`

**Implementation notes:**
- Keep education, but make it concise.
- Replace weak template copy with honest, non-overclaiming content.
- Add “How I work”, “Stack”, “Experience signals”, “Currently available”.
- Keep tone senior, precise, not needy.

**Verification:** Search repo for old template markers and the previous contact typo returns none.

---

### Task 4: Fix contact and SEO metadata

**Objective:** Remove email typo and improve search/social snippets.

**Files:**
- Modify: `src/components/ContactCTA.astro`
- Modify: `src/components/MainHead.astro`
- Modify: `src/base.ts`

**Implementation notes:**
- Correct email to `moughamir@gmail.com`.
- Default title/description should be hiring-focused.
- Add Open Graph title, canonical URL, author, and theme color.
- Remove weak default “personal site” copy.

**Verification:** Search for old typo and weak meta strings.

---

### Task 5: Clean work content

**Objective:** Replace template/placeholder work entries with credible case-study style summaries.

**Files:**
- Modify: `src/content/work/hatom-labs.md`
- Modify: `src/content/work/markdown-mystery-tour.md`

**Implementation notes:**
- Use concrete but honest wording.
- Focus on problem, contribution, stack/skills, outcome.
- If a project is experimental/demo, label it as such.

**Verification:** Work page still builds from content collection.

---

### Task 6: Apply minimal modern global styling

**Objective:** Shift visual tone from decorative portfolio template to authority-building product engineer site.

**Files:**
- Modify: `src/styles/global.css`
- Optional: `src/layouts/BaseLayout.astro`
- Optional: `src/components/Nav.astro`, `src/components/Footer.astro`

**Implementation notes:**
- Use Geist fonts from Google Fonts.
- Use #ffffff, #171717, #666, #ebebeb palette.
- Use shadow-as-border card style.
- Keep dark mode functional but make light default polished.

**Verification:** Visual check in browser on local preview.

---

### Task 7: Build and visual QA

**Objective:** Verify the site compiles and looks professional.

**Commands:**
```bash
pnpm install
pnpm build
pnpm preview --host 127.0.0.1 --port 4321
```

**Verification:**
- No Astro build errors.
- Home page clear in first viewport.
- No placeholders or email typo.
- CTAs visible.
- Mobile layout stacks cleanly.

---

### Task 8: Store outcome in Obsidian

**Objective:** Keep the KB aligned with the public-image recovery plan.

**Files:**
- Create/update: `/home/m7r/Documents/knowledge-base/Career/Portfolio-Rewrite-2026.md`
- Update daily note if appropriate.

**Verification:** Note links to profile positioning and financial recovery plan.
