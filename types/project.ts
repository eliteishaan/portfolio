export interface Project {
  slug: string
  title: string
  subtitle?: string
  description: string
  category: string
  technologies: string[]
  coverImage: string
  gallery?: string[]
  year: number
  client?: string
  duration?: string
  links?: {
    live?: string
    github?: string
    [key: string]: string | undefined
  }
  featured?: boolean
  metrics?: {
    label: string
    value: string
  }[]
  process?: string
  challenges?: string
  solution?: string
  results?: string
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}
