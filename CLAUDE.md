# CLAUDE.md — Jaewon's 이것저것

Personal reading blog. Live at **https://lonj7798.github.io/** (repo `lonj7798/lonj7798.github.io`,
GitHub Pages, deploy-from-branch: `main` / root). Owner: Jaewon.

## Design philosophy

The blog looks like **ink flowing on paper**. Every visual decision follows from five rules:

1. **One publication, one paper.** The home page inherited its design language from the first
   post (the Higgs TTS article): cream paper `#f6f5f1`, editorial serif headlines
   (`Iowan Old Style / Palatino / Georgia` + `Apple SD Gothic Neo`), generous line-height,
   muted grays. Clicking from home into a post should feel like turning a page, not switching sites.
2. **Generative, not decorated.** All imagery is code — the hero is a seeded Perlin flow field
   ("ink currents" drifting eastward), every post cover is drawn from a small **motif family**
   (`wave` soundwave · `ridge` stacked profiles · `cells` breathing grid · `ribbon` ink band),
   structure + palette both seeded by `hash32(slug)`. Pin a motif per post with the `art`
   field in posts.js (Jaewon asked for visibly *different* covers between neighboring posts —
   don't let two adjacent cards share a motif). No image assets to manage.
   Don't add stock images, icons packs, or emoji noise.
   **22-motif template library** lives at `../cover-templates/` (gallery: `open index.html`;
   six designer-persona families — swiss/plotter/tufte/wa/bauhaus/topo; README has the
   adoption steps for wiring a new motif into this file's `ART` registry).
3. **Calm interactivity.** Nothing chases the cursor, nothing bursts on click (explicitly
   rejected by Jaewon). Animation is ambient; hover *reveals* (waveform crawls, card lifts).
   Always: respect `prefers-reduced-motion` (static still frame), pause canvases when
   offscreen (`IntersectionObserver`) or tab-hidden.
4. **Soft chrome, no borders.** Content cards use layered shadows + 18–28px radii, **no
   hairline borders** (Jaewon removed them deliberately). Borders remain only on form
   controls (search, chips). Tags are chrome-free `#hashtag` text in accent colors.
5. **Zero-build, forever.** Plain HTML + inline CSS/JS + `posts.js` manifest. No framework,
   no bundler, no external requests (fonts are system stacks). `git push` = deploy.
   Any feature that breaks this property is wrong for this repo.

**Palette** — use these tokens only (defined in `:root` of `index.html`):
ink `#17181c` · body `#33353c` · muted `#676b76` · paper `#f6f5f1` · card `#fff`
· accents: blue `#2f6bd8`, purple `#7a4fd3`, orange `#e08a1e`, pink `#d34f6e`, teal `#0f9d8c`.
EN/KO mix freely in copy — the brand itself is bilingual ("Jaewon's 이것저것").

## Architecture

```
index.html      landing page — all CSS/JS inline, renders posts.js client-side
posts.js        window.POSTS manifest — single source of truth (JSON after the "=")
posts/<slug>/   one self-contained folder per post (index.html + assets)
new-post.sh     upload workflow (copy → home-button inject → manifest update)
.nojekyll       Pages serves files as-is
```

Branch policy: work on `dev`, publish by merging to `main` and pushing (Pages rebuilds in
~1 min; verify with `gh api repos/lonj7798/lonj7798.github.io/pages/builds/latest`).

## Adding content — 좋은 미리보기 만들기

The homepage card (미리보기) is built *entirely* from the `posts.js` entry. When adding a
post (via `./new-post.sh <folder-or-html> <slug>` or by hand), craft the entry like this:

- **slug** — short kebab-case, and **stable**: it seeds the cover art
  (`hash32(slug)` → palette, phases, and the default motif). Renaming the slug changes the
  artwork. Prefer setting the **art** field (`wave`/`ridge`/`cells`/`ribbon`) over renaming;
  if auto-colors clash, adjust the slug suffix rather than the art code.
- **title** — keep the post's own `<title>` (auto-detected). Serif-rendered; reads best at
  8–14 words. An em-dash subtitle ("Main Title — What It Actually Shows") works well.
- **description** — 1–2 sentences. It is **clamped to 2 lines** on grid cards (3 on the
  feature card), so front-load the key claim; the tail gets cut. House pattern:
  one English sentence stating *what + method/hook*, then a short Korean echo.
  > "Read-only forward hooks and linear probes trace where speaker identity forms —
  > layer by layer, no weights changed. 스피커 정체성이 어느 레이어에서 만들어지는지 추적한 노트."
- **tags** — 2–4, lowercase. **Reuse existing tags** (check `posts.js` first) — every unique
  tag becomes a filter chip, and chip rot sets in fast. Current vocabulary:
  `interpretability`, `tts`, `deep-dive`.
- **date** — `YYYY-MM-DD`. Drives sort order and the hero's "last updated".
- **lang** — optional, e.g. `"en · ko"`; shows next to the date.
- **cover** — usually **omit** (the seeded soundwave is the house style). Set an image path
  only for genuinely visual posts; it renders `object-fit:cover` at ~880×264 (feature) /
  ~430×148 (grid), so use ≥800px-wide images with center-safe composition.

Post HTML itself: any self-contained page works. `new-post.sh` appends a namespaced
`← 이것저것` home pill before `</body>` (skip with `--no-home-link`). Don't otherwise
modify imported artifacts.

## Verifying changes to index.html

1. Syntax-check the inline JS:
   ```bash
   python3 -c "import re; s=open('index.html',encoding='utf-8').read(); open('/tmp/b.js','w').write('\n'.join(re.findall(r'<script>(.*?)</script>', s, re.S)))" && node --check /tmp/b.js
   ```
2. Look at it, don't guess — headless screenshot (works via `file://`, no server):
   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
     --hide-scrollbars --window-size=1440,1100 --virtual-time-budget=8000 \
     --screenshot=/tmp/blog.png "file://$PWD/index.html"
   ```
   Check 390×844 for mobile too. Note: CSS keyframe animations may render mid-state in
   headless captures — judge canvas density/layout, not animation phase.
3. Local preview: `python3 -m http.server 8000`.
