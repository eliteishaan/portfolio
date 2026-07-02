'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from '@/lib/animation/gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePreloaderStore } from '@/hooks/usePreloaderStore'

export const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const rRef = useRef<HTMLSpanElement>(null)
  const avenhallRef = useRef<HTMLSpanElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = useReducedMotion()
  const { setReady } = usePreloaderStore()
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion) {
      setReady()
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(false)
    }
  }, [prefersReducedMotion, setReady])

  useGSAP(
    () => {
      if (!shouldRender) return

      // Pre-calculate target logo position
      const getTargetRect = () => {
        // Target the desktop logo SVG specifically since mobile is hidden
        const target = document.querySelector('header a[aria-label="Home"] svg.md\\:block')
        if (target) return target.getBoundingClientRect()
        // Fallback if not found
        return { top: 24, left: 24, width: 140, height: 20 }
      }

      // Initial States
      gsap.set(bgRef.current, { opacity: 1 })
      gsap.set(rRef.current, { y: -30, opacity: 0 })
      gsap.set(avenhallRef.current, { clipPath: 'inset(0 100% 0 0)' })
      gsap.set(glowRef.current, { opacity: 0 })

      const tl = gsap.timeline()

      // FRAME 02: 'R' enters from above (heavy, slow water droplet feel)
      tl.to(
        rRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        },
        0.2
      )

      tl.to(
        glowRef.current,
        {
          opacity: 0.15,
          duration: 1.4,
          ease: 'power2.out',
        },
        0.2
      )

      // FRAME 04: "AVENHALL" reveals from the R (slow and graceful)
      tl.to(
        avenhallRef.current,
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.8,
          ease: 'power3.inOut',
        },
        1.4
      ) // Starts after R is completely settled

      // FRAME 06: Travel upward to navbar & reveal Hero (smooth float)
      tl.add(() => {
        const source = wrapperRef.current?.getBoundingClientRect()
        const target = getTargetRect()

        if (source && wrapperRef.current) {
          const scale = target.width / source.width

          // Calculate movement delta from centers
          const sourceCenterX = source.left + source.width / 2
          const sourceCenterY = source.top + source.height / 2
          const targetCenterX = target.left + target.width / 2
          const targetCenterY = target.top + target.height / 2

          gsap.to(wrapperRef.current, {
            x: targetCenterX - sourceCenterX,
            y: targetCenterY - sourceCenterY,
            scale: scale,
            duration: 1.0, // Increased for ultra smoothness
            ease: 'power3.inOut',
          })

          // Concurrently fade out the black background to reveal Hero
          gsap.to(bgRef.current, {
            opacity: 0,
            duration: 1.0,
            ease: 'power2.inOut',
            onComplete: () => {
              setReady()
              setTimeout(() => setShouldRender(false), 50)
            },
          })

          // Fade out the glow
          gsap.to(glowRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          })
        }
      }, 2.6) // Hold completed word for 0.4s before moving
    },
    { scope: containerRef, dependencies: [shouldRender] }
  )

  if (!shouldRender) return null

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center"
    >
      {/* Matte black background */}
      <div ref={bgRef} className="absolute inset-0 bg-[#020202]" />

      {/* Ambient bottom glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute bottom-1/3 h-[2px] w-1/2 bg-[#FFB84D] opacity-0 blur-[40px]"
      />

      {/* Central Typography Wrapper */}
      <div
        ref={wrapperRef}
        className="pointer-events-none relative flex origin-center items-center justify-center"
      >
        <h1 className="m-0 flex overflow-hidden p-0 font-serif text-[clamp(2.5rem,8vw,5rem)] leading-none font-bold tracking-[0.1em] whitespace-nowrap text-white italic">
          <span ref={rRef} className="inline-block transform opacity-0">
            R
          </span>
          <span
            ref={avenhallRef}
            className="inline-block"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            AVENHALL
          </span>
        </h1>
      </div>
    </div>
  )
}
