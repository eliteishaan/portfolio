'use client'

import React, { useRef } from 'react'
import { PROCESS_CONTENT } from '@/content/process'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'

export const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray('.process-item') as HTMLElement[]

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        )
      })

      // Animate the central connecting line on desktop
      gsap.to('.process-line-progress', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="process"
      className="bg-background relative z-20 w-full py-[clamp(6rem,15vw,12rem)]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12" ref={containerRef}>
        <div className="border-border/30 mb-24 flex flex-col gap-4 border-b pb-12">
          <span className={TYPOGRAPHY.metadata}>{PROCESS_CONTENT.subtitle}</span>
          <h2 className={cn(TYPOGRAPHY.display, 'text-[clamp(3rem,8vw,10rem)]')}>
            {PROCESS_CONTENT.title}
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Animated SVG Connector Line (Desktop Only) */}
          <div className="bg-border/20 absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 lg:block">
            <div className="process-line-progress bg-accent h-0 w-full" />
          </div>

          {PROCESS_CONTENT.items.map((item) => (
            <div
              key={item.id}
              className="process-item flex translate-y-[50px] flex-col gap-6 opacity-0"
            >
              <div className="border-border/30 flex items-center gap-4 border-b pb-4">
                <span className="text-accent font-mono text-sm tracking-widest opacity-70">
                  {item.number} {'//'}
                </span>
                <h3 className="text-text-primary font-serif text-3xl tracking-tight md:text-4xl">
                  {item.title}
                </h3>
              </div>
              <p className={cn(TYPOGRAPHY.manifesto, 'max-w-md')}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
