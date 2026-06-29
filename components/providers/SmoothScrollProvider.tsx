'use client'

import React, { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { LenisContext } from '@/hooks/useLenis'

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Destroy existing instance if any (React Strict Mode safety)
    if (lenisRef.current) {
      lenisRef.current.destroy()
    }

    if (prefersReducedMotion) {
      // If reduced motion is enabled, we still create Lenis but immediately disable smoothing
      // or we just skip it, but some plugins might depend on it. Let's just create it and destroy or not run it.
      // Better yet, just don't initialize Lenis smoothing.
      return
    }

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenisInstance
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(lenisInstance)

    // Sync Lenis with ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update)

    // Add to GSAP ticker
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000)
    })

    // Lag smoothing ensures GSAP doesn't jump aggressively
    gsap.ticker.lagSmoothing(0)

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      gsap.ticker.remove((time) => {
        lenisInstance.raf(time * 1000)
      })
    }
  }, [prefersReducedMotion])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
