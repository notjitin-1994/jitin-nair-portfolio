# Mobile Revamp Plan - Predator Trading Bot

## Objectives
- Display ALL desktop data on mobile
- Enhanced mobile experience with touch-friendly interactions
- Production-ready, polished UI
- Zero "AI slop" aesthetics

## Component Changes

### 1. HeroSection.tsx
**Current Issues:**
- Pixel banner overflows on narrow screens
- Stats grid is 2x2 but could use full width
- Scroll indicator positioned awkwardly

**Mobile Optimizations:**
- Scale pixel banner proportionally
- Convert stats to horizontal scrollable row OR full-width 2x2 with larger touch targets
- Reposition scroll indicator centered
- Add subtle parallax for mobile

### 2. ArchitectureDiagram.tsx  
**Current Issues:**
- Fixed 500px/400px height
- Absolute positioning breaks on mobile
- Nodes overlap on narrow screens

**Mobile Optimizations:**
- Create vertical flow layout for mobile
- Stack nodes in logical pipeline order (top to bottom)
- Replace SVG connections with animated arrows
- Touch-friendly node cards with larger tap areas
- Horizontal scroll for data flow pills at bottom

### 3. MetricsDashboard.tsx
**Current Issues:**
- 4-column grid too dense
- Sparklines too small to read

**Mobile Optimizations:**
- 2-column grid on mobile (1-column for very small)
- Full-width cards with larger touch targets
- Simplified sparklines OR horizontal bar indicators
- Swipeable summary stats section

### 4. CodeShowcase.tsx
**Current Issues:**
- Side-by-side tab/code layout
- Tabs take up too much vertical space when stacked

**Mobile Optimizations:**
- Horizontal scrollable tab bar
- Full-width code block below
- Accordion-style tab expansion
- Syntax highlighting optimized for small screens

### 5. ProcessFlow.tsx
**Current Issues:**
- 6-column horizontal layout
- Timeline line breaks

**Mobile Optimizations:**
- Vertical timeline with alternating left/right cards
- OR horizontal swipeable carousel
- Number badges as timeline markers
- Expandable cards for details

### 6. TechStackGrid.tsx
**Current Issues:**
- Filter buttons overflow
- 2-column grid cramped

**Mobile Optimizations:**
- Horizontal scrollable filter pills
- Single column stack on mobile
- Accordion-style category expansion
- Tech cards with larger touch targets

### 7. CitationsSection.tsx
**Current Issues:**
- Dense text blocks
- Multi-line citations hard to read

**Mobile Optimizations:**
- Collapsible citation cards
- Simplified metadata display
- "Read more" for long relevance text
- Better visual hierarchy

## Implementation Order
1. HeroSection - First impression
2. ArchitectureDiagram - Most complex change
3. MetricsDashboard - Data-heavy, needs clarity
4. CodeShowcase - Developer-focused
5. ProcessFlow - Educational content
6. TechStackGrid - Supporting info
7. CitationsSection - Reference material

## Design Tokens
- Touch target: min 44px
- Card padding: 16px mobile, 24px desktop
- Font scale: 14px base on mobile
- Spacing: Reduced by ~30% on mobile
- Border radius: Slightly smaller on mobile (12px vs 16px)
