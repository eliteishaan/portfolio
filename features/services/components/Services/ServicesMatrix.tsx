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

    const xTo = gsap.quickTo(cursorMediaRef.current, 'x', { duration: 0.15, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursorMediaRef.current, 'y', { duration: 0.15, ease: 'power3.out' })

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
              className={`group border-border/50 flex flex-col justify-between border-b py-10 transition-all duration-700 ease-[cubic-bezier(0.1,0.9,0.2,1)] md:flex-row md:items-center ${isFaded ? 'opacity-20 blur-[4px]' : 'opacity-100'}`}
            >
              <div className="flex w-full items-center justify-between md:w-auto">
                <h3 className="text-text-primary font-serif text-[8vw] tracking-tight uppercase md:text-[4vw]">
                  {service.title}
                </h3>
                <span className="text-accent hidden font-mono text-sm tracking-[0.2em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                  EXPLORE
                </span>
              </div>

              {/* Mobile Inline Image Fallback */}
              {service.image && (
                <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-sm md:hidden">
                  <Image
                    src={service.image as string}
                    alt={(service.title as string) || 'Service'}
                    fill
                    sizes="(max-width: 768px) 100vw, 0px"
                    className="object-cover"
                  />
                </div>
              )}
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
            alt={(services[hoveredIndex].title as string) || 'Service Image'}
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
