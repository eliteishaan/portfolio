'use client'

import React, { useRef, useState, useEffect } from 'react'
import { ABOUT_CONTENT } from '@/content/about'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true)
  }, [])

  useGSAP(
    () => {
      if (!isClient || !textRef.current) return

      // Select all the word spans we rendered
      const words = textRef.current.querySelectorAll('.word-span')

      gsap.fromTo(
        words,
        { opacity: 0.25 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      )
    },
    { scope: containerRef, dependencies: [isClient] }
  )

  // Join all story paragraphs into one massive manifesto
  const fullText = ABOUT_CONTENT.story.join(' ')
  const words = fullText.split(' ')

  return (
    <section
      id="about"
      ref={containerRef}
      className="bg-background relative flex w-full items-center justify-center overflow-hidden py-[clamp(6rem,15vw,12rem)]"
    >
      {/* Volumetric Amber Lighting (Performance Optimized) */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-15">
        <div className="bg-[radial-gradient(circle_at_center,_theme(colors.accent.DEFAULT)_0%,_transparent_60%)] absolute inset-0 rounded-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 text-center md:px-12">
        <div className="mb-12">
          <span className="text-accent font-mono text-sm tracking-widest uppercase">
            {ABOUT_CONTENT.subtitle}
          </span>
        </div>

        <div ref={textRef} className={cn(TYPOGRAPHY.heading, 'leading-[1.1] tracking-tight')}>
          {isClient ? (
            words.map((word, i) => (
              <span
                key={i}
                className="word-span mr-[0.3em] inline-block text-white transition-opacity will-change-[opacity]"
              >
                {word}
              </span>
            ))
          ) : (
            // SSR Fallback
            <span className="opacity-100">{fullText}</span>
          )}
        </div>
      </div>
    </section>
  )
}
