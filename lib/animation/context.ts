import { gsap } from './gsap'

/**
 * Single source for GSAP context.
 * Useful for global timeline management or cross-component orchestration if needed.
 */
export const globalGSAPContext = typeof window !== 'undefined' ? gsap.context(() => {}) : null
