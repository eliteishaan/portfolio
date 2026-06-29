import { useState, useEffect } from 'react'

export const useScrollDirection = () => {
  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none')

  useEffect(() => {
    if (typeof window === 'undefined') return

    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.scrollY
      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false
        return
      }
      setDirection(scrollY > lastScrollY ? 'down' : 'up')
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return direction
}
