# Video Showcase Infrastructure Setup

The Video Editing Showcase utilizes an automated media pipeline to ingest, transcode, and schema-bind new works. This preserves the UI architecture without requiring manual folder management for every new project.

## Pipeline Architecture

- `/public/api/media/video-editing-showcase/import/`: The drop-zone for raw assets.
- `/public/api/media/video-editing-showcase/thumbnails/`: Auto-generated WebP posters (4:5).
- `/public/api/media/video-editing-showcase/preview/`: Silent looping MP4s.
- `/public/api/media/video-editing-showcase/optimized/`: High-fidelity MP4s.

## Content Schema (`metadata.json`)

When the pipeline runs, it automatically binds the assets to a new metadata schema located at `content/projects/video-editing-showcase/works/[slug]/metadata.json`:

```json
{
  "title": "Project Title",
  "category": "Video Edit",
  "client": "Client Name / Personal",
  "thumbnail": "../../thumbnails/[slug].webp",
  "previewVideo": "../../preview/[slug].mp4",
  "fullVideo": "../../optimized/[slug].mp4",
  "description": "Short description",
  "software": ["Premiere Pro", "After Effects"],
  "year": "2026",
  "featured": false,
  "order": 99
}
```

## Workflow

1. Drop your assets into `/public/api/media/video-editing-showcase/import/`.
2. Follow the required asset naming convention strictly:
   - `[slug]-thumb.jpg` (or .png, .webp)
   - `[slug]-preview.mp4`
   - `[slug]-full.mp4`
     _(Example: `nike-commercial-thumb.jpg`, `nike-commercial-preview.mp4`, `nike-commercial-full.mp4`)_
3. Run `node import-videos.js` from the project root.
4. The pipeline will optimize the thumbnail, distribute the videos, and generate the `metadata.json`.
5. Edit the generated `metadata.json` to fill in specific details (Title, Client, Software).
6. Commit and deploy!
