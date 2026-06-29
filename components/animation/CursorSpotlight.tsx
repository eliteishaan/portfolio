'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const CursorSpotlight = () => {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion || !spotlightRef.current) return

    const xTo = gsap.quickTo(spotlightRef.current, 'x', { duration: 0.15, ease: 'power3' })
    const yTo = gsap.quickTo(spotlightRef.current, 'y', { duration: 0.15, ease: 'power3' })

    const handleMouseMove = (e: MouseEvent) => {
      const section = spotlightRef.current?.closest('section')
      if (section) {
        const rect = section.getBoundingClientRect()
        xTo(e.clientX - rect.left)
        yTo(e.clientY - rect.top)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none absolute top-0 left-0 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-80 mix-blend-color-dodge"
      style={{
        background: 'radial-gradient(circle closest-side, var(--color-accent), transparent)',
      }}
    />
  )
}
