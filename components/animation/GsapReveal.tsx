'use client'

import React, { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface GsapRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export const GsapReveal = ({ children, className = '', delay = 0 }: GsapRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) {
        gsap.set(containerRef.current, { autoAlpha: 1, y: 0 })
        return
      }

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
    },
    { scope: containerRef, dependencies: [prefersReducedMotion, delay] }
  )

  return (
    <div ref={containerRef} className={className} style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
      {children}
    </div>
  )
}
