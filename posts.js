// ── Jaewon's 이것저것 · post manifest ─────────────────────────────
// Managed by ./new-post.sh, but hand-editing is totally fine.
// Keep it valid JSON after the "=" (double quotes!). The homepage
// sorts by date (newest first), so order here doesn't matter.
// Fields: slug*, title*, date* (YYYY-MM-DD), description, tags[], lang,
//         art ("wave" | "ridge" | "cells" | "ribbon" — cover motif; unset = by hash),
//         cover (optional image URL — overrides the generative art)
window.POSTS = [
  {
    "slug": "higgs-tts-v3-on-a-macbook",
    "title": "Running Higgs TTS v3 on a MacBook — a 4B Voice Cloner in 13 GB of Unified Memory",
    "date": "2026-07-17",
    "lang": "en · ko",
    "art": "cells",
    "description": "Measured live on an M1 Max: 13 GB unified memory, first token in 0.7 s — and could SGLang-Omni run here too? M1 맥북에서 Higgs TTS v3를 돌린 기록 — 그리고 SGLang-Omni는 맥북에서 될까?",
    "tags": [
      "tts",
      "hands-on"
    ]
  },
  {
    "slug": "dissecting-higgs-tts-v3",
    "title": "Dissecting Higgs TTS v3 — Where the Model Learns Who Is Speaking, Layer by Layer",
    "date": "2026-07-04",
    "lang": "en · ko",
    "art": "wave",
    "description": "Read-only forward hooks and linear probes trace where speaker identity forms inside Higgs TTS v3 — layer by layer, no weights changed. 스피커 정체성이 어느 레이어에서 만들어지는지 추적한 노트.",
    "tags": [
      "interpretability",
      "tts",
      "deep-dive"
    ]
  }
];
