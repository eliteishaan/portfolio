'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Calculate distance from mouse
  float dist = distance(uv, uMouse);
  
  // Create a gentle magnetic pull/distortion based on distance
  float force = smoothstep(0.4, 0.0, dist);
  pos.z += force * 0.5 * sin(uTime * 2.0 + dist * 10.0);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;

void main() {
  // Deep dark ambient noise
  float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453 + uTime * 0.1);
  vec3 color = mix(vec3(0.04, 0.04, 0.04), vec3(0.1, 0.1, 0.1), noise);
  
  gl_FragColor = vec4(color, 1.0);
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
      // Map pointer from [-1, 1] to [0, 1] for UV coordinates
      materialRef.current.uniforms.uMouse.value.set(
        state.pointer.x * 0.5 + 0.5,
        state.pointer.y * 0.5 + 0.5
      )
    }
  })

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  )
}
