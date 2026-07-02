import fs from 'fs'
import path from 'path'
import { ShowcaseWork } from './types'

export function getShowcaseWorks(collection: string): ShowcaseWork[] {
  const worksDir = path.join(process.cwd(), 'content/projects', collection, 'works')

  if (!fs.existsSync(worksDir)) {
    return []
  }

  const workFolders = fs
    .readdirSync(worksDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  const works = workFolders
    .map((folderName) => {
      const metadataPath = path.join(worksDir, folderName, 'metadata.json')
      if (!fs.existsSync(metadataPath)) return null

      try {
        const fileContents = fs.readFileSync(metadataPath, 'utf8')
        const metadata = JSON.parse(fileContents)

        // Merge slug and ID, using the folder name as the source of truth for slug
        return {
          ...metadata,
          id: folderName,
          slug: folderName,
        } as ShowcaseWork
      } catch (e) {
        console.error(`Error parsing metadata.json for ${folderName}:`, e)
        return null
      }
    })
    .filter((work): work is ShowcaseWork => work !== null)

  // Sort: featured first, then by order, then by year
  return works.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1

    if (a.order !== b.order) {
      return (a.order || 999) - (b.order || 999)
    }

    const yearA = parseInt(a.year || '0')
    const yearB = parseInt(b.year || '0')
    return yearB - yearA // Descending year
  })
}
