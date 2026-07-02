'use client'

import React from 'react'
import { type Project } from '@/content/projects'
import { PortfolioProject } from './PortfolioProject'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export const Portfolio = ({ showcaseProjects }: { showcaseProjects: Project[] }) => {
  return (
    <section id="work" className="bg-background relative z-10 w-full py-[clamp(6rem,15vw,12rem)]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col px-6 md:px-12">
        {/* Editorial Section Header */}
        <div className="mb-24 flex flex-col items-start lg:mb-40">
          <h2 className="text-accent mb-6 flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] uppercase">
            <span>03</span>
            <span className="bg-accent/50 h-[1px] w-8" />
            <span>Selected Work</span>
          </h2>

          <div className="flex w-full flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h3 className={cn(TYPOGRAPHY.heading, 'max-w-4xl')}>
              Projects built <br />
              <span className="text-text-secondary italic">with purpose.</span>
            </h3>

            <p className="text-text-secondary/80 mb-2 max-w-sm text-sm leading-relaxed font-light">
              A curated exhibition of digital experiences. We prioritize craftsmanship, precision,
              and timeless design over sheer volume.
            </p>
          </div>
        </div>

        {/* Projects Exhibition List */}
        <div className="flex flex-col gap-32 md:gap-48 lg:gap-64">
          {showcaseProjects.map((project, idx) => (
            <PortfolioProject key={project.id} project={project} isFeatured={idx === 0} />
          ))}
        </div>

        {/* Explore All Work CTA */}
        <div className="mt-48 flex w-full justify-center md:mt-64">
          <Link
            href="/work"
            className="group text-text-primary hover:text-accent flex items-center gap-6 font-serif text-3xl italic transition-colors duration-500 md:text-5xl"
          >
            Explore All Work
            <span className="font-mono text-sm tracking-widest uppercase not-italic transition-transform duration-500 group-hover:translate-x-2 md:text-lg">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
