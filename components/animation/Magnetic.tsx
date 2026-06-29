'use client'

import React, { useRef } from 'react'
import { gsap } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MagneticProps {
  children: React.ReactNode
  className?: string
}

export const Magnetic = ({ children, className = '' }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)

    gsap.to(ref.current, { x: x * 0.3, y: y * 0.3, duration: 1, ease: 'spring' })
  }

  const handleMouseLeave = () => {
    if (prefersReducedMotion || !ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 1, ease: 'spring' })
  }

  return (
    <div
      ref={ref}
      className={`relative inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
