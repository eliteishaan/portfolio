'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/animation/gsap'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
import { Magnetic } from '@/components/animation/Magnetic'

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
      // Cinematic Image Reveal and Parallax
      if (imageRef.current) {
        // Initial state for clip-path reveal
        gsap.set(imageRef.current, { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        })

        tl.to(imageRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.6,
          ease: 'power4.out',
        })

        // Parallax effect tied to scroll (separate from reveal)
        gsap.fromTo(
          imageRef.current.querySelector('img'),
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
              onLoad={() => ScrollTrigger.refresh()}
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
            'relative z-20 mb-8 text-[clamp(2.5rem,8vw,6rem)] leading-[0.9]'
          )}
        >
          {project.title}
        </h3>

        <p className={TYPOGRAPHY.manifesto}>{project.description}</p>

        <Magnetic>
          <a
            href={(project.href as string) || '#'}
            className="group text-text-primary hover:text-accent focus-visible:ring-accent mt-12 flex w-max items-center gap-4 rounded-sm font-mono text-xs tracking-widest uppercase transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <span className="relative">
              {(project.cta as string) || 'View Project'}
              <span className="bg-accent absolute -bottom-2 left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </span>
          </a>
        </Magnetic>
      </div>
    </div>
  )
}
