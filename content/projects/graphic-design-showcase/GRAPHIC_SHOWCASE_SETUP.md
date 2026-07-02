# Graphic Showcase Infrastructure Setup

The Graphic Design Showcase utilizes the generalized automated media pipeline (`import-showcases.js`) to ingest, transcode, and schema-bind new works. This guarantees consistent presentation while respecting the frozen UI architecture.

## Pipeline Architecture

- `/public/api/media/graphic-design-showcase/import/`: The drop-zone for raw image assets.
- `/public/api/media/graphic-design-showcase/thumbnails/`: Auto-generated 4:5 WebP posters (used on the grid).
- `/public/api/media/graphic-design-showcase/optimized/`: High-fidelity WebP artworks (used in the modal).

## Content Schema (`metadata.json`)

When the pipeline runs, it automatically binds the assets to a new metadata schema located at `content/projects/graphic-design-showcase/works/[slug]/metadata.json`:

```json
{
  "title": "Project Title",
  "category": "Brand Identity",
  "client": "Client Name / Personal",
  "thumbnail": "../../thumbnails/[slug].webp",
  "fullArtwork": "../../optimized/[slug].webp",
  "description": "Short description",
  "software": ["Illustrator", "Photoshop"],
  "year": "2026",
  "featured": false,
  "order": 99
}
```

## Workflow

1. Drop your raw images into `/public/api/media/graphic-design-showcase/import/`.
2. Strictly follow the required naming convention:
   - `[slug]-thumb.png` (or .jpg, .webp) -> Becomes the 4:5 cropped grid image.
   - `[slug]-full.png` (or .jpg, .webp) -> Becomes the high-fidelity modal artwork.
     _(Example: `logo-folio-thumb.png`, `logo-folio-full.png`)_
3. Run `node import-showcases.js` from the project root.
4. The pipeline will optimize both assets to WebP and generate the `metadata.json`.
5. Edit the generated `metadata.json` to configure the Title, Client, and Description.
6. Commit and deploy!
