'use client'

import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload, View } from '@react-three/drei'

export const WebGLProvider = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {children}
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
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      >
        <View.Port />
        <Preload all />
      </Canvas>
    </div>
  )
}
