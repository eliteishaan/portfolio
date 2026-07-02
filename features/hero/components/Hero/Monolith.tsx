/* eslint-disable react-hooks/immutability */
'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from '@/lib/animation/gsap'

interface MonolithProps {
  reduceMotion: boolean
  containerRef: React.RefObject<HTMLElement | null>
  artifactGroupRef: React.RefObject<THREE.Group | null>
}

export const Monolith: React.FC<MonolithProps> = ({
  reduceMotion,
  containerRef,
  artifactGroupRef,
}) => {
  const topChassisRef = useRef<THREE.Group>(null)
  const glassHousingRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Group>(null)
  const bottomChassisRef = useRef<THREE.Group>(null)

  const mats = useMemo(() => {
    return {
      titanium: new THREE.MeshPhysicalMaterial({
        color: '#0a0a0c',
        metalness: 1.0,
        roughness: 0.15,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        metalness: 0.1,
        roughness: 0.05,
        transmission: 1.0,
        thickness: 1.5,
        ior: 1.5,
        clearcoat: 1.0,
        transparent: true,
      }),
      coreBase: new THREE.MeshStandardMaterial({
        color: '#050505',
        metalness: 0.9,
        roughness: 0.4,
      }),
      coreGlow: new THREE.MeshStandardMaterial({
        color: '#E8A73D',
        emissive: '#FFB84D',
        emissiveIntensity: 0.0,
        toneMapped: false,
      }),
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || reduceMotion) {
      mats.coreGlow.emissiveIntensity = 2.0
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    // Phase 1: Opening (0% to 30%)
    tl.to(topChassisRef.current!.position, { y: 1.2, duration: 1, ease: 'power2.inOut' }, 0)
    tl.to(glassHousingRef.current!.position, { y: 0.5, duration: 1, ease: 'power2.inOut' }, 0)
    tl.to(bottomChassisRef.current!.position, { y: -0.9, duration: 1, ease: 'power2.inOut' }, 0)

    // Phase 2: Constructing (30% to 60%)
    tl.to(coreRef.current!.scale, { x: 1.2, z: 1.2, duration: 1, ease: 'back.out(1.2)' }, 1)

    // Phase 3: Living Product (60% to 90%)
    tl.to(mats.coreGlow, { emissiveIntensity: 4.0, duration: 1, ease: 'power2.in' }, 2)

    return () => {
      tl.kill()
    }
  }, [reduceMotion, containerRef, mats])

  useFrame((state) => {
    if (!reduceMotion && mats.coreGlow.emissiveIntensity > 1.0) {
      const time = state.clock.getElapsedTime()
      const pulse = Math.sin(time * 2) * 1.5 + 2.5
      mats.coreGlow.emissiveIntensity = pulse
    }
  })

  // Procedural Greebles Generator for the Core
  const greebles = useMemo(() => {
    const items = []
    for (let i = 0; i < 32; i++) {
      // Deterministic pseudo-random to satisfy react-hooks/purity
      const rand1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1
      const rand2 = Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1
      const rand3 = Math.abs(Math.sin(i * 39.346) * 43758.5453) % 1
      const rand4 = Math.abs(Math.sin(i * 64.233) * 43758.5453) % 1

      const angle = (i / 32) * Math.PI * 2
      const radius = 0.8 + rand1 * 0.6
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const w = 0.04 + rand2 * 0.1
      const d = 0.04 + rand3 * 0.1
      const h = 0.02 + rand4 * 0.06
      items.push({ x, z, w, h, d })
    }
    return items
  }, [])

  return (
    <group ref={artifactGroupRef} rotation={[0.4, -0.6, 0]} scale={1.15} position={[0.2, -0.2, 0]}>
      {/* TOP CHASSIS */}
      <group ref={topChassisRef} position={[0, 0.65, 0]}>
        <RoundedBox args={[3.2, 0.15, 3.2]} radius={0.03} smoothness={4} material={mats.titanium} />
        {/* Recessed Panel */}
        <RoundedBox
          args={[2.9, 0.16, 2.9]}
          position={[0, 0.01, 0]}
          radius={0.02}
          smoothness={4}
          material={mats.coreBase}
        />
        {/* Bolts */}
        <mesh position={[-1.4, 0.08, -1.4]} material={mats.titanium}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
        </mesh>
        <mesh position={[1.4, 0.08, -1.4]} material={mats.titanium}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
        </mesh>
        <mesh position={[-1.4, 0.08, 1.4]} material={mats.titanium}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
        </mesh>
        <mesh position={[1.4, 0.08, 1.4]} material={mats.titanium}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
        </mesh>
      </group>

      {/* GLASS HOUSING */}
      <group ref={glassHousingRef} position={[0, 0.1, 0]}>
        <RoundedBox args={[3.0, 1.0, 3.0]} radius={0.02} smoothness={8} material={mats.glass} />
      </group>

      {/* ZIGGURAT CORE */}
      <group ref={coreRef} position={[0, -0.35, 0]}>
        {/* Base Layer */}
        <RoundedBox
          args={[2.4, 0.1, 2.4]}
          position={[0, 0, 0]}
          radius={0.02}
          smoothness={4}
          material={mats.coreBase}
        />
        <mesh position={[0, 0.06, 0]} material={mats.coreGlow}>
          <boxGeometry args={[2.2, 0.02, 2.2]} />
        </mesh>

        {/* Mid Layer 1 */}
        <RoundedBox
          args={[1.8, 0.15, 1.8]}
          position={[0, 0.12, 0]}
          radius={0.02}
          smoothness={4}
          material={mats.coreBase}
        />
        <mesh position={[0, 0.2, 0]} material={mats.coreGlow}>
          <boxGeometry args={[1.6, 0.02, 1.6]} />
        </mesh>

        {/* Mid Layer 2 */}
        <RoundedBox
          args={[1.2, 0.15, 1.2]}
          position={[0, 0.28, 0]}
          radius={0.02}
          smoothness={4}
          material={mats.coreBase}
        />
        <mesh position={[0, 0.36, 0]} material={mats.coreGlow}>
          <boxGeometry args={[1.0, 0.02, 1.0]} />
        </mesh>

        {/* Top Processor */}
        <RoundedBox
          args={[0.8, 0.1, 0.8]}
          position={[0, 0.42, 0]}
          radius={0.01}
          smoothness={4}
          material={mats.coreBase}
        />

        {/* Core Greebles (Circuitry details on base layer) */}
        {greebles.map((g, i) => (
          <RoundedBox
            key={i}
            args={[g.w, g.h, g.d]}
            position={[g.x, 0.05 + g.h / 2, g.z]}
            radius={0.005}
            material={mats.titanium}
          />
        ))}
      </group>

      {/* BOTTOM CHASSIS */}
      <group ref={bottomChassisRef} position={[0, -0.5, 0]}>
        {/* Upper Base Plate */}
        <RoundedBox args={[3.2, 0.15, 3.2]} radius={0.03} smoothness={4} material={mats.titanium} />

        {/* Inset Neck & Underglow */}
        <RoundedBox
          args={[2.9, 0.1, 2.9]}
          position={[0, 0.1, 0]}
          radius={0.02}
          smoothness={4}
          material={mats.titanium}
        />
        <mesh position={[0, 0.12, 0]} material={mats.coreGlow}>
          <boxGeometry args={[2.8, 0.04, 2.8]} />
        </mesh>

        {/* Lower Base Plate */}
        <RoundedBox
          args={[3.4, 0.2, 3.4]}
          position={[0, -0.15, 0]}
          radius={0.04}
          smoothness={4}
          material={mats.titanium}
        />

        {/* Ribbed Side Details */}
        <RoundedBox
          args={[2.9, 0.15, 3.5]}
          position={[0, -0.15, 0]}
          radius={0.02}
          smoothness={4}
          material={mats.coreBase}
        />
        <RoundedBox
          args={[3.5, 0.15, 2.9]}
          position={[0, -0.15, 0]}
          radius={0.02}
          smoothness={4}
          material={mats.coreBase}
        />
      </group>
    </group>
  )
}
