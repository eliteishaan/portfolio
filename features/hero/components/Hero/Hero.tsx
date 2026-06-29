import React from 'react'
import { HeroCanvasView } from '@/components/three/HeroCanvasView'
import { GsapReveal } from '@/components/animation/GsapReveal'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'

export const Hero = () => {
  return (
    <section
      id="hero"
      className="bg-background relative z-10 flex h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Critical CSS Override for SplitType to prevent vertical stacking */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .split-text-target .word, .split-text-target .char { display: inline-block; }
      `,
        }}
      />

      {/* 3D Tunneling Portal */}
      <div className="absolute inset-0 z-0">
        <HeroCanvasView />
      </div>

      <div className="pointer-events-none relative z-10 w-full px-6 md:px-12">
        <GsapReveal delay={0.5}>
          <h1
            aria-hidden="true"
            className={cn(
              TYPOGRAPHY.display,
              'split-text-target whitespace-nowrap mix-blend-difference'
            )}
          >
            DIGITAL
            <br />
            <span className="text-accent italic">STUDIO</span>
          </h1>
        </GsapReveal>
        <h1 className="sr-only">Digital Studio</h1>
      </div>
    </section>
  )
}
