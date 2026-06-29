'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { vertexShader, fragmentShader } from './shaders/noise'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import * as THREE from 'three'

const NoisePlane = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const prefersReducedMotion = useReducedMotion()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  )

  useFrame((state) => {
    if (!prefersReducedMotion && materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

export const HeroNoiseScene = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-50"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.25]}
        gl={{ powerPreference: 'high-performance', antialias: false }}
      >
        <NoisePlane />
      </Canvas>
    </div>
  )
}

export default HeroNoiseScene
