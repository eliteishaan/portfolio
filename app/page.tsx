import { Hero } from '@/features/hero'
import { About } from '@/features/about'
import { Services } from '@/features/services'
import { Portfolio } from '@/features/portfolio'
import { Process } from '@/features/process'
import { Contact } from '@/features/contact'
import { getHomepageProjects } from '@/content/projects'
import { SITE_CONFIG } from '@/lib/constants/site'

export default async function Home() {
  const showcaseProjects = getHomepageProjects(SITE_CONFIG.homepageShowcaseLimit)
  const fallbackImage = showcaseProjects[0]?.cover || ''

  return (
    <div className="relative flex flex-col">
      <div className="bg-border/30 pointer-events-none fixed inset-y-0 left-1/2 z-0 w-px" />
      <Hero fallbackImage={fallbackImage} />
      <About />
      <Services />
      <Portfolio showcaseProjects={showcaseProjects} />
      <Process />
      <Contact />
    </div>
  )
}
