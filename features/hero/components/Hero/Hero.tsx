import React from 'react'
import { HeroCanvasView } from '@/components/three/HeroCanvasView'
import { GsapReveal } from '@/components/animation/GsapReveal'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'

export const Hero = () => {
  return (
    <section
      id="hero"
      className="bg-background relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* CSS Fallback Gradient for Mobile/Low-End GPUs */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-screen">
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_70%)] blur-3xl" />
      </div>

      {/* 3D Tunneling Portal */}
      <div className="absolute inset-0 z-0">
        <HeroCanvasView />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12">
        {/* Massive Screen-Bleeding Typography */}
        <GsapReveal delay={0.5} split>
          <h1
            aria-hidden="true"
            className={cn(
              TYPOGRAPHY.display,
              'text-[16vw] leading-[0.8] whitespace-nowrap mix-blend-difference md:text-[14vw] [&_.char]:inline-block [&_.word]:inline-block'
            )}
          >
            DIGITAL
            <br />
            <span className="text-accent italic">STUDIO</span>
          </h1>
        </GsapReveal>
        {/* The Screen Reader Payload */}
        <h1 className="sr-only">Digital Studio</h1>
      </div>
    </section>
  )
}
