import { useSyncExternalStore } from 'react'

const subscribeToQuery = (query: string, onStoreChange: () => void) => {
  if (typeof window === 'undefined') return () => undefined

  const mediaQuery = window.matchMedia(query)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

export const useMediaQuery = (query: string) => {
  return useSyncExternalStore(
    (onStoreChange) => subscribeToQuery(query, onStoreChange),
    () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false),
    () => false
  )
}
