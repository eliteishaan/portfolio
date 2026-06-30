import { useScrollPosition } from './useScrollPosition'
import { useState, useEffect, useRef } from 'react'

export type HeaderState = 'transparent' | 'solid' | 'blurred' | 'hidden'

export const useHeaderState = (): HeaderState => {
  const scrollY = useScrollPosition()
  const [headerState, setHeaderState] = useState<HeaderState>('transparent')
  const lastScrollY = useRef(0)
  const lastTime = useRef(0)

  useEffect(() => {
    // Initialize last time on mount to avoid impure Date.now() during render
    if (lastTime.current === 0) {
      lastTime.current = Date.now()
    }

    const now = Date.now()
    const dt = now - lastTime.current

    if (dt > 50) {
      const dy = scrollY - lastScrollY.current
      const velocity = (dy / dt) * 1000 // px per second

      let nextState: HeaderState = 'blurred'
      if (scrollY < 50) {
        nextState = 'transparent'
      } else if (velocity > 50 && scrollY > 200) {
        nextState = 'hidden'
      } else if (velocity < -50 && scrollY > 200) {
        nextState = 'blurred'
      }

      setHeaderState((prev) => (prev !== nextState ? nextState : prev))

      lastScrollY.current = scrollY
      lastTime.current = now
    }
  }, [scrollY])

  return headerState
}
