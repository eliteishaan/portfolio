import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants/site'
import { getAllPublishedProjects } from '@/content/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllPublishedProjects()

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_CONFIG.url}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projectEntries,
  ]
}
