'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

export const PortfolioProject = ({
  project,
  index,
}: {
  project: {
    category?: string
    year?: string
    title?: string
    description?: string
    link?: string
    image?: string
    [key: string]: unknown
  }
  index: number
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)

  useGSAP(
    () => {
      // Cinematic Parallax Image Effect
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.2, yPercent: -10 },
          {
            scale: 1,
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }
    },
    { scope: containerRef }
  )

  // Alternate layout direction based on odd/even index
  const isEven = index % 2 === 0

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex w-full max-w-[1600px] flex-col items-center gap-12 px-6 md:flex-row md:gap-24 md:px-12"
    >
      {/* Massive Overlapping Image */}
      <div
        className={cn(
          'relative aspect-[4/3] w-full overflow-hidden rounded-sm md:w-2/3',
          isEven ? 'md:order-1' : 'md:order-2'
        )}
      >
        <div ref={imageRef} className="absolute inset-0 h-full w-full">
          {!imgError ? (
            <Image
              src={project.image as string}
              alt={project.title as string}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority={index < 2}
              onError={() => setImgError(true)}
              onLoadingComplete={() => ScrollTrigger.refresh()}
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

      {/* Project Metadata & overlapping Title */}
      <div
        className={cn(
          'relative z-10 flex w-full flex-col justify-center md:w-1/3',
          isEven ? 'md:order-2' : 'md:order-1'
        )}
      >
        <div className="text-accent mb-6 font-mono text-[10px] tracking-[0.3em] uppercase">
          {project.category || 'Case Study'} — {project.year}
        </div>

        {/* Title overlaps the image visually on desktop */}
        <h3
          className={cn(
            TYPOGRAPHY.display,
            'mb-8 text-[clamp(2.5rem,8vw,6rem)] leading-[0.9]',
            isEven ? 'md:-ml-[10vw]' : 'z-20 mix-blend-difference md:-mr-[10vw]'
          )}
        >
          {project.title}
        </h3>

        <p className={TYPOGRAPHY.manifesto}>{project.description}</p>

        <a
          href={(project.link as string) || '#'}
          className="group text-text-primary hover:text-accent mt-12 flex items-center gap-4 font-mono text-xs tracking-widest uppercase transition-colors"
        >
          <span className="relative">
            View Project
            <span className="bg-accent absolute -bottom-2 left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </span>
        </a>
      </div>
    </div>
  )
}
