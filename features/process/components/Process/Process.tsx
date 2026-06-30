'use client'

import React, { useRef } from 'react'
import { PROCESS_CONTENT } from '@/content/process'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'

export const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 1. Draw the vertical line based on scroll
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      })

      // 2. Sequential reveals when the line reaches the item
      const items = gsap.utils.toArray('.process-item') as HTMLElement[]
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'ravenhall',
            scrollTrigger: {
              trigger: item,
              start: 'top 60%', // Trigger slightly after the line passes
              end: 'top 40%',
              scrub: false,
              toggleActions: 'play none none reverse',
            },
          }
        )
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
        <div className="border-border/30 mb-12 flex flex-col gap-4 border-b pb-8">
          <span className={TYPOGRAPHY.metadata}>{PROCESS_CONTENT.subtitle}</span>
          <h2 className={cn(TYPOGRAPHY.display, 'text-[clamp(3rem,8vw,10rem)]')}>
            {PROCESS_CONTENT.title}
          </h2>
        </div>

        <div className="relative ml-4 flex flex-col gap-16 md:ml-12 lg:gap-24">
          {/* Animated SVG Connector Line (Left Anchor) */}
          <div className="bg-border/20 absolute top-0 bottom-0 left-0 w-[2px]">
            <div
              ref={lineRef}
              className="bg-accent absolute top-0 left-0 h-full w-full origin-top scale-y-0"
            />
          </div>

          {PROCESS_CONTENT.items.map((item) => (
            <div
              key={item.id}
              className="process-item relative flex flex-col gap-6 pl-12 opacity-0 md:pl-24"
            >
              {/* Node Dot */}
              <div className="bg-background border-accent absolute top-3 -left-[5px] h-[12px] w-[12px] rounded-full border-2" />

              <div className="flex items-center gap-4">
                <span className="text-accent font-mono text-sm tracking-widest opacity-70">
                  {item.number} {'//'}
                </span>
                <h3 className="text-text-primary font-serif text-3xl tracking-tight md:text-5xl">
                  {item.title}
                </h3>
              </div>
              <p className={cn(TYPOGRAPHY.manifesto, 'text-text-secondary max-w-xl')}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
