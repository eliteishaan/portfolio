import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/animation/gsap'

type TweenConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any
  getValue: (mouseX: number, mouseY: number) => object
  duration: number
}

export const useCursorTilt = (
  containerRef: React.RefObject<HTMLElement | null>,
  enabled: boolean
) => {
  const configsRef = useRef<TweenConfig[]>([])

  const registerTarget = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any,
    getValue: (mouseX: number, mouseY: number) => object,
    duration: number = 0.18
  ) => {
    if (target) {
      configsRef.current.push({ target, getValue, duration })
    }
  }

  useEffect(() => {
    if (!containerRef.current || !enabled) return

    let lastCall = 0
    const THROTTLE_MS = 16

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastCall < THROTTLE_MS) return
      lastCall = now

      const rect = containerRef.current!.getBoundingClientRect()
      // Normalized: -1 to 1
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1

      configsRef.current.forEach(({ target, getValue, duration }) => {
        gsap.to(target, {
          ...getValue(x, y),
          duration,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }

    const node = containerRef.current
    node.addEventListener('mousemove', handleMouseMove)
    return () => node?.removeEventListener('mousemove', handleMouseMove)
  }, [containerRef, enabled])

  return { registerTarget }
}
