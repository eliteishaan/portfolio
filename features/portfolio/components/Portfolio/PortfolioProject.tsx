import React from 'react'
import { ProjectStage } from './ProjectStage'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import { Magnetic } from '@/components/animation/Magnetic'
import { type Project } from '@/content/projects'

interface PortfolioProjectProps {
  project: Project
  isFeatured?: boolean
}

export const PortfolioProject = ({ project, isFeatured = false }: PortfolioProjectProps) => {
  // --------------------------------------------------------
  // FEATURED PROJECT LAYOUT
  // --------------------------------------------------------
  if (isFeatured) {
    return (
      <div className="relative flex w-full flex-col gap-12 lg:gap-16">
        {/* The Art-Directed Stage */}
        <div className="w-full">
          <ProjectStage
            type={project.presentationType}
            imageSrc={project.cover}
            alt={project.title}
            priority={true}
          />
        </div>

        {/* Featured Content Area */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Title & Tech */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="text-accent font-mono text-[10px] tracking-[0.3em] uppercase">
              {project.category} — {project.year}
            </div>
            <div className="flex flex-col gap-6">
              <h3 className={TYPOGRAPHY.heading}>{project.title}</h3>
              {/* Tech Stack is secondary */}
              <div className="text-text-secondary/60 mt-4 font-mono text-xs tracking-widest uppercase">
                {project.tech}
              </div>
            </div>
          </div>

          {/* Right Column: Description & CTAs */}
          <div className="flex flex-col gap-8 pt-2 lg:col-span-6 lg:col-start-7">
            <p className="text-text-secondary max-w-xl text-lg leading-relaxed font-light md:text-xl">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-8">
              {/* Primary CTA */}
              <Magnetic>
                <a
                  href={`/work/${project.slug}`}
                  className="group text-text-primary hover:text-accent flex shrink-0 items-center gap-4 font-mono text-xs tracking-[0.2em] uppercase transition-colors"
                >
                  <span className="relative">
                    {project.cta}
                    <span className="bg-accent absolute -bottom-2 left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </span>
                </a>
              </Magnetic>

              {/* Secondary CTA */}
              {project.secondaryCta && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="text-text-secondary/60 hover:text-text-primary font-mono text-xs tracking-[0.2em] uppercase transition-colors"
                >
                  {project.secondaryCta}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --------------------------------------------------------
  // SUBSEQUENT PROJECT LAYOUT (Alternating Rhythm)
  // --------------------------------------------------------
  const isImageRight = project.align === 'right'

  return (
    <div className="relative flex w-full flex-col items-center gap-12 lg:grid lg:grid-cols-12 lg:gap-24">
      {/* Image Stage Container */}
      <div
        className={cn(
          'w-full lg:col-span-7',
          isImageRight ? 'lg:order-2 lg:col-start-6' : 'lg:order-1 lg:col-start-1'
        )}
      >
        <ProjectStage
          type={project.presentationType}
          imageSrc={project.cover}
          alt={project.title}
        />
      </div>

      {/* Content Container */}
      <div
        className={cn(
          'flex flex-col gap-6 lg:col-span-4',
          isImageRight ? 'lg:order-1 lg:col-start-2' : 'lg:order-2 lg:col-start-9'
        )}
      >
        <div className="flex flex-col gap-3">
          <div className="text-accent font-mono text-[10px] tracking-[0.3em] uppercase">
            {project.category} — {project.year}
          </div>
          <div className="flex flex-col">
            <h3 className={TYPOGRAPHY.subheading}>{project.title}</h3>
          </div>
        </div>

        <p className="text-text-secondary text-base leading-relaxed font-light">
          {project.description}
        </p>

        <div className="mt-4 flex flex-col gap-4">
          <Magnetic>
            <a
              href={`/work/${project.slug}`}
              className="group text-text-primary hover:text-accent flex w-fit items-center font-mono text-xs tracking-[0.2em] uppercase transition-colors"
            >
              <span className="relative">
                {project.cta}
                <span className="bg-accent absolute -bottom-2 left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>
            </a>
          </Magnetic>
        </div>
      </div>
    </div>
  )
}
