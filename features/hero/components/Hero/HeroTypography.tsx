'use client'

import React, { useRef } from 'react'
import { gsap } from '@/lib/animation/gsap'
import { useGSAP } from '@gsap/react'
import { Magnetic } from '@/components/animation/Magnetic'
import { Container } from '@/components/ui/Container'

interface HeroTypographyProps {
  entranceReady: boolean
  reduceMotion: boolean
}

export const HeroTypography = React.forwardRef<HTMLDivElement, HeroTypographyProps>(
  ({ entranceReady, reduceMotion }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGPathElement>(null)

    useGSAP(
      () => {
        if (!entranceReady) return

        if (reduceMotion) {
          gsap.to('.hero-text-item', { opacity: 1, duration: 0.2, ease: 'none' })
          if (svgRef.current) gsap.to(svgRef.current, { strokeDashoffset: 0, duration: 0.2 })
          return
        }

        gsap.fromTo(
          '.hero-text-item',
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
          }
        )

        if (svgRef.current) {
          gsap.to(svgRef.current, {
            strokeDashoffset: 0,
            duration: 0.8,
            delay: 0.4,
            ease: 'power1.inOut',
          })
        }
      },
      { scope: containerRef, dependencies: [entranceReady, reduceMotion] }
    )

    return (
      <Container maxWidth="7xl" className="pointer-events-none relative h-full">
        {/* Main Typography Wrapper */}
        <div
          ref={ref}
          className="pointer-events-auto relative z-20 flex w-full flex-col items-start px-4 pt-32 sm:px-0 md:absolute md:top-[50%] md:w-[480px] md:max-w-[calc(100%-80px)] md:-translate-y-[55%] md:pt-0"
        >
          <div ref={containerRef} className="flex w-full flex-col items-start">
            <span className="hero-text-item text-accent mb-2 font-sans text-xs font-bold tracking-widest uppercase opacity-0">
              Digital Product Studio
            </span>

            <h1 className="hero-text-item text-text-primary mb-6 font-serif text-[clamp(32px,8vw,44px)] leading-[1.05] tracking-tight opacity-0 md:text-[clamp(2.5rem,5vw,4.5rem)]">
              We engineer digital
              <br />
              <span className="text-text-primary/70 italic">flagship products.</span>
            </h1>

            <p className="hero-text-item text-text-secondary mb-8 max-w-sm text-lg opacity-0">
              Architecting systems that scale for industry leaders.
            </p>

            <div className="hero-text-item flex items-center gap-4 opacity-0">
              <Magnetic>
                <a
                  href="#contact"
                  className="bg-text-primary text-background flex items-center justify-center rounded-full px-8 py-4 text-sm leading-none font-semibold tracking-wide transition-transform hover:scale-105 active:scale-95"
                >
                  Start a Project
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#work"
                  className="text-text-primary hover:text-text-primary/70 flex items-center justify-center px-8 py-4 text-sm leading-none font-semibold tracking-wide transition-colors"
                >
                  View Our Work
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Scroll Affordance */}
        <div className="absolute top-[92vh] left-0 z-20 hidden sm:left-2 md:block lg:left-4">
          <svg
            width="2"
            height="60"
            viewBox="0 0 2 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={svgRef}
              d="M1 0V60"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="2"
              strokeDasharray="60"
              strokeDashoffset="60"
            />
          </svg>
        </div>
      </Container>
    )
  }
)
HeroTypography.displayName = 'HeroTypography'
