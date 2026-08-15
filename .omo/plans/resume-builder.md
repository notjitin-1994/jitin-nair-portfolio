# resume-builder - Work Plan

## TL;DR (For humans)

**What you'll get:** A private, browser-based resume builder just for you. You fill in your career details in a form, see a live single-column preview, and download a resume as a polished PDF, a Word document, or a JSON file you can re-import. A built-in "ATS check" reads your exported PDF back and shows exactly what an automated hiring system would extract, flagging anything that would break parsing.

**Why this approach:** All data stays in your browser (no accounts, no servers) — the fastest way to guarantee privacy and "world-class ATS compliance." The ATS-safe export is a single-column PDF with real selectable text and standard section headers, because that is the one layout every parser family (including the picky legacy ones like Workday/Taleo) extracts reliably. The compliance-check loop (parse-your-own-export) is what turns "ATS-friendly" into verifiable.

**What it will NOT do:** No login/accounts, no cloud storage, no sharing links, no AI writing assistant, no multiple visual templates, and no "target-ATS" selector in v1. Single ATS-safe layout only.

**Effort:** Medium
**Risk:** Medium — main driver is `@react-pdf/renderer` output fidelity (mitigated: proven by OpenResume, plus a mandatory parse-back test in the build).
**Decisions to sanity-check:** Project lives in a standalone `resume-builder/` subfolder; AI/multi-template deferred to v2.

Your next move: approve and I'll start building (Wave 1 scaffolds the app). Full execution detail follows below.

---

> TL;DR (machine): Medium effort, Medium risk — local-first Next.js resume builder; JSON Resume data model; @react-pdf/renderer ATS-safe PDF + docx DOCX + JSON; pdfjs-dist parse-back compliance panel; Playwright designed-PDF variant; Vitest + Playwright QA.

## Scope
### Must have
- Standalone Next.js 14 App Router + TS + Tailwind project at `resume-builder/` (own package.json).
- JSON Resume superset schema (Zod-validated) + Zustand store persisting to localStorage; JSON import/export.
- Builder UI: section form editors (basics, work, education, skills, projects, certificates) + live single-column preview.
- ATS-safe PDF export via `@react-pdf/renderer` (single column, standard headers, real selectable text).
- DOCX export via `docx`.
- ATS compliance-check panel: parse the exported PDF back with `pdfjs-dist`, recover sections/entities, run format-safety rules, surface "what the ATS sees" + warnings.
- Designed human-facing PDF variant via Playwright headless Chromium (HTML template → styled PDF).
- Seed data from the existing portfolio `resume.md` (hand-mapped to JSON Resume) as the default sample + first parse fixture.
- Vitest unit tests + Playwright e2e; agent-executed QA per task.

### Must NOT have (guardrails, anti-slop, scope boundaries)
- NO authentication, accounts, multi-tenancy, or user database.
- NO cloud storage / backend persistence (localStorage only) and NO network calls for resume data.
- NO AI/LLM features (bullet enhance, JD tailor, match score) — v2.
- NO multi-template gallery and NO two-column designs in v1 (single-column ATS-safe only).
- NO target-ATS export-profile selector (v2).
- NO coupling to the parent `jitin-nair-portfolio` app (separate package.json, separate deps).
- NO hidden keyword stuffing, NO images/graphics in the ATS PDF, NO contact info in PDF headers/footers.

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: tests-after (each todo ships its implementation + tests together) + framework Vitest (unit) and Playwright (e2e/render).
- Build/typecheck gate: `npm run build` and `npx tsc --noEmit` exit 0 inside `resume-builder/`.
- Evidence: `.omo/evidence/task-<N>-resume-builder.<ext>` (PDFs, parsed JSON, screenshots, logs).
- ATS-parse proof: every PDF export task must include a parse-back assertion (pdfjs-dist) that sections appear in reading order and contact fields extract — no PDF task passes on "it rendered" alone.
- Copy-paste test (agent-executed): extract text from the generated PDF and assert logical top-to-bottom order.

## Execution strategy
### Parallel execution waves
> Wave 1 (foundation) → Wave 2 (data+render) → Wave 3 (UI+parse) → Wave 4 (designed variant+polish). Final wave runs after all todos.

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| T1 Scaffold project | — | T4,T5,T6,T7,T8,T9,T10 | T2,T3 |
| T2 Zod schema | — | T4,T5,T6,T7 | T1,T3 |
| T3 Test infra | T1 | all later test-bearing todos | T2 |
| T4 Zustand store + JSON I/O | T1,T2 | T7,T8,T10 | T5,T6 |
| T5 ATS-safe PDF renderer | T1,T2 | T8,T10 | T4,T6 |
| T6 DOCX exporter | T1,T2 | T10 | T4,T5 |
| T7 Builder UI + live preview | T4,T5 | T9,T10 | T8 |
| T8 ATS compliance-check panel | T4,T5 | T10 | T7 |
| T9 Designed PDF (Playwright) | T5,T7 | — | T10 |
| T10 Export UI wiring + seed | T4,T5,T6,T7,T8 | — | T9 |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->
- [ ] 1. Scaffold standalone Next.js project + install deps
  What to do: Create `resume-builder/` (own package.json, tsconfig.json, next.config.mjs, tailwind.config.ts, postcss.config.js, app/layout.tsx, app/page.tsx placeholder, .gitignore, src/ dir). Next.js 14 App Router, React 18, TS 5.9, Tailwind 3.4. Install runtime deps: zustand, react-hook-form, zod, @react-pdf/renderer, docx, pdfjs-dist. Install devDeps: vitest, @playwright/test, jsdom, @vitejs/plugin-react. Add scripts: dev/build/start/test("vitest run")/e2e("playwright test"). Must NOT do: no Supabase, no framer-motion, no portfolio deps; do not modify the parent portfolio package.json.
  Parallelization: Wave 1 | Blocked by: none | Blocks: T4,T5,T6,T7,T8,T9,T10
  References: `.omo/ulw-research/20260724-resume-builder/SYNTHESIS.md` §9 (recommended stack); parent portfolio package.json (Next 14 / TS 5.9 / Tailwind 3.4 versions to match); OpenResume tech-stack (Next.js 13 baseline) [SYNTHESIS source 12].
  Acceptance criteria (agent-executable): in `resume-builder/` run `npm install` then `npm run build` → exit 0; `npx tsc --noEmit` → exit 0; `npm run dev` boots without error.
  QA scenarios (exact tool + invocation): happy — `cd resume-builder && npm run build` exits 0 and `.next/` is produced; failure — deliberately introduce a TS error in app/page.tsx, `npx tsc --noEmit` must exit non-zero. Evidence `.omo/evidence/task-1-resume-builder.build.log`.
  Commit: Y | feat(scaffold): standalone Next.js resume-builder app

- [ ] 2. JSON Resume superset Zod schema + types
  What to do: Create `resume-builder/src/lib/schema.ts` exporting a `ResumeSchema` (Zod) covering JSON Resume v1.0.0 top-level sections (basics, work, education, skills, projects, certificates, awards, publications, volunteer, languages, interests, references) plus private extensions under `x.` namespace (e.g. `x.font`, `x.margins`, `x.accentColor`). Export inferred `Resume` TS type and a `DEFAULT_RESUME` sample seeded by hand-mapping the existing `jitin-nair-portfolio/resume.md` content. Add a `validateResume(obj)` helper. Must NOT do: no runtime validation library other than zod; no fields that the ATS renderer cannot consume.
  Parallelization: Wave 1 | Blocked by: none | Blocks: T4,T5,T6,T7
  References: JSON Resume schema [SYNTHESIS source 16 — https://jsonresume.org/schema]; `.omo/ulw-research/20260724-resume-builder/SYNTHESIS.md` §4; seed source `jitin-nair-portfolio/resume.md`.
  Acceptance criteria (agent-executable): `vitest run schema` — a test feeds `DEFAULT_RESUME` through `ResumeSchema.parse` and it succeeds; a test feeds an object missing `basics.name` and expects ZodError. `npx tsc --noEmit` exits 0.
  QA scenarios: happy — `ResumeSchema.parse(DEFAULT_RESUME)` returns typed Resume; failure — invalid object throws ZodError with a path pointing at the bad field. Evidence `.omo/evidence/task-2-resume-builder.schema-test.log`.
  Commit: Y | feat(schema): JSON Resume superset Zod schema + seeded sample

- [ ] 3. Vitest + Playwright test infrastructure
  What to do: Add `resume-builder/vitest.config.ts` (environment jsdom, setup file), `resume-builder/src/test/setup.ts`, `resume-builder/playwright.config.ts` (baseURL http://localhost:3100, webServer command `npm run dev -- -p 3100`), and one trivial sample test each (`src/lib/__tests__/sample.test.ts`, `e2e/smoke.spec.ts`) to prove the harness runs. Must NOT do: no test for behavior that doesn't exist yet beyond the smoke sample.
  Parallelization: Wave 1 | Blocked by: T1 | Blocks: all test-bearing todos
  References: portfolio already has `@playwright/test` as devDep (version to match).
  Acceptance criteria (agent-executable): `npm run test` runs the vitest sample and passes; `npx playwright test e2e/smoke.spec.ts` (after dev server up) passes; `npx playwright test --list` lists the smoke spec.
  QA scenarios: happy — both commands exit 0; failure — break the smoke assertion, vitest/playwright must report a failure (non-zero exit). Evidence `.omo/evidence/task-3-resume-builder.harness.log`.
  Commit: Y | chore(test): vitest + playwright harness

- [ ] 4. Zustand store + JSON import/export + localStorage persistence
  What to do: Create `resume-builder/src/lib/store.ts` — a Zustand store typed to `Resume`, with actions: `setSection`, `reset`, `loadJson(text)` (parse + Zod validate; throw on invalid), `exportJson(): string`, and a localStorage persist middleware under key `resume-builder:doc`. Create `src/lib/io.ts` with `downloadBlob(filename, blob)` and `downloadJson(resume)`. Must NOT do: no network calls; no server storage.
  Parallelization: Wave 2 | Blocked by: T1,T2 | Blocks: T7,T8,T10
  References: Zustand persist middleware docs; `.omo/.../SYNTHESIS.md` §3 (Reactive Resume uses Zustand + React Hook Form).
  Acceptance criteria (agent-executable): `vitest run store` — test loads valid JSON → store updates and `exportJson()` round-trips equal; invalid JSON throws; after a simulated reload the persist middleware rehydrates the doc. `npx tsc --noEmit` exits 0.
  QA scenarios: happy — round-trip JSON equality; failure — malformed JSON input is rejected and the store is unchanged. Evidence `.omo/evidence/task-4-resume-builder.store-test.log`.
  Commit: Y | feat(store): Zustand resume store with JSON I/O + persistence

- [ ] 5. ATS-safe PDF renderer (@react-pdf/renderer)
  What to do: Create `resume-builder/src/lib/render-pdf.ts` exporting `buildResumePdfBlob(resume): Promise<Blob>` using `@react-pdf/renderer` `pdf()`/`renderToStream`, and `resume-builder/src/components/ResumePDF.tsx` (the react-pdf document): single-column, standard section headers ("Experience", "Education", "Skills", "Projects", "Certificates"), contact info in the body (NOT in header/footer), no tables/columns/images, ATS-safe fonts (Helvetica/Times). Must NOT do: no two-column layout, no graphics, no header/footer placement of contact info, no custom font files.
  Parallelization: Wave 2 | Blocked by: T1,T2 | Blocks: T8,T10
  References: OpenResume uses @react-pdf/renderer and claims Greenhouse/Lever-friendly [SYNTHESIS claim C5, source 12]; parsing rules [SYNTHESIS §2]. OpenResume source `src/app/components/Resume` (pattern reference).
  Acceptance criteria (agent-executable): `vitest run render-pdf` renders `DEFAULT_RESUME` to a PDF buffer, writes it to `.omo/evidence/task-5-resume-builder.ats.pdf`, then a parse-back test using `pdfjs-dist` extracts text and asserts "Experience" appears before "Education" and the seeded email is present. `npx tsc --noEmit` exits 0.
  QA scenarios: happy — PDF text extracts in logical order (copy-paste test passes); failure — a deliberately two-column variant's extracted text is interleaved (documents the anti-pattern). Evidence `.omo/evidence/task-5-resume-builder.parse.json` + the PDF.
  Commit: Y | feat(pdf): ATS-safe single-column react-pdf renderer

- [ ] 6. DOCX exporter (docx)
  What to do: Create `resume-builder/src/lib/render-docx.ts` exporting `buildResumeDocxBlob(resume): Promise<Blob>` using the `docx` npm library (Document/Paragraph/TextRun/HeadingLevel), single-column, standard headings, contact info as the first paragraphs. Must NOT do: no tables for layout, no text boxes, no images.
  Parallelization: Wave 2 | Blocked by: T1,T2 | Blocks: T10
  References: `docx` library [SYNTHESIS sources 30,31 — https://docx.js.org]; DOCX is the most reliably parsed format [SYNTHESIS §2, claim C1].
  Acceptance criteria (agent-executable): `vitest run render-docx` builds a .docx Blob, writes `.omo/evidence/task-6-resume-builder.docx`; a test extracts text (e.g. via `mammoth` or unzip+XML read) and asserts section headings and email are present in order. `npx tsc --noEmit` exits 0.
  QA scenarios: happy — DOCX text contains "Experience" then "Education" and the email; failure — a doc missing `basics.email` must produce a DOCX without an email line (no hallucinated content). Evidence `.omo/evidence/task-6-resume-builder.docx-text.txt`.
  Commit: Y | feat(docx): DOCX exporter via docx library

- [ ] 7. Builder UI + live single-column preview
  What to do: Build `resume-builder/src/app/page.tsx` (editor) with React Hook Form section editors for basics/work/education/skills/projects/certificates reading-from/writing-to the Zustand store, and a live preview pane that mirrors the single-column layout (an HTML mirror styled to match the ATS PDF, NOT the react-pdf canvas, for responsiveness). Add a `/preview` route rendering `ResumePDF` via `@react-pdf/renderer`'s `<PDFViewer>` for an accurate PDF preview. Must NOT do: no two-column UI, no drag-drop reordering in v1, no AI.
  Parallelization: Wave 3 | Blocked by: T4,T5 | Blocks: T9,T10
  References: OpenResume ResumeForm/Resume pattern [SYNTHESIS source 12]; portfolio Tailwind tokens for visual consistency.
  Acceptance criteria (agent-executable): Playwright e2e `e2e/builder.spec.ts` — load app, edit the "name" field, assert the preview updates within 1s; navigate to /preview, assert a PDF iframe renders. `npm run build` + `npx tsc --noEmit` exit 0.
  QA scenarios: happy — typed name appears in preview; failure — clearing a required field shows a validation error and disables export (no empty-name PDF). Evidence `.omo/evidence/task-7-resume-builder.preview.png` (Playwright screenshot).
  Commit: Y | feat(ui): builder form editor + live preview

- [ ] 8. ATS compliance-check panel (parse-back + format-safety)
  What to do: Create `resume-builder/src/lib/parse.ts` exporting `parseResumePdf(arrayBuffer)` (pdfjs-dist `getDocument` → text items → reconstruct reading order) and `runAtsChecks(resumeText)` returning structured results: contact extracted (email/phone regex), section headers detected (Experience/Education/Skills...), and format-safety booleans (single-column heuristic, no graphics-noted, standard headers). Add a route/panel `src/app/ats-check/page.tsx` (or panel component) that takes the current store doc, renders it to PDF in-memory, parses it back, and shows "what the ATS sees" + warnings. Must NOT do: no external ATS API; no network.
  Parallelization: Wave 3 | Blocked by: T4,T5 | Blocks: T10
  References: OpenResume `parseResumeFromPdf` pattern [SYNTHESIS source 12]; parsing pipeline + failure modes [SYNTHESIS §2, sources 1-8]; format-safety rules [SYNTHESIS claim C2/C7].
  Acceptance criteria (agent-executable): `vitest run parse` — parse the T5 sample PDF, assert email/phone regex hits and "Experience" section detected; run `runAtsChecks` on a known-good single-column text → all safety checks pass; on a synthetic two-column/interleaved text → flags layout risk. Playwright: open ATS panel, assert it renders a "sections found" list. `npx tsc --noEmit` exits 0.
  QA scenarios: happy — panel shows all sections extracted + "no warnings"; failure — feed a broken sample, panel shows specific warnings. Evidence `.omo/evidence/task-8-resume-builder.ats-report.json`.
  Commit: Y | feat(ats): compliance-check panel with parse-back + format safety

- [ ] 9. Designed human-facing PDF variant (Playwright headless Chromium)
  What to do: Create `resume-builder/src/lib/render-designed-pdf.ts` and an HTML template `resume-builder/src/lib/templates/designed.html.tsx` (a polished, branded single-column HTML/CSS layout — accent color from `resume.x.accentColor`, nicer typography). Provide `buildDesignedPdfBlob(resume): Promise<Blob>` that launches headless Chromium via Playwright, sets the HTML, and prints to PDF. Expose via a route `src/app/print/route.ts` (GET returns the designed PDF) so it can be triggered from the UI. Must NOT do: no two-column layout for v1 (keep single-column even in the designed variant); text must remain selectable.
  Parallelization: Wave 4 | Blocked by: T5,T7 | Blocks: none
  References: Reactive Resume v5 "Browserless/Chromium printer" pattern [SYNTHESIS source 10]; Playwright print-to-PDF.
  Acceptance criteria (agent-executable): `vitest run designed-pdf` (or a node script) hits the /print route, saves `.omo/evidence/task-9-resume-builder.designed.pdf`; a pdfjs parse-back asserts text is selectable and sections are in order. `npx tsc --noEmit` exits 0.
  QA scenarios: happy — designed PDF differs visually from the ATS PDF but still extracts clean text; failure — if Chromium fails to launch, the route returns 500 (asserted) rather than a silent empty file. Evidence `.omo/evidence/task-9-resume-builder.designed.pdf`.
  Commit: Y | feat(pdf): designed Playwright/Chromium PDF variant

- [ ] 10. Export/download wiring + seed + settings
  What to do: Wire download buttons in the editor toolbar: "Download ATS PDF" (T5), "Download DOCX" (T6), "Download JSON" (T4 `exportJson`), "Import JSON" (file input → `loadJson`). Add a small settings panel (ATS-safe bounds only: font family from {Helvetica, Times, Georgia}, margin presets, accent color) stored under `resume.x`. Ensure the app loads `DEFAULT_RESUME` (seeded from the user's resume) on first run. Must NOT do: no settings that violate ATS safety (no two-column toggle, no image upload).
  Parallelization: Wave 4 | Blocked by: T4,T5,T6,T7,T8 | Blocks: none
  References: T4-T8 deliverables; seed source `jitin-nair-portfolio/resume.md`.
  Acceptance criteria (agent-executable): Playwright e2e `e2e/export.spec.ts` — click each export button, assert a download event fires and the file is non-empty; import a JSON file and assert the name field updates. ATS panel (T8) must still report no warnings after export. `npm run build` + `npx tsc --noEmit` exit 0.
  QA scenarios: happy — all three downloads succeed and ATS check is clean; failure — importing invalid JSON shows an error and leaves the doc unchanged. Evidence `.omo/evidence/task-10-resume-builder.exports/` (saved files) + screenshot.
  Commit: Y | feat(export): download/import wiring + ATS-safe settings + seed

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. Plan compliance audit
  Verify every Must-have in Scope is implemented and every Must-NOT-have is absent (grep for Supabase/framer-motion usage in resume-builder/, confirm no AI/network calls, confirm single-column only). Evidence `.omo/evidence/F1-resume-builder.audit.md`.
- [ ] F2. Code quality review
  Review all `resume-builder/src/**` for type safety (no `any`), error handling, and adherence to the JSON Resume schema; `npx tsc --noEmit` + `npm run build` + `npm run test` + `npx playwright test` all exit 0. Evidence `.omo/evidence/F2-resume-builder.quality.md`.
- [ ] F3. Real manual QA
  End-to-end: `npm run dev`, edit resume, run ATS check, download all three formats; open the ATS PDF, select-all+copy, confirm logical order; run parse-back on the downloaded ATS PDF and confirm clean extraction. Evidence screenshots + parsed JSON in `.omo/evidence/F3-resume-builder.qa/`.
- [ ] F4. Scope fidelity
  Confirm no v2 features (AI, multi-template, target-ATS selector, auth, sharing) leaked in; confirm the builder is decoupled from the parent portfolio (separate package.json, no shared imports). Evidence `.omo/evidence/F4-resume-builder.scope.md`.

## Commit strategy
- One commit per todo (see Commit lines above), conventional-commit format, all inside `resume-builder/`.
- No commits touch the parent portfolio app code.
- Final: a single summary commit/tag is optional once F1-F4 pass.

## Success criteria
- `cd resume-builder && npm run build && npm run test && npx playwright test` all exit 0.
- Editing a field updates the live preview; all three exports (ATS PDF, DOCX, JSON) download and are non-empty.
- The ATS compliance panel reports the seeded resume with all sections detected and no warnings; a deliberately broken sample produces specific warnings.
- ATS PDF passes the copy-paste/parse-back test (selectable text in logical order; contact extracted).
- Zero: auth, network data calls, AI, multi-template, two-column layouts, parent-portfolio coupling.
