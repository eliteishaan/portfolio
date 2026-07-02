/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')

const contentRoot = path.join(__dirname, 'content/projects')
const mediaRoot = path.join(__dirname, 'public/api/media')

const caseStudies = [
  'portfolio-website',
  'sentria-samadhan',
  'archon-ai',
  'a8bior',
  'skillforge-system',
  'video-editing-showcase',
  'graphic-design-showcase',
]

function checkFileExistsAndNonEmpty(filePath) {
  try {
    const stats = fs.statSync(filePath)
    return stats.size > 0
  } catch {
    return false
  }
}

function checkGalleryHasImages(dirPath) {
  try {
    const files = fs.readdirSync(dirPath)
    return files.some((f) => f !== '.gitkeep' && checkFileExistsAndNonEmpty(path.join(dirPath, f)))
  } catch {
    return false
  }
}

function parseFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const match = content.match(/^---\n([\s\S]*?)\n---/)
    if (!match) return {}

    const frontmatter = match[1]
    const data = {}

    frontmatter.split('\n').forEach((line) => {
      const colonIdx = line.indexOf(':')
      if (colonIdx === -1) return
      const key = line.slice(0, colonIdx).trim()
      let value = line.slice(colonIdx + 1).trim()

      // Strip quotes
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1)

      data[key] = value
    })

    return data
  } catch {
    return {}
  }
}

function isMissingMetadata(val) {
  if (!val) return true
  if (val.includes('[WAITING FOR USER INPUT]')) return true
  if (val.trim() === '') return true
  return false
}

let reportLines = [
  '# Content Status Report',
  '\nGenerated automatically. Run `node generate-content-status.js` to update.\n',
]

caseStudies.forEach((slug) => {
  const mdxPath = path.join(contentRoot, slug, 'project.mdx')
  const mediaDir = path.join(mediaRoot, slug)
  const galleryDir = path.join(mediaDir, 'gallery')

  const frontmatter = parseFrontmatter(mdxPath)

  const checks = {
    Hero: checkFileExistsAndNonEmpty(path.join(mediaDir, 'hero.webp')),
    'Preview Video': checkFileExistsAndNonEmpty(path.join(mediaDir, 'preview.mp4')),
    Certificate: checkFileExistsAndNonEmpty(path.join(mediaDir, 'certificate.webp')),
    Gallery: checkGalleryHasImages(galleryDir),
    'Live URL': !isMissingMetadata(frontmatter.liveUrl),
    GitHub: !isMissingMetadata(frontmatter.githubUrl),
    Title: !isMissingMetadata(frontmatter.title),
    Summary: !isMissingMetadata(frontmatter.summary),
  }

  const totalChecks = Object.keys(checks).length
  const passedChecks = Object.values(checks).filter(Boolean).length
  const percentage = Math.round((passedChecks / totalChecks) * 100)

  const blocks = Math.round(percentage / 10)
  const bar = '█'.repeat(blocks) + '░'.repeat(10 - blocks)

  const isReady = passedChecks === totalChecks

  const displayName =
    frontmatter.title && !isMissingMetadata(frontmatter.title)
      ? frontmatter.title
      : slug
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')

  reportLines.push(`## ${displayName}`)
  reportLines.push(`${bar} ${percentage}%`)
  reportLines.push('')

  Object.entries(checks).forEach(([name, passed]) => {
    reportLines.push(`${passed ? '✓' : '✗'} ${name}`)
  })

  reportLines.push('')
  reportLines.push(`**Status:** ${isReady ? 'Ready for Publish' : 'Not Ready'}`)
  reportLines.push('\n---\n')
})

fs.writeFileSync(path.join(__dirname, 'CONTENT_STATUS.md'), reportLines.join('\n'))
console.log('CONTENT_STATUS.md generated successfully.')
