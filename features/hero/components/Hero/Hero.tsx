'use client'

import React, { useRef } from 'react'
import dynamic from 'next/dynamic'

const HeroCanvasView = dynamic(
  () => import('@/components/three/HeroCanvasView').then((mod) => mod.HeroCanvasView),
  { ssr: false }
)
import { GsapReveal } from '@/components/animation/GsapReveal'
import { BrowserMockup } from '@/components/ui/Mockup/BrowserMockup'
import { PhoneMockup } from '@/components/ui/Mockup/PhoneMockup'
import { PROJECTS_CONTENT } from '@/content/projects'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'
import { HERO_CONTENT } from '@/content/hero'

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  // Use the content layer for reusable slots
  const flagshipProject = PROJECTS_CONTENT.items[0]
  const supportingProject = PROJECTS_CONTENT.items[1]

  useGSAP(
    () => {
      // Scrub animations tied to scroll
      gsap.to(sceneRef.current, {
        yPercent: -15, // Move upward with a parallax delay
        z: -500, // Recede into the background
        rotationX: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return

      // Subtle 3D rotation with heavy 1.5s inertia
      const xTo = gsap.quickTo(sceneRef.current, 'rotationY', { duration: 1.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(sceneRef.current, 'rotationX', { duration: 1.5, ease: 'power3.out' })

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = (e.clientY / window.innerHeight) * 2 - 1

        xTo(x * 5)
        yTo(-y * 5)
      }

      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      id="hero"
      ref={containerRef}
      className="bg-background relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* 1. CSS Blueprint Grid Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          backgroundPosition: 'center center',
        }}
      />

      {/* 2. WebGL Lighting Layer */}
      <div className="pointer-events-none absolute inset-0 z-0 mix-blend-screen">
        <HeroCanvasView />
      </div>

      {/* 3. Products Layer (Behind Text) */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center [perspective:2000px]">
        <div
          className="relative flex w-full max-w-[1600px] items-center justify-center [transform-style:preserve-3d]"
          ref={sceneRef}
        >
          {/* Flagship Centerpiece (Browser) - Scaled up to 70% vw */}
          <div className="absolute flex w-[70vw] max-w-[1200px] [transform:translateZ(0px)] items-center justify-center">
            <BrowserMockup
              src={flagshipProject.image as string}
              alt={flagshipProject.title as string}
              className="w-full opacity-60 md:opacity-80" // Slightly faded to preserve text contrast
            />
          </div>

          {/* Supporting Phone Mockup */}
          <div className="absolute -right-4 bottom-[-10vh] w-[140px] [transform:translateZ(100px)] md:right-[10vw] md:-bottom-24 md:w-[200px]">
            <PhoneMockup
              src={supportingProject.image as string}
              alt={supportingProject.title as string}
            />
          </div>
        </div>
      </div>

      {/* 4. Editorial Typography Layer (Front) */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center mix-blend-difference">
        <GsapReveal>
          <div className="mb-8 flex flex-col items-center gap-2">
            <span className="font-sans text-sm font-semibold tracking-wide text-white uppercase">
              {HERO_CONTENT.name}
            </span>
            <div className="font-mono text-xs tracking-[0.3em] text-white/70 uppercase">
              {HERO_CONTENT.role}
            </div>
          </div>
        </GsapReveal>

        <GsapReveal delay={0.1}>
          <h1 className="font-serif text-[clamp(3rem,12vw,8rem)] leading-[0.95] tracking-[-0.04em] text-white">
            We build systems
            <br />
            <span className="text-white/70 italic">that scale.</span>
          </h1>
        </GsapReveal>

        <GsapReveal delay={0.2}>
          <p className={cn(TYPOGRAPHY.manifesto, 'mx-auto mt-8 max-w-xl text-white/80')}>
            {HERO_CONTENT.subline}
          </p>
        </GsapReveal>
      </div>
    </section>
  )
}
