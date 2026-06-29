'use client'

import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ServiceItem {
  id: string
  title: string
  description: string
  videoUrl?: string
  artifactImage?: string
}

export const ServicesMatrix = ({ services }: { services: ServiceItem[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const cursorMediaRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion || !cursorMediaRef.current) return

    const xTo = gsap.quickTo(cursorMediaRef.current, 'x', { duration: 0.6, ease: 'spring' })
    const yTo = gsap.quickTo(cursorMediaRef.current, 'y', { duration: 0.6, ease: 'spring' })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  return (
    <div className="relative w-full">
      {/* The Matrix */}
      <div className="flex flex-col">
        {services.map((service, i) => {
          const isHovered = hoveredIndex === i
          const isFaded = hoveredIndex !== null && !isHovered

          return (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group border-border/30 ease-spring flex cursor-none flex-col justify-center border-b py-12 transition-all duration-700 ${isFaded ? 'opacity-20 blur-[4px]' : 'opacity-100'} md:py-16`}
            >
              <h3 className="text-text-primary ease-spring group-hover:text-accent font-serif text-[6vw] leading-none tracking-tight uppercase transition-colors duration-500">
                {service.title}
              </h3>
            </div>
          )
        })}
      </div>

      {/* Floating Artifact Reveal */}
      {!prefersReducedMotion && (
        <div
          ref={cursorMediaRef}
          className={`bg-surface-elevated ease-spring pointer-events-none fixed top-0 left-0 z-50 h-[250px] w-[400px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl transition-opacity duration-500 ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`}
        >
          {hoveredIndex !== null && services[hoveredIndex].artifactImage ? (
            <img
              src={services[hoveredIndex].artifactImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--color-surface-elevated)_0%,_var(--color-background)_100%)]">
              <span className="text-accent font-mono text-xs tracking-widest uppercase">
                WebGL Shader Bound
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
