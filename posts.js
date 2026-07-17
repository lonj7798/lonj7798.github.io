// ── Jaewon's 이것저것 · post manifest ─────────────────────────────
// Managed by ./new-post.sh, but hand-editing is totally fine.
// Keep it valid JSON after the "=" (double quotes!). The homepage
// sorts by date (newest first), so order here doesn't matter.
// Fields: slug*, title*, date* (YYYY-MM-DD), description, tags[], lang
window.POSTS = [
  {
    "slug": "higgs-tts-v3-on-a-macbook",
    "title": "Running Higgs TTS v3 on a MacBook — a 4B Voice Cloner in 13 GB of Unified Memory",
    "date": "2026-07-17",
    "lang": "en · ko",
    "description": "The exact venv, load code, and freshly measured numbers for running a 4B voice cloner locally on an M1 Max — 13 GB unified memory, 0.72x realtime, zero CUDA. M1 맥북에서 Higgs TTS v3를 직접 돌린 기록.",
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
    "description": "Read-only forward hooks and linear probes trace where speaker identity forms inside Higgs TTS v3 — layer by layer, no weights changed. 스피커 정체성이 어느 레이어에서 만들어지는지 추적한 노트.",
    "tags": [
      "interpretability",
      "tts",
      "deep-dive"
    ]
  }
];
