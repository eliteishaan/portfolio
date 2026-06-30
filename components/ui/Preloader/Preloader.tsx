'use client'

import React, { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animation/gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(preloaderRef.current, { autoAlpha: 0, display: 'none', pointerEvents: 'none' })
        return
      }

      // Initial States
      gsap.set(boxRef.current, { y: '-100vh' })
      gsap.set(textRef.current, { clipPath: 'inset(0 50% 0 50%)', opacity: 0 })

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(preloaderRef.current, { display: 'none', pointerEvents: 'none' })
          ScrollTrigger.refresh()
        },
      })

      // 0.0s - 1.0s (The Drop)
      tl.to(
        boxRef.current,
        {
          y: 0,
          duration: 1.0,
          ease: 'expo.in',
        },
        0
      )

      // 1.0s - 1.3s (Hold) -> no tween needed, just schedule next tween at 1.3s

      // 1.3s - 2.1s (The Mechanical Expansion)
      tl.to(
        boxRef.current,
        {
          scaleX: 12,
          scaleY: 0.1,
          opacity: 0,
          duration: 0.8,
          ease: 'expo.inOut',
        },
        1.3
      )

      tl.to(
        textRef.current,
        {
          clipPath: 'inset(0 0% 0 0%)',
          opacity: 1,
          duration: 0.8,
          ease: 'expo.inOut',
        },
        1.3
      )

      // 2.1s - 3.0s (Hold)

      // 3.0s - 4.0s (The Exit)
      tl.to(
        preloaderRef.current,
        {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.0,
          ease: 'power3.inOut',
        },
        3.0
      )
    },
    { scope: preloaderRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <div
      ref={preloaderRef}
      className="preloader-wrapper pointer-events-auto fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      <div className="relative flex items-center justify-center">
        {/* The Exact RAVENHALL text behind the box */}
        <div
          ref={textRef}
          className="brand-text font-serif font-bold text-white italic mix-blend-difference select-none"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: 0.8,
            letterSpacing: '-0.02em',
          }}
        >
          RAVENHALL
        </div>

        {/* The Impact Box */}
        <div ref={boxRef} className="impact-box absolute h-12 w-12 bg-white" />
      </div>
    </div>
  )
}
