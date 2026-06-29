'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, View } from '@react-three/drei'
import { getGPUTier } from 'detect-gpu'

export const WebGLProvider = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLElement>(null)
  const [dpr, setDpr] = useState(1)
  const [isLowEnd, setIsLowEnd] = useState(false)

  useEffect(() => {
    getGPUTier().then((tier) => {
      // Scale resolution based on GPU tier. Tier 1 = 0.5, Tier 2 = 1, Tier 3 = 1.5
      const pixelRatio = tier.tier === 1 ? 0.75 : tier.tier === 2 ? 1 : 1.5
      setDpr(Math.min(pixelRatio, window.devicePixelRatio || 1))
      setIsLowEnd(tier.tier === 1 || tier.isMobile === true)
    })
  }, [])

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className="relative h-full w-full">
      {children}
      {!isLowEnd && (
        <Canvas
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: -1,
          }}
          eventSource={containerRef as unknown as React.RefObject<HTMLElement>}
          dpr={dpr}
          gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        >
          <View.Port />
          <Preload all />
        </Canvas>
      )}
    </div>
  )
}
