import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { type Project } from './types'

export * from './types'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export function getAllPublishedProjects(): Project[] {
  // Read all directories in content/projects
  const folderNames = fs.readdirSync(projectsDirectory).filter((name) => {
    return fs.statSync(path.join(projectsDirectory, name)).isDirectory()
  })

  const projects = folderNames.map((folder) => {
    const fullPath = path.join(projectsDirectory, folder, 'project.mdx')

    // If a folder doesn't have project.mdx, skip it safely
    if (!fs.existsSync(fullPath)) return null

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      id: folder,
      slug: data.slug || folder,
      title: data.title,
      description: data.description,
      year: data.year?.toString(),
      category: data.category,
      projectType: data.projectType,
      homepage: data.homepage === true || data.homepage === 'true',
      status: data.status || 'draft',
      role: data.role,
      duration: data.duration,
      team: data.team,
      client: data.client,
      technologies: data.technologies || [],
      tech: (data.technologies || []).join(' + '), // For backward compatibility with the old tech string
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      cover: data.coverImage || `/api/media/${folder}/hero.webp`, // Fallback auto-detection if hero.webp exists
      presentationType: data.presentationType || 'browser',
      align: data.align || 'left',
      order: parseInt(data.order) || 99,
      summary: data.summary,
      number: data.number || '00',
      cta: data.cta || 'View Case Study',
      // Pass along the raw metadata to construct full URLs if needed
      seo: {
        title: `${data.title} | Ravenhall`,
        description: data.description,
      },
    } as Project
  })

  // Filter valid published projects and sort by order
  return projects
    .filter((p): p is Project => p !== null && p.status === 'published')
    .sort((a, b) => a.order - b.order)
}

export function getHomepageProjects(limit: number = 3): Project[] {
  return getAllPublishedProjects()
    .filter((p) => p.homepage)
    .slice(0, limit)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllPublishedProjects().find((p) => p.slug === slug)
}
