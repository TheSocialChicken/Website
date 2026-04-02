# SocialChicken Website — Claude Code Guide

## Project Overview

Static B2B consulting website for **SocialChicken** ("Simulate Before You Commit").
Owner: Christiaan Verhoef, based in the Netherlands.
Contact: chris@socialchicken.net
Future domain: socialchicken.net (currently hosted on GitHub Pages at kamitor.github.io/Website)
No build system. Pure vanilla HTML, CSS, JavaScript.

**Target audience:** Education, logistics, and governance leaders.
**Key message:** We all lay eggs (have ideas). With SocialChicken, the chickens breed each other's ideas.

---

## Hard Rules

- **NO M-DASHES** anywhere. Not in copy, not in comments, not in meta tags. Use commas, colons, or short sentences instead. Grep for -- before finishing any content task.
- **No frameworks.** Keep it vanilla HTML/CSS/JS. No npm, no build step.
- **No inline styles.** Use CSS custom properties and classes from tokens/components.
- **Nav is duplicated** across all pages. Update it everywhere when changing nav links.
- **Accessibility:** Maintain ARIA labels, semantic HTML, prefers-reduced-motion support.
- **SEO:** Every page needs canonical URL, OG tags, and Schema.org JSON-LD.

---

## Brand Voice (ENFP-T)

Christiaan is ENFP-T. All copy must reflect this:
- Warm, energetic, conversational
- Storytelling over bullet points
- Inclusive "we" language
- No corporate jargon
- Short punchy sentences mixed with flowing ideas
- Leads with the why, not the what
- Enthusiasm is genuine, not salesy

Blog posts: Christiaan provides direction, Claude writes the draft. He reviews before publish.

---

## The 3 Products

1. **Agile Working Training** - Starts with agile games to create buy-in, then adopts real Scrum/Kanban into daily life and company operations.
2. **Innovation Consulting** - Problem solving and automation consulting for companies.
3. **Simulations & Games** - Serious games and blended learning (Beer Game, game theory, N-CAST, conscious competence model). Live demo: demonstrator.valuechainhackers.xyz

---

## Stack and Structure

```
index.html            Homepage (splash + hero + sections)
about.html            Christiaan's story, brand philosophy, values, team
services.html         3 products: Agile Training / Innovation Consulting / Simulations & Games
simulations.html      Simulations and Games deep-dive
training.html         Agile Working Training deep-dive
case-studies.html     Filterable case study grid
contact.html          Contact form (chris@socialchicken.net) + calendar placeholder
pricing.html          Tiered pricing: Starter / Growth / Enterprise per product + currency toggle
resources.html        Templates, serious games examples, reading list, videos
booking.html          Booking CTA page
blog/index.html       Blog landing
404.html              Error page

styles/
  tokens.css          Design tokens (colors, type scale, spacing, z-index)
  reset.css           Browser normalisation
  global.css          Base typography, layout utilities, buttons
  splash.css          Splash screen animation styles
  nav.css             Fixed nav with scroll-shrink and mobile toggle
  components.css      Cards, badges, forms, grids

js/
  splash.js           Canvas particle network animation + session caching
  nav.js              Scroll-aware nav, mobile menu, active link highlight
  scroll-animations.js  IntersectionObserver reveal animations
  calendar-placeholder.js   Calendly integration stub
  chatbot-placeholder.js    Chatbot widget stub
```

---

## Design System (tokens.css)

| Token | Value | Use |
|---|---|---|
| --color-black | #0D0D0D | Background |
| --color-red | #D72638 | Primary CTA, accents |
| --color-yellow | #FFD60A | Simulation sections |
| Bebas Neue | Display font | H1, H2 (uppercase) |
| Barlow | Heading font | H3, H4, nav |
| Inter | Body font | Paragraphs, UI |

Button variants: --primary, --secondary, --yellow, --ghost, --lg, --sm
Badge variants: --red, --yellow, --grey
Section variants: --dark, --surface, --light, --accent

---

## Pricing Model

- Tiers: Starter / Growth / Enterprise (per product)
- Currencies: EUR (NL/DE/ES), USD (USA)
- Phase 1: Manual currency toggle (EUR/USD button in pricing page)
- Phase 2: Dynamic pricing via IP geolocation API

---

## i18n

- Phase 1 launch: English only
- Phase 2: Dutch (/nl/), German (/de/), Spanish (/es/)
- Language switcher in nav scaffolded at launch, translations added post-launch

---

## Integrations

| Integration | Status | Notes |
|---|---|---|
| Contact form | Ready | mailto:chris@socialchicken.net via Formspree or mailto fallback |
| Calendly | Placeholder | swap stub for embed script when account ready |
| Chatbot | Phase 2 | chatbot-placeholder.js stub |
| Blog RSS | Phase 2 | aggregate agile, game theory, serious games, innovation news |
| Google Fonts | Live | Bebas Neue, Barlow, Inter |
| GitHub Pages | Live | auto-deploys on push to main |

---

## Subagents

Use these agents by describing what you need. Each has a defined role and scope.

### copywriter (The Voice)
Writes all web copy, blog drafts, and social content in SocialChicken brand voice.
Knows Christiaan's story, the chicken philosophy, ENFP-T tone, and the 3 products.
Rules: No m-dashes. Warm and energetic. Leads with why.
Use for: page copy, hero headlines, product descriptions, testimonials, CTAs.

### seo (The Optimizer)
Audits and improves SEO across all pages.
Checks: meta titles, descriptions, canonical URLs, OG tags, Schema.org JSON-LD, keyword usage, internal linking, heading hierarchy.
Multilingual aware (EN/NL/DE/ES).
Use for: SEO audit of any page, writing meta descriptions, improving schema markup.

### qa (The Tester)
Reviews pages for quality issues.
Checks: broken links, missing alt text, missing meta tags, nav consistency across all pages, mobile layout issues, accessibility (ARIA, contrast, focus), m-dash violations, brand voice violations.
Use for: pre-launch QA pass, checking a page after edits.

### translator (The Polyglot)
Translates content to Dutch, German, and Spanish with cultural adaptation.
Adjusts pricing format per locale (EUR formatting, date formats, tone differences).
Not just literal translation: adapts idioms and examples for local context.
Use for: translating any page or section, adapting pricing display per locale.

### professor (The Professor)
Designs training programs, simulations, and products using learning science.
Frameworks: game theory, conscious competence model, N-CAST, serious games, blended learning, Scrum/Kanban.
Can draft: a new serious game design, a training arc, a product spec, a simulation scenario.
Use for: "design a new agile game", "create a training module outline", "build a simulation scenario for X".

### content (The Curator)
Researches and summarises relevant articles, papers, and news.
Topics: agile, game theory, innovation, serious games, automation, blended learning, logistics, governance.
Use for: blog post research, populating the resources reading list, finding relevant videos and papers.

---

## Common Tasks

### Add a new page
1. Copy an existing page as a structural template.
2. Update title, meta description, canonical URL, OG tags, Schema.org JSON-LD.
3. Add breadcrumb entry.
4. Add nav link across ALL pages (nav is duplicated, not a component).
5. Add scroll-animation classes (.reveal, .reveal--left, .reveal--right) to sections.

### Edit copy
All content is inline in HTML. Search with Grep for the relevant text string.

### Add a blog post
1. Create blog/posts/<slug>.html following blog index structure.
2. Add a card to blog/index.html.

### Deploy
```bash
git add <files>
git commit -m "..."
git push origin main
```

### Check for m-dashes before committing
```bash
grep -r "\u2014" --include="*.html" --include="*.css" --include="*.js" .
```

---

## Phase 1 TODO (launch this week)

- [x] Rewrite all page copy with real brand voice and Christiaan's story
- [x] Rename services: Consulting/Simulation/Training to Innovation Consulting/Agile Training/Simulations & Games
- [x] Build pricing.html with Starter/Growth/Enterprise tiers + EUR/USD toggle
- [x] Build resources.html with templates, games list, reading list, videos
- [x] Build booking.html (CTA to chris@socialchicken.net + calendar placeholder)
- [x] Create resources/triple-layer-bmc.html placeholder download page
- [x] Wire contact form to chris@socialchicken.net
- [x] Add fictional education-sector testimonials as placeholders
- [x] Reference ValueChainHackers as live demo in simulations page
- [x] Scaffold /nl/ /de/ /es/ folder structure with index redirects
- [x] Add language switcher to nav (non-functional stubs for Phase 2)
- [x] Audit entire site for m-dashes and remove all

## Phase 2 TODO (post-launch)

- [ ] Full NL/DE/ES translations
- [ ] Dynamic pricing via IP geolocation
- [ ] Calendly booking embed
- [ ] Blog RSS feed aggregator
- [ ] Real case studies (Christiaan to supply)
- [ ] Real team/about content
- [ ] Chatbot integration
- [ ] Custom domain socialchicken.net

---

## Subagent Guidance (when to use which)

| Task | Subagent type |
|---|---|
| Exploring codebase, finding files, searching patterns | Explore |
| Planning a multi-file feature or refactor | Plan |
| Writing copy, headlines, descriptions | copywriter (defined above) |
| SEO audit or improvement | seo (defined above) |
| Pre-launch or post-edit QA | qa (defined above) |
| Translation tasks | translator (defined above) |
| Designing a training or simulation | professor (defined above) |
| Blog research or resources content | content (defined above) |
| Claude Code features, hooks, settings questions | claude-code-guide |
| Open-ended multi-file research | general-purpose |
