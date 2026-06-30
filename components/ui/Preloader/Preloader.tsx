'use client'

import React, { useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animation/gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

export const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<THREE.Group>(null)
  const prefersReducedMotion = useReducedMotion()
  const [showCanvas, setShowCanvas] = useState(true)

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(preloaderRef.current, { autoAlpha: 0, display: 'none', pointerEvents: 'none' })
        return
      }

      // Initial States
      if (meshRef.current) {
        gsap.set(meshRef.current.position, { y: 15 }) // Drop from high up
        gsap.set(meshRef.current.scale, { x: 1, y: 1, z: 1 })
      }
      gsap.set(textRef.current, { clipPath: 'inset(0 50% 0 50%)', opacity: 0 })

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(preloaderRef.current, { display: 'none', pointerEvents: 'none' })
          setShowCanvas(false)
          ScrollTrigger.refresh()
        },
      })

      // 0.0s - 1.0s (The Drop)
      if (meshRef.current && cameraRef.current) {
        tl.to(
          meshRef.current.position,
          {
            y: 0,
            duration: 1.0,
            ease: 'expo.in',
            onComplete: () => {
              // Subtle camera shake on impact
              if (cameraRef.current) {
                gsap.fromTo(
                  cameraRef.current.position,
                  { y: 0.2, x: 0.1 },
                  { y: 0, x: 0, duration: 0.1, ease: 'power4.out', clearProps: 'all' }
                )
              }
            },
          },
          0
        )

        // 1.3s - 2.1s (The Mechanical Expansion)
        tl.to(
          meshRef.current.scale,
          {
            x: 50, // Massive horizontal expansion
            y: 0.1,
            z: 0.1,
            duration: 0.8,
            ease: 'expo.inOut',
          },
          1.3
        )
      }

      tl.to(
        textRef.current,
        {
          clipPath: 'inset(0 0% 0 0%)',
          opacity: 1,
          duration: 0.8,
          ease: 'expo.inOut',
        },
        '<' // Use absolute syncing to the previous box expansion tween
      )

      // 2.1s - 3.0s (Hold)

      // 3.0s - 4.0s (The Exit)
      tl.to(
        preloaderRef.current,
        {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.0,
          ease: 'power3.inOut',
        },
        3.0
      )
    },
    { scope: preloaderRef, dependencies: [prefersReducedMotion] }
  )

  return (
    <div
      ref={preloaderRef}
      className="preloader-wrapper pointer-events-auto fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      <div className="relative flex items-center justify-center">
        {/* The Exact RAVENHALL text behind the box */}
        <div
          ref={textRef}
          className="brand-text relative z-0 font-serif font-bold text-white italic select-none"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            lineHeight: 0.8,
            letterSpacing: '-0.02em',
          }}
        >
          RAVENHALL
        </div>

        {/* The 3D Monolith Canvas */}
        {showCanvas && (
          <div className="pointer-events-none absolute inset-0 z-10">
            <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
              <group ref={cameraRef}>
                <spotLight
                  position={[0, 10, 5]}
                  angle={0.5}
                  penumbra={1}
                  intensity={5}
                  color="#ffffff"
                  castShadow
                />
                <ambientLight intensity={0.5} />
                <mesh ref={meshRef}>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} />
                </mesh>
              </group>
            </Canvas>
          </div>
        )}
      </div>
    </div>
  )
}
