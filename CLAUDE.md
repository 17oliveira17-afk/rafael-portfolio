# Rafael Portfolio — CLAUDE.md

## Project Overview

Personal portfolio for **Rafael Guimarães**, Product Design Lead.  
Live site: [rafael-portfolio-m275.vercel.app](https://rafael-portfolio-m275.vercel.app)  
GitHub: [17oliveira17-afk/rafael-portfolio](https://github.com/17oliveira17-afk/rafael-portfolio)  
Stack: **Next.js 16** · React 19 · TypeScript · Tailwind CSS v4 · GSAP · Lenis (smooth scroll)

---

## Deploy Workflow

**Every push to `main` auto-deploys to Vercel.** No manual steps needed.

```bash
# 1. Make changes
# 2. Stage and commit
git add <files>
git commit -m "description of change"

# 3. Push → Vercel deploys automatically
git push
```

Check deploy status at: https://vercel.com/dashboard  
Or in the GitHub repo under the green ✓ next to the commit.

---

## Project Structure

```
rafael-portfolio/
├── app/
│   ├── layout.tsx          ← Global layout: metadata, Nav, Cursor
│   ├── page.tsx            ← Home page (Hero, CVC showcase, About teaser, CTA)
│   ├── globals.css         ← Global styles, CSS variables, utility classes
│   ├── version.tsx         ← Version display (debug)
│   ├── about/
│   │   └── page.tsx        ← About page (bio, skills, timeline)
│   ├── contact/
│   │   └── page.tsx        ← Contact page (form, links)
│   ├── work/
│   │   ├── cvc/page.tsx    ← CVC case study
│   │   └── rappi/page.tsx  ← Rappi case study
│   └── components/
│       ├── Nav.tsx         ← Top navigation bar
│       ├── Cursor.tsx      ← Custom cursor (desktop only)
│       ├── ScrollReveal.tsx ← Fade-in-on-scroll wrapper
│       ├── BigImageReveal.tsx ← Full-bleed cinematic image section
│       ├── IPhone.tsx      ← iPhone SVG mockup wrapper
│       ├── MacBook.tsx     ← MacBook SVG mockup wrapper
│       ├── HorizontalCarousel.tsx ← Horizontal scrolling carousel
│       ├── PhoneCarousel.tsx ← Phone-specific carousel
│       └── useIsMobile.ts  ← Hook: returns true on mobile (< 768px)
├── public/
│   ├── photos/             ← Personal photos (rafael-2026.png, etc.)
│   ├── screens-mobile/     ← iPhone app screenshots (ip-*.png)
│   ├── screens-desktop/    ← Desktop/MacBook screenshots
│   ├── cinematic/          ← Full-bleed background images
│   ├── logos/              ← Brand logos (CVC, Rappi, etc.)
│   └── CV-Rafael_Guimaraes-2026.pdf ← Downloadable CV
├── .claude/
│   └── settings.json       ← Claude Code permissions
├── CLAUDE.md               ← This file
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Editable Content — Quick Reference

### Personal Info
- **Name / Title / Location**: `app/page.tsx` → Hero section (~line 330)
- **Role / Company**: `app/page.tsx` → About section (~line 654), floating stat card (~line 637)
- **Bio text**: `app/page.tsx` → About section; full bio in `app/about/page.tsx`
- **Page metadata (SEO title/description)**: `app/layout.tsx` lines 6–9

### Stats & Numbers
- **Years / Countries (animated counters)**: `app/page.tsx` → Stats Strip section (~line 429)
- **Quick-fact cards (30M+ users, etc.)**: `app/page.tsx` → About section (~line 661)

### Work / Case Studies
- **Home CVC teaser**: `app/page.tsx` → "WORK INTRO" section (~line 451)
- **CVC metrics (2→4.6★, +212%, +23%)**: `app/page.tsx` → `CVCShowcase` component (~line 104 mobile / ~line 186 desktop)
- **"More case studies" cards (MiBanco, Rappi, Thoughtworks)**: `app/page.tsx` → "MORE WORK" section (~line 492)
- **Full CVC case study**: `app/work/cvc/page.tsx`
- **Full Rappi case study**: `app/work/rappi/page.tsx`

### Navigation
- **Nav links**: `app/components/Nav.tsx`

### Footer
- **Copyright year, LinkedIn, email**: `app/page.tsx` → Footer (~line 704)

### Photos & Images
- Profile photo URL: `app/page.tsx` ~line 595 (uses raw GitHub URL to bypass Vercel CDN cache)
- To update: upload new image to `public/photos/`, update the `src` in `page.tsx`
- Mobile screenshots: `public/screens-mobile/` — filenames referenced in `page.tsx` and `app/work/cvc/`
- Desktop screenshots: `public/screens-desktop/`

### CV / Resume
- Replace file: `public/CV-Rafael_Guimaraes-2026.pdf`
- Link is in `app/about/page.tsx` or `app/contact/page.tsx`

---

## Common Tasks

### Update job title / company
Edit `app/page.tsx` → About section (~line 654) and the floating stat card (~line 637).  
Also update `app/about/page.tsx` if there's a matching bio there.

### Add a new case study
1. Create `app/work/[slug]/page.tsx`
2. Add a card in the "More case studies" grid in `app/page.tsx` (~line 492)
3. Replace "In progress" text with a `<Link href="/work/[slug]">` button when ready

### Add/replace a screenshot
1. Drop the image into `public/screens-mobile/` or `public/screens-desktop/`
2. Update the `src` prop wherever the old filename was referenced

### Change the accent color (blue)
The blue is `#0071e3` throughout. To change globally, do a find-and-replace across the `app/` directory.

### Update metadata/SEO
Edit `app/layout.tsx` lines 6–9 (`title`, `description`).

---

## Design System

Colors:
- Black sections: `#000` / `#0a0a0a`
- White sections: `#fff` / `#f5f5f7`
- Off-white: `#f5f5f7`
- Accent blue: `#0071e3`
- Body text (dark): `#1d1d1f`
- Muted text: `#86868b`
- Borders: `#d2d2d7`

CSS utility classes (defined in `globals.css`):
- `.btn-blue` — filled blue CTA button
- `.btn-white-ghost` — white outlined button
- `.btn-blue-ghost` — blue outlined button
- `.section-black` — black background section
- `.section-white` — white background section
- `.section-off-white` — off-white background section
- `.t-eyebrow` — small uppercase label
- `.t-body` — standard body text
- `.t-num-giant` — large animated number
- `.page-in` — fade-in animation on page load

---

## Local Development

```bash
cd /Users/rafael.guimaraes/Projects/rafael-portfolio
npm run dev      # starts at http://localhost:3000
npm run build    # production build (same as Vercel runs)
npm run lint     # ESLint check
```

> **Note:** This project uses Next.js 16 with React 19. APIs may differ from Next.js 13/14/15.
> Always check `node_modules/next/dist/docs/` for current API docs.

---

## Infrastructure

| Service | Purpose | Status |
|---------|---------|--------|
| **GitHub** | Source control | ✅ `17oliveira17-afk/rafael-portfolio` |
| **Vercel** | Hosting + auto-deploy | ✅ Connected to `main` branch |

Auto-deploy is active: every `git push` to `main` triggers a Vercel build and deploy.  
No environment variables or database needed — this is a static/SSG Next.js site.
