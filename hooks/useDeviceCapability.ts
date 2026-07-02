import { useState, useEffect } from 'react'

export const useDeviceCapability = () => {
  const [isCapable, setIsCapable] = useState<boolean>(true)

  useEffect(() => {
    let capable = true

    // Check WebGL
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) capable = false
    } catch (e) {
      console.warn('WebGL capability check failed:', e)
      capable = false
    }

    // Check hardware concurrency heuristic
    if (capable && typeof navigator !== 'undefined') {
      const cores = navigator.hardwareConcurrency || 4
      if (cores < 4) capable = false
    }

    // eslint-disable-next-line
    setIsCapable(capable)
  }, [])

  return isCapable
}
