# Wave 1 Findings — Consolidated Digest

Research mode: direct (subagent path blocked pending opencode restart for model-routing config).
Search tools: Exa websearch (rate-limited after 7 queries), GitHub repo search, GitHub README via search snippets.
Date: 2026-07-24.

## Axis coverage
| # | Axis | Status | Top source(s) |
|---|------|--------|---------------|
| 1 | ATS parsing internals | ✅ Strong | quickcv, reqcore, jobloo, enhancv, talenttuner, resuai, atschecker, atscvbuilder |
| 2 | OSS builders architecture | ✅ Strong | reactive-resume architecture.mdx, OpenResume README, resume-lm, cvtailor |
| 3 | Data schemas | ✅ Strong | jsonresume.org/schema, FRESH/FRESCA, APP (app-protocol.org), EURES/HR-Open |
| 4 | PDF generation libs | ⚠️ Partial (Exa cut) | OpenResume uses @react-pdf/renderer; pdf-lib via libhunt; need react-pdf deep detail |
| 5 | ATS scoring/keyword | ⚠️ Covered via axis 1 | talenttuner 5-layer model; reqcore parsing vs scoring; keyword vs semantic |
| 6 | AI features | ⚠️ Indirect | resume-lm, cvtailor (AI tailor), Reactive Resume OpenAI integration |
| 7 | MCP servers (doc/PDF/browser) | ✅ Strong | pdf-mcp-server, documents-mcp, docgen-mcp-server, carbone-mcp, mcp-browser, awesome-mcp-servers |
| 8 | Typst/LaTeX templates | ✅ Strong | lampzi, NextResume, clickworthy-resume, modern-cv Typst, resumeoptimizerpro |
| 9 | NPM/docx ecosystem | ✅ Strong | docx (5.3M wkly dl), pdf-lib, officegen, docx-templates, docxtemplater, mammoth |
| 10 | SaaS landscape | ⚠️ Indirect | saashub compare (FlowCV, Kickresume, Zety, Resumatic, Standard Resume) |

## Key empirical claims captured (high-risk → claim ledger)
- DOCX > PDF for parsing in 6/8 ATS (quickcv).
- Single-column ~95% parse vs two-column ~42% (talenttuner, citing Zhang et al. 2023).
- ~15% of PDFs need special handling beyond standard text extraction (reqcore).
- Two-column is "solved" on modern ATS via XY-Cut/LayoutReader (enhancv) — CONTRADICTS above.
- pdflatex safe; XeLaTeX/LuaLaTeX risky for ATS text extraction (resumeoptimizerpro).
- @react-pdf/renderer produces real, selectable text PDF (OpenResume, claims ATS-friendly to Greenhouse/Lever).

## EXPAND leads (not yet investigated — Wave 2 candidates)
- LEAD: APP (app-protocol.org) "Applicant Profile Protocol" with confidence scores + JSON-LD — WHY: newer AI-ML-ready schema, could differentiate a "world-class" builder — ANGLE: fetch app-protocol.org spec + GitHub.
- LEAD: Reactive Resume v5 "Browserless/Chromium printer" service — WHY: confirms server-side PDF via headless Chrome is the production pattern — ANGLE: read rxresu v5 printer docs.
- LEAD: cvtailor (Kiranism/cvtailor) + resume-lm (olyaiy) — WHY: modern Next.js 15 + react-pdf + AI-tailor reference stacks, closest to "world-class" target — ANGLE: read their README/package.json via GitHub.
- LEAD: NextResume Typst `/ActualText` semantic links technique — WHY: improves ATS copy/parse while keeping visuals — ANGLE: Typst PDF accessibility features.
- DEAD END: Exa free tier (rate-limited) — switch to webfetch + gh for remaining axes.
