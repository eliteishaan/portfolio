'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const Preloader = () => {
  const [progress, setProgress] = useState(0)
  const preloaderRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set(preloaderRef.current, { autoAlpha: 0, display: 'none' })
      return
    }

    let isFontsLoaded = false
    document.fonts.ready.then(() => {
      isFontsLoaded = true
    })

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 2
      if (currentProgress >= 99) {
        currentProgress = 99
        if (isFontsLoaded) {
          currentProgress = 100
          clearInterval(interval)
          // Shatter snap via our global spring ease
          gsap.to(preloaderRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: 'spring',
            delay: 0.2,
            onComplete: () => {
              gsap.set(preloaderRef.current, { display: 'none' })
              // Force GSAP recalculation now that the DOM is fully unblocked
              gsap.delayedCall(0.1, () => ScrollTrigger.refresh())
            },
          })
        }
      }
      setProgress(currentProgress)
    }, 40)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  return (
    <div
      ref={preloaderRef}
      className="bg-background text-text-primary fixed inset-0 z-[9999] flex flex-col items-center justify-center font-mono"
    >
      <div className="text-[12vw] leading-none tracking-tighter mix-blend-difference">
        {progress}%
      </div>
      <div className="text-muted mt-4 text-[10px] tracking-[0.3em] uppercase">
        Booting Environment
      </div>
    </div>
  )
}
