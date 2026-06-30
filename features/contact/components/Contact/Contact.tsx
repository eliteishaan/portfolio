'use client'

import React, { useRef } from 'react'
import { CursorSpotlight } from '@/components/animation/CursorSpotlight'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { CONTACT_CONTENT } from '@/content/contact'
import { Magnetic } from '@/components/animation/Magnetic'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'

export const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Pin the contact section to allow footer to reveal over it, or just to create a nice stopping point
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=50%',
          pin: true,
          scrub: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      id="contact"
      ref={containerRef}
      className="bg-background relative z-10 flex h-[100svh] w-full flex-col justify-center overflow-hidden py-24"
    >
      <CursorSpotlight />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-center justify-center px-6 text-center md:px-12">
        {/* Massive Let's Talk */}
        <h2
          className="text-accent font-serif tracking-tighter italic"
          style={{ fontSize: 'clamp(5rem, 15vw, 15rem)', lineHeight: 0.9 }}
        >
          Let&apos;s Talk
        </h2>

        {/* Huge Clickable Email */}
        <div className="mt-8 md:mt-16">
          <Magnetic>
            <a
              href={`mailto:${CONTACT_CONTENT.email}`}
              className="text-text-primary hover:text-accent group flex items-center justify-center gap-4 font-sans transition-colors duration-500"
              style={{
                fontSize: 'clamp(2rem, 5vw, 5rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
              }}
            >
              {CONTACT_CONTENT.email}
              <ArrowRight className="h-8 w-8 -translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:h-16 md:w-16" />
            </a>
          </Magnetic>
        </div>

        <div className="mt-16 flex items-center gap-6">
          <p className={cn(TYPOGRAPHY.metadata, 'opacity-50')}>HQ // 40.7128° N, 74.0060° W</p>
          <Magnetic>
            <a
              href={CONTACT_CONTENT.socials.find((s) => s.label === 'WhatsApp')?.href || '#'}
              target="_blank"
              rel="noreferrer"
              className="border-accent/30 bg-accent/5 hover:bg-accent/10 flex items-center gap-3 rounded-full border px-6 py-3 transition-colors"
            >
              <span className="text-accent font-mono text-xs tracking-widest uppercase">
                WhatsApp
              </span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
