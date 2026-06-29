import { ScrollTrigger } from './gsap'

/**
 * Idempotent safe refresh for ScrollTrigger.
 * Future sections must use this instead of ScrollTrigger.refresh() directly.
 */
export const safeRefreshScrollTrigger = () => {
  if (typeof window !== 'undefined') {
    // Avoid refreshing if a refresh is already scheduled/running
    // Using a requestAnimationFrame ensures we don't cause layout thrashing mid-render
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }
}
