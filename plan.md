

Created memory file [](file:///Users/peterbenoit/Library/Application%20Support/Code/User/workspaceStorage/4b681192645c9d7c80998d67a147bcc0/GitHub.copilot-chat/memory-tool/memories/YTEyZmUzMWYtZmY3YS00NjBmLWJlMDAtMGI3NzQyOTg3NDY4/plan.md)

Here's the plan:

---

## Plan: ColorPaletteGenerator — Four Issue Fixes

**TL;DR:** Fix WCAG AA contrast failures, rewrite AI-sounding copy to be human and direct, add URL-hash-based palette sharing, and improve the empty-state UX so new visitors know what to do.

---

### Phase 1: Color Contrast Fixes

**Hard failures found:**
- `text-[#484848]` (the step numbers "01", "02", "03" in Usage.vue) against `#0e0e0e` bg → ~2.3:1 ratio. Needs 4.5:1.
- `text-[#767575]` against card backgrounds `#1f2020`, `#252626`, `#191a1a` → 3.6–4:1. Fails 4.5:1 for normal text.

**Fixes:**
1. Replace all `text-[#767575]` → `text-[#9a9a9a]` globally (lightens ~15%, still subdued, pushes contrast above 4.5:1 on those card backgrounds)
2. Step numbers in Usage.vue: replace `text-[#484848]` → `text-[#666564]`
3. Bump 9px archive/sub-label text to 10px as a minimum floor

---

### Phase 2: Copy Rewrite

Targeted rewrites — no structural changes.

**ImageSearch.vue hero:**
- Label: `"Visual Chromatics / Professional Tooling"` → `"Visual Chromatics"`
- Tagline: `"Extract sophisticated palettes from imagery with clinical precision..."` → `"Pull colors from any image and get CSS-ready palettes in seconds. Works with Unsplash search or your own files."`

**Usage.vue methodology steps:**
- "Image Ingestion" → "Start with an image" (remove "Our system uses ColorThief...bitmap")
- "Nuance Extraction" → "Colors get extracted" (replace k-means jargon with plain English)
- "Export & Deploy" → "Copy and use instantly"
- Pro Tips: remove `VISUAL CHROMATICS` all-caps in the voice tip

**App.vue About modal:**
- Opening line: `"A high-end image color palette generator for photographers, brand strategists, and digital architects."` → `"Drop in an image, get a color palette."`

---

### Phase 3: Palette Sharing (new feature)

URL hash approach — no backend needed, shareable by copy-pasting.

1. Add `sharePalette()` function in ImageSearch.vue: encodes colors as `#palette=RRGGBB,RRGGBB,...` and writes to `window.location.hash`, copies URL to clipboard
2. In `onMounted`, check for `palette=` in `window.location.hash` and pre-load those colors into `colors.value` (skipping the image fetch)
3. Add a **Share** button (material icon `share`) in the extraction panel alongside the Export PNG button, only visible when `colors.length > 0`

---

### Phase 4: Search UX Clarity

1. **Empty state improvement**: Replace the generic pulsing skeleton with an instructive placeholder — something like "Search or upload an image to begin" with the two entry-point icons, so a first-timer immediately understands what to do
2. **Palette size toggle label**: Add `Colors:` prefix before the `5 | 7 | 9` buttons (addresses the VISUAL_REVIEW note that they "read like page numbers")

---

**Relevant files**
- ImageSearch.vue — contrast fixes, copy, sharing logic + button, empty state
- Usage.vue — contrast fix (step numbers), copy rewrite
- App.vue — About modal copy

**Verification**
1. Use a browser contrast checker (e.g., Chrome DevTools accessibility audit) on the updated colors
2. Manually test share link: copy a palette → paste URL in a new tab → confirm palette loads
3. Check empty state on first load (clear palette state, verify instructional text shows)
4. Read the rewritten copy out loud — if it sounds like a person wrote it, it's good

**Scope exclusions:** No SSR/pre-rendering, no archive thumbnails, no nav redesign.
