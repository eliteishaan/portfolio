'use client'

import React, { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface GsapPinProps {
  children: React.ReactNode
  className?: string
}

export const GsapPin = ({ children, className = '' }: GsapPinProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) return

      const parentSection = containerRef.current.closest('section')

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 20%',
        endTrigger: parentSection || undefined,
        end: 'bottom 80%',
        pin: true,
        pinSpacing: false,
      })
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
