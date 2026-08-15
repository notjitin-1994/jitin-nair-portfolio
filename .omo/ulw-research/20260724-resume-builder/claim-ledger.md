# Claim Ledger — Resume Builder Research

Format: `claim | risk | domains | counter-search | primary? | status`

| # | Claim | Risk | Corroborating domains | Counter-search | Primary source | Status |
|---|-------|------|----------------------|----------------|----------------|--------|
| C1 | DOCX parses more reliably than PDF across most ATS (6/8 systems) | high | quickcv.io, reqcore.com, talenttuner.app, atscvbuilder.com, jobloo.co | enhancv says PDF is the safe default accepted by all modern ATS | None (no ATS vendor publishes spec) | **verified** (4 independent domains + practical consensus; PDF also works when text-based, so nuance locked) |
| C2 | Single-column parses ~95%; two-column ~42% | high | talenttuner.app (cites Zhang et al. 2023, Stanford AI Lab), atschecker.ai (Taleo 41% two-col fail), jobloo.co | enhancv.com (modern ATS solved via XY-Cut/LayoutReader/Textkernel 2023) | Zhang et al. 2023 (not directly fetched) | **verified-with-contradiction** → resolution: true on legacy (Workday/Taleo/iCIMS/SuccessFactors); false on modern (Greenhouse/Lever/Ashby). See SYNTHESIS. |
| C3 | ~15% of PDFs need special handling (multi-col, bad font maps, render-order text) | normal | reqcore.com | none attempted | reqcore (practitioner) | unresolved (single source; plausible, treat as heuristic) |
| C4 | pdflatex output is ATS-safe; XeLaTeX/LuaLaTeX risk extraction failures | high | resumeoptimizerpro.com, lampzi.com | none | None | unresolved (2 domains, consistent but no vendor primary; conservative recommendation) |
| C5 | @react-pdf/renderer emits real selectable text (ATS-parseable) | high | open-resume.com, novincode/openresume, github xitanggg/open-resume | none | OpenResume tech-stack table | **verified** (OpenResume ships it & claims Greenhouse/Lever friendly; corroborated by 2 forks) |
| C6 | PDF text is stored as positioned glyphs (x/y), not reading order | high | reqcore.com, atscvbuilder.com, quickcv.io, atschecker.ai | enhancv (says reading order solved via algorithms) | PDF spec (ISO 32000) — not fetched | **verified** (4 domains; standard PDF fact) |
| C7 | Two-column reading order is solved industry-wide on modern ATS | high | enhancv.com (cites XY-Cut 2005, XY-Cut++ 2025, MS LayoutReader 2021, Textkernel 2023) | talenttuner/quickcv/jobloo field tests showing failures | MS LayoutReader paper; Textkernel blog | **verified-on-modern** (true for Greenhouse/Lever/Ashby; false for Workday/Taleo/legacy enterprise/govt) |
| C8 | JSON Resume is the de-facto developer standard schema | normal | jsonresume.org, fresh-standard, app-protocol.org comparison, microformats.org | none | jsonresume.org/schema | **verified** |
| C9 | docx (npm, 5.3M wkly downloads) is the leading JS DOCX generator | normal | npmjs.com, libhunt, develop365 comparison | none | npm registry stats | **verified** |

## Notes
- No ATS vendor publishes a public parsing spec (the field has no RFC/standard). All "rules" are practitioner reverse-engineering → treat as high-value heuristics, not guarantees.
- The single-vs-two-column "debate" is the field's central disagreement. Resolution is platform-dependent (modern vs legacy), not absolute.
