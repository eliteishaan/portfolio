import { useEffect } from 'react'

export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (isLocked) {
      document.body.style.overflow = 'hidden'
      // Optional: Add padding to prevent layout shift from missing scrollbar
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isLocked])
}
