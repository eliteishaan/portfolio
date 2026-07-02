export type ProjectStatus = 'published' | 'coming-soon' | 'private' | 'archived'
export type PresentationType = 'browser' | 'mobile' | 'cinematic' | 'abstract'

export interface ProjectSEO {
  title: string
  description: string
  ogImage?: string
}

export interface GalleryItem {
  type: 'image' | 'video'
  src: string
  title: string
  caption: string
  layout?: 'full' | 'half' | 'browser' | 'mobile' // Curated layout sizing
}

export interface Project {
  id: string
  slug: string
  status: ProjectStatus
  homepage: boolean // Determines if shown on the curated homepage
  order: number // Sorting order
  number: string // e.g. '01'
  year: string
  category: string
  title: string

  // High-level summary for cards
  description: string
  tech: string

  // Metadata for Case Study
  role?: string
  duration?: string
  team?: string
  client?: string | null
  projectType?: string
  platform?: string

  // Media
  cover: string // Replaces the old 'image', used for the homepage/listing card
  gallery?: GalleryItem[] // Curated Case study media
  presentationType: PresentationType
  align: 'left' | 'right' // Layout rhythm

  // Links
  cta: string
  secondaryCta?: string
  liveUrl?: string
  githubUrl?: string

  // Deep Case Study Content (For the /work/[slug] page)
  summary?: string // One concise summary for Hero
  problem?: string
  objective?: string
  approach?: string

  architecture?: string
  technicalDecisions?: string
  uiUx?: string

  challenges?: string
  outcome?: string

  seo?: ProjectSEO
}

export interface ShowcaseWork {
  id: string
  slug: string
  title: string
  client?: string
  category: string
  platform?: string
  software?: string[]
  year?: string
  description?: string

  // Media
  thumbnail: string
  previewVideo?: string
  fullVideo?: string
  gallery?: string[]

  // Links
  instagramUrl?: string
  youtubeUrl?: string
  behanceUrl?: string

  // Presentation
  featured: boolean
  order: number

  // Future proofing
  awards?: string[]
  views?: string
  likes?: string
  featuredOn?: string[]
  tags?: string[]
  credits?: Record<string, string>
  colorPalette?: string[]
}
