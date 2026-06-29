'use client'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/animation/gsap'

import React, { useRef } from 'react'
import Image from 'next/image'
import { runProjectIllumination } from '../../animations'
import { Stack, Title, Body, Caption } from '@/components/ui'
import { type Project } from '@/content/projects'
import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const PortfolioProject = ({ project, index }: { project: Project; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const backlightRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLDivElement>(null)
  const contentWrapperRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        // Set to fully illuminated state statically
        gsap.set([backlightRef.current, imageRef.current], { opacity: 1 })
        gsap.set(borderRef.current, { borderColor: 'var(--color-accent-dim)' })
        gsap.set(numberRef.current, { opacity: 0.04 })
        if (contentWrapperRef.current)
          gsap.set(contentWrapperRef.current.children, { opacity: 1, y: 0 })
        return
      }

      if (
        containerRef.current &&
        backlightRef.current &&
        borderRef.current &&
        imageRef.current &&
        numberRef.current &&
        contentWrapperRef.current
      ) {
        runProjectIllumination(
          containerRef.current,
          backlightRef.current,
          borderRef.current,
          imageRef.current,
          numberRef.current,
          contentWrapperRef.current
        )
      }
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  )

  const isLeft = project.align === 'left'

  return (
    <article
      ref={containerRef}
      className="group/project relative mx-auto flex w-full max-w-[1100px] flex-col"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* External Annotations (Desktop) */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? '-right-48' : '-left-48'} hidden flex-col xl:flex items-${isLeft ? 'start' : 'end'} opacity-0 transition-opacity duration-700 group-hover/project:opacity-100`}
      >
        <Caption className="text-muted font-mono whitespace-nowrap">
          {project.id.toUpperCase()} / {project.year} / {project.tech}
        </Caption>
      </div>

      {/* Lightbox Panel */}
      <div className="relative z-10 h-[clamp(500px,75vh,800px)] w-full lg:h-[600px]">
        {/* Radial Backlight Glow */}
        <div
          ref={backlightRef}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] mix-blend-screen"
          style={{
            width: '120%',
            height: '120%',
            background:
              'radial-gradient(ellipse at center, rgba(232, 167, 61, 0.12) 0%, rgba(232, 167, 61, 0) 70%)',
            zIndex: -1,
          }}
        />

        {/* Panel Border & Background */}
        <div
          ref={borderRef}
          className="bg-surface relative flex h-full w-full flex-col items-center gap-8 overflow-hidden rounded-2xl border border-transparent p-6 transition-all duration-300 lg:flex-row lg:gap-12 lg:p-12"
        >
          {/* Ghost Number */}
          <div
            ref={numberRef}
            className="text-text-primary pointer-events-none absolute -top-12 -left-4 z-0 font-mono leading-none font-bold select-none"
            style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', letterSpacing: '-0.05em' }}
            aria-hidden="true"
          >
            {project.number}
          </div>

          {/* Project Image */}
          <div
            className={`border-border group-hover/project:border-accent-dim relative z-10 h-1/2 w-full overflow-hidden rounded-xl border transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover/project:-translate-y-2 group-hover/project:shadow-2xl lg:h-full lg:w-3/5 ${isLeft ? 'order-1' : 'order-1 lg:order-2'}`}
          >
            <div ref={imageRef} className="absolute inset-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority={index < 2}
              />
            </div>
          </div>

          {/* Project Metadata */}
          <div
            className={`relative z-10 flex w-full flex-col justify-center lg:w-2/5 ${isLeft ? 'order-2' : 'order-2 lg:order-1'}`}
          >
            <div ref={contentWrapperRef} className="flex flex-col gap-6">
              <Stack gap="sm">
                <Caption className="text-muted font-medium tracking-[0.2em] uppercase">
                  {project.category}
                </Caption>
                <Title
                  as="h3"
                  id={`project-title-${project.id}`}
                  className="text-text-primary font-serif text-3xl italic lg:text-4xl"
                >
                  {project.title}
                </Title>
              </Stack>

              <Body className="text-text-secondary leading-relaxed">{project.description}</Body>

              <div className="flex flex-col gap-6 pt-4">
                <Caption className="text-muted/60 font-mono xl:hidden">
                  {project.id.toUpperCase()} / {project.year} / {project.tech}
                </Caption>

                <button className="group text-text-primary focus-visible:ring-accent flex w-fit items-center gap-2 rounded-sm text-sm font-medium outline-none focus-visible:ring-2">
                  <span className="relative">
                    View Project
                    <span className="bg-accent absolute -bottom-1 left-0 h-[1px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-accent transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
