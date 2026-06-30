'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vUv;

void main() {
  // Distance from mouse
  float dist = distance(vUv, uMouse);
  
  // Soft volumetric light falloff
  float intensity = smoothstep(0.8, 0.0, dist);
  
  // Warm amber glow (accent color: #E8A73D -> rgb(0.91, 0.65, 0.24))
  vec3 lightColor = vec3(0.91, 0.65, 0.24);
  
  // Add extremely subtle pulse
  intensity *= 0.5 + 0.1 * sin(uTime * 2.0);
  
  gl_FragColor = vec4(lightColor, intensity * 0.15); // low opacity
}
`

export const ReactiveMeshScene = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime

      // Map pointer to UV space, gently eased
      const targetX = state.pointer.x * 0.5 + 0.5
      const targetY = state.pointer.y * 0.5 + 0.5

      // Simple lerp for smooth light following
      materialRef.current.uniforms.uMouse.value.x +=
        (targetX - materialRef.current.uniforms.uMouse.value.x) * 0.05
      materialRef.current.uniforms.uMouse.value.y +=
        (targetY - materialRef.current.uniforms.uMouse.value.y) * 0.05
    }
  })

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}
