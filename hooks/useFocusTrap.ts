import { useEffect, RefObject } from 'react'

export const useFocusTrap = (containerRef: RefObject<HTMLElement | null>, isActive: boolean) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !isActive || !containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
    const previousFocus = document.activeElement as HTMLElement | null

    firstElement.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocus?.isConnected) {
        previousFocus.focus()
      }
    }
  }, [isActive, containerRef])
}
