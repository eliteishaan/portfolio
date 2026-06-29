'use client'

import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation/gsap'
import Image from 'next/image'

export const ServicesMatrix = ({
  services,
}: {
  services: { title?: string; image?: string; [key: string]: unknown }[]
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const cursorMediaRef = useRef<HTMLDivElement>(null)
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return
    if (!cursorMediaRef.current) return

    const xTo = gsap.quickTo(cursorMediaRef.current, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursorMediaRef.current, 'y', { duration: 0.5, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative z-20 w-full">
      <div className="border-border/50 flex flex-col border-t">
        {services.map((service, i) => {
          const isHovered = hoveredIndex === i
          const isFaded = hoveredIndex !== null && !isHovered

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group border-border/50 flex cursor-none items-center justify-between border-b py-10 transition-all duration-700 ease-[cubic-bezier(0.1,0.9,0.2,1)] ${isFaded ? 'opacity-20 blur-[4px]' : 'opacity-100'}`}
            >
              <h3 className="text-text-primary font-serif text-[6vw] tracking-tight uppercase md:text-[4vw]">
                {service.title}
              </h3>
              <span className="text-accent font-mono text-sm tracking-[0.2em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                EXPLORE
              </span>
            </div>
          )
        })}
      </div>

      {/* Floating Artifact Box Fix */}
      <div
        ref={cursorMediaRef}
        className={`bg-surface pointer-events-none fixed top-0 left-0 z-[100] h-[300px] w-[450px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm transition-opacity duration-300 md:h-[400px] md:w-[600px] ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`}
      >
        {hoveredIndex !== null &&
        services[hoveredIndex]?.image &&
        !failedImages.has(hoveredIndex) ? (
          <Image
            src={services[hoveredIndex].image as string}
            alt="Service Artifact"
            fill
            sizes="(max-width: 768px) 450px, 600px"
            className="absolute inset-0 h-full w-full scale-105 object-cover object-center"
            onError={() => {
              const newSet = new Set(failedImages)
              newSet.add(hoveredIndex)
              setFailedImages(newSet)
            }}
          />
        ) : (
          hoveredIndex !== null && (
            <div className="bg-surface-elevated flex h-full w-full items-center justify-center">
              <span className="text-muted font-mono text-xs tracking-widest uppercase">
                Media Unavailable
              </span>
            </div>
          )
        )}
      </div>
    </div>
  )
}
