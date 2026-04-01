# Visual Chromatics — Project Overview

## What It Is

Visual Chromatics is a browser-based color palette tool that extracts dominant colors from any image and outputs them as ready-to-use CSS variables. You point it at a photo — either by searching Unsplash or uploading your own file — and within seconds you have a named, copyable palette in RGB, HEX, or HSL format.

It runs entirely in the browser. There is no backend, no account, and nothing to install.

---

## Who Uses It

**UI/UX designers** who want to build a color system around a mood board or reference photo without manually sampling colors in a design tool.

**Front-end developers** who need a quick way to generate CSS custom properties (`--primary`, `--secondary`, `--accent`, etc.) that are grounded in a real visual reference rather than picked arbitrarily.

**Brand and content teams** who need to match digital colors to photography — product shots, campaign images, or editorial content.

Anyone who has ever opened an image in a design tool just to use the eyedropper is the target user.

---

## Core Features

### Image Input
- **Unsplash search** — keyword search pulls a random matching photo via the Unsplash API
- **File upload** — drag-in or browse to any local image file
- **Voice search** — tap the mic icon and speak a concept; the app searches Unsplash hands-free using the Web Speech API (via Annyang)
- **Suggestion chips** — one-click starting points (nature, ocean, city, etc.)

### Color Extraction
Colors are extracted using **ColorThief**, a library that clusters the image's pixel data to find the most representative dominant colors — not a simple average. The result reflects the palette that visually defines the image.

- Extract 5, 7, or 9 colors (selectable)
- Each color is labeled with a human-readable name approximation
- Colors display with HEX, RGB label, and a large swatch

### Output Formats
The generated code block updates live as you switch between formats:

- **RGB** — `rgb(194, 169, 134)`
- **HEX** — `#c2a986`
- **HSL** — `hsl(33, 29%, 64%)`

Variables are named semantically: `--primary`, `--secondary`, `--accent`, then `--color-4` through `--color-9`.

### Palette Controls
- **Lock** — freeze the current palette so refreshing the image doesn't re-extract colors; useful for testing how a palette looks across different photos
- **Refresh** — pull a new search result for the current query without clearing the palette
- **Copy All** — copies the full `:root { }` block to the clipboard
- **Export PNG** — generates a flat swatch strip as a downloadable PNG, labeled with HEX values

### Share
The **Share Palette** button encodes the current palette, image URL, and search query into a URL hash and copies a shortened link to the clipboard. Anyone opening that link sees the same image and palette without needing an account or session.

### History
The last 10 extracted palettes are stored in `localStorage` and shown in an "Archives" grid at the bottom of the page. Clicking any archive entry reloads that palette instantly.

---

## How It Was Built

### Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build tool | Vite |
| Styling | Tailwind CSS v3 |
| Color extraction | ColorThief |
| Image source | Unsplash API |
| HTTP client | Axios |
| Voice recognition | Annyang (Web Speech API wrapper) |
| PWA support | vite-plugin-pwa |

### Architecture

The app is a single Vue component tree with no router and no state management library. All state lives in `ImageSearch.vue`, broken into focused composables:

- `useColorConversion` — pure functions for RGB → HEX, HEX → RGB, RGB → HSL, and approximate color naming
- `usePaletteHistory` — reads/writes the 10-item history to `localStorage`
- `useNotification` — manages the transient toast notification at the bottom of the screen
- `useVoiceSearch` — wraps Annyang lifecycle (start, stop, cleanup) and surfaces a `listening` ref

There is no server-side rendering. The Unsplash API key is injected at build time via a Vite environment variable and never exposed in the repository.

### Color Naming

Color names (Sand Dune, Espresso, Moss, etc.) are derived client-side by computing HSL values and matching them against named hue/lightness/saturation ranges. No external API is called for labeling.

### Sharing Mechanism

The share URL uses the `window.location.hash` to store palette hex values, the source image URL, and the search query as URL parameters. This makes shared links fully stateless — the entire palette state is encoded in the URL itself. On load, `onMounted` reads the hash and rehydrates state before any fetch occurs.

---

## Browser Support

The app works in all modern browsers. Voice search requires a browser with Web Speech API support (Chrome and Edge work; Firefox and Safari have limited or no support for this API). All other features degrade gracefully if voice is unavailable.

---

## Privacy

No user data is collected or transmitted to any first-party server. Uploaded images are read locally via the File API and never leave the browser. Search queries go directly to the Unsplash API. Palette history is stored only in the user's own `localStorage`.
