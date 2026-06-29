import { useEffect, RefObject } from 'react'

export const useFocusTrap = (containerRef: RefObject<HTMLElement | null>, isActive: boolean) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !isActive || !containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
    const previousFocus = document.activeElement as HTMLElement

    // Focus the first element when trap activates
    firstElement.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Restore focus
      if (previousFocus) {
        // use a slight timeout to avoid focus rings blinking incorrectly sometimes
        setTimeout(() => previousFocus.focus(), 0)
      }
    }
  }, [isActive, containerRef])
}
