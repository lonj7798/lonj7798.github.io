# Jaewon's 이것저것 📖

읽고, 파헤치고, 남겨두는 곳 — a zero-build personal blog for GitHub Pages.
No framework, no build step: plain HTML + a tiny manifest. Push = deploy.

## Adding a post (the whole workflow)

```bash
./new-post.sh ~/path/to/article_folder my-post-slug
# answer 3–4 short prompts (title is auto-detected from <title>)
git add -A && git commit -m "post: my-post-slug" && git push
```

That's it. The script:

1. copies your folder (or single `.html`) into `posts/<slug>/` —
   PDFs, images, anything next to `index.html` comes along
2. injects a small **← 이것저것** home button into the post
   (skip with `--no-home-link`)
3. prepends the entry to `posts.js`, which the homepage renders

Works with any self-contained HTML — research artifacts, notebook
exports, hand-written pages.

## Preview locally

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Editing / removing posts

- **Edit metadata** (title, description, tags, date): just edit `posts.js`
  by hand — it's plain JSON after the `=`. Optional `lang` field
  (e.g. `"en · ko"`) shows next to the date.
- **Remove a post**: delete its entry from `posts.js` and `rm -r posts/<slug>`.
- **Replace content**: overwrite files in `posts/<slug>/` directly.

## Structure

```
├── index.html        landing page (renders posts.js client-side)
├── posts.js          post manifest — the single source of truth
├── new-post.sh       add-a-post helper
├── posts/
│   └── <slug>/       one folder per post, index.html + assets
└── .nojekyll         tells GitHub Pages to serve files as-is
```

## GitHub Pages setup (once)

1. Create a repo and push this folder as its root.
2. Repo → **Settings → Pages** → Source: **Deploy from a branch** →
   Branch: `main` / `/ (root)` → Save.
3. Site appears at `https://<user>.github.io/<repo>/`
   (or `https://<user>.github.io/` if the repo is named `<user>.github.io`).

All links are relative, so both URL styles work unchanged.
