# Jitin Nair Portfolio — CLAUDE.md

## Project Overview

A premium, dark-themed portfolio website for Jitin Nair — an AI Systems Architect specializing in multi-agent orchestration, AI enablement, and autonomous systems. The site showcases 200+ deployed AI agents, case studies, technical insights, and a comprehensive skill matrix.

**Live URL**: https://jitinnair.com

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | DM Sans (body), Playfair Display (headings), JetBrains Mono (code) |

---

## Design System

### Color Palette

```
--void:       #0a0a0f    (Primary background)
--midnight:   #12121a    (Secondary background)
--depth:      #1a1a2e    (Card backgrounds)
--surface:    #252538    (Elevated surfaces)
--muted:      #6b7280    (Secondary text)
--text:       #f8fafc    (Primary text)
--cyan:       #22d3ee    (Primary accent)
--violet:     #8b5cf6    (Secondary accent)
--fuchsia:    #d946ef    (Tertiary accent)
```

### Typography Scale

- **Display**: Playfair Display, 500 weight, -0.02em letter-spacing
- **Body**: DM Sans, 400-700 weight
- **Code/Mono**: JetBrains Mono

### Design Patterns

- **Glassmorphism**: `glass`, `glass-subtle`, `glass-strong` utilities
- **Gradient Text**: `gradient-text` utility (cyan → violet → fuchsia)
- **Card Hover**: `card-lift` with subtle Y-translate and cyan glow
- **Section Padding**: `py-24 px-6` standard, `max-w-7xl mx-auto` container

---

## Project Structure

```
app/
├── page.tsx                    # Home page (Hero + Projects + Contact)
├── layout.tsx                  # Root layout with fonts, metadata
├── globals.css                 # Tailwind + custom CSS animations
├── about/
│   ├── page.tsx               # About page (server)
│   └── AboutClient.tsx        # Skills matrix + timeline
├── agents/
│   ├── page.tsx               # Agents page (server)
│   └── AgentsClient.tsx       # Agent fleet showcase with filter
├── case-studies/
│   ├── page.tsx               # Case studies list (server)
│   ├── CaseStudiesClient.tsx  # Filterable case study grid
│   └── [slug]/
│       ├── page.tsx           # Dynamic case study page
│       └── CaseStudyDetail.tsx # Case study detail component
├── insights/
│   ├── page.tsx               # Blog/insights list (server)
│   ├── InsightsClient.tsx     # Filterable article grid
│   └── [slug]/
│       ├── page.tsx           # Dynamic article page
│       └── InsightDetail.tsx  # Article detail with markdown parsing
├── components/
│   ├── PageLayout.tsx         # Shared page wrapper (nav + footer)
│   ├── ScrollReveal.tsx       # Intersection observer animations
│   ├── TouchFlipCard.tsx      # Mobile-optimized flip cards
│   ├── ProjectCarousel.tsx    # 3D project carousel
│   ├── animated-background.tsx # GPU-optimized background orbs
│   ├── desktop-*.tsx          # Desktop-specific components
│   └── ui/                    # UI primitives
├── data/
│   ├── siteConfig.ts          # Site metadata, links
│   ├── navigation.ts          # Nav links
│   ├── projects.ts            # 6 detailed projects with metrics
│   ├── caseStudies.ts         # 5 case studies
│   ├── blogPosts.ts           # 5 technical articles
│   ├── skillsData.ts          # 6 categories, 50+ skills
│   ├── testimonials.ts        # 5 client testimonials
│   └── resources.ts           # Downloadable resources
├── projects/                   # Project detail subpages
│   ├── predator/              # Trading system deep-dive
│   ├── agency/                # Multi-agent platform
│   ├── reality/               # Anti-hallucination system
│   ├── smartslate/            # L&D platform
│   ├── revos/                 # Automotive workshop
│   └── commune/               # Privacy-first communities
public/
├── favicon.png
├── og-image.png
└── resources/                 # Downloadable files
```

---

## Data Architecture

All content is centralized in `/app/data/` as TypeScript arrays with strict interfaces:

- **projects.ts**: 6 projects with nested techCategories, metrics, processFlow
- **caseStudies.ts**: 5 case studies with results, technologies, testimonials
- **blogPosts.ts**: 5 articles with markdown content
- **skillsData.ts**: 6 categories with 50+ skills (level 0-100)

### No CMS

Content is code. To update:
1. Edit the relevant `.ts` file in `/app/data/`
2. Rebuild and redeploy

---

## Key Components

### PageLayout

Shared wrapper providing:
- Fixed navigation with mobile hamburger menu
- Hero header with title/subtitle
- CTA section
- Footer

```tsx
<PageLayout title="Page Title" subtitle="Subtitle">
  {/* Content */}
</PageLayout>
```

### Card Patterns

Standard card structure across pages:
```tsx
<div className="rounded-2xl border border-white/[0.08] bg-white/[0.03]
                hover:border-cyan-500/30 hover:bg-white/[0.05]
                transition-all p-6">
  {/* Content */}
</div>
```

### Filter Pattern

Category filter used on Agents, Case Studies, Insights:
```tsx
const [active, setActive] = useState("All");
const filtered = active === "All" ? items : items.filter(i => i.category === active);
```

---

## Animation System

### CSS Animations (Preferred)

```css
/* GPU-accelerated orbs */
.animated-orb-1 { animation: orbFloat1 60s linear infinite; }

/* Scroll-triggered reveals */
.anim-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }

/* Marquee */
.animate-marquee { animation: marquee 30s linear infinite; }
```

### Framer Motion (Interaction)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: i * 0.1 }}
>
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Mobile Optimization

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-Specific Utilities

```css
/* Safe areas for notches */
.pt-safe { padding-top: env(safe-area-inset-top); }

/* Touch targets */
.touch-target { min-height: 44px; min-width: 44px; }

/* Momentum scrolling */
.scroll-momentum { -webkit-overflow-scrolling: touch; }
```

### Performance

- CSS animations over JS where possible
- `will-change` on animated elements
- `contain: layout style paint` for sections
- Reduced blur on mobile (40px vs 80px)

---

## Development Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (outputs to dist/)
npm run start    # Start production server
```

---

## Deployment

**Platform**: Vercel

1. Build outputs static files to `dist/`
2. Connect GitHub repo for auto-deploy
3. Custom domain: jitinnair.com

---

## Content Guidelines

### Adding a Case Study

1. Add to `app/data/caseStudies.ts`
2. Create thumbnail in `/public/projects/`
3. Optional: Add detail page at `app/case-studies/[slug]/`

### Adding an Insight Article

1. Add to `app/data/blogPosts.ts`
2. Use markdown-style content (parsed by split("\n"))
3. Supports: ## headings, ### subheadings, - **bold** — lists

### Adding a Project

1. Add to `app/data/projects.ts`
2. Include: theme colors, techCategories, metrics
3. Create detail page at `app/projects/[id]/`

---

## SEO

- JSON-LD structured data (Person schema)
- OpenGraph images (1200x630)
- Meta descriptions per page
- Semantic HTML (article, section, nav)

---

## Dependencies to Know

| Package | Purpose |
|---------|---------|
| framer-motion | Animations, gestures, AnimatePresence |
| lucide-react | Icon library |
| clsx + tailwind-merge | Conditional class names |
| swr | Data fetching (used in Predator dashboard) |
| recharts | Charts (Predator dashboard) |
| lightweight-charts | Trading charts (Predator dashboard) |

---

## Common Tasks

### Change accent color

Edit `tailwind.config.ts` colors + `globals.css` :root variables.

### Add new page

1. Create folder in `app/[page-name]/`
2. Create `page.tsx` with metadata export
3. Add to `navigation.ts` and `PageLayout.tsx` navLinks

### Update contact info

Edit `app/data/siteConfig.ts` — updates everywhere.

---

## Brand Voice

- **Professional but approachable**
- **Technical depth without jargon**
- **Quantified results** (200+ agents, 96% coverage)
- **Action-oriented** ("Built", "Deployed", "Orchestrated")

---

## Performance Budget

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- No layout shift on font load (font-display: swap)
- Images: WebP format, lazy loaded
