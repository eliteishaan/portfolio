'use client'

import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Magnetic } from '@/components/animation/Magnetic'

import { type Project } from '@/content/projects'

export const PortfolioProject = ({ project, index }: { project: Project; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)

  useGSAP(
    () => {
      // Because the parent is pinned and moving horizontally,
      // we must use containerAnimation if we want inner triggers.
      // But for performance on horizontal tracks, we can just reveal once when in view.
      if (imageRef.current) {
        gsap.set(imageRef.current, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' })

        // Since we are inside a horizontally scrolling container pinned by the parent,
        // native vertical ScrollTrigger inside here is tricky.
        // We will just animate it in once after a slight delay, or use IntersectionObserver.
        // For simplicity and to avoid horizontal scroll trigger complexities in Next.js,
        // we will animate the clipPath directly in the GSAP context on load since they are in a track.

        gsap.to(imageRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.6,
          ease: 'ravenhall',
          delay: 0.5 + index * 0.2, // Stagger initial reveal
        })
      }
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-[85vw] shrink-0 flex-col justify-center gap-8 md:w-[60vw]"
    >
      {/* Massive Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
        <div ref={imageRef} className="absolute inset-0 h-full w-full">
          {!imgError ? (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 85vw, 60vw"
              priority={index < 2}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="bg-surface-elevated flex h-full w-full items-center justify-center">
              <span className="text-muted font-mono text-xs tracking-widest uppercase">
                Media Unavailable
              </span>
            </div>
          )}
        </div>
        {/* Inner Shadow for premium depth */}
        <div className="pointer-events-none absolute inset-0 bg-black/10 ring-1 ring-white/10 ring-inset" />
      </div>

      {/* Project Metadata below image */}
      <div className="flex w-full flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="text-accent mb-4 font-mono text-[10px] tracking-[0.3em] uppercase">
            {project.category || 'Case Study'} — {project.year}
          </div>
          <h3 className={cn(TYPOGRAPHY.display, 'text-4xl md:text-5xl')}>{project.title}</h3>
        </div>

        <Magnetic>
          <a
            href={`/work/${project.slug}`}
            className="group text-text-primary hover:text-accent focus-visible:ring-accent flex shrink-0 items-center gap-4 rounded-sm font-mono text-xs tracking-widest uppercase transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <span className="relative">
              {project.cta}
              <span className="bg-accent absolute -bottom-2 left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </span>
          </a>
        </Magnetic>
      </div>
    </div>
  )
}
