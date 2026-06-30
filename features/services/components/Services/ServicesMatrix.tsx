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
  const containerRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLDivElement>(null)
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

  useGSAP(
    () => {
      if (!bgImageRef.current) return

      // Animate the background image fade in/out
      if (
        hoveredIndex !== null &&
        services[hoveredIndex]?.image &&
        !failedImages.has(hoveredIndex)
      ) {
        gsap.to(bgImageRef.current, {
          opacity: 0.2, // Keep it subtle like a watermark backdrop
          scale: 1,
          duration: 0.8,
          ease: 'ravenhall',
        })
      } else {
        gsap.to(bgImageRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
          ease: 'ravenhall',
        })
      }
    },
    { scope: containerRef, dependencies: [hoveredIndex] }
  )

  return (
    <div ref={containerRef} className="relative z-20 min-h-[50vh] w-full">
      {/* Dynamic Viewport Background */}
      <div ref={bgImageRef} className="pointer-events-none fixed inset-0 z-0 scale-105 opacity-0">
        {hoveredIndex !== null &&
          services[hoveredIndex]?.image &&
          !failedImages.has(hoveredIndex) && (
            <Image
              src={services[hoveredIndex].image as string}
              alt="Service Environment"
              fill
              className="object-cover object-center mix-blend-screen grayscale"
              sizes="100vw"
              onError={() => {
                const newSet = new Set(failedImages)
                newSet.add(hoveredIndex)
                setFailedImages(newSet)
              }}
            />
          )}
        <div className="bg-background/80 absolute inset-0 backdrop-blur-sm" />
      </div>

      <div className="border-border/50 relative z-10 flex w-full flex-col border-t">
        {services.map((service, i) => {
          const isHovered = hoveredIndex === i
          const isFaded = hoveredIndex !== null && !isHovered

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group border-border/50 flex flex-col justify-center border-b py-12 transition-all duration-700 ease-[cubic-bezier(0.1,0.9,0.2,1)] md:items-center md:py-16 ${isFaded ? 'opacity-30' : 'opacity-100'} cursor-pointer`}
            >
              <div className="flex w-full items-center justify-between">
                <h3
                  className={`text-text-primary font-serif text-[8vw] leading-none tracking-tight uppercase transition-all duration-500 md:text-[5vw] ${isHovered ? 'text-accent pl-8' : 'pl-0'}`}
                >
                  {service.title}
                </h3>
                <span className="text-accent hidden font-mono text-sm leading-none tracking-[0.2em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                  EXPLORE CAPABILITY
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
