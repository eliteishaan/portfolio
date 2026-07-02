/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const ffmpeg = require('ffmpeg-static')

const targetProject = process.argv[2] || 'archon-ai'
const mediaRoot = path.join(__dirname, 'public/api/media', targetProject)
const importDir = path.join(mediaRoot, 'import')

if (!fs.existsSync(importDir)) {
  console.log(`Import directory not found: ${importDir}`)
  process.exit(1)
}

const files = fs.readdirSync(importDir)
const videoFile = files.find(
  (f) => f.toLowerCase().endsWith('.mp4') || f.toLowerCase().endsWith('.mov')
)

if (!videoFile) {
  console.log('No demo video found in import folder.')
  process.exit(1)
}

const videoPath = path.join(importDir, videoFile)

// Extract exactly 10 frames evenly spaced
console.log(`Extracting keyframes from ${videoFile}...`)

// Use ffmpeg-static to extract 12 frames
try {
  // We extract 1 frame per second for the first 12 seconds.
  const command = `"${ffmpeg}" -i "${videoPath}" -vf "fps=1" -vframes 12 "${path.join(importDir, 'frame_%02d.png')}" -y`
  execSync(command, { stdio: 'inherit' })
  console.log('Successfully extracted frames into import folder.')
} catch (e) {
  console.error('Failed to extract frames.', e.message)
}
