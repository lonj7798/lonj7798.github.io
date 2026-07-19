// ── Jaewon's 이것저것 · post manifest ─────────────────────────────
// Managed by ./new-post.sh, but hand-editing is totally fine.
// Keep it valid JSON after the "=" (double quotes!). The homepage
// sorts by date (newest first), so order here doesn't matter.
// Fields: slug*, title*, date* (YYYY-MM-DD), description, tags[], lang
window.POSTS = [
  {
    "slug": "company-brain-part-2",
    "title": "기업들은 실제로 어떻게 굴리나 — 지식베이스 검색·갱신 여정 해부",
    "date": "2026-07-19",
    "description": "Glean, M365 Copilot, Rovo, Slack AI, Uber, LinkedIn, DoorDash — how a user message becomes a prompt, how new information lands (overlap · new · similar), and the vertical-domain playbook. 질문이 프롬프트가 되기까지, 새 정보의 세 갈래 갱신, 수직 도메인 플레이북까지 해부.",
    "tags": [
      "rag",
      "knowledge-base",
      "deep-dive"
    ],
    "lang": "ko · en",
    "art": "ridge"
  },
  {
    "slug": "higgs-tts-v3-on-a-macbook",
    "title": "Running Higgs TTS v3 on a MacBook — a 4B Voice Cloner in 13 GB of Unified Memory",
    "date": "2026-07-17",
    "lang": "en · ko",
    "art": "cells",
    "description": "Measured live on an M1 Max: 13 GB unified memory, first token in 0.7 s, zero CUDA anywhere. M1 맥북에서 Higgs TTS v3를 직접 돌리고 측정한 기록 — 메모리, 속도, 그리고 목소리 데모까지.",
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
