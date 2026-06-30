import React from 'react'
import { GsapReveal } from '@/components/animation/GsapReveal'
import { GsapPin } from '@/components/animation/GsapPin'
import { ABOUT_CONTENT } from '@/content/about'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'

export const About = () => {
  return (
    <section
      id="about"
      className="bg-background relative w-full overflow-hidden py-[clamp(6rem,15vw,12rem)]"
    >
      {/* Volumetric Amber Lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-20 mix-blend-screen">
        <div className="bg-[radial-gradient(circle_at_center,_theme(colors.accent.DEFAULT)_0%,_transparent_70%)] absolute inset-0 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-24 lg:flex-row lg:items-end lg:gap-12">
          {/* Asymmetric Left: Massive Bleeding Typography */}
          <GsapPin className="relative w-full lg:w-3/5">
            <GsapReveal split>
              <h2
                aria-hidden="true"
                className={cn(
                  TYPOGRAPHY.display,
                  'whitespace-normal md:-ml-[2vw] md:whitespace-nowrap'
                )}
              >
                {ABOUT_CONTENT.title}
              </h2>
            </GsapReveal>
            <h2 className="sr-only">{ABOUT_CONTENT.title}</h2>
            <GsapReveal delay={0.1}>
              <div className={cn(TYPOGRAPHY.metadata, 'mt-4 md:ml-[2vw]')}>
                {ABOUT_CONTENT.subtitle} — EST. 2026
              </div>
            </GsapReveal>
          </GsapPin>

          {/* Asymmetric Right: Dense Manifesto Block */}
          <div className="w-full lg:w-1/3 lg:pb-[2vw]">
            <div className="border-border/30 flex flex-col gap-8 border-l pl-8">
              {ABOUT_CONTENT.story.map((paragraph, i) => (
                <GsapReveal key={i} delay={0.1 * i}>
                  <p className={TYPOGRAPHY.manifesto}>{paragraph}</p>
                </GsapReveal>
              ))}

              {/* Stats Matrix */}
              <div className="mt-8 grid grid-cols-2 gap-8">
                {ABOUT_CONTENT.stats.map((stat, i) => (
                  <GsapReveal key={`stat-${i}`} delay={0.2 + 0.1 * i}>
                    <div className="flex flex-col gap-1">
                      <span className="text-text-primary font-serif text-3xl italic">
                        {stat.value}
                      </span>
                      <span className={TYPOGRAPHY.metadata}>{stat.label}</span>
                    </div>
                  </GsapReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
