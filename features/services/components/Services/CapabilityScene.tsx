'use client'

import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, RoundedBox, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from '@/lib/animation/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SceneProps {
  activeIndex: number
}

const GeometricForm = ({ activeIndex }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null)

  // 6 shared architectural primitives
  const meshRef0 = useRef<THREE.Mesh>(null)
  const meshRef1 = useRef<THREE.Mesh>(null)
  const meshRef2 = useRef<THREE.Mesh>(null)
  const meshRef3 = useRef<THREE.Mesh>(null)
  const meshRef4 = useRef<THREE.Mesh>(null)
  const meshRef5 = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#1a1a1c', // Slightly lighter base so it doesn't clip to pure black
      metalness: 0.5, // Reduced metalness so it scatters more light
      roughness: 0.4, // High roughness for matte finish
      clearcoat: 0.2, // Clearcoat for edge highlights
      clearcoatRoughness: 0.2,
      envMapIntensity: 2.0, // Stronger reflections from the lightformers
    })
  }, [])

  // The 4 architectural states defining scale, position, and rotation for all 6 blocks
  const states = useMemo(
    () => [
      // State 0: Web Development (Dominant central server mass with thin supporting planes)
      [
        { scale: [3.8, 4.6, 1.2], pos: [0, 0, -1.2], rot: [0, 0, 0] }, // Dominant mass
        { scale: [2.8, 3.2, 0.2], pos: [-0.6, 0.2, -0.2], rot: [0, 0, 0] },
        { scale: [1.8, 2.2, 0.15], pos: [0.8, -0.4, 0.4], rot: [0, 0, 0] },
        { scale: [3.4, 0.15, 1.8], pos: [0, -1.8, 0], rot: [0, 0, 0] },
        { scale: [3.4, 0.15, 1.8], pos: [0, 1.8, 0], rot: [0, 0, 0] },
        { scale: [0.15, 4.2, 1.5], pos: [-1.6, 0, -0.2], rot: [0, 0, 0] },
      ],
      // State 1: Creative & Video (Dominant cinematic structural frame with interlocking elements)
      [
        { scale: [3.2, 3.2, 0.8], pos: [0, 0, -0.4], rot: [Math.PI / 4, 0, Math.PI / 4] }, // Dominant frame
        { scale: [2.2, 2.2, 0.3], pos: [0, 0, 0.8], rot: [Math.PI / 4, 0, -Math.PI / 4] },
        { scale: [1.4, 1.4, 0.4], pos: [0, 0, 1.4], rot: [0, 0, 0] },
        { scale: [4.2, 0.25, 0.25], pos: [0, 0, -0.2], rot: [0, 0, Math.PI / 4] },
        { scale: [0.25, 4.2, 0.25], pos: [0, 0, -0.2], rot: [0, 0, Math.PI / 4] },
        { scale: [0.3, 0.3, 3.8], pos: [0, 0, -0.2], rot: [0, 0, 0] },
      ],
      // State 2: AI & Automation (Dominant central logic core with modular orbital connectors)
      [
        { scale: [2.4, 2.4, 2.4], pos: [0, 0, 0], rot: [0, Math.PI / 4, 0] }, // Dominant core
        { scale: [0.6, 0.6, 0.6], pos: [1.6, 1.6, -0.8], rot: [0, Math.PI / 4, 0] },
        { scale: [0.6, 0.6, 0.6], pos: [-1.6, -1.6, 0.8], rot: [0, Math.PI / 4, 0] },
        { scale: [0.5, 0.5, 0.5], pos: [-1.8, 1.8, 0], rot: [0, Math.PI / 4, 0] },
        { scale: [3.6, 0.1, 0.1], pos: [0, 0, 0], rot: [Math.PI / 4, 0, Math.PI / 4] },
        { scale: [0.1, 3.6, 0.1], pos: [0, 0, 0], rot: [0, 0, Math.PI / 4] },
      ],
      // State 3: Digital Systems (Dominant monolithic main pillar surrounded by supporting columns)
      [
        { scale: [1.8, 5.8, 1.8], pos: [-1.2, 0, -0.5], rot: [0, 0, 0] }, // Dominant pillar
        { scale: [1.2, 3.2, 1.2], pos: [0.8, -0.6, 1.2], rot: [0, 0, 0] },
        { scale: [0.8, 4.2, 0.8], pos: [1.8, 0.8, -1.2], rot: [0, 0, 0] },
        { scale: [1.4, 2.4, 1.4], pos: [-0.4, -1.2, -1.8], rot: [0, 0, 0] },
        { scale: [3.2, 0.3, 3.2], pos: [0, -2.6, 0], rot: [0, 0, 0] },
        { scale: [0.5, 1.4, 0.5], pos: [0.8, 2.0, 1.2], rot: [0, 0, 0] },
      ],
    ],
    []
  )

  useEffect(() => {
    const targetState = states[activeIndex] || states[0]
    const refs = [meshRef0, meshRef1, meshRef2, meshRef3, meshRef4, meshRef5]

    refs.forEach((ref, index) => {
      if (ref.current) {
        const target = targetState[index]

        // Micro-imperfection: Add a tiny random offset to rotation to make it feel less perfect
        const randomRotOffset = (Math.random() - 0.5) * 0.05

        gsap.to(ref.current.position, {
          x: target.pos[0],
          y: target.pos[1],
          z: target.pos[2],
          duration: 0.8,
          ease: 'power3.inOut',
          overwrite: 'auto',
        })
        gsap.to(ref.current.scale, {
          x: target.scale[0],
          y: target.scale[1],
          z: target.scale[2],
          duration: 0.8,
          ease: 'power3.inOut',
          overwrite: 'auto',
        })
        gsap.to(ref.current.rotation, {
          x: target.rot[0] + randomRotOffset,
          y: target.rot[1] + randomRotOffset,
          z: target.rot[2] + randomRotOffset,
          duration: 0.8,
          ease: 'power3.inOut',
          overwrite: 'auto',
        })
      }
    })
  }, [activeIndex, states])

  useFrame(() => {
    if (groupRef.current) {
      // Extremely subtle, luxurious camera/object drift
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.0001) * 0.02
      groupRef.current.rotation.x = Math.cos(Date.now() * 0.00015) * 0.02
    }
  })

  // Render exactly 6 shared primitives. They morph dynamically based on GSAP.
  return (
    <group ref={groupRef}>
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <RoundedBox ref={meshRef0} args={[1, 1, 1]} radius={0.02} material={material} />
        <RoundedBox ref={meshRef1} args={[1, 1, 1]} radius={0.02} material={material} />
        <RoundedBox ref={meshRef2} args={[1, 1, 1]} radius={0.02} material={material} />
        <RoundedBox ref={meshRef3} args={[1, 1, 1]} radius={0.02} material={material} />
        <RoundedBox ref={meshRef4} args={[1, 1, 1]} radius={0.02} material={material} />
        <RoundedBox ref={meshRef5} args={[1, 1, 1]} radius={0.02} material={material} />
      </Float>
    </group>
  )
}

export const CapabilityScene = ({ activeIndex }: SceneProps) => {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0,
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden rounded-3xl border border-white/5 bg-[#020202]"
    >
      <Canvas
        frameloop={isInView && !reduceMotion ? 'always' : 'demand'}
        camera={{ position: [0, 0, 7.2], fov: 45 }} // Moved camera closer (from 8 to 7.2) for a 10% larger object relative to container
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#010101']} />

        {/* Atmospheric depth pushed back so it doesn't dim the main object */}
        <fog attach="fog" args={['#010101', 8, 25]} />

        {/* Significantly brighter lighting setup to reveal the dark geometry */}
        <ambientLight intensity={0.6} color="#ffffff" />
        <directionalLight position={[-5, 5, 5]} intensity={3.5} color="#F0F4FF" />
        <directionalLight position={[5, -5, -5]} intensity={1.5} color="#ffffff" />

        {/* Stronger breathing light */}
        <pointLight position={[0, 0, 0]} intensity={4.0} color="#FFB84D" distance={8} decay={2} />

        {/* Procedural Environment Map with intense lightformers to create rim lighting */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer
              form="rect"
              intensity={3}
              position={[-3, 2, -5]}
              scale={[10, 10, 1]}
              color="#ffffff"
              target={[0, 0, 0]}
            />
            <Lightformer
              form="rect"
              intensity={3}
              position={[3, 2, 5]}
              scale={[10, 10, 1]}
              color="#ffffff"
              target={[0, 0, 0]}
            />
            <Lightformer
              form="circle"
              intensity={2}
              position={[0, 5, 0]}
              scale={[5, 5, 1]}
              color="#F0F4FF"
              target={[0, 0, 0]}
            />
          </group>
        </Environment>

        {!reduceMotion && <GeometricForm activeIndex={activeIndex} />}
      </Canvas>

      {/* CSS overlay for subtle grain or vignette if needed */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,2,2,0.8)_100%)]" />
    </div>
  )
}
