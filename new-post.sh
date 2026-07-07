#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────
#  new-post.sh — add a post to Jaewon's 이것저것
#
#  usage:  ./new-post.sh <html-file-or-folder> [slug] [--no-home-link]
#
#  · folder → must contain index.html; the whole folder is copied
#    (PDFs, images, anything alongside it comes along for free)
#  · single .html file → becomes posts/<slug>/index.html
#  · title is auto-read from the page's <title>; you just confirm
#  · a small "← 이것저것" home button is injected into the post
#    (skip with --no-home-link)
# ─────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"

usage() { echo "usage: ./new-post.sh <html-file-or-folder> [slug] [--no-home-link]" >&2; exit 1; }

SRC="" SLUG_ARG="" HOME_LINK=1
for arg in "$@"; do
  case "$arg" in
    --no-home-link) HOME_LINK=0 ;;
    -h|--help) usage ;;
    *) if [ -z "$SRC" ]; then SRC="$arg"; else SLUG_ARG="$arg"; fi ;;
  esac
done
[ -n "$SRC" ] || usage
[ -e "$SRC" ] || { echo "error: '$SRC' not found" >&2; exit 1; }

# ── locate the html entry point ─────────────────────────────────
if [ -d "$SRC" ]; then
  [ -f "$SRC/index.html" ] || { echo "error: folder has no index.html" >&2; exit 1; }
  ENTRY="$SRC/index.html"
  BASENAME="$(basename "$SRC")"
else
  case "$SRC" in *.html|*.htm) ;; *) echo "error: expected an .html file or a folder" >&2; exit 1;; esac
  ENTRY="$SRC"
  BASENAME="$(basename "${SRC%.*}")"
fi

slugify() {
  printf '%s' "$1" | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[ _]+/-/g; s/[^a-z0-9-]//g; s/-+/-/g; s/^-+//; s/-+$//'
}

DEFAULT_SLUG="$(slugify "${SLUG_ARG:-$BASENAME}")"
DEFAULT_TITLE="$(python3 - "$ENTRY" <<'PY'
import re, sys, html
s = open(sys.argv[1], encoding="utf-8", errors="ignore").read(300000)
m = re.search(r"<title[^>]*>(.*?)</title>", s, re.S | re.I)
print(html.unescape(m.group(1)).strip() if m else "")
PY
)"
TODAY="$(date +%Y-%m-%d)"

ask() {  # ask "prompt" "default" -> $REPLY_VAL
  local prompt="$1" def="$2" input
  if [ -n "$def" ]; then read -r -p "$prompt [$def]: " input || true
  else read -r -p "$prompt: " input || true; fi
  REPLY_VAL="${input:-$def}"
}

echo "── new post ──────────────────────────────────────"
if [ -n "$SLUG_ARG" ]; then SLUG="$DEFAULT_SLUG"; echo "slug: $SLUG"
else ask "slug (url path)" "$DEFAULT_SLUG"; SLUG="$(slugify "$REPLY_VAL")"; fi
[ -n "$SLUG" ] || { echo "error: empty slug" >&2; exit 1; }
[ ! -e "posts/$SLUG" ] || { echo "error: posts/$SLUG already exists (pick another slug or delete it first)" >&2; exit 1; }

ask "title" "$DEFAULT_TITLE";        TITLE="$REPLY_VAL"
ask "description (one line)" "";     DESC="$REPLY_VAL"
ask "tags (comma separated)" "";     TAGS="$REPLY_VAL"
ask "date" "$TODAY";                 DATE="$REPLY_VAL"
[ -n "$TITLE" ] || { echo "error: empty title" >&2; exit 1; }

# ── copy content ────────────────────────────────────────────────
mkdir -p "posts/$SLUG"
if [ -d "$SRC" ]; then cp -R "$SRC"/. "posts/$SLUG/"
else cp "$SRC" "posts/$SLUG/index.html"; fi

# ── inject "← 이것저것" home button (idempotent) ─────────────────
if [ "$HOME_LINK" = 1 ]; then
python3 - "posts/$SLUG/index.html" <<'PY'
import sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if 'id="jw-home"' not in s and "</body>" in s:
    snippet = (
        '<style>#jw-home{position:fixed;left:18px;bottom:18px;z-index:9999;'
        'font:600 13px/1 -apple-system,BlinkMacSystemFont,"Segoe UI","Apple SD Gothic Neo",sans-serif;'
        'padding:9px 15px;border-radius:999px;background:rgba(255,255,255,.92);'
        'border:1px solid #e3e1da;color:#17181c;text-decoration:none;'
        'box-shadow:0 2px 10px rgba(0,0,0,.07);backdrop-filter:blur(8px);'
        '-webkit-backdrop-filter:blur(8px);transition:background .15s,color .15s}'
        '#jw-home:hover{background:#17181c;color:#fff}'
        '@media print{#jw-home{display:none}}</style>\n'
        '<a id="jw-home" href="../../">&larr; 이것저것</a>\n'
    )
    i = s.rindex("</body>")
    open(p, "w", encoding="utf-8").write(s[:i] + snippet + s[i:])
    print("  home button injected")
else:
    print("  home button skipped (already present or no </body>)")
PY
fi

# ── update posts.js ─────────────────────────────────────────────
SLUG="$SLUG" TITLE="$TITLE" DESC="$DESC" TAGS="$TAGS" DATE="$DATE" python3 - <<'PY'
import json, os, re

path = "posts.js"
raw = open(path, encoding="utf-8").read() if os.path.exists(path) else ""
m = re.search(r"window\.POSTS\s*=\s*(\[.*\])\s*;?\s*$", raw, re.S)
posts = json.loads(m.group(1)) if m else []

entry = {
    "slug": os.environ["SLUG"],
    "title": os.environ["TITLE"],
    "date": os.environ["DATE"],
}
if os.environ.get("DESC"):
    entry["description"] = os.environ["DESC"]
tags = [t.strip() for t in os.environ.get("TAGS", "").split(",") if t.strip()]
if tags:
    entry["tags"] = tags

posts = [p for p in posts if p.get("slug") != entry["slug"]]
posts.insert(0, entry)

header = """\
// ── Jaewon's 이것저것 · post manifest ─────────────────────────────
// Managed by ./new-post.sh, but hand-editing is totally fine.
// Keep it valid JSON after the "=" (double quotes!). The homepage
// sorts by date (newest first), so order here doesn't matter.
// Fields: slug*, title*, date* (YYYY-MM-DD), description, tags[], lang
"""
body = json.dumps(posts, ensure_ascii=False, indent=2)
open(path, "w", encoding="utf-8").write(f"{header}window.POSTS = {body};\n")
print(f"  posts.js updated ({len(posts)} post{'s' if len(posts) != 1 else ''})")
PY

echo "──────────────────────────────────────────────────"
echo "✓ posts/$SLUG/ is live in the manifest"
echo
echo "  preview:  python3 -m http.server 8000   →  http://localhost:8000"
echo "  publish:  git add -A && git commit -m \"post: $SLUG\" && git push"
