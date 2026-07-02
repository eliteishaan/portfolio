'use client'

import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { LenisContext } from '@/hooks/useLenis'
import { usePathname } from 'next/navigation'

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const [lenis, setLenis] = React.useState<Lenis | null>(null)
  const pathname = usePathname()

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

  // Handle deterministic cross-page smooth scroll
  useEffect(() => {
    if (!lenis) return

    const hash = window.location.hash
    const pendingHash = sessionStorage.getItem('pendingHashScroll')

    if (hash && pendingHash === hash) {
      const triggerScroll = (el: HTMLElement) => {
        sessionStorage.removeItem('pendingHashScroll')
        requestAnimationFrame(() => {
          lenis.scrollTo(el, {
            duration: 2.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          })
        })
      }

      const target = document.querySelector(hash)
      if (target) {
        triggerScroll(target as HTMLElement)
      } else {
        const observer = new MutationObserver((mutations, obs) => {
          const el = document.querySelector(hash)
          if (el) {
            obs.disconnect()
            triggerScroll(el as HTMLElement)
          }
        })
        observer.observe(document.body, { childList: true, subtree: true })
        return () => observer.disconnect()
      }
    }
  }, [pathname, lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
