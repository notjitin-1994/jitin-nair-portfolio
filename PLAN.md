# Predator Project Detail Page - Implementation Plan

## Overview
Create a stunning, minimal, information-dense project showcase page for the Predator Scalping System with animated infographics, code snippets, citations, and raw data visualization.

## File Structure
```
app/
  projects/
    predator/
      page.tsx              # Main project detail page
      components/
        ArchitectureDiagram.tsx   # Animated system architecture SVG
        CodeShowcase.tsx          # Tabbed code snippets with syntax highlighting
        MetricsDashboard.tsx      # Live metrics with animated counters
        ProcessFlow.tsx           # Horizontal step-by-step process visualization
        TechStackGrid.tsx         # Technology grid with icons
        CitationsSection.tsx      # References and sources
        HeroSection.tsx           # Animated hero with glitch effects
      data/
        codeSnippets.ts         # Code examples for display
        metrics.ts              # Metric definitions and data
        citations.ts            # Citations and references
  components/
    ui/
      SyntaxHighlighter.tsx   # Reusable syntax highlighter wrapper
      AnimatedCounter.tsx     # Number animation component
      ScrollReveal.tsx        # Enhanced scroll reveal wrapper
```

## Dependencies to Install
```bash
npm install react-syntax-highlighter @types/react-syntax-highlighter
```

## Design System (Based on .impeccable.md principles)

### Colors
- Primary: `#22d3ee` (cyan-400)
- Secondary: `#10b981` (emerald-500)
- Background: `#0a0a0f` (void)
- Surface: `rgba(255,255,255,0.03)` with `backdrop-blur-[2px]`
- Border: `rgba(255,255,255,0.08)`
- Text Primary: White
- Text Secondary: `#94a3b8` (slate-400)

### Typography
- Headlines: Bold, tracking-tight
- Mono: For code, metrics, labels
- Body: Relaxed line-height for readability

### Animation Principles
- Easing: `[0.22, 1, 0.36, 1]` (ease-out-expo)
- Stagger: 0.1s between items
- Scroll reveals: Once, 0.1 viewport threshold

---

## Component Specifications

### 1. HeroSection
**Purpose:** Dramatic entrance with project branding

**Elements:**
- Full viewport height (100vh) on desktop, auto on mobile
- Animated ASCII/pixel art "PREDATOR" banner (reuse Terminal component pattern)
- Typewriter subtitle: "Autonomous XAU/USD Scalping Engine"
- Key stats row: 3-4 animated counters (Latency, Accuracy, Uptime, Agents)
- Scroll indicator with bounce animation
- Background: Vortex particle system (reuse DesktopVortexBackground)

**Animations:**
- Banner: Staggered pixel reveal (0.5s delay per letter)
- Stats: Count-up animation from 0 (2s duration)
- Background: Subtle parallax on scroll

---

### 2. ArchitectureDiagram
**Purpose:** Visual system architecture with animated connections

**Elements:**
- SVG-based diagram showing 5 agent connections
- Nodes: Ingestion → Regime → Strategy → Risk → Execution
- Animated data flow lines (cyan pulses traveling along paths)
- Interactive hover states on nodes (expand to show details)
- Legend explaining each component

**Layout:**
- Desktop: Horizontal flow diagram
- Mobile: Vertical stack with animated connectors

**Animations:**
- Nodes: Fade in + scale from 0.8 (staggered)
- Lines: Draw-in animation (SVG stroke-dashoffset)
- Data pulses: Continuous loop, 3s duration
- Hover: Node scales 1.1, glow effect

---

### 3. CodeShowcase
**Purpose:** Display key code snippets with syntax highlighting

**Elements:**
- Tabbed interface: 3-4 key files
  - "Regime Detection Algorithm"
  - "Risk Management Module"
  - "Circuit Breaker Logic"
  - "WebSocket Handler"
- Syntax highlighted code blocks
- Copy-to-clipboard button
- File path header
- Line numbers toggle

**Technical:**
- Use react-syntax-highlighter with Prism
- Theme: Custom dark theme matching site (vscDarkPlus adapted)
- Language: Python (primary), TypeScript (secondary)

**Animations:**
- Tab switch: Crossfade (0.2s)
- Code block: Slide in from bottom
- Copy button: Scale + checkmark animation on click

---

### 4. MetricsDashboard
**Purpose:** Raw data visualization with live-feeling metrics

**Elements:**
- Grid of 6-8 metric cards
- Each card: Label, value (animated), unit, mini sparkline (optional)
- Categories: Performance, Accuracy, System, Data

**Metrics to Display:**
- Execution Latency: <50ms (p99)
- Regime Detection Accuracy: 85-90%
- Uptime: 99.9%
- Data Points Processed: 222MB+
- Active Agents: 5
- Trading Sessions: 24/7
- Avg Response Time: 12ms
- Signals Generated: 1,200+/day

**Visualizations:**
- Animated number counters
- Progress bars for percentages
- Mini line charts for trends (using Recharts)

**Animations:**
- Staggered entrance (0.1s delay)
- Continuous subtle pulse on active indicators
- Hover: Card lifts + glow

---

### 5. ProcessFlow
**Purpose:** Step-by-step process visualization

**Elements:**
- Horizontal timeline (desktop) / vertical (mobile)
- 6 steps with icons:
  1. Tick Data Ingestion
  2. Regime Classification
  3. Strategy Selection
  4. Position Sizing
  5. Execution
  6. Drift Monitoring
- Connecting animated line between steps
- Description tooltip on hover/click

**Animations:**
- Steps reveal on scroll (staggered)
- Connector line draws progressively
- Active step glows
- Checkmark animation on viewed steps

---

### 6. TechStackGrid
**Purpose:** Technology showcase with categorization

**Elements:**
- 4 category sections: Core Engine, Multi-Agent, Data Layer, ML/Ops
- Each technology as a card with icon, name, description
- Hover reveals detailed use case
- Filter chips by category

**Technologies:**
- Core: Python 3.13, Numba, Polars
- Agents: LangGraph, 5 Specialized Agents
- Data: TimescaleDB, Redis, PostgreSQL
- ML: ADWIN, PSI, Model Registry

**Animations:**
- Grid items stagger in
- Hover: Lift + border glow
- Filter: Smooth rearrangement

---

### 7. CitationsSection
**Purpose:** Academic/professional credibility

**Elements:**
- Section title: "References & Methodology"
- List of sources:
  - Kaufman's Efficiency Ratio paper
  - Choppiness Index (E.W. Dreiss)
  - ADWIN drift detection algorithm
  - PSI (Population Stability Index)
  - Kelly Criterion (J.L. Kelly Jr.)
- Each citation: Title, author, year, brief relevance note
- Links to sources where available

**Design:**
- Clean, minimal cards
- Academic styling
- Proper citation format

---

## Page Layout Structure

```
<HeroSection />           // 100vh, dramatic intro
<ArchitectureDiagram />   // System overview
<MetricsDashboard />      // Raw data metrics
<CodeShowcase />          // Key algorithms
<ProcessFlow />           // How it works
<TechStackGrid />         // Technology deep-dive
<CitationsSection />      // References
<CTASection />            // GitHub link, back to portfolio
```

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked)
- Tablet: 768px - 1024px (2 columns where applicable)
- Desktop: > 1024px (full layout)

## Performance Considerations
1. Use dynamic imports for heavy components (code splitting)
2. Lazy load below-fold sections
3. Use will-change sparingly
4. Optimize images (WebP format)
5. Syntax highlighting: Load only displayed language grammars

## Accessibility
1. ARIA labels on interactive elements
2. Keyboard navigation support
3. Reduced motion media query respect
4. Sufficient color contrast (WCAG AA)
5. Screen reader friendly code blocks

---

## Execution Phases

### Phase 1: Setup (5 min)
1. Install react-syntax-highlighter
2. Create directory structure
3. Set up data files

### Phase 2: Core Components (20 min)
1. Create SyntaxHighlighter wrapper
2. Build HeroSection
3. Build MetricsDashboard

### Phase 3: Advanced Components (25 min)
1. Build ArchitectureDiagram (SVG animations)
2. Build CodeShowcase (tabbed interface)
3. Build ProcessFlow (timeline)

### Phase 4: Polish & Integration (15 min)
1. Build TechStackGrid
2. Build CitationsSection
3. Wire up main page.tsx
4. Update ProjectCarousel Learn More link

### Phase 5: Testing & Deployment (5 min)
1. Verify responsive behavior
2. Test all animations
3. Build and deploy
4. Share URL

Total Estimated Time: 70 minutes
