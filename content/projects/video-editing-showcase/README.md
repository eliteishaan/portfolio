# Asset Structure: Video Editing Showcase

This folder contains the showcase MDX and the `works/` directory for individual creative works.
All media assets must be placed in the corresponding public media directory:
`public/api/media/video-editing-showcase/`

## Creating a New Work

Inside `content/projects/video-editing-showcase/works/[work-slug]/`, create a `metadata.json` file.
Then, create the media folder: `public/api/media/video-editing-showcase/works/[work-slug]/`.

## Work Assets

Place the following files inside the media folder:

- `thumbnail.webp` (Required) - Static cover image (4:5, 1080x1350)
- `preview.mp4` (Required) - Silent looping hover preview (4:5, 1080x1350, max 3MB)
- `full.mp4` (Required) - High quality presentation video (16:9 or 9:16, max 25MB)

## Subdirectories

### `gallery/`

Place any additional context images or BTS photos here.
