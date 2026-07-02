/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const collections = ['video-editing-showcase', 'graphic-design-showcase']

async function processPipeline(collection) {
  const mediaRoot = path.join(__dirname, 'public/api/media', collection)
  const importDir = path.join(mediaRoot, 'import')
  const thumbsDir = path.join(mediaRoot, 'thumbnails')
  const optimizedDir = path.join(mediaRoot, 'optimized')
  const previewDir = path.join(mediaRoot, 'preview') // only used for video
  const contentWorksDir = path.join(__dirname, 'content/projects', collection, 'works')

  const dirs = [importDir, thumbsDir, optimizedDir, contentWorksDir]
  if (collection === 'video-editing-showcase') dirs.push(previewDir)

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  })

  const files = fs.readdirSync(importDir)
  const grouped = {}

  files.forEach((file) => {
    if (file.startsWith('.')) return
    const match = file.match(/^(.+)-(thumb|preview|full)\.(.+)$/)
    if (match) {
      const [_, slug, type, ext] = match
      if (!grouped[slug]) grouped[slug] = {}
      grouped[slug][type] = file
    }
  })

  const slugs = Object.keys(grouped)
  if (slugs.length === 0) {
    console.log(
      `[${collection}] No valid assets found in import/. Expected naming: [slug]-thumb.jpg, [slug]-full.jpg`
    )
    return
  }

  for (const slug of slugs) {
    const assets = grouped[slug]
    console.log(`[${collection}] Processing ${slug}...`)

    if (assets.thumb) {
      await sharp(path.join(importDir, assets.thumb))
        .resize(1080, 1350, { fit: 'cover' })
        .webp({ quality: 85 })
        .toFile(path.join(thumbsDir, `${slug}.webp`))
      console.log(` - Created thumbnail: thumbnails/${slug}.webp`)
    }

    if (collection === 'video-editing-showcase') {
      if (assets.preview) {
        fs.copyFileSync(path.join(importDir, assets.preview), path.join(previewDir, `${slug}.mp4`))
        console.log(` - Copied preview: preview/${slug}.mp4`)
      }
      if (assets.full) {
        fs.copyFileSync(path.join(importDir, assets.full), path.join(optimizedDir, `${slug}.mp4`))
        console.log(` - Copied full video: optimized/${slug}.mp4`)
      }
    } else if (collection === 'graphic-design-showcase') {
      if (assets.full) {
        await sharp(path.join(importDir, assets.full))
          .webp({ quality: 90 })
          .toFile(path.join(optimizedDir, `${slug}.webp`))
        console.log(` - Created optimized full artwork: optimized/${slug}.webp`)
      }
    }

    // Generate schema metadata
    const workDir = path.join(contentWorksDir, slug)
    if (!fs.existsSync(workDir)) fs.mkdirSync(workDir, { recursive: true })

    const metadataPath = path.join(workDir, 'metadata.json')
    if (!fs.existsSync(metadataPath)) {
      const title = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')

      const template = {
        title: title,
        category: collection === 'video-editing-showcase' ? 'Video Edit' : 'Brand Identity',
        client: 'Personal',
        thumbnail: `../../thumbnails/${slug}.webp`,
        description: 'A showcase of technical creative work.',
        software:
          collection === 'video-editing-showcase' ? ['Premiere Pro'] : ['Illustrator', 'Photoshop'],
        year: new Date().getFullYear().toString(),
        featured: false,
        order: 99,
      }

      if (collection === 'video-editing-showcase') {
        template.previewVideo = `../../preview/${slug}.mp4`
        template.fullVideo = `../../optimized/${slug}.mp4`
      } else {
        // High-res graphics artwork mapping
        template.fullArtwork = `../../optimized/${slug}.webp`
      }

      fs.writeFileSync(metadataPath, JSON.stringify(template, null, 2))
      console.log(` - Created schema at content/projects/${collection}/works/${slug}/metadata.json`)
    }
  }
}

async function run() {
  for (const collection of collections) {
    await processPipeline(collection)
  }
  console.log("\nGlobal Showcase Pipeline complete! Run 'npm run build' to apply changes.")
}

run().catch(console.error)
