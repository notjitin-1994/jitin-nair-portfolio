# Jitin Nair — Portfolio

A premium, single-page portfolio showcasing AI enablement expertise and agentic systems architecture.

## 🚀 Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 2: Git + Vercel Dashboard

1. Push this folder to a GitHub repo
2. Connect repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — just click Deploy

### Option 3: Manual Upload

1. Build locally: `npm run build`
2. Drag `dist/` folder to Vercel dashboard

## 📝 Customize

### Update Contact Links
Edit `app/page.tsx` — search for the Contact section and update:
- GitHub URL
- LinkedIn URL  
- Twitter/X URL
- Email address

### Update Colors
Edit `tailwind.config.ts` and `app/globals.css` to change the gradient palette.

### Update Copy
All content is in `app/page.tsx` — organized by section components:
- `Hero` — Main headline and typewriter
- `Expertise` — Three core competencies
- `Projects` — Bento grid of work
- `TechStack` — Technology pills
- `Contact` — Social links

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a0f` (void) |
| Primary Gradient | cyan → violet → fuchsia |
| Typography | Inter (body), JetBrains Mono (code) |
| Effects | Glassmorphism, gradient glows |

## 📦 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## 📄 License

MIT — use as you wish.
