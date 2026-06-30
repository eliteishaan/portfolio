'use client'

import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SITE_CONFIG } from '@/lib/constants/site'

export const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set(preloaderRef.current, { autoAlpha: 0, display: 'none', pointerEvents: 'none' })
      return
    }

    // 0.0s: Preloader is visible, brand mark is scale 0.8, opacity 0
    gsap.set(logoRef.current, { scale: 0.8, opacity: 0 })

    const tl = gsap.timeline({
      onComplete: () => {
        // 1.2s: Set Preloader to display: none and pointerEvents: none
        gsap.set(preloaderRef.current, { display: 'none', pointerEvents: 'none' })
        gsap.delayedCall(0.1, () => ScrollTrigger.refresh())
      },
    })

    // 0.1s: Brand Mark fades to opacity 1, scales to 1.0
    tl.to(
      logoRef.current,
      {
        scale: 1.0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
      },
      0.1
    )

    // 0.8s: Preloader container clips out using ravenhall ease
    tl.to(
      preloaderRef.current,
      {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.4,
        ease: 'ravenhall',
      },
      0.8
    )

    return () => {
      tl.kill()
    }
  }, [prefersReducedMotion])

  return (
    <div
      ref={preloaderRef}
      className="bg-background pointer-events-auto fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div
        ref={logoRef}
        className="text-text-primary font-serif font-bold italic mix-blend-difference select-none"
        style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          lineHeight: 0.8,
          letterSpacing: '-0.02em',
        }}
      >
        {SITE_CONFIG.name}
      </div>
    </div>
  )
}
