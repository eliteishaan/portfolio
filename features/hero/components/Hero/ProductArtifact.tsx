/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { setupArtifactScene } from '@/lib/three/artifactScene'
import { useCursorTilt } from '@/hooks/useCursorTilt'
import { gsap } from '@/lib/animation/gsap'
import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing'
import { Environment, Lightformer, MeshReflectorMaterial } from '@react-three/drei'
import { Monolith } from './Monolith'

interface ProductArtifactProps {
  reduceMotion: boolean
  containerRef: React.RefObject<HTMLElement | null>
  artifactGroupRef: React.RefObject<THREE.Group | null>
  onReady?: () => void
}

const ArtifactScene = ({
  reduceMotion,
  containerRef,
  artifactGroupRef,
  onReady,
}: ProductArtifactProps) => {
  const driftGroupRef = useRef<THREE.Group>(null)
  const keyLightRef = useRef<THREE.DirectionalLight>(null)

  const { registerTarget } = useCursorTilt(containerRef, !reduceMotion)
  const [isMobile, setIsMobile] = useState(false)
  const hasGyro = useRef(false)

  useEffect(() => {
    // eslint-disable-next-line
    setIsMobile(window.innerWidth < 768)

    if (reduceMotion) return

    registerTarget(
      artifactGroupRef.current?.rotation,
      (x, y) => ({
        x: y * ((4 * Math.PI) / 180),
        y: x * ((6 * Math.PI) / 180),
      }),
      0.18
    )

    registerTarget(
      keyLightRef.current?.position,
      (x, y) => {
        return {
          x: -4 + x * 1.5,
          y: 5 + -y * 1.5,
        }
      },
      0.25
    )

    if (onReady) {
      // Small delay to ensure materials compile before revealing
      const timer = setTimeout(onReady, 100)
      return () => clearTimeout(timer)
    }
  }, [reduceMotion, registerTarget, artifactGroupRef, onReady])

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null && !reduceMotion && artifactGroupRef.current) {
        hasGyro.current = true
        const x = Math.max(-1, Math.min(1, e.gamma / 45))
        const y = Math.max(-1, Math.min(1, (e.beta - 45) / 45))

        gsap.to(artifactGroupRef.current.rotation, {
          x: y * ((4 * Math.PI) / 180),
          y: x * ((6 * Math.PI) / 180),
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    }

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation)
    }

    return () => {
      if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation)
      }
    }
  }, [reduceMotion, artifactGroupRef])

  useFrame((state) => {
    if (reduceMotion) return

    // Ambient drift for the entire monolith assembly
    if (driftGroupRef.current) {
      const t = state.clock.elapsedTime
      driftGroupRef.current.position.y = Math.sin(t * 1.5) * 0.1
      driftGroupRef.current.rotation.y = Math.sin(t * 0.5) * ((1 * Math.PI) / 180)
    }
  })

  useEffect(() => {
    if (keyLightRef.current && !reduceMotion) {
      gsap.fromTo(
        keyLightRef.current,
        { intensity: 0.0 },
        { intensity: 2.0, duration: 2.0, ease: 'power2.inOut' }
      )
    }
  }, [reduceMotion])

  return (
    <>
      <color attach="background" args={['#050505']} />

      {/* Procedural Environment Map (No CDN fetching) */}
      <Environment resolution={512}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={1.5}
            position={[-3, 2, -5]}
            scale={[10, 10, 1]}
            color="#ffffff"
            target={[0, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={1.5}
            position={[3, 2, 5]}
            scale={[10, 10, 1]}
            color="#ffffff"
            target={[0, 0, 0]}
          />
          <Lightformer
            form="ring"
            intensity={1}
            position={[0, 10, 0]}
            scale={[10, 10, 1]}
            color="#F0F4FF"
            target={[0, 0, 0]}
          />
        </group>
      </Environment>

      {/* Cinematic Lighting Setup */}
      <ambientLight intensity={0.5} color="#ffffff" />
      {/* Key Light (Cooler for contrast against amber core) */}
      <directionalLight
        ref={keyLightRef}
        position={[-4, 6, 4]}
        color="#F0F4FF"
        intensity={1.5}
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize={[2048, 2048]}
      />
      {/* Strong Rim Light to highlight bevels and glass edges */}
      <directionalLight position={[4, 2, -6]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-4, -2, -6]} intensity={1.0} color="#ffffff" />

      {/* Internal indirect illumination support */}
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#FFB84D" distance={10} />

      {/* Floor Reflection */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={0.15}
        />
      </mesh>

      <group ref={driftGroupRef}>
        <Monolith
          reduceMotion={reduceMotion}
          containerRef={containerRef}
          artifactGroupRef={artifactGroupRef}
        />
      </group>

      {/* Post-Processing */}
      {!reduceMotion && (
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={1.0} luminanceSmoothing={0.1} intensity={1.5} mipmapBlur />
          <SMAA />
        </EffectComposer>
      )}
    </>
  )
}

export const ProductArtifact = React.forwardRef<HTMLDivElement, ProductArtifactProps>(
  (props, ref) => {
    const [isInView, setIsInView] = useState(true)

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        { threshold: 0 }
      )

      if (ref && 'current' in ref && ref.current) {
        observer.observe(ref.current)
      }

      return () => observer.disconnect()
    }, [ref])

    return (
      <div className="z-[1] h-full w-full" aria-hidden="true">
        <Canvas
          frameloop={isInView ? 'always' : 'demand'}
          camera={{ position: [0, 0, 8], fov: 38 }}
          dpr={[1, 2]}
          shadows
        >
          <ArtifactScene {...props} />
        </Canvas>
      </div>
    )
  }
)
ProductArtifact.displayName = 'ProductArtifact'
