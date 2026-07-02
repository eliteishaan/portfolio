/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const targetProject = process.argv[2] || 'sentria-samadhan'
const mediaRoot = path.join(__dirname, 'public/api/media', targetProject)
const importDir = path.join(mediaRoot, 'import')
const galleryDir = path.join(mediaRoot, 'gallery')

if (!fs.existsSync(importDir)) {
  console.log(`Import directory not found: ${importDir}`)
  process.exit(1)
}

const files = fs.readdirSync(importDir).filter((f) => f !== 'README.md')

const imageExts = ['.jpg', '.jpeg', '.png', '.webp', '.avif']
const images = files.filter((f) => imageExts.includes(path.extname(f).toLowerCase()))

let heroCandidates = images.filter(
  (f) => f.toLowerCase().includes('hero') || f.toLowerCase().includes('cover')
)
let heroSource =
  heroCandidates.length > 0 ? heroCandidates[0] : images.length > 0 ? images[0] : null

const gallerySources = images.filter(
  (f) =>
    f !== heroSource &&
    !f.toLowerCase().includes('certificate') &&
    !f.toLowerCase().includes('architecture') &&
    !f.toLowerCase().includes('logo') &&
    !f.toLowerCase().includes('team')
)

const specificAssets = images.filter(
  (f) =>
    f.toLowerCase().includes('certificate') ||
    f.toLowerCase().includes('architecture') ||
    f.toLowerCase().includes('logo') ||
    f.toLowerCase().includes('team')
)

const summary = []

async function processImages() {
  // Process Hero
  if (heroSource) {
    const outPath = path.join(mediaRoot, 'hero.webp')
    await sharp(path.join(importDir, heroSource)).webp({ quality: 85 }).toFile(outPath)
    summary.push(`Created hero.webp from ${heroSource}`)
  }

  // Process specific named assets
  for (const src of specificAssets) {
    const ext = path.extname(src).toLowerCase()
    const isLogo = src.toLowerCase().includes('logo')

    // Logos keep their original extension usually (svg/png)
    if (isLogo && ext === '.svg') {
      fs.copyFileSync(path.join(importDir, src), path.join(mediaRoot, 'logo.svg'))
      summary.push(`Copied logo.svg from ${src}`)
      continue
    }

    let baseName = 'certificate'
    if (src.toLowerCase().includes('architecture')) baseName = 'architecture'
    if (src.toLowerCase().includes('team')) baseName = 'team'
    if (isLogo) baseName = 'logo'

    const outPath = path.join(mediaRoot, `${baseName}.webp`)
    await sharp(path.join(importDir, src)).webp({ quality: 85 }).toFile(outPath)
    summary.push(`Created ${baseName}.webp from ${src}`)
  }

  // Process Gallery
  let i = 1
  for (const src of gallerySources) {
    const outName = String(i).padStart(2, '0') + '.webp'
    const outPath = path.join(galleryDir, outName)
    await sharp(path.join(importDir, src)).webp({ quality: 85 }).toFile(outPath)
    summary.push(`Created gallery/${outName} from ${src}`)
    i++
  }

  // Process Videos
  const videos = files.filter((f) => f.toLowerCase().endsWith('.mp4'))
  for (const src of videos) {
    if (src.toLowerCase().includes('preview')) {
      fs.copyFileSync(path.join(importDir, src), path.join(mediaRoot, 'preview.mp4'))
      summary.push(`Copied preview.mp4 from ${src}`)
    } else if (src.toLowerCase().includes('full')) {
      fs.copyFileSync(path.join(importDir, src), path.join(mediaRoot, 'full.mp4'))
      summary.push(`Copied full.mp4 from ${src}`)
    }
  }

  console.log('\nIMPORT SUMMARY:')
  console.log('===============')
  summary.forEach((msg) => console.log(msg))
  console.log('\nOriginal files left untouched in import directory.')
}

processImages().catch(console.error)
