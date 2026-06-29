'use client'

import React, { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import SplitType from 'split-type'

interface GsapRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  split?: boolean
}

export const GsapReveal = ({
  children,
  className = '',
  delay = 0,
  split = false,
}: GsapRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) {
        gsap.set(containerRef.current, { autoAlpha: 1, y: 0 })
        return
      }

      let splitText: SplitType | null = null

      if (split) {
        gsap.set(containerRef.current, { opacity: 1 })
        splitText = new SplitType(containerRef.current, { types: 'words,chars' })

        gsap.set(splitText.words, { overflow: 'hidden', verticalAlign: 'top' })
        gsap.set(splitText.chars, { yPercent: 100 })

        gsap.to(splitText.chars, {
          yPercent: 0,
          duration: 1.2,
          delay: delay,
          ease: 'spring',
          stagger: 0.02,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        })
      } else {
        gsap.fromTo(
          containerRef.current,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            delay: delay,
            ease: 'spring',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      return () => {
        if (splitText) {
          splitText.revert()
        }
      }
    },
    { scope: containerRef, dependencies: [prefersReducedMotion, delay, split] }
  )

  return (
    <div ref={containerRef} className={className} style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
      {children}
    </div>
  )
}
