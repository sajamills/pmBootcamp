# Three.js Hero Layout Plan

## Goal

Make the interactive Growth System feel intentionally composed within the homepage hero. It should support the positioning statement, invite exploration, and avoid reading as a large empty dashboard.

## Current UX Findings

- The desktop hero uses `items-stretch`, while the Three.js card uses `h-full`. The visualization therefore inherits the height of the text-heavy left column instead of choosing a height that suits its content.
- The nodes occupy a relatively small central area inside a tall card, creating excess empty space above and around the network.
- The bottom detail tray is visually heavy. Its description and six topic pills cover a large portion of the canvas and compete with the visualization.
- The hero has multiple competing interaction targets: three primary text-side links, clickable nodes, an Explore link, and six topic pills.
- The current composition makes the Three.js asset feel like a second product interface rather than supporting evidence for the portfolio story.
- The non-WebGL loader is taller than the final Three.js card at large breakpoints, which can create a noticeable layout shift when the interactive component loads.

## Layout Options

### Option A: Compact Right-Side Card

Keep the existing two-column hero, but give the Three.js asset a deliberate fixed/aspect-based height and simplify its internal controls.

Changes:

- Change the hero grid from `items-stretch` to `items-center`.
- Remove `h-full` from the Three.js card.
- Target approximately `25rem` to `28rem` height on desktop.
- Move the node group slightly upward and scale it up to use more canvas area.
- Replace the large bottom tray with a compact single-row detail bar.
- Move topic pills outside the canvas or reveal them only after interaction.
- Match the loader and final component dimensions to prevent layout shift.

Strengths:

- Preserves the strong two-column opening.
- Keeps the interactive asset visible above the fold.
- Requires the smallest structural change.
- Better balances recruiter-oriented copy with visual differentiation.

Tradeoffs:

- The visualization remains secondary due to the available column width.
- Topic controls need simplification to avoid crowding.

### Option B: Full-Width Visualization Band

Use a text-first hero, then place the Growth System in a wide horizontal section immediately below it.

Changes:

- Let the headline and positioning copy span a wider area.
- Place the Three.js asset below the hero copy at roughly `20rem` to `24rem` high.
- Arrange nodes horizontally and place details in a side panel or lower strip.

Strengths:

- Gives the network more room and makes its relationships easier to understand.
- Produces a distinctive visual transition into the current-series section.
- Works well for larger desktop screens.

Tradeoffs:

- Pushes the current-series explanation farther down the page.
- Makes the visualization more prominent than the recruiter-facing message.
- Requires more responsive redesign work.

### Option C: Ambient Hero Visual

Reduce the asset to a cleaner, mostly decorative network with one active-node label. Open a richer exploration experience elsewhere.

Changes:

- Remove the bottom detail tray and topic pills.
- Show only the network, active topic label, and one small Explore link.
- Link to a dedicated Growth System section or portfolio view for deeper interaction.

Strengths:

- Creates the cleanest and most premium hero.
- Keeps attention on the headline and primary CTAs.
- Reduces interaction complexity and visual density.

Tradeoffs:

- The asset communicates less information immediately.
- A separate destination would be needed to preserve the current exploratory value.

## Recommended Direction

Implement **Option A: Compact Right-Side Card**, with some of Option C's restraint.

The homepage needs to establish the portfolio positioning quickly. The Three.js asset should be memorable evidence of product craft, but it should not feel like a second application competing with the core story. A compact card retains the interactive differentiator while making the overall hero feel tighter and more intentional.

## Proposed Composition

### Desktop: `lg` and above

- Use `items-center` on the hero grid.
- Set the visualization to a stable height of approximately `26rem`; allow up to `28rem` on very wide screens.
- Keep the header inside the card, but reduce its vertical footprint.
- Increase the network's apparent scale by roughly 15% to 20%.
- Position the network within the middle 60% to 65% of the card.
- Replace the current bottom tray with:
  - active topic title,
  - one-line description,
  - Explore link.
- Remove topic pills from the default desktop canvas. Node hover and click remain the primary interaction.
- Optionally show a small `6 connected themes` cue instead of the pills.

### Tablet: `md` to `lg`

- Stack the asset below the copy.
- Use a height of approximately `23rem` to `25rem`.
- Keep a compact detail bar and support tap selection.
- Ensure the visualization appears before the current-series orientation section.

### Mobile: below `md`

- Continue using the lightweight topic-map fallback instead of loading Three.js.
- Reduce the fallback minimum height and let its content determine height.
- Use a two-column topic grid where space permits and one column on narrow screens.
- Keep tap targets at least 44px high.

## Implementation Steps

1. Update the homepage hero alignment and spacing in `app/page.tsx`.
   - Replace stretch alignment with centered alignment.
   - Tune desktop column proportions and hero bottom margin.

2. Update the interactive card dimensions in `components/GrowthSystem3D.tsx`.
   - Remove inherited full height.
   - Add explicit responsive heights.
   - Adjust camera distance or root scale so the nodes occupy more of the canvas.

3. Simplify the active-node information UI.
   - Convert the bottom tray into a compact detail bar.
   - Remove or progressively disclose the topic-pill controls.
   - Preserve keyboard-accessible topic selection outside the canvas if node-only interaction is insufficient.

4. Match the loading and fallback states in `components/GrowthSystemLoader.tsx`.
   - Use the same responsive dimensions as the final Three.js component.
   - Prevent layout shift when Three.js loads.
   - Reduce excess mobile fallback height.

5. Validate responsive behavior.
   - Check desktop at 1280px, 1440px, and 1920px.
   - Check tablet at 768px and 1024px.
   - Check mobile at 375px and 430px.
   - Confirm the asset does not push the primary CTAs or current-series explanation too far below the fold.

6. Validate interaction and performance.
   - Confirm hover, click, keyboard focus, reduced-motion, and WebGL fallback behavior.
   - Confirm no layout shift during lazy loading.
   - Run tests, lint, build, and browser-based visual checks.

## Acceptance Criteria

- The Three.js card no longer stretches to match the full text-column height.
- The network occupies a visibly larger proportion of the card.
- The active detail UI does not obscure the network.
- The headline and primary CTAs remain the dominant first-screen content.
- Loader, fallback, and final Three.js states use consistent dimensions.
- Tablet and mobile layouts have no horizontal overflow or awkward dead space.
- Interaction remains understandable without relying exclusively on hover.

