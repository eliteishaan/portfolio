# Portfolio Website: Project Discovery Audit

_This document was generated automatically by auditing the Ravenhall portfolio source code repository. It serves as the verified single source of truth for the flagship case study content._

## 1. Architecture & Rendering Strategy

- **Framework**: Next.js 16.2.9 App Router using React 19.2.4.
- **Rendering**: Static Site Generation (SSG). Project routes utilize `generateStaticParams` to pre-render dynamic slugs into static HTML at build time, ensuring maximum TTFB performance.
- **Tooling**: Built utilizing Turbopack for ultra-fast local development and Vercel's standard Next.js build pipeline for production.

## 2. Technology Stack

- **Core**: Next.js, React, TypeScript.
- **Styling**: Tailwind CSS v4, utilizing `clsx` and `tailwind-merge` for scalable utility-class composition.
- **State Management**: Zustand.
- **Content**: MDX (`@next/mdx`, `remark-frontmatter`, `gray-matter`).
- **3D Engine**: Three.js, React Three Fiber (`@react-three/fiber`), React Three Drei (`@react-three/drei`), and React Three Postprocessing.
- **Animations**: GSAP 3.15, Framer Motion 12, Split-Type (for typography animation), and Lenis (for scroll kinematics).
- **Accessibility / UI**: Headless components powered by Radix UI (`@radix-ui/react-slot`) and Base UI (`@base-ui/react`).

## 3. Performance Optimizations

- **Adaptive GPU Scaling**: Integrates `detect-gpu` to evaluate client hardware at runtime. The WebGL `dpr` (device pixel ratio) scales down to `0.75` for Tier 1 devices, and scales up to `1.5` for Tier 3.
- **Low-End Graceful Degradation**: 3D `<Canvas>` rendering is completely disabled for low-end mobile devices to preserve battery and frame rates.
- **Preloading**: Global `<Preloader>` masks the initial React hydration and Three.js texture compilation (`<Preload all />`).
- **Smooth Scrolling**: Implements a global `<SmoothScrollProvider>` wrapping Lenis to decouple scroll animations from main-thread jank.

## 4. MDX System & Content Management Workflow

- **Pipeline**: Fully Git-backed CMS. Project case studies are authored in MDX and stored under `content/projects/*`.
- **Component Mapping**: Exposes a strict layout library (`<ProjectOverview>`, `<Gallery>`, `<Process>`, `<TechStack>`) that allows content to dictate layout without writing raw HTML.
- **Status Auditing**: A custom Node script (`generate-content-status.js`) parses frontmatter and media directories across all projects to automatically generate a `CONTENT_STATUS.md` report.

## 5. Asset Import & Optimization Pipeline

- **Automated Ingestion**: Employs a custom `import-assets.js` script utilizing `sharp` and `ffmpeg-static`.
- **Optimization**: Automatically transcodes raw `.jpg`/`.png` imports into 85%-quality `.webp` format, assigning strict nomenclature (e.g., `hero.webp`, `gallery/01.webp`).
- **Preservation**: Protects vector integrity by passing `.svg` logos straight through without rasterization.

## 6. Showcase Architecture

- **Presentation Stage**: Employs a centralized `<ProjectStage>` component to abstract media framing.
- **Variants**: Supports `browser` (Mac-style window), `mobile` (sleek notch silhouette), `cinematic` (21:9 letterboxed with vignette), and `abstract` layouts.

## 7. SEO & Accessibility

- **Metadata**: Hardcoded global metadata in `layout.tsx` enforcing strict OpenGraph and Twitter card specs.
- **Structured Data**: Injects JSON-LD (`ProfessionalService` schema) on mount.
- **Indexation**: Automated generation of `robots.txt` and `sitemap.xml` within the Next.js pipeline.
- **ARIA**: Semantic headless architecture ensures keyboard navigation and screen reader compatibility.

---

## Missing Information (Requires Project Owner Input)

The following contextual details cannot be objectively extracted from the source code and must be supplied prior to authoring the case study:

1. **Live Domain URL**: Where is the portfolio ultimately hosted? (e.g., `ravenhall.dev`)
2. **Project Duration / Timeline**: How long did this iteration of the portfolio take to architect and build?
3. **Core Philosophy / Objective**: A short, subjective summary of the _why_ behind the design (the marketing hook).
