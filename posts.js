// ── Jaewon's 이것저것 · post manifest ─────────────────────────────
// Managed by ./new-post.sh, but hand-editing is totally fine.
// Keep it valid JSON after the "=" (double quotes!). The homepage
// sorts by date (newest first), so order here doesn't matter.
// Fields: slug*, title*, date* (YYYY-MM-DD), description, tags[], lang
window.POSTS = [
  {
    "slug": "ai-uncertainty",
    "title": "Teaching AI to Doubt — Zoubin Ghahramani's Bayesian Bet",
    "date": "2026-09-01",
    "description": "Zoubin Ghahramani argues AI's missing piece is a mathematical sense of its own uncertainty — and Bayes' rule may be the key. 2026년 8월 26일 공개된 Google DeepMind 팟캐스트 에피소드에서 Hannah Fry가 Zoubin Ghahramani를 인터뷰한다.",
    "tags": [
      "deep-dive",
      "bayesian"
    ],
    "lang": "en · ko",
    "art": "fan"
  },
  {
    "slug": "alphago-self-play",
    "title": "Search Is the Teacher — Lessons From a $10K AlphaGo Rebuild",
    "date": "2026-08-31",
    "description": "Eric Jang rebuilds AlphaGo for a few $K and uses it to explain why MCTS sidesteps the credit-assignment problem that plagues LLM RL. 1X Technologies AI 부사장 출신이자 구글 딥마인드 로보틱스 연구원이었던 Eric Jang이 안식년 동안 최신 도구로 알파고를 처음부터 다시 만든 경험을 Dwarkesh Patel과 함께 칠판 강의 형식으로 풀어낸다.",
    "tags": [
      "deep-dive",
      "rl"
    ],
    "lang": "en · ko",
    "art": "tree"
  },
  {
    "slug": "ai-1000x-cheaper",
    "title": "The token factory — what a 1000x cost cut actually rests on",
    "date": "2026-08-30",
    "description": "Ex-NVIDIA engineer Neil Movva on why background agents, throughput-first GPUs, scavenged chips and cheap intermittent power make tokens 1000x cheaper. Sail Research 공동창업자이자 전 NVIDIA 커널 엔지니어인 Neil Movva가 Patrick O'Shaughnessy와의 대담에서 AI 추론 비용이 왜 급격히 낮아질 것이라고 보는지 설명한다.",
    "tags": [
      "deep-dive",
      "ai-infra"
    ],
    "lang": "en · ko",
    "art": "factory"
  },
  {
    "slug": "company-brain",
    "title": "Company Brain",
    "date": "2026-07-19",
    "description": "Glean, M365 Copilot, Rovo, Slack AI, Uber, LinkedIn, DoorDash — how a user message becomes a prompt, how new information lands (overlap · new · similar), and the vertical-domain playbook. 질문이 프롬프트가 되기까지, 새 정보의 세 갈래 갱신, 수직 도메인 플레이북까지 해부.",
    "tags": [
      "rag",
      "knowledge-base",
      "deep-dive"
    ],
    "lang": "ko · en",
    "art": "synapse"
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
