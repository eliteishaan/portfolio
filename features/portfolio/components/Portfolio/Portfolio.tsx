'use client'

import React, { useRef } from 'react'
import { PROJECTS_CONTENT } from '@/content/projects'
import { PortfolioProject } from './PortfolioProject'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/animation/gsap'

export const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!trackRef.current) return

      // Get total width of track to translate
      const getScrollAmount = () => {
        const trackWidth = trackRef.current?.scrollWidth || 0
        return -(trackWidth - window.innerWidth)
      }

      const tween = gsap.to(trackRef.current, {
        x: getScrollAmount,
        ease: 'none',
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true, // Crucial for dynamic resize recalculation
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="work"
      ref={sectionRef}
      className="bg-background relative z-10 flex h-[100svh] w-full flex-col justify-center overflow-hidden"
    >
      {/* Sticky Header / Filter */}
      <div className="pointer-events-none absolute top-12 left-0 z-30 flex w-full items-start justify-between px-6 md:px-12">
        <div>
          <h2 className={cn(TYPOGRAPHY.metadata, 'text-accent mb-2')}>02 // THE ARCHIVE</h2>
          <h3 className={cn(TYPOGRAPHY.display, 'text-4xl md:text-6xl')}>
            Selected <span className="text-text-secondary italic">Works</span>
          </h3>
        </div>

        <div className="pointer-events-auto hidden gap-6 md:flex">
          {['All', 'Web', 'Video', 'Marketing'].map((category) => (
            <button
              key={category}
              className="text-text-secondary hover:text-accent font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="mt-24 flex h-[70vh] w-[max-content] items-center gap-12 px-6 md:gap-32 md:px-32"
      >
        {PROJECTS_CONTENT.items.map((project, idx) => (
          <PortfolioProject key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  )
}
