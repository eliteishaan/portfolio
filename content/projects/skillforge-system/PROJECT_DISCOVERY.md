# SkillForge System: Technical Discovery

**Status**: Blocked - No Codebase Found

## Discovery Audit

A comprehensive search of the local workspace yielded no source code for the "SkillForge System" project.

Because a code audit cannot be performed, no objectively verifiable technical facts can be extracted at this time.

## Media Audit

The media directory for this project was missing. I have scaffolded the asset ingestion folders:

- `public/api/media/skillforge-system/import/`
- `public/api/media/skillforge-system/gallery/`

**Missing Real Assets Required Before Authoring**:

- Minimum 1 strong hero image (to become `hero.webp`)
- Minimum 3-5 UI screenshots for the gallery
- (Optional) `preview.mp4` video
- (Optional) Supplementary assets like architecture diagrams or certificates.

## Next Steps

Please refer to `PROJECT_INTERVIEW.md` to provide the remaining technical context, and drop the raw visual assets into the `import` folder.

---

## Live Website Audit (SkillForge System)

_Observable facts extracted directly from `https://skillforge-w34v.onrender.com/`_

### Core Identity & Purpose

- **Project Purpose**: "The System Career Operating System for Students." A unified platform built to bridge the gap between educational credentials, real skill competency, and successful placements.
- **Client/Origin**: Built by Team CODEX (LNCT Group of Colleges) for the CPL 2026 Smart Education Track.

### Information Architecture & User Flows

- **5-Step Onboarding Pipeline**:
  1. Upload Docs (PDF/JPG/PNG)
  2. OCR Processing
  3. Vector Alignment (Skill Gap Analyzer)
  4. Generate Roadmap
  5. Sync Companion (Chrome extension)
- **Live Playground**: Allows unauthenticated users to test OCR extraction, roadmap generation, and form auto-fill modules directly.
- **Pricing Tiers**: Student Free ($0), Pro Student ($9/mo), Pro University ($199/mo).

### UX Patterns

- **Dashboard UI**: Gamified progression with "Employability Score", "Placement Probability", and "Resume DNA" heatmaps.
- **Gamification**: Employs streak multipliers, XP achievements, and QR-code hashes for credential verification.

### Visible Features & Tech Stack Hints

- **AI/ML Integration**: Uses GPT-4 for Adaptive Career Roadmaps, EasyOCR for document extraction, and BERT models for structuring fields.
- **Multi-Language OCR**: Supports Hindi, Tamil, Telugu, and Bengali.
- **System Mock Interviewer**: Accesses the webcam to evaluate answer substance, speech pace, and posture stability.
- **Authentication**: Supports Google OAuth ("Login with Google").
- **Frontend Tech**: Rendered via Next.js (identified via HTTP response headers).
