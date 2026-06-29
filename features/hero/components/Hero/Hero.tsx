'use client'

import React, { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'
import { runHeroEntrance, runHeroScrollChoreography } from '@/lib/animation/timelines'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { BlueprintLines } from '../BlueprintLines'
import { CursorLight } from '../CursorLight'
import { Display, BodyLarge } from '@/components/ui/Typography'
import { HERO_CONTENT } from '@/content/hero'
import { Link } from '@/components/ui/Link'
import { getGPUTier } from 'detect-gpu'

const HeroNoiseScene = dynamic(() => import('@/components/three/HeroNoiseScene'), {
  ssr: false,
})

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<SVGSVGElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const lightContainerRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = useReducedMotion()
  const [gpuTier, setGpuTier] = useState<number | null>(null)

  useEffect(() => {
    const checkGPU = async () => {
      try {
        const tier = await getGPUTier()
        setGpuTier(tier.tier)
      } catch (_e) {
        setGpuTier(1) // Fallback to low tier on error
      }
    }
    checkGPU()
  }, [])

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      const lines = gsap.utils.toArray<SVGGElement>('.hero-line', linesRef.current)

      if (nameRef.current && roleRef.current && ctaRef.current && indicatorRef.current) {
        runHeroEntrance(
          lines,
          nameRef.current,
          roleRef.current,
          ctaRef.current,
          indicatorRef.current
        )
      }

      if (containerRef.current && nameRef.current && ctaRef.current && lightContainerRef.current) {
        runHeroScrollChoreography(
          containerRef.current,
          nameRef.current,
          lines,
          ctaRef.current,
          lightContainerRef.current
        )
      }
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  )

  // WebGL is enabled for mid-to-high end GPUs only
  const showWebGL = gpuTier !== null && gpuTier > 1

  return (
    <section
      ref={containerRef}
      className="bg-background relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D or Fallback Layer */}
      {showWebGL && !prefersReducedMotion ? (
        <HeroNoiseScene />
      ) : (
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--color-surface)_0%,_var(--color-background)_100%)] opacity-30" />
      )}

      <div ref={lightContainerRef}>
        <CursorLight />
      </div>

      <BlueprintLines ref={linesRef} />

      {/* Name and Role */}
      <div className="relative z-20 flex w-full max-w-7xl flex-col px-6 md:px-12">
        <div className="relative flex flex-col items-center justify-center">
          <Display
            as="h1"
            ref={nameRef}
            className="text-text-primary text-[12vw] leading-none tracking-tighter italic md:text-[14vw]"
            style={{ opacity: prefersReducedMotion ? 1 : 0 }}
          >
            {HERO_CONTENT.name}
          </Display>

          <BodyLarge
            as="p"
            ref={roleRef}
            className="text-text-secondary mt-4 w-full text-center font-sans text-sm font-light tracking-[0.3em] uppercase md:pl-[2vw] md:text-left md:text-lg"
          >
            {HERO_CONTENT.role}
          </BodyLarge>
        </div>
      </div>

      {/* CTA Bottom Right */}
      <div
        ref={ctaRef}
        className="absolute right-6 bottom-12 z-20 md:right-12"
        style={{ opacity: prefersReducedMotion ? 1 : 0 }}
      >
        <Link
          href="#work"
          variant="unstyled"
          className="group text-text-primary relative inline-flex text-sm font-medium tracking-wide md:text-base"
        >
          {HERO_CONTENT.cta}
          <span className="bg-accent absolute -bottom-1 left-0 h-[1px] w-full transition-all duration-300 group-hover:h-[2px] group-hover:w-[108%]" />
        </Link>
      </div>

      {/* Scroll Indicator Bottom Center */}
      <div
        ref={indicatorRef}
        className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        aria-hidden="true"
      >
        <div className="bg-border relative h-12 w-[1px] overflow-hidden">
          <div className="bg-text-primary absolute top-0 left-0 h-1/2 w-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
