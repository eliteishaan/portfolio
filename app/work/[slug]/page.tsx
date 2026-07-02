import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllPublishedProjects } from '@/content/projects'
import { Container } from '@/components/ui/Container'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ProjectStage } from '@/features/portfolio/components/Portfolio/ProjectStage'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getAllPublishedProjects().map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Not Found' }

  return {
    title: project.seo?.title || `${project.title} | Ravenhall`,
    description: project.seo?.description || project.summary || project.description,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project || project.status !== 'published') {
    notFound()
  }

  const allProjects = getAllPublishedProjects()
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug)
  const nextProject =
    currentIndex === allProjects.length - 1 ? allProjects[0] : allProjects[currentIndex + 1]

  let MDXContent
  try {
    MDXContent = (await import(`@/content/projects/${slug}/project.mdx`)).default
  } catch {
    console.error('Failed to load MDX for:', slug)
    notFound()
  }

  return (
    <main className="selection:bg-accent/30 min-h-screen pt-32 pb-0">
      {/* 1. HERO SECTION */}
      <Container maxWidth="7xl" className="mb-8 md:mb-12">
        <div className="flex flex-col gap-12 pt-12 md:pt-24 lg:gap-24">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
            {/* Title & Summary */}
            <div className="flex flex-col gap-8 lg:col-span-8">
              <div className="text-accent font-mono text-[10px] tracking-[0.3em] uppercase">
                {project.category}
              </div>
              <h1 className={TYPOGRAPHY.display}>{project.title}</h1>
              {project.summary && (
                <p className="text-text-secondary max-w-4xl pt-4 text-xl leading-relaxed font-light md:text-3xl">
                  {project.summary}
                </p>
              )}
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 pt-4 lg:col-span-3 lg:col-start-10 lg:grid-cols-1">
              {project.role && (
                <div className="flex flex-col gap-2">
                  <span className="text-accent/60 border-b border-white/5 pb-2 font-mono text-[10px] tracking-widest uppercase">
                    Role
                  </span>
                  <span className="text-text-primary text-sm">{project.role}</span>
                </div>
              )}
              {project.team && (
                <div className="flex flex-col gap-2">
                  <span className="text-accent/60 border-b border-white/5 pb-2 font-mono text-[10px] tracking-widest uppercase">
                    Team
                  </span>
                  <span className="text-text-primary text-sm">{project.team}</span>
                </div>
              )}
              {project.duration && (
                <div className="flex flex-col gap-2">
                  <span className="text-accent/60 border-b border-white/5 pb-2 font-mono text-[10px] tracking-widest uppercase">
                    Timeline
                  </span>
                  <span className="text-text-primary text-sm">{project.duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Premium Presentation Stage */}
          <div className="w-full">
            <ProjectStage
              type={project.presentationType}
              imageSrc={project.cover}
              alt={project.title}
              priority
            />
          </div>

          {/* CTAs */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap items-center justify-center gap-8 lg:justify-start">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-text-primary hover:text-accent flex items-center gap-4 font-mono text-xs tracking-[0.2em] uppercase transition-colors"
                >
                  <span className="relative">
                    Launch Experience
                    <span className="bg-accent absolute -bottom-2 left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary/60 hover:text-text-primary font-mono text-xs tracking-[0.2em] uppercase transition-colors"
                >
                  View Repository
                </a>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* MDX CONTENT BODY */}
      <MDXContent />

      {/* 8. NEXT PROJECT LOOP */}
      {nextProject && (
        <Link
          href={`/work/${nextProject.slug}`}
          className="group relative block flex h-[50vh] w-full items-center justify-center overflow-hidden border-t border-white/10 bg-black md:h-[70vh]"
        >
          {/* Background Image (darkened) */}
          <div className="absolute inset-0 z-0">
            <Image
              src={nextProject.cover}
              alt={nextProject.title}
              fill
              className="object-cover opacity-30 transition-opacity duration-1000 ease-out group-hover:scale-105 group-hover:opacity-50"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
            <span className="text-accent font-mono text-[10px] tracking-[0.3em] uppercase">
              Next Project
            </span>
            <h2
              className={cn(
                TYPOGRAPHY.display,
                'group-hover:text-accent text-white transition-colors duration-500'
              )}
            >
              {nextProject.title}
            </h2>
            <span className="mt-4 translate-y-4 font-serif text-xl text-white italic opacity-0 transition-opacity duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              Explore →
            </span>
          </div>
        </Link>
      )}
    </main>
  )
}
