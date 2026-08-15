# Draft: resume-builder (WORK PLAN — durable resume point)

**Status:** awaiting-approval (forks answered → pending action: write `.omo/plans/resume-builder.md`)
**Fork resolutions:**
- F1 (shape): LOCAL-FIRST SINGLE-USER personal tool (user: "just for myself"). No auth, no multi-tenancy, data in browser. → Components C8 OUT.
- F2 (scope): CORE ATS BUILDER. → Components C1–C5 IN; C6 (AI) OUT; C7 (target-ATS profiles) OUT (Core is single-column ATS-safe by default).
- F1-location (still open in brief, recommended default): NEW STANDALONE Next.js project `resume-builder/`, seeded by importing existing repo-root `resume.md`. Reversible; confirm at gate.
**Intent:** clear
**Review required:** false
**Classification:** Architecture (7-8 modules, greenfield, long-term) — see references/intent-unclear dynamic lanes, but external research already done (SYNTHESIS).

## Grounding (facts, cited)
- Research deliverable: `.omo/ulw-research/20260724-resume-builder/SYNTHESIS.md` (+ claim-ledger, wave-1-findings).
- Portfolio repo (`jitin-nair-portfolio`): Next.js 14 App Router, TS 5.9, Tailwind 3.4, React 18, Supabase SSR+JS already deps, `@playwright/test` devDep, Vercel deploy. Single-page marketing site.
- Existing personal resume assets at repo root + /public: `resume.md`, `resume.pdf`, `resume.doc`, `resume-ai.html`, `resume-ai.pdf`, `resume-ld.html`, `resume-ld-v5.pdf`, `generate-resume-pdf.js` → usable as SEED data / import test fixture.
- No existing resume-builder app code; no `.omo/drafts`.

## Components ledger (topology lock — each can succeed/fail independently)
| id | outcome | status |
|----|---------|--------|
| C1 Data layer | JSON Resume superset schema (Zod), typed store, JSON import/export, PDF→JSON parse-import | to-build |
| C2 Builder UI | form editor + live single-column preview (Next.js route) | to-build |
| C3 ATS-safe renderer | @react-pdf/renderer single-column PDF (real selectable text) + `docx` DOCX export | to-build |
| C4 Designed renderer | headless Chromium (Playwright) PDF for human-facing variant | to-build |
| C5 ATS compliance check | PDF.js parser + section/entity extractor + format-safety panel ("what the ATS sees") + copy-paste test | to-build |
| C6 AI layer (if in scope) | bullet enhance + JD keyword tailor + match score via LLM | scope-dependent |
| C7 Target-ATS profiles (if in scope) | export-profile selector (single-col legacy / cols modern) | scope-dependent |
| C8 Auth+storage+share (if SaaS) | Supabase auth, cloud store, shareable link | scope-dependent |

## Forks to ASK (owner-decisions, with WHY) — recommended default FIRST
- F1 Project shape & location (cross-cutting, hard to reverse): Standalone local-first tool (rec) / Standalone SaaS / Inside portfolio.
- F2 MVP scope: Core ATS builder (rec) / Core+AI / Full world-class (core+AI+multi-template+target-ATS).

## Defaults ADOPTED (reversible internals — recorded, not asked)
- Schema: JSON Resume superset (private `x-*` namespace) + Zod validation.
- State: Zustand (matches OSS references); forms: React Hook Form.
- ATS PDF: `@react-pdf/renderer`; DOCX: `docx`; designed PDF: Playwright headless Chromium; parse: `pdfjs-dist`.
- AI provider: OpenRouter **BYO-key** (privacy-first, no backend secret) — only if AI in scope.
- Deploy: Vercel (portfolio already there).
- Seed: import existing `resume.md` → JSON Resume as first sample + parse test fixture.

## Test strategy (confirmed default)
- Vitest unit: schema (Zod round-trip), ATS-PDF render produces selectable text, parser section/entity extraction, DOCX generation.
- Playwright: builder UI flows + render smoke (generate PDF, assert text order via parse-back).
- Agent-executed QA per todo (happy + failure, exact tool + invocation, evidence path). Zero human-intervention verification.

## Approval gate (pending)
- Next action after forks answered: present brief once → await explicit okay → write `.omo/plans/resume-builder.md`.
