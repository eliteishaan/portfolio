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

  React.useEffect(() => {
    if (!ref.current) return

    const xTo = gsap.quickTo(ref.current, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' })
    const yTo = gsap.quickTo(ref.current, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' })

    const handleMouseMove = (e: MouseEvent) => {
      const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
      if (prefersReducedMotion || !ref.current || isTouch) return
      const { clientX, clientY } = e
      const { height, width, left, top } = ref.current.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)

      xTo(x * 0.3)
      yTo(y * 0.3)
    }

    const handleMouseLeave = () => {
      const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
      if (prefersReducedMotion || !ref.current || isTouch) return
      xTo(0)
      yTo(0)
    }

    const element = ref.current
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReducedMotion])

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {children}
    </div>
  )
}
