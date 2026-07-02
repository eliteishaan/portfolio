'use client'

import React, { useRef, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePreloaderStore } from '@/hooks/usePreloaderStore'
import { HeroTypography } from './HeroTypography'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import Image from 'next/image'
import * as THREE from 'three'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

const DynamicProductArtifact = dynamic(
  () => import('./ProductArtifact').then((mod) => mod.ProductArtifact),
  { ssr: false }
)

export const Hero = ({ fallbackImage }: { fallbackImage?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const artifactGroupRef = useRef<THREE.Group>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const typographyRef = useRef<HTMLDivElement>(null)

  const reduceMotion = useReducedMotion()
  const isReady = usePreloaderStore((state) => state.isReady)
  const isCapable = useDeviceCapability()
  const [webglReady, setWebglReady] = React.useState(false)

  useEffect(() => {
    // The Monolith animation is now driven entirely within Monolith.tsx.
    // We no longer scrub an exit animation, we scrub the evolution of the product itself.
  }, [isCapable, reduceMotion, isReady])

  return (
    <section id="hero" className="relative h-[150vh] w-full bg-[#050505]">
      <div
        ref={containerRef}
        className="sticky top-0 flex h-[100vh] w-full flex-col overflow-hidden md:block"
      >
        <HeroTypography ref={typographyRef} entranceReady={isReady} reduceMotion={reduceMotion} />

        {/* Container for both WebGL and Fallback to allow crossfading */}
        <div
          ref={canvasContainerRef}
          className="relative z-[1] h-[50vh] w-full md:absolute md:top-0 md:right-0 md:h-full md:w-[65%]"
        >
          {isCapable && (
            <div
              className={cn(
                'absolute inset-0 transition-opacity duration-1000',
                webglReady ? 'opacity-100' : 'opacity-0'
              )}
            >
              <DynamicProductArtifact
                artifactGroupRef={artifactGroupRef}
                containerRef={containerRef}
                reduceMotion={reduceMotion}
                onReady={() => setWebglReady(true)}
              />
            </div>
          )}

          {/* Static Fallback (Always present, fades out if WebGL loads successfully) */}
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-1000 md:p-12',
              webglReady ? 'pointer-events-none opacity-0' : 'opacity-100'
            )}
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl md:h-[70%] md:w-[85%]">
              <Image
                src={fallbackImage || '/api/media/smart-health-helper/hero.webp'}
                alt="Flagship Product"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
