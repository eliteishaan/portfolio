'use client'

import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { LenisContext } from '@/hooks/useLenis'

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const [lenis, setLenis] = React.useState<Lenis | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (lenisRef.current) {
      lenisRef.current.destroy()
      lenisRef.current = null
    }

    if (prefersReducedMotion) return

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    const updateScrollTrigger = () => ScrollTrigger.update()
    const tick = (time: number) => lenisInstance.raf(time * 1000)

    lenisRef.current = lenisInstance
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(lenisInstance)
    lenisInstance.on('scroll', updateScrollTrigger)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Force GSAP to recalculate all trigger positions once Lenis is active
    // We use a slight timeout to ensure React finishes DOM painting
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(refreshTimeout)
      lenisInstance.off('scroll', updateScrollTrigger)
      gsap.ticker.remove(tick)
      lenisInstance.destroy()
      if (lenisRef.current === lenisInstance) {
        lenisRef.current = null
      }
    }
  }, [prefersReducedMotion])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
