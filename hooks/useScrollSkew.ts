'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/animation/gsap'
import { useLenis } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type Lenis from 'lenis'

export const useScrollSkew = <T extends HTMLElement = HTMLElement>(intensity = 0.05) => {
  const targetRef = useRef<T>(null)
  const prefersReducedMotion = useReducedMotion()
  const lenis = useLenis()

  useEffect(() => {
    if (prefersReducedMotion || !targetRef.current || !lenis) return

    const handleScroll = (e: Lenis) => {
      const skew = e.velocity * intensity
      const clampedSkew = gsap.utils.clamp(-15, 15, skew)

      gsap.to(targetRef.current, {
        skewY: clampedSkew,
        duration: 0.5,
        ease: 'spring',
        overwrite: 'auto',
      })
    }

    lenis.on('scroll', handleScroll)
    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis, prefersReducedMotion, intensity])

  return targetRef
}
