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
      if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return

      // Subtle 3D rotation
      const xTo = gsap.quickTo(sceneRef.current, 'rotationY', { duration: 0.8, ease: 'power3.out' })
      const yTo = gsap.quickTo(sceneRef.current, 'rotationX', { duration: 0.8, ease: 'power3.out' })

      // Floating animation for idle state
      const floatTween = gsap.to(sceneRef.current, {
        y: '-=15',
        rotationZ: 1,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        paused: true,
      })

      let idleTimer: NodeJS.Timeout
      const startIdleFloat = () => {
        floatTween.play()
      }

      const resetIdleFloat = () => {
        floatTween.pause()
        gsap.to(sceneRef.current, { y: 0, rotationZ: 0, duration: 1, ease: 'power3.out' })
      }

      startIdleFloat() // Start idle float initially

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = (e.clientY / window.innerHeight) * 2 - 1

        xTo(x * 5)
        yTo(-y * 5)

        // Reset idle float logic
        clearTimeout(idleTimer)
        resetIdleFloat()
        idleTimer = setTimeout(startIdleFloat, 2000)
      }

      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        clearTimeout(idleTimer)
        floatTween.kill()
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
      <div className="pointer-events-none absolute inset-0 z-10 mix-blend-screen">
        <HeroCanvasView />
      </div>

      {/* 3. Glass & Products Layer */}
      <div className="relative z-20 flex w-full max-w-[1600px] flex-col items-center gap-16 px-6 [perspective:2000px] md:px-12 lg:flex-row">
        {/* Left: Editorial Typography */}
        <div className="pointer-events-none z-30 mt-24 flex flex-1 flex-col gap-8 lg:mt-0">
          <GsapReveal>
            <div className="flex flex-col gap-2">
              <span className="text-text-primary font-sans text-sm font-semibold tracking-wide uppercase">
                {HERO_CONTENT.name}
              </span>
              <div className="text-accent font-mono text-xs tracking-[0.3em] uppercase">
                {HERO_CONTENT.role}
              </div>
            </div>
          </GsapReveal>

          <GsapReveal delay={0.1}>
            <h1 className="text-text-primary font-serif text-[clamp(2.5rem,12vw,6rem)] leading-[0.95] tracking-[-0.04em]">
              We build systems
              <br />
              <span className="text-text-secondary italic">that scale.</span>
            </h1>
          </GsapReveal>

          <GsapReveal delay={0.2}>
            <p className={cn(TYPOGRAPHY.manifesto, 'max-w-md')}>{HERO_CONTENT.subline}</p>
          </GsapReveal>
        </div>

        {/* Right: 3D Product Scene */}
        <div
          className="relative aspect-square w-full flex-1 [transform-style:preserve-3d] md:aspect-video lg:aspect-square"
          ref={sceneRef}
        >
          {/* Flagship Centerpiece (Browser) */}
          <div className="absolute inset-0 flex [transform:translateZ(50px)] items-center justify-center">
            <BrowserMockup
              src={flagshipProject.image as string}
              alt={flagshipProject.title as string}
              className="w-full max-w-[800px] lg:-ml-12 lg:scale-125"
            />
          </div>

          {/* Supporting Phone Mockup */}
          <div className="absolute right-4 bottom-10 w-[140px] [transform:translateZ(120px)] md:right-10 md:-bottom-10 md:w-[200px]">
            <PhoneMockup
              src={supportingProject.image as string}
              alt={supportingProject.title as string}
            />
          </div>

          {/* Glass Floating Element */}
          <div className="bg-surface/40 absolute top-10 right-10 flex [transform:translateZ(150px)] items-center gap-4 rounded-xl border border-white/10 p-4 shadow-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-xl md:top-20 md:right-20">
            <div className="bg-accent/20 text-accent flex h-10 w-10 items-center justify-center rounded-full">
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <div className="text-muted font-mono text-[10px] tracking-widest uppercase">
                Performance
              </div>
              <div className="text-text-primary font-sans text-sm font-medium">
                {HERO_CONTENT.performanceText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
