'use client'

import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'

export const ServicesMatrix = ({
  services,
}: {
  services: { title?: string; image?: string; [key: string]: unknown }[]
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const cursorMediaRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Disable on touch devices to prevent mobile bugs
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return
    if (!cursorMediaRef.current) return

    const xTo = gsap.quickTo(cursorMediaRef.current, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(cursorMediaRef.current, 'y', { duration: 0.4, ease: 'power3' })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative z-20 w-full">
      <div className="border-border flex flex-col border-t">
        {services.map((service, i) => {
          const isHovered = hoveredIndex === i
          const isFaded = hoveredIndex !== null && !isHovered

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group border-border flex cursor-none border-b py-8 transition-all duration-500 ease-[cubic-bezier(0.1,0.9,0.2,1)] ${isFaded ? 'opacity-20 blur-[4px]' : 'opacity-100'}`}
            >
              <h3 className="font-serif text-[6vw] uppercase md:text-[4vw]">{service.title}</h3>
            </div>
          )
        })}
      </div>

      {/* Floating Artifact Box Fixed */}
      <div
        ref={cursorMediaRef}
        className={`bg-surface pointer-events-none fixed top-0 left-0 z-[100] h-[250px] w-[350px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg transition-opacity duration-300 md:h-[350px] md:w-[500px] ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`}
      >
        {hoveredIndex !== null && services[hoveredIndex]?.image && (
          <img
            src={services[hoveredIndex].image}
            alt="Service Artifact"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  )
}
