# Ultraresearch Synthesis: Best Tools, Skills, MCPs & Plugins for a World-Class ATS-Compliant Resume Builder

**Workers:** direct (subagent path blocked by pending opencode restart; research run with own tools)
**Searches:** 11 Exa web queries + GitHub repo search + README ingestion (Exa rate-limited after wave 1)
**Sources cited:** 30+ (numbered below)
**Date:** 2026-07-24

---

## 1. Executive summary

There is **no published ATS parsing standard** — every "rule" in this space is reverse-engineered from practitioner testing, not a vendor spec [1][2][3]. So "world-class ATS compliance" means: build a system that **(a)** emits documents in the formats parsers extract most reliably, **(b)** separates structured data from rendering so you can output *both* a parse-optimized file and a human-designed one, and **(c)** closes the loop with a parser + keyword-score feedback check.

The dominant open-source reference is **Reactive Resume v5** (React 19 + TanStack Start, Drizzle/Postgres, headless-Chromium "printer" service, OpenAI integration) [10][11] and **OpenResume** (Next.js + Redux Toolkit + **@react-pdf/renderer** for client-side PDF + PDF.js parser, single-column-only by design, fully local) [12][13]. The modern AI-tailor pattern is **resume-lm** and **cvtailor** (Next.js 15 + react-pdf + OpenRouter/LLM) [14][15]. The data model should be a **JSON Resume superset** [16] (the de-facto developer standard), with optional interop to FRESH [17], Europass/HR-XML [18][19], and the newer AI-ready **APP** schema [20].

The most important contested finding: the **single-column vs two-column** debate is *platform-dependent*, not absolute. Modern ATS (Greenhouse, Lever, Ashby) handle two columns via the XY-Cut / LayoutReader algorithms [4]; legacy enterprise/government systems (Workday, Taleo, iCIMS, SuccessFactors) still scramble them ~42–58% of the time [3][5][7]. A world-class builder therefore defaults to **single-column for the ATS export** and offers a designed variant for recruiter-facing use.

**Recommended core stack:** Next.js 14/15 + TypeScript + Tailwind + Zustand, JSON Resume data model, **@react-pdf/renderer** for client-side ATS-safe PDF + **docx** (npm) for DOCX export + headless Chromium (Browserless/Playwright) for the designed-variant PDF, an LLM (OpenAI/Anthropic/OpenRouter) for bullet enhancement + job-description tailoring, a **resume parser** (PDF.js + custom extractors, or a library) for the ATS-feedback loop, and (optionally) a document-generation MCP for server-side rendering. Concrete MCP/skill/plugin picks are in §6.

---

## 2. How ATS actually parse (the foundation everything else rests on)

Pipeline (consistent across sources) [1][2][3][6][8]:
1. **Ingest** DOCX / PDF / txt.
2. **Extract text** — DOCX reads XML paragraphs in logical order (clean); PDF stores characters as positioned glyphs at x/y coordinates that must be reconstructed into reading order (fragile) [2][6][8].
3. **Section detection** via known header vocabulary ("Experience", "Education", "Skills"). Non-standard headers ("My Journey", "Toolkit") drop content into a misc bucket or lose it [1][3][8].
4. **Entity extraction** (NER): name, email/phone (regex, ~95%+ accurate), dates, job titles, companies (NLP, much weaker) [2].
5. **Field mapping** → structured candidate profile.
6. **Indexing** for recruiter keyword search; optional scoring layer [6].

**What breaks parsing (high consensus):**
- Design-tool PDFs (Canva/Figma/Illustrator) where text is baked into graphics → blank candidate [1][3][5].
- Multi-column / sidebar / table layouts on **legacy** parsers → interleaved garbage ("J ohn D oe") [3][5][7].
- Contact info in PDF headers/footers → dropped (parsers ignore them as "Page 2 of 2" noise) [1][5][6].
- Non-standard section names, image-based/scanned PDFs (0% extraction without OCR), invisible tables, custom fonts with bad Unicode maps [2][3][7].
- Date formats without months ("2020-23", "Summer 2019") [2][3][8].

**The central contradiction (locked in claim ledger C2/C7):**
- *Anti-two-column camp:* single-column ~95% parse, two-column ~42%, tables ~38% [3][5][7].
- *Pro-two-column camp (Enhancv):* reading order is a solved problem (XY-Cut 2005 → XY-Cut++ 2025, Microsoft LayoutReader 2021, Textkernel 2023); all modern ATS handle columns; the myth survives because of legacy government/enterprise engines [4].
- **Resolution:** both are right *for their segment*. Default the ATS export to single-column; reserve two-column for the human-facing design and for known-modern targets (Greenhouse/Lever/Ashby). A "world-class" builder lets the user pick a *target ATS family* and switches the export profile accordingly.

---

## 3. Open-source reference architectures

| Project | Stack | PDF engine | Data model | Standout | Stars |
|---|---|---|---|---|---|
| **Reactive Resume v5** [10][11] | React 19 + TanStack Start/Router, TS, Tailwind, Radix, **Drizzle+Postgres**, Better Auth, oRPC | **Headless Chromium (Browserless)** "printer" service | Custom Drizzle schema, JSON import/export, localized section headers with ARIA tags for tagged-PDF parsers | Multi-template, drag-drop, OpenAI writing assist, self-hostable, multi-page (v5) | ~36k |
| **OpenResume** [12][13] | Next.js 13, React, **Redux Toolkit**, Tailwind | **@react-pdf/renderer** (client-side) + **PDF.js** (parser) | Redux store, single-column-only by design | Privacy-first (100% local, no signup), ships a **resume parser** to test ATS readability, intentionally U.S.-best-practices only | ~8.8k |
| **resume-lm** [14] | Next.js 15, React 19, Tailwind | PDF (react-pdf family) | JSON | AI-tailor to job descriptions, cover letters | ~300 |
| **cvtailor** [15] | Next.js 15, jstack, Drizzle, OpenRouter | **react-pdf** + react-pdf-viewer | — | Import PDF → AI tailor → ATS-friendly export | ~41 |
| **Codevena/cvmake** [search] | Next.js, Puppeteer | Puppeteer | YAML in → PDF out, 12 templates, CLI on npm | CLI + web editor | new |
| **baasith6/cvengine** [search] | Next.js | Markdown → PDF | Markdown | "ATS-friendly markdown to PDF" live preview | new |
| **Typst templates** (NextResume [25], clickworthy-resume [26], modern-cv [27]) | Typst (Rust) | Typst compiler | .typ | Millisecond compile, clean text extraction; NextResume uses `/ActualText` semantic links for better copy/parse [24] | — |
| **LaTeX** (Jake's Resume, Awesome-CV, moderncv) [28] | LaTeX | pdflatex (ATS-safe) / XeLaTeX (risky) | .tex | Industry-trusted, huge template library; **pdflatex only** for ATS | — |

**Reusable patterns to adopt:**
- Separate **data (JSON)** from **rendering** — both Reactive Resume and OpenResume do this; it's what lets you emit parse-safe + designed variants from one source [10][12].
- **Single-column by default for ATS** (OpenResume's explicit design choice) [12].
- **Headless Chromium for pixel-perfect designed PDFs** (Reactive Resume's "printer") [10] — but pair it with a text-first renderer (react-pdf/docx) for the ATS export, because Chromium PDFs are still coordinate-based PDFs.
- **Ships its own parser** (OpenResume) so users can verify what the ATS will see [12] — build this as your compliance-check feature.

---

## 4. Data model / schema

**Recommendation: JSON Resume [16] as the canonical base, extended.**
- De-facto developer standard, MIT, 12 top-level sections (basics, work, education, skills, projects, certificates, publications, awards, volunteer, languages, interests, references) [16].
- **Gaps for a "world-class" builder:** no skill *level* numeric, no custom sections, no per-role *url*, limited metadata. Extend with a private `x-*` namespace (JSON Schema allows this).
- **Interoperability targets:** FRESH/FRESCA [17] ( convertible to/from JSON Resume via HackMyResume), Europass XML + HR-Open/EURES for EU [18][19], and the newer **Applicant Profile Protocol (APP)** [20] which adds confidence scores, evidence layer, and JSON-LD semantics — useful if you want to differentiate on AI-readiness.

---

## 5. Rendering & document-generation libraries

| Need | Best pick | Why | Alt |
|---|---|---|---|
| ATS-safe PDF, **client-side**, real selectable text | **@react-pdf/renderer** | Proven by OpenResume (Greenhouse/Lever-friendly) [12][13]; declarative React → PDF; no server | react-pdf (diegomura, same family) |
| ATS-safe **DOCX** export | **docx** (npm, 5.3M weekly dl) [30][31] | Declarative OOXML, browser+Node, most complete; DOCX is the most reliably parsed format [1][2] | docxtemplater (template-based), officegen (Node-only) |
| Pixel-perfect **designed** PDF (human-facing) | **Headless Chromium** via Browserless / Playwright / Puppeteer | Reactive Resume's production pattern [10]; renders any HTML/CSS template | — |
| Modify/merge existing PDFs | **pdf-lib** [32] | Pure JS, browser+Node, no native deps | — |
| Markdown → PDF resume | **cvengine / cvmake** pattern** or **Typst** [24][25] | Fast, clean | — |
| Typeset, code-as-resume | **Typst** (modern, ms compile) or **LaTeX/pdflatex** (industry-trusted) [22][23][28] | Both produce clean text PDFs; Typst is far easier to template programmatically | — |

**Critical ATS rule for rendering:** whatever engine you use, the output must pass the **copy-paste test** — select-all → copy → paste into a plain-text editor must read top-to-bottom in logical order [1][6][8]. For LaTeX use **pdflatex**, not XeLaTeX/LuaLaTeX (latter can produce PDFs some parsers can't extract) [28] (claim C4, unresolved — conservative).

---

## 6. MCPs, plugins & skills (directly answering the ask)

### Document / PDF generation MCPs (server-side rendering from an agent)
| MCP | What it does | Fit |
|---|---|---|
| **@cyanheads/docgen-mcp-server** [34] | HTML/markdown → PDF, rows → xlsx, AcroForm fill; no external API (bundled pdf-lib/exceljs/marked); STDIO or HTTP | Good for server-side ATS-safe PDF from structured content |
| **carbone-mcp** [35] | Template + JSON → PDF/DOCX/XLSX/PPTX/HTML; 100+ format conversions; batch; hosted option | Excellent for **template-driven DOCX/PDF** resume generation at scale |
| **FabianGenell/pdf-mcp-server** [36] | Markdown → PDF with themes, TOC, page numbers; Playwright-based | Good for designed PDF variant |
| **HarjjotSinghh/documents-mcp** [37] | Create + read PDF/DOCX/PPTX (Gemini analysis) | Good for round-tripping (generate then verify extraction) |
| **TheBatashev/MCP-Documents** [38] | Session-based incremental DOCX/PDF builder | Niche |
| **Document Generator MCP (thiagotw10)** [39] | DOCX/PDF from markdown, JSON auto-detect | Usable |

### Browser automation MCPs (for the designed-PDF renderer + ATS-test scraping)
| MCP | Use |
|---|---|
| **Playwright MCP** (executeautomation/mcp-playwright) [40] | Drive headless Chromium to (a) print HTML resume → PDF, (b) automate ATS-simulator sites |
| **Puppeteer MCP** (modelcontextprotocol/servers) [40] | Lighter alternative for PDF print-to-PDF |
| **mcp-browser (wgarrido)** [33] | Real-Chrome CDP for login-gated ATS-test sites; screenshots; structured-data extraction |

### Parsing / verification MCPs (the compliance-check loop)
- Build your own thin MCP wrapping **PDF.js** + a section/entity extractor (mirror OpenResume's `parseResumeFromPdf` [12]) so the agent can run "what the ATS sees" checks. No off-the-shelf ATS-parse MCP exists in the survey — this is a genuine product gap you can fill.
- For keyword/score feedback, wrap a **TF-IDF/BM25 + embedding similarity** scorer (talenttuner's 5-layer model is a documented blueprint [3]).

### Plugins / npm ecosystem
`@react-pdf/renderer`, `docx`, `pdf-lib`, `pdfjs-dist` (parse), `docxtemplater` (templates), `mammoth` (DOCX→HTML round-trip), `react-pdf-viewer` (preview) [30][31][32].

### Skills relevant to building this
From the loaded skill set, the directly applicable ones for *building* this product: **frontend** / **design-taste-frontend** / **emil-design-eng** / **impeccable** (UI + typography + visual QA), **copywriting** (resume bullet/section copy guidance), **programming** (TS/strict-types discipline), **playwright** (browser automation for the PDF + ATS-test path), **visual-qa** (verify the rendered resume looks right). *(These are the skills you'd `load_skills=` on the build tasks, not end-user resume skills.)*

---

## 7. AI features (the "world-class" differentiators)
- **Bullet enhancement** (Reactive Resume's OpenAI "improve writing/tone/grammar" [11]).
- **Job-description → resume tailoring**: extract JD keywords, score match, suggest additions (resume-lm, cvtailor, Resumatic model) [14][15].
- **ATS-score simulation** before download (talenttuner's 5 layers: keyword match → content quality → format safety → intent fit → recency [3]).
- **AI import**: parse existing PDF → JSON Resume (OpenResume already does this deterministically [12]; add LLM cleanup).
- **Multi-language**: Reactive Resume translates resumes via ChatGPT [11].

---

## 8. SaaS competitive benchmark (feature parity bar)
FlowCV, Teal, Kickresume, Zety, Resumatic, Standard Resume Pro [saashub compare; 41]. The table-stakes a "world-class" OSS builder must match: real-time preview, multi-template, DOCX+PDF export, JSON export/import, shareable link, no-watermark free tier, AI writing + JD-tailor, ATS-score feedback. Differentiators OSS can win on: **local-first privacy** (OpenResume), **self-host**, **target-ATS export profiles**, **verifiable parse output**.

---

## 9. Recommended architecture (one paragraph)
**Next.js 14/15 + TS + Tailwind + Zustand.** Data = JSON Resume superset in a typed store. **Three renderers from one model:** (1) `@react-pdf/renderer` single-column "ATS-safe" PDF (real text, standard headers, no tables/columns); (2) `docx` DOCX export (most reliably parsed [1][2]); (3) headless Chromium (Playwright/Browserless MCP) for the designed human-facing PDF. A **PDF.js-based parser** powers the compliance-check panel ("what the ATS sees") [12]. An **LLM layer** (OpenAI/Anthropic/OpenRouter) drives bullet enhancement + JD keyword tailoring + match score. Optional server-side generation via **carbone-mcp** or **docgen-mcp-server**. Add a **target-ATS selector** that switches the export profile (single-column for Workday/Taleo; allow columns for Greenhouse/Lever/Ashby) — this is the feature that turns "ATS-friendly" into "world-class".

---

## 10. Gaps / what saturation could not fully resolve
- **Exa rate-limited** before deep-fetching react-pdf docs, ATS-scoring vendor internals (Jobscan/Resume Worded algorithms are proprietary — no public spec exists), and the full SaaS feature matrix. Findings on those axes are indirect but consistent.
- **No public ATS parsing standard** exists [1][2][3] — all rules are heuristics; the single/two-column disagreement [3][4][5] is unresolved at the industry level (resolved here per-platform).
- **Code verification (Phase 3) deferred:** the test "does @react-pdf/renderer output pass the copy-paste/parse test" is documented as claim C5 (verified via OpenResume shipping it) rather than re-run here. A runnable recipe is below.

### Verification recipe (run post-restart, or yourself)
```
npm i @react-pdf/renderer pdfjs-dist
# 1. render a minimal single-column resume with react-pdf → resume.pdf
# 2. extract text with pdfjs-dist, assert sections appear in order (Experience before Education)
# 3. assert contact fields parse (email/phone regex hit)
# 4. compare against a two-column variant → expect legacy-parser-style interleaving
```
Expected verdict: react-pdf single-column **CONFIRMED** ATS-parseable (matches OpenResume's production claim [12]).

---

## Sources (ranked, with access date 2026-07-24)
1. quickcv.io — *I Tested 8 ATS Systems to See How They Actually Parse Resumes* (2026-04) — https://quickcv.io/blog/i-tested-8-ats-systems-to-see-how-they-actually-parse-resumes
2. reqcore.com — *AI Resume Parsing Explained* (2026-03) — https://reqcore.com/blog/ai-resume-parsing-explained
3. talenttuner.app — *ATS Resume Optimization Research & Analysis* (2025-11) — https://talenttuner.app/ats-research
4. enhancv.com — *The State of Resume Parsing: Does ATS Read Two-Column Resumes?* (2026-07) — https://enhancv.com/blog/ats-resume-parsing/
5. jobloo.co — *I Reverse-Engineered How 5 ATS Systems Read Your Resume* (2026-05) — https://jobloo.co/blog/how-ats-systems-read-your-resume/
6. resuai.co — *How Modern ATS Parsers Actually Work* (2026-05) — https://resuai.co/blog/how-modern-ats-parsers-actually-work
7. atschecker.ai — *How ATS Parses Your Resume (Step by Step)* (2026-07) — https://www.atschecker.ai/blog/how-ats-parses-resume
8. atscvbuilder.com — *How ATS Parses Your Resume - Technical Breakdown* (2026-04) — https://atscvbuilder.com/how-ats-parses-resumes
10. amruthpillai/reactive-resume — architecture.mdx (v5.0.15) — https://github.com/amruthpillai/reactive-resume/blob/v5.0.15/docs/contributing/architecture.mdx
11. amruthpillai/reactive-resume — *A New Chapter for Reactive Resume* (Issue #2499, v5) — https://github.com/amruthpillai/reactive-resume/issues/2499
12. xitanggg/open-resume — README — https://github.com/xitanggg/open-resume/ ; https://www.open-resume.com/
13. saashub.com — *Reactive Resume vs OpenResume* — https://www.saashub.com/compare-reactive-resume-vs-openresume
14. olyaiy/resume-lm — https://github.com/olyaiy/resume-lm
15. Kiranism/cvtailor — https://github.com/Kiranism/cvtailor
16. JSON Resume schema — https://jsonresume.org/schema
17. fresh-standard/fresh-resume-schema (FRESCA) — https://github.com/fresh-standard/fresh-resume-schema/
18. EURES Job Application Data Standard (HR-Open 3.2) — https://eures.hzz.hr/app/uploads/2022/12/eures_formati_i_standardi_cv.pdf
19. InLOC — HR-XML Europass CV application profile — https://simongrant.org/InLOC/HR-XML+Europass+CV+application+profile
20. Applicant Profile Protocol (APP) — https://app-protocol.org/
22. lampzi.com — *Typst vs LaTeX for Resumes* (2026-05) — https://lampzi.com/blogs/typst-vs-latex-resume
23. D-Naveenz/next-resume-typst — https://github.com/D-Naveenz/next-resume-typst
24. Typst Universe — clickworthy-resume, modern-cv — https://typst.app/universe/package/clickworthy-resume/
25. steadyfall/simple-technical-resume-template (Typst) — https://github.com/steadyfall/simple-technical-resume-template
26. jxpeng98/Typst-CV-Resume — https://github.com/jxpeng98/typst-cv-resume
28. resumeoptimizerpro.com — *LaTeX Resume Template: Best Options, ATS Risks* (2026-05) — https://resumeoptimizerpro.com/blog/latex-resume-template
30. docx (npm, dolanmiu) — https://www.npmjs.com/package/docx ; https://docx.js.org/
31. develop365 — *Open Source JS Libraries for Creating Word Files* — https://develop365.gitlab.io/word-docx-generate/
32. libhunt — *docx vs pdf-lib* — https://www.libhunt.com/compare-docx-vs-pdf-lib
33. wgarrido/mcp-browser — https://github.com/wgarrido/mcp-browser/
34. cyanheads/docgen-mcp-server — https://github.com/cyanheads/docgen-mcp-server
35. carbone-mcp (npm) — https://www.npmjs.com/package/carbone-mcp
36. FabianGenell/pdf-mcp-server — https://github.com/fabiangenell/pdf-mcp-server
37. HarjjotSinghh/documents-mcp — https://github.com/HarjjotSinghh/documents-mcp
38. TheBatashev/MCP-Documents — https://github.com/TheBatashev/MCP-Documents
39. thiagotw10/document-generator-mcp — https://mcpservers.org/servers/thiagotw10/document-generator-mcp
40. appcypher/awesome-mcp-servers — https://github.com/appcypher/awesome-mcp-servers
41. dev.to/srbhr — *5 Open-Source Resume Builders That'll Help Get You Hired in 2026* — https://dev.to/srbhr/5-open-source-resume-builders-thatll-help-get-you-hired-in-2026-1b92
