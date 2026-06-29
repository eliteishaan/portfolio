import React from 'react'
import { PROJECTS_CONTENT } from '@/content/projects'
import { PortfolioProject } from './PortfolioProject'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'

export const Portfolio = () => {
  return (
    <section id="work" className="bg-background relative z-20 w-full py-32 md:py-48">
      {/* Section Header */}
      <div className="mx-auto mb-32 w-full max-w-[1600px] px-6 md:px-12">
        <h2 className={cn(TYPOGRAPHY.metadata, 'text-accent mb-4')}>02 // THE ARCHIVE</h2>
        <h3 className={cn(TYPOGRAPHY.display, 'text-[10vw]')}>
          Selected
          <br />
          <span className="text-text-secondary italic">Works</span>
        </h3>
      </div>

      {/* Museum Project Stack */}
      <div className="flex w-full flex-col gap-[20vh] md:gap-[30vh]">
        {PROJECTS_CONTENT.items.map((project, idx) => (
          <PortfolioProject key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  )
}
