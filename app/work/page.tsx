import React from 'react'
import { getAllPublishedProjects } from '@/content/projects'
import { Container } from '@/components/ui/Container'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'All Work | Ravenhall',
  description: 'Complete archive of digital product and creative work by Ravenhall Studio.',
}

export default function WorkPage() {
  const projects = getAllPublishedProjects()

  // Group by category for an organized archive view
  const groupedProjects = projects.reduce(
    (acc, project) => {
      const cat = project.category
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(project)
      return acc
    },
    {} as Record<string, typeof projects>
  )

  return (
    <main className="min-h-screen pt-48 pb-32">
      <Container maxWidth="7xl">
        <header className="mb-32">
          <h1 className={cn(TYPOGRAPHY.display, 'mb-8 text-6xl md:text-8xl')}>Archive.</h1>
          <p className="text-text-secondary max-w-xl text-lg leading-relaxed font-light">
            The complete collection of our digital experiments, commercial work, and ongoing
            explorations.
          </p>
        </header>

        <div className="flex flex-col gap-32">
          {Object.entries(groupedProjects).map(([category, items]) => (
            <section key={category}>
              <h2 className="text-accent mb-12 border-b border-white/10 pb-4 font-mono text-xs tracking-widest uppercase">
                {category}
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
                {items.map((project) => (
                  <Link
                    key={project.id}
                    href={`/work/${project.slug}`}
                    className="group flex flex-col gap-4"
                  >
                    <div className="bg-surface-elevated relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <span className="font-mono text-xs tracking-widest text-white uppercase">
                          View Case Study
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="group-hover:text-accent mb-2 font-serif text-2xl font-bold italic transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary font-mono text-sm tracking-widest uppercase">
                        {project.year}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </main>
  )
}
