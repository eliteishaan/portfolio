# Media & Asset Specifications

To maintain a premium, high-performance digital gallery, all assets must adhere strictly to these specifications.

## 1. Images

### Format Rules

- **Primary:** `.webp` or `.avif` (Highest compression-to-quality ratio).
- **Fallback:** `.jpg` or `.png` (Only if transparency requires uncompressed PNG, otherwise avoid).
- **Vectors:** `.svg` for logos and icons.

### Sizing Rules

- **Case Study Hero:** 2880 x 1620 (16:9). Max size: 800KB.
- **Showcase Thumbnail:** 1080 x 1350 (4:5). Max size: 400KB.
- **Gallery Detail Shots:** Min width 1920px. Max size: 500KB.

## 2. Videos

### Format Rules

- **Format:** `.mp4`
- **Codec:** H.264 (Strictly required for maximum cross-browser compatibility. Do not use H.265/HEVC or WebM as primary without fallbacks).
- **Web Optimization:** Ensure "Fast Start" (moov atom at the front of the file) is enabled during export so videos play before fully downloading.

### Sizing Rules

- **Hover Previews (`preview.mp4`):**
  - **Rules:** MUST be muted. MUST NOT contain an audio track (remove it entirely in export to save bytes).
  - **Resolution:** Match thumbnail aspect ratio (1080x1350).
  - **Duration:** 3-8 seconds (seamless loop).
  - **Max File Size:** 3MB.
- **Modal Presentations (`full.mp4`):**
  - **Rules:** Audio allowed. Lazy-loaded only upon modal opening.
  - **Resolution:** Up to 4K, but 1080p recommended for web streaming.
  - **Max File Size:** 25MB (Compress heavily using Handbrake or Media Encoder if larger).

## Recommended Compression Workflow

1. Export uncompressed masters from Premiere/Figma.
2. Run images through **Squoosh.app** or **ImageOptim** to convert to WebP.
3. Run videos through **Handbrake** (Web Optimized checked, H.264, Constant Framerate).
