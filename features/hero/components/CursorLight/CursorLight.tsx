'use client'
import React, { useRef, useEffect } from 'react'
import { gsap } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const CursorLight = () => {
  const lightRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !lightRef.current) return

    // QuickTo for high performance mouse tracking
    const xTo = gsap.quickTo(lightRef.current, 'x', { duration: 0.08, ease: 'power3' })
    const yTo = gsap.quickTo(lightRef.current, 'y', { duration: 0.08, ease: 'power3' })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div
      ref={lightRef}
      // Using @media (hover: hover) implicitly via Tailwind to disable on touch
      className="pointer-events-none fixed top-0 left-0 z-10 hidden h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen sm:block"
      style={{
        background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
        opacity: 0.15,
      }}
    />
  )
}
