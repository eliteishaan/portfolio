# Asset Structure: Case Study

This folder (`content/projects/[project-slug]`) contains the project MDX data.
All media assets must be placed in the corresponding public media directory:
`public/api/media/[project-slug]/`

## Required & Optional Assets

Place the following files in the media folder exactly as named:

- `hero.webp` (Required) - Primary cover image (16:9, min 2880x1620, max 800KB)
- `preview.mp4` (Optional) - Silent looping preview video
- `architecture.webp` (Optional) - System architecture diagram
- `certificate.webp` (Optional) - Award or hackathon certificate
- `logo.svg` or `logo.png` (Optional) - Project brand logo
- `team.webp` (Optional) - Team photo

## Subdirectories

### `gallery/`

Place all additional images here.

- `01.webp`, `02.webp`, etc.
- Must be .webp or .avif
- Max size: 500KB per image

### `documents/`

Place all PDFs and research materials here.

- `pitch.pdf`
- `presentation.pdf`
- `research.pdf`
