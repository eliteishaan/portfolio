import { useEffect, useState } from 'react'
import { gsap } from '@/lib/animation/gsap'

/**
 * Hook to securely manage GSAP context for components without manual cleanup.
 */
export const useGSAPContext = (scope?: React.RefObject<Element | null>) => {
  const [ctx] = useState(() => gsap.context(() => {}, scope?.current || undefined))

  useEffect(() => {
    return () => {
      ctx.revert()
    }
  }, [ctx])

  return ctx
}
