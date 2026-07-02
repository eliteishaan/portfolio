# Content Guide: Adding New Work

This guide outlines exactly how to add, draft, and publish new projects to the portfolio without touching React code.

## 1. Case Study Projects (Web Dev / Apps)

Case studies are standalone product stories containing deep engineering and design breakdowns.

### Adding a new case study:

1. Create a new folder: `content/projects/your-project-slug/`
2. Create `project.mdx` inside and fill out the frontmatter (Set `status: draft`).
3. Create the corresponding media folder: `public/api/media/your-project-slug/`
4. Drop your `hero.webp` and `gallery/` images into the media folder.
5. Write the case study content using MDX components (`<ProjectOverview>`, `<Gallery>`, `<TechStack>`).
6. Once finalized, update frontmatter to `status: published`.

## 2. Showcase Collections (Video Editing / Graphic Design)

Showcases are curated collections of unlimited creative works displayed in an interactive grid.

### Adding a new creative work:

1. Create the data folder: `content/projects/video-editing-showcase/works/your-work-slug/`
2. Create `metadata.json` inside based on the `ShowcaseWork` schema.
3. Create the media folder: `public/api/media/video-editing-showcase/works/your-work-slug/`
4. Drop in `thumbnail.webp`, `preview.mp4` (optional), and `full.mp4` (optional).
5. The Server Component will automatically detect and render the new work.

## Updating Assets

To update an asset, simply overwrite the file in the `public/api/media/...` directory.
The Next.js image optimization and cache invalidation handles the rest. Do not change the filename unless you also update it in the MDX/JSON.
